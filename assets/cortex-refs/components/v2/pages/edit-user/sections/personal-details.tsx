'use client';

import PersonalDetailsForm from '@/components/v2/forms/personal-details-form';
import { useGetUserById } from 'hooks/queries/accountQuery';
import { useParams } from 'next/navigation';

export const PersonalDetails = () => {
  const { id } = useParams() as { id: string };
  const { data } = useGetUserById(id);

  const { firstName, lastName, email } = data || {};

  const initialValues = {
    firstName: firstName || '',
    surname: lastName || '',
    email: email || '',
    password: '',
  };

  return (
    <PersonalDetailsForm initialValues={initialValues} readOnly backButton />
  );
};
