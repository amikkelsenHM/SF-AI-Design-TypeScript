import { useFeatureFlag } from '@/hooks/useFeatureFlag';
import { hasSubscriptionFeatureAccess } from '@/utils/v2/permissions';
import { ClientFeatureFlags } from 'lib/config/feature-flag-config';
import { SubscriptionFeatures } from 'models/interfaces/v2/subscriptions';
import { useCallback } from 'react';
import { Control, useWatch } from 'react-hook-form';
import { NewObjectTrackingFormData } from '../types';

export const useFormFieldAccess = (
  control: Control<NewObjectTrackingFormData>
) => {
  const subscription = useWatch({
    control,
    name: 'subscription',
  });
  const { isAdmin, isManager } = control._options.context;

  const isPackageTaskEnabled = useFeatureFlag(
    ClientFeatureFlags.PACKAGE_TASK,
    true
  );

  const hasOptionAccess = useCallback(
    (option: {
      subscriptionFeature: SubscriptionFeatures | false;
      hasRoleAccess?: (isAdmin: boolean, isManager: boolean) => boolean;
    }) => {
      const hasRoleAccess = option.hasRoleAccess?.(isAdmin, isManager) ?? true;
      if (!isPackageTaskEnabled) return hasRoleAccess;

      const hasSubscriptionAccess =
        !option.subscriptionFeature ||
        hasSubscriptionFeatureAccess(subscription, option.subscriptionFeature);

      return hasSubscriptionAccess && hasRoleAccess;
    },
    [subscription, isAdmin, isManager, isPackageTaskEnabled]
  );

  return hasOptionAccess;
};
