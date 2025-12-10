'use client';

import { useGetAllOrganisations } from '@/hooks/queries/accountQuery';
import { useCreateSubscription } from '@/hooks/queries/mutations/useCreateSubscription';
import {
  useGetActiveSubscriptions,
  useGetAllSubscriptionTiers,
} from '@/hooks/queries/subscriptionQuery';
import { PickerDateRange } from 'models/types/common';
import { SubscriptionFormPage } from '../../package/package-form-page';

interface SubscriptionFormData {
  limitType: string;
  subscriptionTier: string;
  organisation: string;
  startEndDates: PickerDateRange;
}

const SubscriptionPage = () => {
  const { data: tiersRes = [] } = useGetAllSubscriptionTiers();
  const { data: orgsRes = [] } = useGetAllOrganisations();
  const { data: activeSubscriptions = [] } = useGetActiveSubscriptions();
  const { mutateAsync: createSub, isPending } = useCreateSubscription();

  const tiers = tiersRes.map((t) => ({
    id: t.id,
    name: t.name,
    limitType: t.limitType,
  }));

  const organisations = orgsRes.map(({ id, name }) => ({ id, name }));

  const handleSubmit = async (data: SubscriptionFormData) => {
    if (!data.startEndDates?.from || !data.startEndDates?.to) return;

    await createSub({
      organizationID: data.organisation,
      tierID: data.subscriptionTier,
      start: data.startEndDates.from.toISOString(),
      end: data.startEndDates.to.toISOString(),
    });
  };

  return (
    <SubscriptionFormPage
      title="New Package"
      description="Create a new package for an organisation"
      submitLabel={isPending ? 'Saving...' : 'Save'}
      backTo="/settings?tab=packages"
      onSubmit={handleSubmit}
      tiers={tiers}
      organisations={organisations}
      activeSubscriptions={activeSubscriptions}
      shouldResetOnSubmit
      showCreatedMessage
    />
  );
};

export default SubscriptionPage;
