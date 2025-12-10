'use client';

import { useCreateOrganisation } from 'hooks/queries/mutations/useCreateOrganisation';
import { useMyNetworks } from 'hooks/queries/networksQuery';
import { useAuthSession } from 'hooks/useAuthSession';
import { FormValues, OrganisationFormPage } from './organisation-form-page';

const CreateOrganisationPage = () => {
  const { data: networksData } = useMyNetworks();
  const { mutateAsync } = useCreateOrganisation();
  const { data: session } = useAuthSession();

  const networks = networksData?.map(({ id, name }) => ({ id, name })) || [];

  const handleSave = async (values: FormValues) => {
    await mutateAsync({
      name: values.organisationName,
      defaultTdmFormat: values.defaultTdmFormat,
      availableTdmFormats: values.availableTdmFormats,
      aberrationCorrectionPreference: values.aberrationCorrectionPreference,
      isActive: true,
      networkIDs: values.selectedNetworks,
      token: session?.token,
    });
  };

  return (
    <OrganisationFormPage
      title="New Organisation"
      description="Create a new organisation and assign a network"
      submitLabel="Create Organisation"
      onSubmit={handleSave}
      networks={networks}
      shouldResetOnSubmit={true}
    />
  );
};

export default CreateOrganisationPage;
