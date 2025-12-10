import { ControlledSelectField } from '@/components/v2/select/controlled-select-field';
import { IOrganisation } from 'models/interfaces/v2/organisations';
import { ChangeEvent, memo, useCallback, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { NewObjectTrackingFormData } from '../../types';
import { AUTO_SELECT_NETWORKS_COUNT, parseSelectOptions } from './utils';

interface OrganisationSelectProps {
  data: IOrganisation[] | undefined;
}

const OrganisationSelect = ({ data }: OrganisationSelectProps) => {
  const { control, setValue } = useFormContext<NewObjectTrackingFormData>();

  const organisationOptions = useMemo(() => parseSelectOptions(data), [data]);

  const handleOrganisationChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      const selectedOrganisation = data?.find(({ id }) => id === value);
      const networks = selectedOrganisation?.networks || [];
      const networkIds =
        networks.length === AUTO_SELECT_NETWORKS_COUNT ? [networks[0].id] : [];

      setValue('networkIds', networkIds);
      setValue('subscription', null);
      setValue('subscriptionId', '');
    },
    [data, setValue]
  );

  return (
    <ControlledSelectField
      required
      control={control}
      name="organizationID"
      label="Organisation"
      placeholder="Select an organisation"
      options={organisationOptions}
      fluid
      labelClassName="typography-body-sm text-foreground"
      size="l"
      rules={{ onChange: handleOrganisationChange }}
    />
  );
};

export default memo(OrganisationSelect);
