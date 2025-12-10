import { getLatLonAt } from '@/utils/v2/tle-utils';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import { MapMode, Mode } from 'models/interfaces/v2/am-chart';
import { MAP_COLORS } from '../constants/map-constants';

type Options = {
  mode: MapMode;
  tooltipStateRef: React.MutableRefObject<{
    hoveredObservatoryName: string | null;
  }>;
  name?: string;
  tickMs?: number;
  radius?: number;
  color?: string;
  onFirstFix?: (p: { latitude: number; longitude: number }) => void;
  onClickSpinTo?: (lat: number, lon: number) => void;
  controlled?: boolean;
  onUpdatedPosition?: (lat: number, lon: number) => void;
};

type GeometryPoint = {
  type: 'Point';
  coordinates: [number, number];
};

export function addLiveSatelliteMarker(
  root: am5.Root,
  map: am5map.MapChart,
  tle: string,
  opts: Options
) {
  const {
    mode,
    tooltipStateRef,
    tickMs = 1000,
    radius = 9,
    color = MAP_COLORS.LIVE_MARKER,
    onFirstFix,
    name = 'Satellite',
    onClickSpinTo,
    controlled = false,
  } = opts;

  const series = map.series.push(am5map.MapPointSeries.new(root, {}));

  series.data.setAll([
    {
      latitude: 0,
      longitude: 0,
    },
  ]);
  const dataItem = series.dataItems[0];

  series.bullets.push((_root, _series, dataItem) => {
    const container = am5.Container.new(root, {
      centerX: am5.p50,
      centerY: am5.p50,
      cursorOverStyle: 'pointer',
    });

    const circle = am5.Circle.new(root, {
      radius,
      fill: am5.color(color),
      stroke: am5.color(color),
      strokeWidth: 2,
      opacity: 0,
    });

    const icon = am5.Picture.new(root, {
      src: '/icons/v2/satellite.svg',
      width: radius * 3,
      height: radius * 3,
      centerX: am5.p50,
      centerY: am5.p50,
    });

    container.children.push(circle);
    container.children.push(icon);

    if (mode === Mode.GLOBE) {
      container.set(
        'tooltipHTML',
        `<div class="typography-body-sm text-foreground">${name}</div>`
      );
    } else {
      const mapTooltip = map.get('tooltip');
      container.events.on('pointerover', () => {
        tooltipStateRef.current.hoveredObservatoryName = name;
        mapTooltip?.show();
      });
      container.events.on('pointerout', () => {
        tooltipStateRef.current.hoveredObservatoryName = null;
        mapTooltip?.hide();
      });
    }

    if (onClickSpinTo) {
      container.events.on('click', () => {
        const coords = (dataItem.get('geometry') as GeometryPoint | undefined)
          ?.coordinates;
        if (coords) {
          const [lon, lat] = coords;
          onClickSpinTo(lat, lon);
        }
      });
    }

    return am5.Bullet.new(root, { sprite: container });
  });

  // Update the marker position
  const setCoord = (lat: number, lon: number) => {
    dataItem.setAll({
      latitude: lat,
      longitude: lon,
    });
  };

  const updateCoordinates = (at?: Date, isFirstFix = false) => {
    const when = at ?? new Date();
    const pos = getLatLonAt(tle, when);
    if (!pos) return;
    setCoord(pos.latitude, pos.longitude);
    if (isFirstFix) onFirstFix?.(pos);
    opts.onUpdatedPosition?.(pos.latitude, pos.longitude);
  };

  // Set initial position
  updateCoordinates(new Date(), true);

  // Live update interval
  let intervalId: number | undefined;
  if (!controlled) {
    intervalId = window.setInterval(() => updateCoordinates(), tickMs);
  }

  const update = (d?: Date) => updateCoordinates(d);

  // Cleanup function
  const dispose = () => {
    if (intervalId) window.clearInterval(intervalId);
    try {
      series.dispose();
    } catch {}
  };

  return { series, dispose, update };
}
