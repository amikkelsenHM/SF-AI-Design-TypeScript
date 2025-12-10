import { SelectOption } from '@/components/components/ui/select/utils';
import { differenceInDays, format, formatDistanceToNowStrict } from 'date-fns';
import { createDateDaysAgo, FORMAT_DISTANCE_LOCALE } from 'helpers/v2/dates';
import { DateFormat } from 'models/enums/v2/common';
import { SubscriptionType } from 'models/interfaces/v2/subscriptions';
import { DateRange } from 'react-day-picker';
import { createEnumFilterOptions } from '../../table/filters/filter-util';
import { ObservationPrediction } from './adapters/observation-prediction-adapter';
import {
  KPI_CONFIG,
  OBSERVATION_LABELS,
  QUERY_CONSTANTS,
  TASK_FILTER_CONSTANTS,
  UNCORRELATED_OBJECT_CONFIG,
} from './constants/object-tracking-detail';
import {
  ObjectTrackingOrbitalRegime,
  ObjectTrackingSessionStatus,
  ObjectTrackingStatus,
  ObjectTrackingTargetMode,
  ObjectTrackingType,
  TrackStatus,
} from './enums';
import { TrackDetailItem } from './mock-data/object-tracking-detail-mock-data';
import { ObjectTrackingView, TaskDetailsRowIds, Track } from './types';

const EXCLUDED_WORDS = ['about'];
const PLURAL_SUFFIX = 's';

const UNIT_LABEL_MAP: Record<string, string> = {
  hrs: 'hours',
  hr: 'hour',
  mins: 'minutes',
  min: 'minute',
  secs: 'seconds',
  sec: 'second',
  yrs: 'years',
  yr: 'year',
  mos: 'months',
  mo: 'month',
  wks: 'weeks',
  wk: 'week',
};

const DATE_RANGE_ERROR_MESSAGE = 'greater than 10 days';
const DATE_RANGE_FALLBACK = { number: '10+', unit: 'days' } as const;

export const isDateRangeError = (error: unknown): boolean => {
  try {
    const errorObj = error as any;
    return (
      errorObj?.response?.status === 400 &&
      errorObj?.response?.data?.detail?.includes(DATE_RANGE_ERROR_MESSAGE)
    );
  } catch {
    return false;
  }
};

const isObservingNow = (
  observationStartTime: Date | undefined,
  observationEndTime: Date | undefined
) => {
  if (!observationStartTime || !observationEndTime) return false;

  const now = new Date();

  return observationStartTime <= now && now <= observationEndTime;
};

type ObservationKpiData = { number?: string; unit?: string } | string;

export const getNextObservationData = (
  nextObservation: ObservationPrediction[] | undefined,
  error: unknown
): ObservationKpiData => {
  if (isDateRangeError(error)) {
    return DATE_RANGE_FALLBACK;
  }

  const observingNowPrediction = nextObservation?.find((observation) =>
    isObservingNow(observation.startTime, observation.endTime)
  );

  if (observingNowPrediction) return OBSERVATION_LABELS.NEXT.NOW;

  return splitObservationToNumberAndUnit(
    nextObservation?.[0]?.formattedDistanceStrict || ''
  );
};

export const getLastObservationData = (latestTrack: Track | undefined) => {
  if (!latestTrack?.startTime) return OBSERVATION_LABELS.LAST.NEVER;

  const lastObservation = formatDistanceToNowStrict(latestTrack.startTime, {
    locale: FORMAT_DISTANCE_LOCALE,
  });

  return splitObservationToNumberAndUnit(lastObservation);
};

const PREDICTION_MESSAGE_MINUTES_LIMIT = 5;
const MILLISECONDS_PER_MINUTE = 60 * 1000;

export const getObservationPredictionMessage = (
  closestObservation: ObservationPrediction | undefined,
  telescopeName: string | undefined,
  error: unknown
): string => {
  if (isDateRangeError(error)) {
    return 'The date range specified is greater than 10 days.';
  }

  if (!closestObservation || !telescopeName)
    return 'Not currently able to estimate next likely pass, but task will be scheduled as normal';

  const distanceMs = closestObservation.startTime.getTime() - Date.now();
  const distanceMins = distanceMs / MILLISECONDS_PER_MINUTE;

  const distanceMessage =
    distanceMins <= PREDICTION_MESSAGE_MINUTES_LIMIT
      ? `within the next ${PREDICTION_MESSAGE_MINUTES_LIMIT} minutes`
      : `in ${closestObservation.formattedDistance}`;

  return `We currently estimate that the next observation will be ${distanceMessage} by ${telescopeName}`;
};

export const getTrackDurationValue = (value: DateRange | undefined) => {
  if (!value || !value.from || !value.to) return '';

  const startDate = new Date(value.from);
  const endDate = new Date(value.to);
  const duration = differenceInDays(endDate, startDate);

  const formattedRange = `${format(
    startDate,
    DateFormat.DateSlashShort
  )} - ${format(endDate, DateFormat.DateSlashShort)}`;

  return `${duration} days (${formattedRange})`;
};

