import { ControlledSelectField } from '@/components/v2/select/controlled-select-field';
import { useGetActiveSubscriptions } from '@/hooks/queries/subscriptionQuery';
import { ChangeEvent, memo, useCallback, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { NewObjectTrackingFormData } from '../../types';

const SubscriptionsSelect = () => {
  const { control, setValue, getValues } =
    useFormContext<NewObjectTrackingFormData>();
  const organisationId = useWatch({ control, name: 'organizationID' });
  const subscriptionType = getValues('subscriptionType');
  const { data = [] } = useGetActiveSubscriptions();

  const subscriptionOptions = useMemo(() => {
    const subs = data.filter(
      ({ organization, tier }) =>
        organization?.id === organisationId &&
        tier.limitType === subscriptionType
    );

    return subs.map(({ id, tier }) => ({ label: tier.name, value: id }));
  }, [data, organisationId, subscriptionType]);

  const handleSubscriptionChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      const sub = data.find(({ id }) => id === value);

      if (sub) setValue('subscription', sub);
    },
    [data, setValue]
  );

  return (
    <ControlledSelectField
      control={control}
      name="subscriptionId"
      label="Package"
      placeholder="Select a package"
      options={subscriptionOptions}
      fluid
      labelClassName="typography-body-sm text-foreground"
      size="l"
      isLoading={!organisationId}
      rules={{ onChange: handleSubscriptionChange }}
    />
  );
};

export default memo(SubscriptionsSelect);
