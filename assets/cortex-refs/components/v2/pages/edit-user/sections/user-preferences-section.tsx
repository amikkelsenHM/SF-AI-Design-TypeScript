'use client';

import { useParams } from 'next/navigation';
import { useGetUserById } from '@/hooks/queries/accountQuery';
import PreferencesForm, {
  PreferencesFormValues,
} from '@/components/v2/forms/preference-form';

const UserPreferencesSection = () => {
  const { id } = useParams() as { id: string };
  const { data: user } = useGetUserById(id);

  const { preferredTdmFormat, aberrationCorrectionPreference } = user || {};

  const initialValues: PreferencesFormValues = {
    preferredTdmFormat,
    aberrationCorrectionPreference,
  };

  return <PreferencesForm initialValues={initialValues} readOnly />;
};

export default UserPreferencesSection;