export const createObjectTrackingStatusOptions = (): SelectOption[] =>
  createEnumFilterOptions(ObjectTrackingStatus, false, (value) =>
    value === ObjectTrackingStatus.CANCELLED ? 'Archived' : value
  );

export const createObjectTrackingSessionStatusOptions = (): SelectOption[] =>
  createEnumFilterOptions(ObjectTrackingSessionStatus);

export const createObjectTrackingTypeOptions = (): SelectOption[] =>
  createEnumFilterOptions(ObjectTrackingType);

export const createOrbitalRegimeOptions = (): SelectOption[] =>
  createEnumFilterOptions(ObjectTrackingOrbitalRegime);

export const createTrackStatusOptions = (): SelectOption[] => [
  { label: TrackStatus.Tracked, value: 'true' },
  { label: TrackStatus.NotTracked, value: 'false' },
];

const getFormattedLaunchDate = (launchDate: string | undefined) => {
  if (!launchDate) return UNCORRELATED_OBJECT_CONFIG.FALLBACK_VALUE;

  const distance = formatDistanceToNowStrict(launchDate, { addSuffix: true });
  return `${launchDate} (${distance})`;
};

const formatObjectDetailsValue = (value: unknown) =>
  value || UNCORRELATED_OBJECT_CONFIG.FALLBACK_VALUE;

export const getObjectDetailsData = (
  noradId: number | undefined,
  objectName: string | undefined,
  type: string | undefined,
  country: string | undefined,
  orbit: string | undefined,
  launchDate: string | undefined,
  timeElapsed?: string | undefined
) => [
  {
    id: 'norad-id',
    label: 'Norad ID',
    value: formatObjectDetailsValue(noradId?.toString()),
  },
  {
    id: 'object-type',
    label: 'Object Type',
    value: formatObjectDetailsValue(type),
  },
  {
    id: 'object-name',
    label: 'Object Name',
    value: formatObjectDetailsValue(objectName),
  },
  {
    id: 'origin',
    label: 'Origin',
    value: formatObjectDetailsValue(country),
  },
  {
    id: 'orbit',
    label: 'Orbit',
    value: formatObjectDetailsValue(orbit),
  },
  ...(timeElapsed
    ? [
        {
          id: 'duration',
          label: 'Tasking Lifetime',
          value: formatObjectDetailsValue(timeElapsed),
        },
      ]
    : []),
  {
    id: 'launch-date',
    label: 'Launch date (UTC)',
    value: getFormattedLaunchDate(launchDate),
  },
];

export const getTimeElapsed = (
  startEndDates: { start: string; end: string } | undefined
) => {
  if (!startEndDates || !startEndDates?.start || !startEndDates?.end) {
    return;
  }

  const days = differenceInDays(
    new Date(startEndDates.end),
    new Date(startEndDates.start)
  );

  return `${days} days`;
};

const wordUpperLowerFormat = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

const formatObservationKpiContent = (
  observation: ObservationKpiData,
  type: 'next' | 'last'
) =>
  typeof observation === 'string'
    ? { content: observation, footnote: '' }
    : {
        content: observation?.number || QUERY_CONSTANTS.DEFAULT_TIME_ELAPSED,
        footnote: `${wordUpperLowerFormat(observation?.unit || '')}${
          type === 'last' ? OBSERVATION_LABELS.LAST.SUFFIX : ''
        }`,
      };

export const leftKpiDataConfig = (
  lastObservation: ObservationKpiData,
  nextObservation: ObservationKpiData,
  isLoadingNextObservation: boolean
) => [
  {
    title: KPI_CONFIG.LAST_OBS.title,
    ...formatObservationKpiContent(lastObservation, 'last'),
  },
  {
    ...formatObservationKpiContent(nextObservation, 'next'),
    title: KPI_CONFIG.NEXT_OBS.title,
    isLoading: isLoadingNextObservation,
  },
];

export const rightKpiDataConfig = (
  successfulSessions: string,
  sessionsLastWeek: string,
  isLoadingSessionCounts: boolean
) => {
  const sessionsLastWeekFootnote =
    parseInt(sessionsLastWeek, 10) === 1
      ? KPI_CONFIG.FOV_TOTAL.footnote
      : KPI_CONFIG.FOV_TOTAL.footnote + PLURAL_SUFFIX;

  return [
    {
      title: KPI_CONFIG.SESSION_COUNT.title,
      content: successfulSessions,
      footnote: KPI_CONFIG.SESSION_COUNT.footnote,
      isLoading: isLoadingSessionCounts,
    },
    {
      title: KPI_CONFIG.FOV_TOTAL.title,
      content: sessionsLastWeek,
      footnote: sessionsLastWeekFootnote,
      isLoading: isLoadingSessionCounts,
    },
  ];
};

export const convertToDateRange = (startEndDates?: {
  from: string;
  to: string;
}): DateRange | null | undefined => {
  if (!startEndDates) return null;

  return {
    from: new Date(startEndDates.from),
    to: new Date(startEndDates.to),
  };
};

