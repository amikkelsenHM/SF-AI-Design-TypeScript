import * as am5 from '@amcharts/amcharts5';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import * as am5map from '@amcharts/amcharts5/map';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

import {
  MAP_COLORS,
  MAP_CONFIG,
  MAP_INITIAL_PAN_STATE,
} from '@/components/v2/map-chart/constants/map-constants';

import { PinReference } from '@/components/v2/map-chart/utils/add-location-marker';

import { attachClusteredBullet } from './add-clustered-bullet';
import { addOrbitLines } from './add-ground-track';
import { addLiveSatelliteMarker } from './add-live-satellite-marker';
import addLocationMarkers from './add-location-marker';
import { addMapTooltip } from './add-map-tooltip';
import {
  addSolarTerminatorCurvePolygon,
  applyNightLock,
} from './add-solar-terminator-curve-polygon';
import {
  addSolarTerminatorGlobe,
  applyGlobeNightLock,
} from './add-solar-terminator-globe';
import { applyGlobeTooltip } from './apply-globe-tooltip';
import { spinToNoZoom, throttledSpinToNoZoom } from './spin-to';

import {
  getOrbitLines,
  getOrbitPeriodMs,
  getSatrec,
  splitByDateline,
} from '@/utils/v2/tle-utils';

import { CampaignTarget } from '@/components/v2/pages/object-tracking/types';
import {
  DEFAULT_ORBIT_MINUTES,
  FULL_ORBIT,
  HALF_ORBIT,
  MS_IN_MINUTE,
  STEPS_PER_ORBIT,
} from '@/utils/v2/common/constants';
import {
  GlobeDotReference,
  MapMode,
  Mode,
} from 'models/interfaces/v2/am-chart';
import { Dispatch, SetStateAction } from 'react';
import addGlobeLocationDots from './add-globle-location-dots';

export const FALLBACK_PERIOD_MS = DEFAULT_ORBIT_MINUTES * MS_IN_MINUTE;

type FeatureGeometryPoint = {
  type: 'Point';
  coordinates: [number, number];
};

type FeatureProps = {
  id: string;
  name: string;
  isObserving: boolean;
};

type Feature = {
  type: 'Feature';
  properties: FeatureProps;
  geometry: FeatureGeometryPoint;
};

export type FeatureCollection = {
  type: 'FeatureCollection';
  features: Feature[];
};

interface CreateChartProps {
  root: am5.Root;
  mode: MapMode;
  observatoryCollection: FeatureCollection;
  object?: CampaignTarget;
  setObservatoryId: Dispatch<SetStateAction<string | undefined>>;
  setSelectedId: (id: string) => void;
  tooltipStateRef: React.MutableRefObject<{
    hoveredObservatoryName: string | null;
  }>;
  initialSelectedId?: string;
  isMounted: React.MutableRefObject<boolean>;
  followTargetRef?: React.MutableRefObject<boolean>;
}

const getProjection = (mode: MapMode, hasObject: boolean) => {
  if (mode === Mode.GLOBE) return am5map.geoOrthographic();
  if (mode === Mode.MAP && hasObject) return am5map.geoEquirectangular();
  return am5map.geoNaturalEarth1();
};

const getPanMode = (mode: MapMode, hasObject: boolean) => {
  if (mode === Mode.GLOBE)
    return { panX: 'rotateX' as const, panY: 'rotateY' as const };
  if (mode === Mode.MAP && !hasObject) return MAP_INITIAL_PAN_STATE;
  return { panX: 'rotateX' as const, panY: 'translateY' as const };
};

const getWheelY = (mode: MapMode, hasObject: boolean) =>
  mode === Mode.MAP && !hasObject ? MAP_CONFIG.WHEEL_Y : 'zoom';

const computeOrbitWindow = (
  periodMs: number,
  orbitRatio: { half: number; full: number }
) => {
  const t0 = Date.now();
  return {
    start: t0 - orbitRatio.half * periodMs,
    end: t0 + orbitRatio.full * periodMs,
  };
};

