'use client';

import { useGetAllOrganisations } from '@/hooks/queries/accountQuery';
import { useUpdateSubscription } from '@/hooks/queries/mutations/useUpdateSubscription';
import {
  useGetActiveSubscriptions,
  useGetAllSubscriptionTiers,
  useGetSubscriptionById,
} from '@/hooks/queries/subscriptionQuery';
import {
  SubscriptionFormData,
  SubscriptionFormPage,
} from './package-form-page';

const EditPackagePage = ({ id }: { id: string }) => {
  const { data: subscription } = useGetSubscriptionById(id);
  const { data: tiersRes = [] } = useGetAllSubscriptionTiers();
  const { data: orgsRes = [] } = useGetAllOrganisations();
  const { data: activeSubscriptions = [] } = useGetActiveSubscriptions();

  const { mutateAsync: updateSub } = useUpdateSubscription(id);

  if (!subscription) {
    return null;
  }

  const tiers = tiersRes.map((t) => ({
    id: t.id,
    name: t.name,
    limitType: t.limitType,
  }));

  const organisations = orgsRes.map(({ id, name }) => ({ id, name }));

  const activeWithoutCurrent = activeSubscriptions.filter(
    (s) => s.id !== subscription.id
  );

  const initialValues: Partial<SubscriptionFormData> = {
    limitType: subscription.tier.limitType,
    subscriptionTier: subscription.tier.id,
    organisation: subscription.organization.id,
    startEndDates: {
      from: new Date(subscription.start),
      to: new Date(subscription.end),
    },
  };

  const handleSubmit = async (data: SubscriptionFormData) => {
    if (!data.startEndDates?.from || !data.startEndDates?.to) return;

    await updateSub({
      start: data.startEndDates.from.toISOString(),
      end: data.startEndDates.to.toISOString(),
    });
  };
  return (
    <SubscriptionFormPage
      title="Edit Package"
      description="Edit an existing package"
      submitLabel={'Save changes'}
      backTo="/settings?tab=packages"
      onSubmit={handleSubmit}
      tiers={tiers}
      organisations={organisations}
      activeSubscriptions={activeWithoutCurrent}
      initialValues={initialValues}
      showEditSuccessMessage
    />
  );
};

export default EditPackagePage;