const TARGET_MODE_FORMATTERS = {
  [ObjectTrackingTargetMode.TLE]: () =>
    ObjectTrackingTargetMode.TLE.toUpperCase(),
  [ObjectTrackingTargetMode.NoradID]: () => 'Norad ID',
  [ObjectTrackingTargetMode.Coordinates]: () => '',
};

export const formatFeaturesValue = ({
  deliverAllInFoV,
  faintObjectDetection,
  isDataExclusive,
  isCalibration,
  isSearchMode,
}: {
  deliverAllInFoV: boolean;
  faintObjectDetection: boolean;
  isDataExclusive: boolean;
  isCalibration: boolean;
  isSearchMode?: boolean;
}) => {
  return [
    deliverAllInFoV && 'All-in-view measurements',
    faintObjectDetection && 'Faint object detection',
    isDataExclusive && 'Exclusive data',
    isCalibration && 'Calibration',
    isSearchMode && 'Search',
  ]
    .filter(Boolean)
    .join(', ');
};

export const formatOptionalValue = (
  value: unknown,
  options: { unit?: string; condition?: boolean; fallback?: string } = {}
): string => {
  const { unit, condition = true, fallback = '' } = options;

  if (!condition) return fallback;
  if (value == null) return fallback;

  return unit ? `${value} ${unit}` : (value as string);
};

export const buildTaskDetailsData = (
  {
    id,
    targetMode,
    targetName,
    latestTrack,
    networks,
    organizationName,
    tle,
    deliverAllInFoV,
    faintObjectDetection,
    isDataExclusive,
    isCalibration,
    trackLength,
    noradId,
    status,
    target,
  }: ObjectTrackingView,
  dateRangeTaskDuration: DateRange
): TrackDetailItem[] => [
  {
    id: TaskDetailsRowIds.TaskId,
    label: 'Task ID',
    value: id,
    meta: { noradId, status },
  },
  {
    id: TaskDetailsRowIds.ObjectName,
    label: 'Object Name',
    value: targetName || UNCORRELATED_OBJECT_CONFIG.NAME,
    meta: { noradId },
  },
  {
    id: TaskDetailsRowIds.TargetingType,
    label: 'Targeting Type',
    value: TARGET_MODE_FORMATTERS[targetMode](),
  },
  {
    id: TaskDetailsRowIds.TleValue,
    label: 'TLE Value',
    value: tle || target?.tle || '-',
  },
  {
    id: TaskDetailsRowIds.TrackLength,
    label: 'Track Length',
    value: formatOptionalValue(trackLength, { unit: 'seconds', fallback: '-' }),
  },
  {
    id: TaskDetailsRowIds.TrackDuration,
    label: 'Task Duration',
    value: getTrackDurationValue(dateRangeTaskDuration),
  },
  {
    id: TaskDetailsRowIds.LastObservation,
    label: 'Last Observation',
    value: latestTrack?.startTime
      ? formatDistanceToNowStrict(latestTrack.startTime, {
          locale: FORMAT_DISTANCE_LOCALE,
        })
      : '-',
  },
  {
    id: TaskDetailsRowIds.Features,
    label: 'Features',
    value: formatFeaturesValue({
      deliverAllInFoV,
      faintObjectDetection,
      isDataExclusive,
      isCalibration,
    }),
  },
  {
    id: TaskDetailsRowIds.Network,
    label: 'Networks',
    value: networks.map(({ name }) => name).join(', '),
  },
  {
    id: TaskDetailsRowIds.Organization,
    label: 'Organization',
    value: organizationName,
  },
];

export const splitObservationToNumberAndUnit = (observation: string) => {
  if (!observation?.trim()) {
    return { number: undefined, unit: undefined };
  }

  const splittedValue = observation.trim().split(' ').filter(Boolean);

  const filteredValue = EXCLUDED_WORDS.includes(splittedValue[0]?.toLowerCase())
    ? splittedValue.slice(1)
    : splittedValue;

  const unit = filteredValue[1] || undefined;
  const mappedUnit = unit ? UNIT_LABEL_MAP[unit] || unit : undefined;

  return {
    number: filteredValue[0] || undefined,
    unit: mappedUnit,
  };
};

export const isTaskUpdatedWithinDays = (
  updatedAt: string,
  days: number
): boolean => {
  const updatedDate = new Date(updatedAt);
  const cutoffDate = createDateDaysAgo(days);
  return updatedDate >= cutoffDate;
};

export const filterRecentValidTasks = (
  tasks: ObjectTrackingView[]
): ObjectTrackingView[] => {
  return tasks.filter(({ status, updatedAt }) => {
    const hasValidStatus =
      TASK_FILTER_CONSTANTS.VALID_STATUSES.includes(status);
    const isRecentlyUpdated = isTaskUpdatedWithinDays(
      updatedAt,
      TASK_FILTER_CONSTANTS.DAYS_LOOKBACK
    );

    return hasValidStatus || isRecentlyUpdated;
  });
};

export const getTaskTypeValue = (value: string | null | undefined) =>
  value === SubscriptionType.Object
    ? ObjectTrackingType.SUBSCRIPTION
    : ObjectTrackingType.CUSTOM;