export const createChart = ({
  root,
  mode,
  observatoryCollection,
  object,
  setObservatoryId,
  setSelectedId,
  tooltipStateRef,
  initialSelectedId,
  isMounted,
  followTargetRef,
}: CreateChartProps) => {
  root.setThemes([am5themes_Animated.new(root)]);

  let liveMarker: { update?: (d?: Date) => void } | null = null;
  let dayMapHandle: { update?: () => void } | null = null;
  let nightGlobeHandle: { update?: () => void } | null = null;

  let currentTime = new Date();
  let windowStart: number | null = null;
  let windowEnd: number | null = null;

  // Create the chart instance with mode-specific projection and controls
  const hasObject = !!object;
  const map = root.container.children.push(
    am5map.MapChart.new(root, {
      projection: getProjection(mode, hasObject),
      wheelY: getWheelY(mode, hasObject),
      maxZoomLevel: MAP_CONFIG.MAX_ZOOM_LEVEL,
      minZoomLevel: MAP_CONFIG.MIN_ZOOM_LEVEL,
      interactive: true,
      showTooltipOn: 'hover',
      tooltipPosition: 'pointer',
      tooltip: am5.Tooltip.new(root, {}),
      ...getPanMode(mode, hasObject),
    })
  );

  //base layers
  const worldSeries = map.series.push(
    am5map.MapPolygonSeries.new(root, {
      exclude: mode === Mode.MAP ? MAP_CONFIG.EXCLUDED_COUNTRIES : [],
      geoJSON: am5geodata_worldLow,
    })
  );
  worldSeries.mapPolygons.template.setAll({
    fill: am5.color(MAP_COLORS.COUNTRY_FILL),
    stroke: am5.color(MAP_COLORS.COUNTRY_STROKE),
    strokeWidth: 1,
  });

  const graticuleSeries = map.series.push(am5map.GraticuleSeries.new(root, {}));
  graticuleSeries.mapLines.template.setAll({
    stroke: am5.color(MAP_COLORS.GRATICULE_LINES),
    strokeOpacity: 0.35,
  });

  //observatories layer
  const pointSeries = map.series.push(
    am5map.ClusteredPointSeries.new(root, {})
  );
  attachClusteredBullet(root, pointSeries);

  pointSeries.data.setAll(
    observatoryCollection.features.map((feature) => ({
      geometry: feature.geometry,
      ...feature.properties,
    }))
  );

  // mode-specifics
  let pinReferences: PinReference[] = [];
  let dotReferences: GlobeDotReference[] = [];

  if (mode === Mode.MAP) {
    addMapTooltip(map, tooltipStateRef.current);

    pinReferences = addLocationMarkers(
      root,
      pointSeries,
      map,
      (id) => setObservatoryId(id ?? undefined),
      tooltipStateRef.current,
      initialSelectedId
    );

    //Day/night for MAP
    dayMapHandle = addSolarTerminatorCurvePolygon(root, map, {
      _time: () => currentTime,
    });
  } else {
    applyGlobeTooltip(map);

    dotReferences = addGlobeLocationDots(
      root,
      map,
      pointSeries,
      setObservatoryId,
      setSelectedId,
      tooltipStateRef
    );

    //Day/night for globe
    const globeTerminator = addSolarTerminatorGlobe(root, map, {
      updateEveryMs: 60000,
      fillOpacity: 0.3,
      _time: () => currentTime,
    });
    nightGlobeHandle = { update: globeTerminator.update };
  }

  if (object?.tle) {
    try {
      const { satrec } = getSatrec(object.tle);
      const periodMs = getOrbitPeriodMs(satrec);
      ({ start: windowStart, end: windowEnd } = computeOrbitWindow(periodMs, {
        half: HALF_ORBIT,
        full: FULL_ORBIT,
      }));
    } catch {
      ({ start: windowStart, end: windowEnd } = computeOrbitWindow(
        FALLBACK_PERIOD_MS,
        {
          half: HALF_ORBIT,
          full: FULL_ORBIT,
        }
      ));
    }

    const displayName =
      object.objectName ||
      object.satName ||
      object.name ||
      `NORAD ${object.noradId ?? ''}`;

    const { past, future } = getOrbitLines(
      object.tle,
      STEPS_PER_ORBIT,
      HALF_ORBIT,
      FULL_ORBIT
    );
    addOrbitLines(root, map, splitByDateline(past), splitByDateline(future));

    const marker = addLiveSatelliteMarker(root, map, object.tle, {
      mode,
      tooltipStateRef,
      name: displayName,
      controlled: true,
      onFirstFix: (coords) => {
        setTimeout(() => {
          if (!isMounted.current) return;

          if (mode === Mode.GLOBE) {
            if (followTargetRef?.current) {
              spinToNoZoom(map, coords.latitude, coords.longitude);
            }
          }
        }, 300);
      },

      onClickSpinTo: (lat, lon) => {
        if (mode === Mode.GLOBE) {
          spinToNoZoom(map, lat, lon);
        }
      },

      onUpdatedPosition:
        mode === Mode.GLOBE
          ? (lat, lon) => {
              if (!followTargetRef?.current) return;
              throttledSpinToNoZoom(map, lat, lon);
            }
          : undefined,
    });
    liveMarker = { update: marker.update };
  }

  const setTime = (d: Date) => {
    currentTime = d;

    liveMarker?.update?.(d);
    dayMapHandle?.update?.();
    nightGlobeHandle?.update?.();

    // TODO: add buttons to change the behavior
    applyNightLock(d, mode, map);

    // TODO: add buttons to change the behavior
    applyGlobeNightLock(d, mode, map, hasObject);
  };

  const timeApi =
    windowStart != null && windowEnd != null
      ? { setTime, windowStart, windowEnd }
      : undefined;

  if (!hasObject) {
    const now = new Date();
    setTime(now);
  }

  return {
    map,
    pinReferences,
    dotReferences,
    timeApi,
  };
};
