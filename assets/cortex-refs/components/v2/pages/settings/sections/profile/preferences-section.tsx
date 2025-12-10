'use client';

import PreferencesForm, {
  PreferencesFormValues,
} from '@/components/v2/forms/preference-form';
import {
  useAccountMy,
  useGetAllTdmFormats,
} from '@/hooks/queries/accountQuery';
import { useUpdateAccountMy } from '@/hooks/queries/mutations/useUpdateAccount';
import { aberrationOptions } from '../../../organisation/organisation-form-page';
import { Option } from 'models/types/common';
import { ITdmFormat } from 'models/interfaces/v2/tdm';

const PreferencesSection = () => {
  const { data: account, isLoading: isAccountLoading } = useAccountMy();
  const { data: tdmFormatsRaw } = useGetAllTdmFormats();
  const { mutateAsync } = useUpdateAccountMy();

  const { preferredTdmFormat, aberrationCorrectionPreference } =
    account?.payload || {};

  const tdmFormats: ITdmFormat[] = tdmFormatsRaw || [];
  const tdmOptions: Option[] = tdmFormats.map((t) => ({
    value: t.type,
    label: t.type,
  }));

  const initialValues: PreferencesFormValues = {
    preferredTdmFormat,
    aberrationCorrectionPreference,
  };

  return (
    <PreferencesForm
      initialValues={initialValues}
      tdmOptions={tdmOptions}
      aberrationOptions={aberrationOptions}
      isLoading={isAccountLoading}
      onUpdate={async ({ key, value }) => {
        await mutateAsync({ key, value });
      }}
    />
  );
};

export default PreferencesSection;
