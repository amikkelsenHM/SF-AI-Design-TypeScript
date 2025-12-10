import { FormSection } from '@/components/v2/pages/object-tracking/common/form/form-section';
import { useFeatureFlag } from '@/hooks/useFeatureFlag';
import { useGetAllOrganisations } from 'hooks/queries/accountQuery';
import { ClientFeatureFlags } from 'lib/config/feature-flag-config';
import { SubscriptionType } from 'models/interfaces/v2/subscriptions';
import { usePermission } from 'providers/permission-provider';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { NewObjectTrackingFormData } from '../../types';
import NetworksSelect from './networks-select';
import OrganisationSelect from './organisation-select';
import SubscriptionsSelect from './subscriptions-select';

const NetworkOrganisationSection = () => {
  const { setValue, getValues } = useFormContext<NewObjectTrackingFormData>();
  const subscriptionType = getValues('subscriptionType');
  const { data } = useGetAllOrganisations();

  const isPackageTaskEnabled = useFeatureFlag(
    ClientFeatureFlags.PACKAGE_TASK,
    true
  );

  const { isAdmin, getMySubscription } = usePermission();
  const subscription = getMySubscription(subscriptionType);

  useEffect(() => {
    if (!subscription) return;

    if (!isAdmin) {
      setValue('organizationID', subscription.organization.id);
      setValue(
        'networkIds',
        subscription.organization.networks.map(({ id }) => id)
      );
      setValue('subscriptionId', subscription.id);
      setValue('subscription', subscription);
    }

    if (subscriptionType === SubscriptionType.Object)
      setValue('startEndDates', {
        from: new Date(subscription.start),
        to: new Date(subscription.end),
      });
  }, [isAdmin, subscription, subscriptionType]);

  if (!isAdmin && isPackageTaskEnabled) return null;

  return (
    <FormSection title="Organisation & Network" gridCols={2}>
      <OrganisationSelect data={data} />

      {isPackageTaskEnabled && <SubscriptionsSelect />}

      {subscriptionType === SubscriptionType.Time && (
        <NetworksSelect data={data} />
      )}
    </FormSection>
  );
};

export default NetworkOrganisationSection;
