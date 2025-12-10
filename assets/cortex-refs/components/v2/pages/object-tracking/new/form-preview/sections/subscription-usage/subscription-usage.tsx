import RectangleProgress from '@/components/components/ui/rectangle-progress';
import { Separator } from '@/components/components/ui/separator';
import { Typography } from '@/components/components/ui/typography';
import { FormSection } from '@/components/v2/pages/object-tracking/common/form/form-section';
import { useGetSubscriptionTimeEstimation } from '@/hooks/queries/subscriptionQuery';
import { getMaxUsageByTier } from '@/utils/v2/adapters/subscription-adapter';
import { SubscriptionType } from 'models/interfaces/v2/subscriptions';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { ObjectTrackingObservationMode } from '../../../../enums';
import { NewObjectTrackingFormData } from '../../../types';
import SubscriptionUsageTable from './subscription-usage-table';
import {
  BORDER_SIDE_OFFSET,
  CIRCLE_COLORS,
  getUsageEstimationParams,
  getUsageHelperText,
  RECT_SIZE,
} from './utils';

const OBJECT_TASK_USAGE = 1;

const SubscriptionUsageSection = () => {
  const { getValues } = useFormContext<NewObjectTrackingFormData>();
  const [
    subscriptionType,
    subscription,
    startEndDates,
    observationMode,
    isSearchMode,
  ] = getValues([
    'subscriptionType',
    'subscription',
    'startEndDates',
    'observationMode',
    'isSearchMode',
  ]);
  const helperText = getUsageHelperText(subscriptionType);

  const { data: estimation } = useGetSubscriptionTimeEstimation(
    getUsageEstimationParams({
      subscriptionType,
      startEndDates,
      observationMode: isSearchMode
        ? ObjectTrackingObservationMode.Search
        : observationMode,
    })
  );

  const usageData = useMemo(() => {
    if (!subscription) return;

    const maxUsage = getMaxUsageByTier(subscription.tier);
    const currentUsage =
      subscriptionType === SubscriptionType.Object
        ? subscription.usage.object.currentActive
        : subscription.usage.time.usedMinutes;

    const timeUsage = estimation?.estimatedUsage || 0;

    const taskUsage =
      subscriptionType === SubscriptionType.Object
        ? OBJECT_TASK_USAGE
        : timeUsage;

    const totalUsage = currentUsage + taskUsage;

    return {
      taskUsage,
      totalUsage,
      maxUsage,
      currentUsage,
    };
  }, [subscriptionType, subscription, estimation]);

  if (!usageData) return null;

  const { currentUsage, maxUsage, taskUsage, totalUsage } = usageData;

  return (
    <FormSection title="Package" className="grid-cols-[auto_1fr] gap-x-2">
      <div className="size-[147px] rounded-lg bg-foreground-subtle">
        <RectangleProgress
          currentValue={currentUsage}
          maxValue={maxUsage}
          backgroundValue={totalUsage}
          colors={CIRCLE_COLORS}
          size={RECT_SIZE}
          sideOffset={BORDER_SIDE_OFFSET}
        >
          <div className="flex flex-col gap-1 text-foreground items-center">
            <Typography variant="heading-md">{currentUsage}</Typography>
            <Separator className="bg-background w-16!" />
            <Typography variant="heading-md">{maxUsage}</Typography>
          </div>
        </RectangleProgress>
      </div>

      <SubscriptionUsageTable
        limit={maxUsage}
        taskUsage={taskUsage}
        totalUsage={totalUsage}
        type={subscriptionType}
      />

      <Typography variant="body-sm" className="col-span-2">
        {helperText}
      </Typography>
    </FormSection>
  );
};

export default SubscriptionUsageSection;
