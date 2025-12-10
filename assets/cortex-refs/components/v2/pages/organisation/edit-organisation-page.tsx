'use client';

import { useGetOrganisationById } from 'hooks/queries/accountQuery';
import { useUpdateOrganisation } from 'hooks/queries/mutations/useUpdateOrganisation';
import { useMyNetworks } from 'hooks/queries/networksQuery';
import { useParams } from 'next/navigation';
import { FormValues, OrganisationFormPage } from './organisation-form-page';

const EditOrganisationPage = () => {
  const { id } = useParams() as { id: string };
  const { data: organisation, refetch } = useGetOrganisationById(id);
  const { mutateAsync } = useUpdateOrganisation(id);
  const { data: networksData } = useMyNetworks();

  const networks = networksData?.map(({ id, name }) => ({ id, name })) || [];

  const handleSave = async (values: FormValues) => {
    // TODO: this need to be deleted once the BE API is updated and we can pass networkIDs for patch
    const existingNetworkIDs = organisation?.networks?.map((n) => n.id) ?? [];
    const newNetworkIDs = values.selectedNetworks ?? [];

    const toAssign = newNetworkIDs.filter(
      (id) => !existingNetworkIDs.includes(id)
    );
    const toUnassign = existingNetworkIDs.filter(
      (id) => !newNetworkIDs.includes(id)
    );

    await mutateAsync({
      name: values.organisationName,
      defaultTdmFormat: values.defaultTdmFormat!,
      availableTdmFormats: values.availableTdmFormats!,
      aberrationCorrectionPreference: values.aberrationCorrectionPreference!,
      networkIDs: values.selectedNetworks,
      isActive: true,

      // TODO: this need to be deleted once the BE API is updated and we can pass networkIDs for patch
      __toAssign: toAssign,
      __toUnassign: toUnassign,
    });

    await refetch();
  };

  const initialValues = organisation
    ? {
        organisationName: organisation.name,
        selectedNetworks: organisation.networks?.map((n) => n.id) ?? [],
        defaultTdmFormat: organisation.defaultTdmFormat,
        availableTdmFormats: organisation.availableTdmFormats,
        aberrationCorrectionPreference:
          organisation.aberrationCorrectionPreference,
      }
    : undefined;

  return (
    <OrganisationFormPage
      id={id}
      title="Edit Organisation"
      description="Edit organisation details and networks"
      submitLabel="Save Changes"
      onSubmit={handleSave}
      initialValues={initialValues}
      networks={networks}
    />
  );
};

export default EditOrganisationPage;
