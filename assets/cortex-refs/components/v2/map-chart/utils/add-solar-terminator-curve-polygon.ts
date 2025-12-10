import {
  ANTISOLAR_CIRCLE_RADIUS_DEG,
  EARTH_RADIUS_METERS,
  FULL_CIRCLE_DEG,
  GMST0_DEG,
  GMST1_DEG_PER_DAY,
  HALF_CIRCLE_DEG,
  J2000,
  MAP_COLORS,
  MS_PER_DAY,
  NORMALIZE_SHIFT_DEG,
  OBLIQUITY_E0_DEG,
  OBLIQUITY_E1_DEG_PER_DAY,
  SOLAR_C1_DEG,
  SOLAR_C2_DEG,
  SOLAR_G0_DEG,
  SOLAR_G1_DEG_PER_DAY,
  SOLAR_L0_DEG,
  SOLAR_L1_DEG_PER_DAY,
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

export function getAntisolarPoint(at: Date) {
  const { lat: subLat, lon: subLon } = getSubsolarPoint(at);

  const antiLat = -subLat;
  const antiLon =
    ((subLon + HALF_CIRCLE_DEG + NORMALIZE_SHIFT_DEG) % FULL_CIRCLE_DEG) -
    HALF_CIRCLE_DEG;

  return { lat: antiLat, lon: antiLon };
}

const toRad = (d: number) => (d * Math.PI) / HALF_CIRCLE_DEG;
const toDeg = (r: number) => (r * 180) / Math.PI;

export const applyNightLock = (
  d: Date,
  mode: MapMode,
  map: am5map.MapChart
) => {
  if (mode !== Mode.MAP) return;

  const { lon: antiLon } = getAntisolarPoint(d);

  map.set('rotationX', -antiLon);
};

/**
 * Calculates solar right ascension and declination
 */
const solarCoords = (days: number) => {
  // Mean longitude of the sun
  const long = (SOLAR_L0_DEG + SOLAR_L1_DEG_PER_DAY * days) % FULL_CIRCLE_DEG;
  // Mean anomaly of the sun
  const meanAnomalyDeg =
    (SOLAR_G0_DEG + SOLAR_G1_DEG_PER_DAY * days) % FULL_CIRCLE_DEG;

  const lambda =
    (long +
      SOLAR_C1_DEG * Math.sin(toRad(meanAnomalyDeg)) +
      SOLAR_C2_DEG * Math.sin(toRad(2 * meanAnomalyDeg))) %
    FULL_CIRCLE_DEG;

  // Obliquity of the ecliptic
  const eps = OBLIQUITY_E0_DEG - OBLIQUITY_E1_DEG_PER_DAY * days;

  // Convert to equatorial coordinates
  const ra = toDeg(
    Math.atan2(
      Math.cos(toRad(eps)) * Math.sin(toRad(lambda)),
      Math.cos(toRad(lambda))
    )
  );
  const dec = toDeg(Math.asin(Math.sin(toRad(eps)) * Math.sin(toRad(lambda))));

  return { ra, dec };
};

export function getSubsolarPoint(at: Date) {
  const days = (at.getTime() - J2000) / MS_PER_DAY;
  const { ra, dec } = solarCoords(days);

  // Greenwich Mean Sidereal Time
  let GMST = (GMST0_DEG + GMST1_DEG_PER_DAY * days) % FULL_CIRCLE_DEG;
  GMST = ((GMST % FULL_CIRCLE_DEG) + FULL_CIRCLE_DEG) % FULL_CIRCLE_DEG;

  // Local Sidereal Time (embedded in lon calc
  let lon = (ra - GMST) % FULL_CIRCLE_DEG;
  if (lon > HALF_CIRCLE_DEG) lon -= FULL_CIRCLE_DEG;
  if (lon < -HALF_CIRCLE_DEG) lon += FULL_CIRCLE_DEG;

  return { lat: dec, lon };
}

/**
 * Calculates solar position and determines day/night phase for a given location
 */
export function getSolarInfo(
  at: Date,
  latitude: number,
  longitude: number,
  elevationMeters = 0
) {
  const sub = getSubsolarPoint(at);

  const phi = toRad(latitude);
  const phiS = toRad(sub.lat);
  const dLon = toRad(longitude - sub.lon);

  /**
   * Calculates solar altitude angle with optional elevation correction
   *
   * Calculate solar altitude using spherical trigonometry
   */
  const cosSigma =
    Math.sin(phi) * Math.sin(phiS) +
    Math.cos(phi) * Math.cos(phiS) * Math.cos(dLon);

  const sigma = Math.acos(Math.max(-1, Math.min(1, cosSigma)));
  let solarAltitude = ANTISOLAR_CIRCLE_RADIUS_DEG - toDeg(sigma);

  // Apply elevation correction for observer height above sea level
  if (elevationMeters > 0) {
    const dip = toDeg(Math.sqrt((2 * elevationMeters) / EARTH_RADIUS_METERS));
    solarAltitude += dip;
  }

  const daylightType = solarAltitude > 0 ? 'DAY' : 'NIGHT';

  return {
    solarAltitude,
    daylightType,
  };
}

const normLon = (lon: number) =>
  ((((lon + HALF_CIRCLE_DEG) % FULL_CIRCLE_DEG) + FULL_CIRCLE_DEG) %
    FULL_CIRCLE_DEG) -
  HALF_CIRCLE_DEG;

/**
 * Generates GeoJSON representing the day/night terminator as a polygon
 * The polygon covers the day side of the Earth
 *
 * Finds the latitude where the solar altitude is closest to zero (terminator line)
 * Uses binary search for efficient convergence
 *
 * Sample terminator points across all longitudes
 * Create polygon covering the day side of Earth
 * Start from north pole, follow terminator, end at south pole, then close
 */
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
};

/**
 * Adds the day/night terminator polygon to the map
 * Creates a semi-transparent overlay showing the day side of Earth
 */
export function addSolarTerminatorCurvePolygon(
  root: am5.Root,
  map: am5map.MapChart,
  opts?: TerminatorOpts
) {
  const { _time } = opts ?? {};

  const series = map.series.push(am5map.MapPolygonSeries.new(root, {}));
  series.mapPolygons.template.setAll({
    fill: am5.color(MAP_COLORS.TERMINATOR_POLYGON_FILL),
    fillOpacity: 0.3,
    strokeOpacity: 0,
    interactive: false,
  });

  const computeGeom = () =>
    nightHemisphereGeoJSON(_time?.() ?? new Date()).features[0]
      .geometry as GeoJSON.Polygon;

  series.data.setAll([{ geometry: computeGeom() }]);
  const item = series.dataItems[0];

  const update = () => item.set('geometry', computeGeom());

  return { series, update };
}
