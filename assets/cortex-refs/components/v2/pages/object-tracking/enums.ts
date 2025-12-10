export enum ObjectTrackingStatus {
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
  ACCEPTED = 'Accepted',
  FAILED = 'Failed',
}

export enum ObjectTrackingSessionStatus {
  WEATHER = 'Weather',
  IN_SHADOW = 'Shadow',
  SUN_DISTANCE = 'Sun Distance',
  ALTITUDE = 'Low Elevation',
  OLD_TLE = 'Old TLE', // not returned from API
  STALE_TLE = 'Stale TLE',
  SUCCESS = 'Object Found',
  NO_DETECTION = 'Object Not Found',
  OBSTACLE = 'Obstacle',
  TRACKING = 'Tracking',
  FOCUS = 'Focus',
  NO_ASSOCIATION = 'No Association',
  EMPTY = 'Empty',
  ASTROMETRY = 'Astrometry',
  OTHER = 'Other',
}

export enum ObjectTrackingType {
  SUBSCRIPTION = 'Monitoring',
  CUSTOM = 'Custom',
}

export enum ObjectTrackingTargetMode {
  NoradID = 'noradid',
  TLE = 'tle',
  // BE doesn't support coordinates option yet
  Coordinates = 'coordinates',
}

export enum ObjectTrackingOrbitalRegime {
  LEO = 'LEO',
  MEO = 'MEO',
  GEO = 'GEO',
  GTO = 'GTO',
  HEO = 'HEO',
}

export enum ObjectTrackingObservationMode {
  Normal = 'Normal',
  Stare = 'Stare',
  Search = 'Search',
  Instant = 'Instant',
  Scan = 'Scan',
  Calibration = 'Calibration',
}

export enum TrackStatus {
  Tracked = 'Tracked',
  NotTracked = 'Not Tracked',
}

export enum ManageTasksTabLabels {
  OBJECT = 'Object Monitoring',
  TIME = 'Custom',
}
