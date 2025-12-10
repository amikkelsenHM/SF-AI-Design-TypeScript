'use client';

import { Button } from '@/components/components/ui/button';
import { Typography } from '@/components/components/ui/typography';
import { cn } from '@/components/lib/utils';
import { ControlledInputField } from '@/components/v2/inputs/controlled-input-field';
import { emailRegex } from 'helpers/validations/regexValidation';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

type ChangeEmailFormValues = {
  newEmail: string;
  confirmNewEmail: string;
  currentPassword: string;
};

export function EditableEmailField({
  currentEmail,
  isLoading,
  onSubmit,
  onCancel,
  containerClassName,
  labelClassName,
}: {
  currentEmail: string;
  isLoading?: boolean;
  onSubmit: (data: { newEmail: string; password: string }) => Promise<void>;
  onCancel: () => void;
  containerClassName?: string;
  labelClassName?: string;
}) {
  const { control, handleSubmit, getValues, setError, reset } =
    useForm<ChangeEmailFormValues>({
      defaultValues: { newEmail: '', confirmNewEmail: '', currentPassword: '' },
      mode: 'onChange',
    });

  const submit = handleSubmit(async (data) => {
    if (data.newEmail !== data.confirmNewEmail) {
      setError('confirmNewEmail', { message: 'Emails do not match' });
      return;
    }
    try {
      await onSubmit({
        newEmail: data.newEmail,
        password: data.currentPassword,
      });
      reset();
    } catch (err: any) {
      if (err?.payload) {
        setError('currentPassword', {
          type: 'manual',
          message: err.payload,
        });
      }
    }
  });

  const emailValidationRules = {
    pattern: { value: emailRegex, message: 'Invalid email format' },
  };

  const validateEmailMatch = useCallback(
    (v: string) => v === getValues('newEmail') || 'Emails do not match',
    [getValues]
  );

  return (
    <div className={cn(containerClassName, labelClassName)}>
      <div className={cn('pb-2', containerClassName, labelClassName)}>
        <Typography>Current Email</Typography>
        <Typography className="text-sm">{currentEmail}</Typography>
        <Typography className="text-sm">
          Use an address you’ll always have access to. You can change your
          personal information at any time.
        </Typography>
      </div>

      <div className="space-y-3">
        <ControlledInputField
          control={control}
          name="newEmail"
          label="New Email"
          placeholder="Enter your new email"
          type="email"
          required
          rules={emailValidationRules}
          isLoading={isLoading}
          labelClassName={labelClassName}
        />

        <ControlledInputField
          control={control}
          name="confirmNewEmail"
          label="Confirm New Email"
          placeholder="Confirm your new email"
          type="email"
          required
          rules={{
            validate: validateEmailMatch,
          }}
          isLoading={isLoading}
          labelClassName={labelClassName}
        />

        <ControlledInputField
          control={control}
          name="currentPassword"
          label="Current Password"
          placeholder="********"
          type="password"
          required
          rules={{ minLength: { value: 6, message: 'Min 6 characters' } }}
          isLoading={isLoading}
          labelClassName={labelClassName}
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="button" onClick={submit} disabled={isLoading}>
          Save
        </Button>
      </div>
    </div>
  );
}
