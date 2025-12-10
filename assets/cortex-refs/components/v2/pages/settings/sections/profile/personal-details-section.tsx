'use client';

import PersonalDetailsForm from '@/components/v2/forms/personal-details-form';
import { useAccountMy } from 'hooks/queries/accountQuery';
import { useUpdateAccountMy } from 'hooks/queries/mutations/useUpdateAccount';
import { EditableKeys } from 'models/types/account/PersonalFormData';

const PersonalDetailsSection = () => {
  const { data, isLoading } = useAccountMy();
  const { mutateAsync } = useUpdateAccountMy();

  const { firstName, lastName, email } = data?.payload || {};

  const initialValues = {
    firstName: firstName || '',
    surname: lastName || '',
    email: email || '',
    password: '',
  };

  return (
    <PersonalDetailsForm
      initialValues={initialValues}
      isLoading={isLoading}
      onUpdate={async ({ key, value, changeEmailOptions }) => {
        await mutateAsync({
          key: key as EditableKeys,
          value,
          changeEmailOptions,
        });
      }}
    />
  );
};

export default PersonalDetailsSection;
