import {
  ANTISOLAR_CIRCLE_RADIUS_DEG,
  FULL_CIRCLE_DEG,
  HALF_CIRCLE_DEG,
  MAP_COLORS,
} from '@/components/v2/map-chart/constants/map-constants';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import type {
  FeatureCollection as FC,
  Feature,
  GeoJsonProperties,
  Polygon,
} from 'geojson';
import { MapMode, Mode } from 'models/interfaces/v2/am-chart';
import {
  getAntisolarPoint,
  getSubsolarPoint,
} from './add-solar-terminator-curve-polygon';
import { spinToNoZoom } from './spin-to';

export const applyGlobeNightLock = (
  d: Date,
  mode: MapMode,
  map: am5map.MapChart,
  hasObject: boolean
) => {
  // TODO: add buttons to change the behavior, hasObject is leding prop here
  if (mode !== Mode.GLOBE || hasObject) return;

  const { lat: antiLat, lon: antiLon } = getAntisolarPoint(d);

  spinToNoZoom(map, antiLat, antiLon);
};

const normLon = (lon: number) =>
  ((((lon + HALF_CIRCLE_DEG) % FULL_CIRCLE_DEG) + FULL_CIRCLE_DEG) %
    FULL_CIRCLE_DEG) -
  HALF_CIRCLE_DEG;

function nightHemisphereGeoJSON(at: Date): FC<Polygon, GeoJsonProperties> {
  const sub = getSubsolarPoint(at);
  const anti = { lat: -sub.lat, lon: normLon(sub.lon + HALF_CIRCLE_DEG) };

  const polygon = am5map.getGeoCircle(
    { latitude: anti.lat, longitude: anti.lon },
    ANTISOLAR_CIRCLE_RADIUS_DEG
  ) as Polygon;

  const feature: Feature<Polygon, GeoJsonProperties> = {
    type: 'Feature',
    geometry: polygon,
    properties: {},
  };

  return {
    type: 'FeatureCollection',
    features: [feature],
  };
}

type TerminatorOpts = {
  _time?: () => Date;
  fillOpacity?: number;
  updateEveryMs?: number;
};

export function addSolarTerminatorGlobe(
  root: am5.Root,
  map: am5map.MapChart,
  opts?: TerminatorOpts
) {
  const { _time, fillOpacity, updateEveryMs } = opts ?? {};

  const series = map.series.push(am5map.MapPolygonSeries.new(root, {}));
  series.mapPolygons.template.setAll({
    fill: am5.color(MAP_COLORS.TERMINATOR_POLYGON_FILL),
    fillOpacity: fillOpacity ?? 0.3,
    strokeOpacity: 0,
    interactive: false,
  });

  const computeGeom = () =>
    nightHemisphereGeoJSON(_time?.() ?? new Date()).features[0]
      .geometry as GeoJSON.Polygon;

  series.data.setAll([{ geometry: computeGeom() }]);
  const item = series.dataItems[0];

  const update = () => item.set('geometry', computeGeom());

  let timer: number | undefined;
  if (!_time && updateEveryMs)
    timer = window.setInterval(update, updateEveryMs);

  const dispose = () => {
    if (timer) window.clearInterval(timer);
    try {
      series.dispose();
    } catch {}
  };
  return { dispose, series, update };
}
