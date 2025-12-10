import { useAllCampaigns } from '@/hooks/queries/campaignQuery';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Control, UseFormTrigger, useWatch } from 'react-hook-form';
import { SubscriptionTaskFormData } from '../../subscription-task/types';
import { getNoradIdFromTrackMethod } from '../form-preview/sections/utils';
import { NewObjectTrackingFormData } from '../types';

const getActiveTasksParams = (
  subscription: string | undefined,
  trackMethod: NewObjectTrackingFormData['trackMethod'] | undefined
) => {
  if (!subscription || !trackMethod) return;

  return {
    subscription,
    status: 'anyof(Accepted,Active)',
    noradId: getNoradIdFromTrackMethod(trackMethod),
    limit: 1,
    offset: 0,
  };
};

export const useHaveTasksForSubscription = (
  control: Control<SubscriptionTaskFormData>,
  trigger: UseFormTrigger<SubscriptionTaskFormData>,
  setHasActiveTasks: Dispatch<SetStateAction<boolean>>
) => {
  const [subscriptionId, trackMethod] = useWatch({
    control,
    name: ['subscriptionId', 'trackMethod'],
  });
  const { data: activeTasks } = useAllCampaigns(
    getActiveTasksParams(subscriptionId, trackMethod)
  );
  const hasActiveTasks = !!activeTasks?.payload.length;

  useEffect(() => {
    setHasActiveTasks(hasActiveTasks);

    if (trackMethod?.value) trigger('trackMethod');
  }, [subscriptionId, trackMethod, hasActiveTasks]);
};
