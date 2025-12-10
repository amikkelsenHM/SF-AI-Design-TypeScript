import { getCampaignById } from '@/api/campaigns';
import { NotificationBannerConfig } from '@/components/v2/notification-banner/notification-banner';
import { useMyFullName } from '@/hooks/queries/accountQuery';
import {
  OT_BANNER_CONFIG_SESSION_KEY,
  OT_SESSION_KEY,
} from '@/hooks/useLiftList';
import { AxiosResponse } from 'axios';
import { SubscriptionType } from 'models/interfaces/v2/subscriptions';
import { ApiResponse } from 'models/types/common';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { campaignAdapter } from '../adapters/campaign-adapter';
import { ManageTasksTabLabels } from '../enums';
import { CampaignResponse, ObjectTrackingView } from '../types';

const TAB_PARAMS_MAP: Record<SubscriptionType, string> = {
  [SubscriptionType.Object]: ManageTasksTabLabels.OBJECT.toLowerCase(),
  [SubscriptionType.Time]: ManageTasksTabLabels.TIME.toLowerCase(),
};

export const useHandleTaskCreation = () => {
  const router = useRouter();
  const { fullName } = useMyFullName();

  const onSuccess = useCallback(
    async (
      response: AxiosResponse<ApiResponse<CampaignResponse>>,
      {
        subscriptionType,
      }: {
        subscriptionType: SubscriptionType;
      }
    ) => {
      const campaignResponse = response.data.payload;
      let task: ObjectTrackingView | null = null;

      const bannerConfig: NotificationBannerConfig = {
        variant: 'success',
        text: 'Task accepted',
        redirectionLinkText: 'View your tasks now.',
        url: `/object-tracking/${campaignResponse.noradId}?taskId=${campaignResponse.id}`,
      };

      try {
        // TODO: the 'response' doesn't contain all needed fields for displaying the data in the table row
        // for this reason we need to make additional request to get the newly created task with all fields
        const newCampaign = await getCampaignById(campaignResponse.id);

        task = { ...newCampaign, createdBy: fullName };
      } catch (error) {
        // if there is an error fetching the new task, use the response as fallback
        task = {
          ...campaignAdapter(campaignResponse),
          createdBy: fullName,
        };
      } finally {
        sessionStorage.setItem(OT_SESSION_KEY, JSON.stringify(task));
        sessionStorage.setItem(
          OT_BANNER_CONFIG_SESSION_KEY,
          JSON.stringify(bannerConfig)
        );
        router.push(
          `/object-tracking/manage?tab=${TAB_PARAMS_MAP[subscriptionType]}`
        );
      }
    },
    [router]
  );

  return onSuccess;
};
