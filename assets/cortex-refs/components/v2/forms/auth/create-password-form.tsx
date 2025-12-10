'use client';

import { changePassword } from '@/api/account';
import { Button } from '@/components/components/ui/button';
import { yupResolver } from '@hookform/resolvers/yup';
import { changePasswordSchema } from 'helpers/validations/changePassword';
import {
  IChangePasswordForm,
  IChangePasswordRequest,
} from 'models/interfaces/IForm';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ControlledInputField } from '../../inputs/controlled-input-field';

interface ParentProps {
  // eslint-disable-next-line no-unused-vars
  setIsSubmitted?: (value: boolean) => void;
  title?: string;
  saveAPI?: (data: IChangePasswordRequest) => Promise<any>;
  initialEmail?: string;
  initialToken?: string;
}

export const CreatePasswordForm = ({
  saveAPI,
  setIsSubmitted,
  initialEmail,
  initialToken,
}: ParentProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { control, handleSubmit } = useForm<IChangePasswordForm>({
    resolver: yupResolver(changePasswordSchema),
  });

  const onSubmit: SubmitHandler<IChangePasswordForm> = async (
    data: IChangePasswordForm
  ) => {
    setIsLoading(true);

    const modifiedData = saveAPI
      ? {
          userEmail: initialEmail,
          createPasswordToken: initialToken,
          password: data.password,
        }
      : {
          userEmail: initialEmail,
          newPassword: data.password,
          resetPasswordToken: initialToken,
        };

    const res = saveAPI
      ? await saveAPI(modifiedData as any)
      : await changePassword(modifiedData as IChangePasswordRequest);

    if (typeof res === 'string' || res.id) {
      setIsSubmitted && setIsSubmitted(true);
    } else {
      setErrorMessage('Something went wrong');
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {errorMessage && (
        <div className="p-3 rounded-md bg-background-error/10 border border-border-error">
          <p className="typography-body-sm text-foreground-error">
            {errorMessage}
          </p>
        </div>
      )}

      <ControlledInputField
        control={control}
        name="password"
        label="Password"
        placeholder="Enter your password"
        type="password"
        required
        isLoading={isLoading}
      />

      <ControlledInputField
        control={control}
        name="confirmPassword"
        label="Confirm Password"
        placeholder="Enter your password"
        type="password"
        required
        isLoading={isLoading}
      />

      <div className="flex justify-end gap-2">
        <Button type="submit" variant="primary" size="lg" isLoading={isLoading}>
          Save
        </Button>
      </div>
    </form>
  );
};
