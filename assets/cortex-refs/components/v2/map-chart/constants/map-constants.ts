import { SensorRoofStatus, SensorStatus } from '../../pages/sensors/enums';

export const PIN_CONFIG = {
  SIZE: 20,
  COLORS: {
    DEFAULT: '#ffffff',
    SELECTED: '#cf8bff',
    OBSERVING: '#4ade80',
  },
} as const;

export const MAP_INITIAL_PAN_STATE = {
  panX: 'rotateX' as const,
  panY: 'none' as const,
};

export const MAP_ZOOMED_PAN_STATE = {
  panX: 'translateX' as const,
  panY: 'translateY' as const,
};

export const MAP_CONFIG = {
  MIN_ZOOM_LEVEL: 1,
  MAX_ZOOM_LEVEL: 32,
  ZOOM_IN_STEP: 2,
  ZOOM_OUT_STEP: 0.5,
  WHEEL_Y: 'none' as const,
  EXCLUDED_COUNTRIES: ['AQ'] as string[],
} as const;

export const DEFAULT_STATUSES = {
  SENSOR: SensorStatus.IDLE,
  ROOF: SensorRoofStatus.CLOSED,
} as const;

export const OBSERVATORY_ORDER = {
  DEFAULT: 999,
} as const;

export const TIMING = {
  MAP_CREATION_DELAY: 100,
} as const;

export const MAP_COLORS = {
  COUNTRY_FILL: '#1d1825',
  COUNTRY_STROKE: '#6b29ae',
  GRATICULE_LINES: '#382c47',
  TERMINATOR_POLYGON_FILL: '#000000',
  LIVE_MARKER: '#d7d7d7',
  ORBIT_LINE: '#a3a3a3',
};

export enum Status {
  OBSERVING = 'observing',
}

export const J2000 = Date.UTC(2000, 0, 1, 12, 0, 0);

export const SMALL_RADIUS = 5;
export const LARGE_RADIUS = 7.5;
export const MEDIUM_RADIUS = 6.5;
export const STROKE_WIDTH = 1;
export const SELECTED_STROKE_WIDTH = 2;

export const COLOR_WHITE = 0xffffff;
export const COLOR_GREEN = 0x22c55e;
export const COLOR_PURPLE = 0xa855f7;

export const MS_PER_DAY = 86400000;
export const FULL_CIRCLE_DEG = 360;
export const HALF_CIRCLE_DEG = 180;
export const SOLAR_L0_DEG = 280.46;
export const SOLAR_L1_DEG_PER_DAY = 0.9856474;
export const SOLAR_G0_DEG = 357.528;
export const SOLAR_G1_DEG_PER_DAY = 0.9856003;
export const SOLAR_C1_DEG = 1.915;
export const SOLAR_C2_DEG = 0.02;
export const OBLIQUITY_E0_DEG = 23.439;
export const OBLIQUITY_E1_DEG_PER_DAY = 0.0000004;
export const GMST0_DEG = 280.46061837;
export const GMST1_DEG_PER_DAY = 360.98564736629;
export const ANTISOLAR_CIRCLE_RADIUS_DEG = 90;
export const MAP_STROKE_OPACITY_NONE = 0;
export const DEFAULT_UPDATE_EVERY_MS = 60000;
export const DEFAULT_FILL_OPACITY = 0.3;
export const EARTH_RADIUS_METERS = 6371000;
export const NORMALIZE_SHIFT_DEG = 540;
