'use client';

import EditableField from '@/components/v2/custom-shadcn/editable-field';
import { InfoBlock } from '@/components/v2/info-block';
import { AccountFormKeys, ChangeEmail } from 'models/enums/v2/account';
import { PersonalFormData } from 'models/types/account/PersonalFormData';
import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import BackButton from '../buttons/back-button';
import { EditableEmailField } from '../custom-shadcn/editable-email-field';

const FIELD_CLASSNAMES = {
  CONTAINER: 'gap-y-1',
  LABEL: 'text-xs text-white font-normal',
};

interface PersonalDetailsProps {
  initialValues: PersonalFormData;
  onUpdate?: (data: {
    key: keyof PersonalFormData;
    value: string;
    changeEmailOptions?: { password: string };
  }) => Promise<void>;
  title?: string;
  backButton?: boolean;
  isLoading?: boolean;
  readOnly?: boolean;
}

type EmailSubmitPayload = { newEmail: string; password: string };

const PersonalDetailsForm = ({
  initialValues,
  onUpdate,
  title = 'Personal Details',
  backButton,
  isLoading,
  readOnly,
}: PersonalDetailsProps) => {
  const [updatingField, setUpdatingField] = useState<
    keyof PersonalFormData | null
  >(null);
  const [isChangingEmail, setIsChangingEmail] = useState(false);

  const form = useForm<PersonalFormData>({
    values: initialValues,
    mode: 'onChange',
  });
  const {
    handleSubmit,
    getValues,
    reset,
    formState: { dirtyFields },
  } = form;

  const handleFieldSubmit = useCallback(
    async (data: PersonalFormData) => {
      const dirtyFieldKeys = Object.keys(
        dirtyFields
      ) as (keyof PersonalFormData)[];

      if (dirtyFieldKeys.length === 0) {
        setUpdatingField(null);
        return;
      }

      const key = dirtyFieldKeys[0];
      const value = data[key];

      setUpdatingField(key);

      try {
        if (
          key !== ChangeEmail.ChangeEmailOptions &&
          typeof value === 'string'
        ) {
          onUpdate && (await onUpdate({ key, value }));
        }
        form.reset({
          ...form.getValues(),
          [key]: value,
        });
      } catch (err: any) {
        console.error('Update error:', err);
      } finally {
        setUpdatingField(null);
      }
    },
    [onUpdate, form, dirtyFields]
  );

  const handleEmailSubmit = useCallback(
    async ({ newEmail, password }: EmailSubmitPayload) => {
      onUpdate &&
        (await onUpdate({
          key: AccountFormKeys.Email,
          value: newEmail,
          changeEmailOptions: { password },
        }));
      setIsChangingEmail(false);
      reset({ ...getValues(), email: newEmail });
    },
    [getValues, onUpdate, reset]
  );

  const handleEmailCancel = useCallback(() => setIsChangingEmail(false), []);

  const isUpdatingThisField = (field: keyof PersonalFormData) =>
    updatingField === field;

  return (
    <>
      <InfoBlock
        title={title}
        rightSlot={
          backButton && (
            <BackButton
              label="Back to User Overview"
              fallbackTo="/settings?tab=users"
            />
          )
        }
      />
      <div className="w-2/3">
        <FormProvider {...form}>
          <div className="pt-6 space-y-6 max-w-[410px]">
            <EditableField
              label="First Name"
              name={AccountFormKeys.FirstName}
              labelClassName={FIELD_CLASSNAMES.LABEL}
              className={FIELD_CLASSNAMES.CONTAINER}
              onEditEnd={handleSubmit(handleFieldSubmit)}
              isLoading={
                isUpdatingThisField(AccountFormKeys.FirstName) || isLoading
              }
              readOnly={readOnly}
            />

            <EditableField
              label="Surname"
              name={AccountFormKeys.Surname}
              labelClassName={FIELD_CLASSNAMES.LABEL}
              className={FIELD_CLASSNAMES.CONTAINER}
              onEditEnd={handleSubmit(handleFieldSubmit)}
              isLoading={
                isUpdatingThisField(AccountFormKeys.Surname) || isLoading
              }
              readOnly={readOnly}
            />

            {!isChangingEmail ? (
              <EditableField
                label="Email"
                name={AccountFormKeys.Email}
                labelClassName={FIELD_CLASSNAMES.LABEL}
                className={FIELD_CLASSNAMES.CONTAINER}
                onEditStart={() => setIsChangingEmail(true)}
                isLoading={
                  isUpdatingThisField(AccountFormKeys.Email) || isLoading
                }
                readOnly={readOnly}
              />
            ) : (
              <EditableEmailField
                currentEmail={form.getValues('email')}
                isLoading={isUpdatingThisField(AccountFormKeys.Email)}
                containerClassName={FIELD_CLASSNAMES.CONTAINER}
                labelClassName={FIELD_CLASSNAMES.LABEL}
                onSubmit={handleEmailSubmit}
                onCancel={handleEmailCancel}
              />
            )}
          </div>
        </FormProvider>
      </div>
    </>
  );
};

export default PersonalDetailsForm;
