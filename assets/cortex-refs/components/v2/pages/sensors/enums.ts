export enum SensorStatus {
  OBSERVING = 'Observing',
  OPENING_SOON = 'Opening Soon',
  CLOSING = 'Closing',
  CLOSING_SOON = 'Closing Soon',
  NOT_OBSERVING = 'Not Observing',
  UNDER_MAINTENANCE = 'Under Maintenance',
  IDLE = 'Idle',
  UNKNOWN = 'Unknown',
}

export enum SensorRoofStatus {
  OPEN = 'Open',
  CLOSED = 'Closed',
  OPENING = 'Opening',
  CLOSING = 'Closing',
  UNKNOWN = 'Unknown',
}

export enum DayNightPhase {
  DAY = 'Day',
  CIVIL_TWILIGHT = 'Night',
  NAUTICAL_TWILIGHT = 'Night',
  ASTRONOMICAL_TWILIGHT = 'Night',
  NIGHT = 'Night',
}

export enum SensorTableView {
  Summary = 'summary',
  Detailed = 'detailed',
}
