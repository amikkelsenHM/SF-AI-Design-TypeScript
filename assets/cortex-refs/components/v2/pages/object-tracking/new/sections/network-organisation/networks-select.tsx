import { ControlledSelectField } from '@/components/v2/select/controlled-select-field';
import { IOrganisation } from 'models/interfaces/v2/organisations';
import { memo, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { NewObjectTrackingFormData } from '../../types';
import { AUTO_SELECT_NETWORKS_COUNT, parseSelectOptions } from './utils';

interface NetworksSelectProps {
  data: IOrganisation[] | undefined;
}

const NetworksSelect = ({ data }: NetworksSelectProps) => {
  const { control } = useFormContext<NewObjectTrackingFormData>();
  const organisationId = useWatch({ control, name: 'organizationID' });

  const networkOptions = useMemo(() => {
    const selectedOrganization = data?.find(({ id }) => id === organisationId);

    return parseSelectOptions(selectedOrganization?.networks);
  }, [data, organisationId]);

  const isDisabled = networkOptions.length === AUTO_SELECT_NETWORKS_COUNT;

  return (
    <ControlledSelectField
      control={control}
      name="networkIds"
      label="Network"
      placeholder="Select a network"
      options={networkOptions}
      fluid
      isMulti
      labelClassName="typography-body-sm text-foreground"
      size="l"
      isLoading={isDisabled}
    />
  );
};

export default memo(NetworksSelect);
