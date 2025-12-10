'use client';

import BackButton from '@/components/v2/buttons/back-button';
import EditableForm from '@/components/v2/forms/editable-form';
import Header from '@/components/v2/header';
import { InfoBlock } from '@/components/v2/info-block';
import { useCreateAndAssignNetworkV2 } from 'hooks/queries/mutations/useCreateAndAssignNetwork';
import { useTelescopes } from 'hooks/queries/telescopeQuery';
import { useAuthSession } from 'hooks/useAuthSession';
import { ITelescope } from 'models/interfaces/v2/telescope';
import { useForm } from 'react-hook-form';

type FormValues = {
  networkName: string;
  selectedSensors: string[];
};

const NetworksPage = () => {
  const { data: telescopesData } = useTelescopes();
  const { mutateAsync } = useCreateAndAssignNetworkV2();
  const { data: session } = useAuthSession();

  const sensors =
    telescopesData?.payload.map(({ id, name }: ITelescope) => ({
      id: id,
      name: name,
    })) || [];

  const form = useForm<FormValues>({
    defaultValues: {
      networkName: '',
      selectedSensors: [],
    },
    mode: 'onChange',
  });

  const handleSave = async ({ networkName, selectedSensors }: FormValues) => {
    try {
      await mutateAsync({
        name: networkName,
        sensorIds: selectedSensors,
        token: session?.token,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Header
        title="Networks"
        description="Manage your personal settings, organisation and API access."
        standardActions={{ logout: true }}
      />
      <div className="bg-foreground-subtle p-6">
        <InfoBlock
          title="New Network"
          description="Create a network and assign Sensors"
          rightSlot={
            <BackButton
              label="Back to Networks"
              fallbackTo="/settings?tab=networks"
            />
          }
          isOutOfScopePage
        />
        <EditableForm
          title="Create Network"
          inputLabel="Network Name:"
          inputName="networkName"
          checkboxLabel="Sensors:"
          checkboxName="selectedSensors"
          checkboxItems={sensors}
          form={form}
          onSave={handleSave}
        />
      </div>
    </>
  );
};

export default NetworksPage;
