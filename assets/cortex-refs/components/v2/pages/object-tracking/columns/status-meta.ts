import { ObjectTrackingSessionStatus } from '../enums';

export const BadgeState = {
  Idle: 'idle',
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
} as const;
export type BadgeState = (typeof BadgeState)[keyof typeof BadgeState];

export const Visibility = {
  All: 'all',
  Admin: 'admin',
} as const;
export type Visibility = (typeof Visibility)[keyof typeof Visibility];

export const STATUS_META = {
  // GREEN
  [ObjectTrackingSessionStatus.SUCCESS]: {
    label: 'Object Found',
    severity: BadgeState.Success,
    visibility: Visibility.All,
    tooltip: {
      header: 'Object Detection Success',
      text: 'Session successful',
      triggerAriaLabel: 'Success status information',
    },
  },
  [ObjectTrackingSessionStatus.NO_DETECTION]: {
    label: 'Object Not found',
    severity: BadgeState.Success,
    visibility: Visibility.All,
    tooltip: {
      header: 'Object Detection Success',
      text: 'Object not found, but no issues detected.',
      triggerAriaLabel: 'Object not found status information',
    },
  },

  // AMBER
  [ObjectTrackingSessionStatus.OLD_TLE]: {
    label: 'Old TLE',
    severity: BadgeState.Warning,
    visibility: Visibility.All,
    tooltip: {
      header: 'Object Detection Warning',
      text: 'TLE age is greater than our recommended limit for this orbit. Therefore, the object may not appear in the field of view.',
      triggerAriaLabel: 'Old TLE status information',
    },
  },
  [ObjectTrackingSessionStatus.STALE_TLE]: {
    label: 'Stale TLE',
    severity: BadgeState.Warning,
    visibility: Visibility.All,
    tooltip: {
      header: 'Object Detection Warning',
      text: 'TLE age is greater than our recommended limit for this orbit. Therefore, the object may not appear in the field of view.',
      triggerAriaLabel: 'Stale TLE status information',
    },
  },
  [ObjectTrackingSessionStatus.SUN_DISTANCE]: {
    label: 'Sun Angle',
    severity: BadgeState.Warning,
    visibility: Visibility.All,
    tooltip: {
      header: 'Object Detection Warning',
      text: 'Sun distance is high; detection reliability reduced.',
      triggerAriaLabel: 'Sun distance status information',
    },
  },
  [ObjectTrackingSessionStatus.ALTITUDE]: {
    label: 'Low Elevation',
    severity: BadgeState.Warning,
    visibility: Visibility.All,
    tooltip: {
      header: 'Object Detection Warning',
      text: 'Low elevation; detection reliability reduced.',
      triggerAriaLabel: 'Low elevation status information',
    },
  },
  [ObjectTrackingSessionStatus.WEATHER]: {
    label: 'Weather',
    severity: BadgeState.Warning,
    visibility: Visibility.All,
    tooltip: {
      header: 'Object Detection Warning',
      text: 'Session may be impacted by weather issue.',
      triggerAriaLabel: 'Weather status information',
    },
  },

  // RED (admin only)
  [ObjectTrackingSessionStatus.IN_SHADOW]: {
    label: 'Shadow',
    severity: BadgeState.Error,
    visibility: Visibility.Admin,
    tooltip: {
      header: 'Object Detection Failed',
      text: "Target in Earth's shadow; detection prevented.",
      triggerAriaLabel: 'Shadow status information',
    },
  },
  [ObjectTrackingSessionStatus.OBSTACLE]: {
    label: 'Obstacle',
    severity: BadgeState.Error,
    visibility: Visibility.Admin,
    tooltip: {
      header: 'Object Detection Failed',
      text: 'Session unsuccessful: obstacle detected.',
      triggerAriaLabel: 'Obstacle status information',
    },
  },
  [ObjectTrackingSessionStatus.TRACKING]: {
    label: 'Tracking',
    severity: BadgeState.Error,
    visibility: Visibility.Admin,
    tooltip: {
      header: 'Object Detection Failed',
      text: 'Tracking issue detected; session may be unsuccessful or unreliable.',
      triggerAriaLabel: 'Tracking status information',
    },
  },
  [ObjectTrackingSessionStatus.FOCUS]: {
    label: 'Focus',
    severity: BadgeState.Error,
    visibility: Visibility.Admin,
    tooltip: {
      header: 'Object Detection Failed',
      text: 'Focus issue detected; session may be unsuccessful or unreliable.',
      triggerAriaLabel: 'Focus status information',
    },
  },
  [ObjectTrackingSessionStatus.NO_ASSOCIATION]: {
    label: 'No Association',
    severity: BadgeState.Error,
    visibility: Visibility.Admin,
    tooltip: {
      header: 'Object Detection Failed',
      text: 'No association with target; detection not possible.',
      triggerAriaLabel: 'No association status information',
    },
  },
  [ObjectTrackingSessionStatus.EMPTY]: {
    label: 'Empty',
    severity: BadgeState.Error,
    visibility: Visibility.Admin,
    tooltip: {
      header: 'Object Detection Failed',
      text: 'Session unsuccessful: no data created.',
      triggerAriaLabel: 'Empty session status information',
    },
  },
  [ObjectTrackingSessionStatus.ASTROMETRY]: {
    label: 'Astrometry',
    severity: BadgeState.Error,
    visibility: Visibility.Admin,
    tooltip: {
      header: 'Object Detection Failed',
      text: 'Session unsuccessful: astrometry error.',
      triggerAriaLabel: 'Astrometry status information',
    },
  },

  // Weather failed (admin only)
  WEATHER_FAILED: {
    label: 'Weather',
    severity: BadgeState.Error,
    visibility: Visibility.Admin,
    tooltip: {
      header: 'Object Detection Failed',
      text: 'Session unsuccessful: weather issue detected.',
      triggerAriaLabel: 'Weather failed status information',
    },
  },

  // Fallback
  OTHER: {
    label: 'Other',
    severity: BadgeState.Idle,
    visibility: Visibility.Admin,
    tooltip: {
      header: 'Object Detection Failed',
      text: 'Session could not be given a valid status - contact Spaceflux for more information',
      triggerAriaLabel: 'Other status information',
    },
  },
} as const;

export function mapStatus(status: string, hasData: boolean) {
  if (status === ObjectTrackingSessionStatus.WEATHER) {
    return hasData ? STATUS_META[status] : STATUS_META.WEATHER_FAILED;
  }
  return STATUS_META[status as keyof typeof STATUS_META] ?? STATUS_META.OTHER;
}
