import { TableState } from '@tanstack/react-table';
import { SubscriptionType } from 'models/interfaces/v2/subscriptions';
import { ObjectTrackingStatus } from '../enums';

export const OBJECT_TRACKING_DETAIL_CONSTANTS = {
  DESCRIPTION: 'Review performance and results',
  STATUS_BADGE: 'Available',
  SECTIONS: {
    SUMMARY: 'Summary',
    SESSIONS: 'Sessions',
    TASKS: 'Tasks',
  },
} as const;

const TRACK_DETAILS_INITIAL_STATE: Partial<TableState> = {
  expanded: { 0: true },
  sorting: [{ id: 'createdAt', desc: true }],
  pagination: {
    pageSize: 10,
    pageIndex: 0,
  },
};

export const TABLE_CONFIGS = {
  OBJECT_DETAIL: {
    enableFiltering: false,
    enableGlobalFilter: false,
    enableSorting: false,
    enablePagination: false,
    variant: 'rounded' as const,
    hasRowBorder: false,
  },
  TASK_DETAIL: {
    enableFiltering: false,
    enableGlobalFilter: false,
    enableSorting: false,
    enablePagination: false,
    variant: 'square' as const,
    hasRowBorder: false,
    hideHeader: true,
    containerClassName: 'bg-transparent',
  },
  SESSIONS: {
    tableKey: 'sessions',
    enableFiltering: true,
    enableGlobalFilter: true,
    enableSorting: true,
    enablePagination: true,
    variant: 'rounded' as const,
    emptyMessage: 'No sessions available',
  },
  TASKS: {
    tableKey: 'tasks',
    showRowCursor: true,
    enableSorting: true,
    enableExpanding: true,
    singleExpansion: true,
    enablePagination: true,
    manualControl: true,
    initialState: TRACK_DETAILS_INITIAL_STATE,
    variant: 'rounded' as const,
  },
  MANAGE: {
    enableFiltering: true,
    enableGlobalFilter: true,
    enableSorting: true,
    enablePagination: true,
    enableExpanding: true,
    singleExpansion: true,
    manualControl: true,
    variant: 'square' as const,
  },
} as const;

export enum DurationValueKey {
  DAY = 'day',
  DAYS_3 = '3days',
  DAYS_5 = '5days',
  WEEK = 'week',
  WEEKS_2 = '2weeks',
  MONTH = 'month',
}

export const DURATION_OPTIONS = [
  { label: '+ 1 day', value: DurationValueKey.DAY },
  { label: '+ 3 days', value: DurationValueKey.DAYS_3 },
  { label: '+ 5 days', value: DurationValueKey.DAYS_5 },
  { label: '+ 1 week', value: DurationValueKey.WEEK },
  { label: '+ 2 weeks', value: DurationValueKey.WEEKS_2 },
  { label: '+ 1 month', value: DurationValueKey.MONTH },
];

export enum DialogType {
  NONE = 'none',
  ARCHIVE = 'archive',
  EXTEND = 'extend',
  REMOVE = 'remove',
}

const formatNameTitle = (name: string | undefined) => (name ? `: ${name}` : '');

export const DIALOG_CONFIGS = {
  [DialogType.REMOVE]: {
    title: (name: string | undefined) => `Remove ${formatNameTitle(name)}`,
    description:
      'Are you sure you want to remove this object from your package?',
    primaryButtonText: 'No',
    secondaryButtonText: 'Yes',
    variant: 'warning' as const,
    hasCustomContent: false,
  },
  [DialogType.ARCHIVE]: {
    title: (name: string | undefined) => `Archive Task${formatNameTitle(name)}`,
    description: 'Are you sure you want to archive this task?',
    primaryButtonText: 'No',
    secondaryButtonText: 'Yes',
    variant: 'warning' as const,
    hasCustomContent: false,
  },
  [DialogType.EXTEND]: {
    title: (name: string | undefined) => `Extend Task${formatNameTitle(name)}`,
    description: 'How much would you like to extend your track by?',
    primaryButtonText: 'Cancel',
    secondaryButtonText: 'Yes',
    variant: 'warning' as const,
    hasCustomContent: true,
  },
} as const;

export const HEADER_ACTIONS_CONFIG = [
  {
    id: 'manage',
    label: 'Manage Tasks',
    variant: 'tertiary',
    href: '/object-tracking/manage',
    visibleWhen: (pathname: string) => !pathname?.includes('manage'),
  },
  {
    id: 'subscription',
    variant: 'secondary',
    type: SubscriptionType.Object,
  },
  {
    id: 'custom',
    variant: 'secondary',
    type: SubscriptionType.Time,
  },
] as const;

export const QUERY_CONSTANTS = {
  TASKS_OFFSET: 0,
  TASKS_LIMIT: 100,
  DEFAULT_TIME_ELAPSED: '0',
  SUCCESS_RESULT: 'Success',
} as const;

export const TASK_FILTER_CONSTANTS = {
  DAYS_LOOKBACK: 7,
  VALID_STATUSES: [
    ObjectTrackingStatus.ACTIVE,
    ObjectTrackingStatus.ACCEPTED,
    ObjectTrackingStatus.COMPLETED,
  ] as ObjectTrackingStatus[],
} as const;

export const KPI_CONFIG = {
  SESSION_COUNT: {
    title: 'Total Sessions',
    footnote: 'Completed',
  },
  FOV_TOTAL: {
    title: 'Last 7 Days',
    footnote: 'Session',
  },
  NEXT_OBS: {
    title: 'Next Observable',
    footnote: 'Mins',
  },
  LAST_OBS: {
    title: 'Last Observed',
    footnote: 'Mins',
  },
} as const;

export const OBSERVATION_LABELS = {
  NEXT: { NOW: 'Now' },
  LAST: { NEVER: 'Never', SUFFIX: ' ago' },
} as const;

export const UNCORRELATED_OBJECT_CONFIG = {
  NAME: 'Object Uncorrelated',
  FALLBACK_VALUE: 'Unknown',
};

export const DEFAULT_VALUES = {
  NORAD_ID: 0,
  FIRST_TASK_INDEX: 0,
} as const;
