import {
  GetSubscriptionTimeEstimationParams,
  SubscriptionType,
} from 'models/interfaces/v2/subscriptions';
import { PickerDateRange } from 'models/types/common';
import { COLORS } from 'styles/colors';
import { ObjectTrackingObservationMode } from '../../../../enums';
import { UsageRowIds } from './columns';

export const CIRCLE_COLORS = {
  foreground: COLORS.HAN_BLUE,
  background: COLORS.BORDER_LIGHT,
  max: COLORS.BORDER_PROGRESS,
};
export const RECT_SIZE = 147;
export const BORDER_SIDE_OFFSET = 3;

const SUBSCRIPTION_TYPE_SUFFIXES: Record<SubscriptionType, string> = {
  [SubscriptionType.Time]: 'mins',
  [SubscriptionType.Object]: 'object',
};

const USAGE_FRACTION_DIGITS = 1;

export const formatUsageValue = (type: SubscriptionType, value: number) => {
  const suffix = SUBSCRIPTION_TYPE_SUFFIXES[type];

  const formatted = Number(value.toFixed(USAGE_FRACTION_DIGITS));

  return `${formatted} ${suffix}`;
};

const USAGE_LABELS_MAP: Record<
  UsageRowIds,
  (type: SubscriptionType) => string
> = {
  [UsageRowIds.PLAN]: () => 'Plan',
  [UsageRowIds.THIS_TASK]: (type) =>
    type === SubscriptionType.Object ? 'This Task' : 'Task Estimate',
  [UsageRowIds.REMAINING]: (type) => {
    const typePart =
      type === SubscriptionType.Object ? type : `Estimated ${type}`;

    return `${typePart} Remaining`;
  },
};

export const formatUsageLabels = (row: UsageRowIds, type: SubscriptionType) => {
  const getLabel = USAGE_LABELS_MAP[row];

  return getLabel(type);
};

export const getUsageHelperText = (type: SubscriptionType) => {
  const commonText =
    'If you wish to make changes to your package, please contact your sales manager.';

  return type === SubscriptionType.Object
    ? commonText
    : `We estimate the total time that will be used for the whole duration of the task, including slew time, track length and overheads, assuming an estimate of typical revisit rate for this type of object. ${commonText}`;
};

const DEFAULT_ESTIMATION_LIMIT = 20;
const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

const getDuration = (
  startEndDates: PickerDateRange | undefined,
  mode: ObjectTrackingObservationMode
) => {
  if (!startEndDates || !startEndDates.from || !startEndDates.to) return 0;

  const fromMs = startEndDates.from.getTime();
  const toMs = startEndDates.to.getTime();
  const differenceMs = toMs - fromMs;

  const differenceDays = differenceMs / MILLISECONDS_PER_DAY;

  if (
    mode === ObjectTrackingObservationMode.Search ||
    mode === ObjectTrackingObservationMode.Stare
  )
    return differenceDays;

  return Math.ceil(differenceDays);
};

export const getUsageEstimationParams = ({
  subscriptionType,
  observationMode,
  startEndDates,
}: {
  subscriptionType: SubscriptionType;
  observationMode: ObjectTrackingObservationMode;
  startEndDates: PickerDateRange;
}): GetSubscriptionTimeEstimationParams | undefined => {
  if (subscriptionType === SubscriptionType.Object) return;

  return {
    limit: DEFAULT_ESTIMATION_LIMIT,
    observation_mode: observationMode,
    campaign_duration_days: getDuration(startEndDates, observationMode),
  };
};
