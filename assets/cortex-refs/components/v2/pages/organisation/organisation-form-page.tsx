'use client';

import BackButton from '@/components/v2/buttons/back-button';
import EditableForm from '@/components/v2/forms/editable-form';
import Header from '@/components/v2/header';
import { InfoBlock } from '@/components/v2/info-block';
import { BreadcrumbItem } from 'models/interfaces/v2/IBreadcrumb';
import {
  AberrationOptions,
  TdmFormats,
} from 'models/interfaces/v2/organisations';
import { useForm } from 'react-hook-form';
import { SETTINGS_COMMON_BREADCRUMBS } from '../settings/sub-pages/constants';

export type FormValues = {
  organisationName: string;
  selectedNetworks: string[];
  defaultTdmFormat?: TdmFormats;
  availableTdmFormats?: TdmFormats[];
  aberrationCorrectionPreference?: AberrationOptions;
};

const tdmFormatOptions: { label: string; value: TdmFormats }[] = [
  { value: 'Standard', label: 'Standard' },
  { value: 'UKMOD', label: 'UKMOD' },
  { value: 'Aurora', label: 'Aurora' },
];

export const aberrationOptions: { label: string; value: AberrationOptions }[] =
  [
    { value: 'Uncorrected', label: 'Uncorrected' },
    { value: 'Corrected', label: 'Corrected' },
  ];

interface OrganisationFormPageProps {
  id?: string;
  title: string;
  description: string;
  submitLabel: string;
  onSubmit: (values: FormValues) => Promise<void>;
  initialValues?: Partial<FormValues>;
  networks: { id: string; name: string }[];
  shouldResetOnSubmit?: boolean;
}

export const OrganisationFormPage = ({
  id,
  title,
  description,
  submitLabel,
  onSubmit,
  initialValues,
  networks,
  shouldResetOnSubmit = false,
}: OrganisationFormPageProps) => {
  const form = useForm<FormValues>({
    defaultValues: {
      organisationName: '',
      selectedNetworks: [],
      defaultTdmFormat: undefined,
      availableTdmFormats: [],
      aberrationCorrectionPreference: undefined,
      ...initialValues,
    },
    mode: 'onChange',
  });

  const onSave = async (values: FormValues) => {
    await onSubmit(values);

    if (shouldResetOnSubmit) {
      form.reset();
    }
  };

  const breadcrumbs: BreadcrumbItem[] = [
    ...SETTINGS_COMMON_BREADCRUMBS,
    ...(id
      ? [
          {
            text: initialValues?.organisationName || '',
            href: `/settings/organisation/${id}`,
          },
        ]
      : []),
  ];

  return (
    <>
      <Header
        title={initialValues?.organisationName || title}
        description={description}
        standardActions={{ logout: true }}
        customBreadcrumbs={breadcrumbs}
      />
      <div className="bg-foreground-subtle p-12">
        <InfoBlock
          title={title}
          rightSlot={
            <BackButton
              label="Back to Organisations"
              fallbackTo="/settings?tab=organisation"
            />
          }
        />
        <EditableForm<FormValues>
          title={title}
          inputLabel="Organisation Name:"
          inputName="organisationName"
          checkboxLabel="Networks:"
          checkboxName="selectedNetworks"
          checkboxItems={networks}
          form={form}
          onSave={onSave}
          tdmFormatOptions={tdmFormatOptions}
          availableTdmFormatOptions={tdmFormatOptions}
          aberrationOptions={aberrationOptions}
          submitLabel={submitLabel}
        />
      </div>
    </>
  );
};
