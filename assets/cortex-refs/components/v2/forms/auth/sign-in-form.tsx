'use client';

import { loginAPI } from '@/api/auth';
import { Button } from '@/components/components/ui/button';
import { LinkButton } from '@/components/components/ui/link-button';
import { Typography } from '@/components/components/ui/typography';
import { useSpacefluxStore } from '@/store/useStore';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema } from 'helpers/validations/login';
import { emailRegex } from 'helpers/validations/regexValidation';
import { ILoginForm } from 'models/interfaces/IForm';
import { useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { processLoginResponse } from 'utils/processLoginResponse';
import { ControlledInputField } from '../../inputs/controlled-input-field';

interface LoginFormProps {
  setIs2fa?: Dispatch<SetStateAction<boolean>>;
  setData?: Dispatch<SetStateAction<{}>>;
}

export const LoginForm = ({ setIs2fa, setData }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const searchParams = useSearchParams();

  const { setAdminLoginStatus, setOrganizationInfo } = useSpacefluxStore();

  const { control, handleSubmit } = useForm<ILoginForm>({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const res = await loginAPI({
        username: data.username,
        password: data.password,
      });

      if (res.data.token) {
        await processLoginResponse(
          res.data.token,
          setIsLoading,
          setAdminLoginStatus,
          setOrganizationInfo,
          searchParams?.get('redirect')
        );
      } else {
        setIs2fa?.(true);
      }

      setData?.({
        username: data?.username,
        password: data?.password,
      });
    } catch (err: any) {
      setErrorMessage(err.response?.data || 'An error occurred');
      setIsLoading(false);
    }
  };

  const message =
    typeof (errorMessage as any)?.payload === 'string'
      ? (errorMessage as any)?.payload
      : 'Incorrect email or password';

  const emailValidationRules = {
    pattern: { value: emailRegex, message: 'Invalid email format' },
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {errorMessage && (
        <div className="p-3 rounded-md bg-background-error/10 border border-border-error">
          <p className="typography-body-sm text-foreground-error">{message}</p>
        </div>
      )}

      <ControlledInputField
        control={control}
        name="username"
        label="Email"
        placeholder="Enter your new email"
        type="email"
        required
        rules={emailValidationRules}
        isLoading={isLoading}
      />

      <ControlledInputField
        control={control}
        name="password"
        label="Password"
        placeholder="Enter your password"
        type="password"
        required
        isLoading={isLoading}
      />

      <div className="flex justify-end gap-2">
        <div>
          <LinkButton variant="tertiary" size="lg" href="/forgot-password">
            Forgot password
          </LinkButton>
        </div>

        <Button type="submit" variant="primary" size="lg" isLoading={isLoading}>
          Sign In
        </Button>
      </div>

      <div className="flex flex-col items-end justify-center gap-2">
        <Typography variant="body-lg" className="self-start w-full">
          Request an account
        </Typography>

        <div className="flex w-full items-center justify-between gap-5">
          <Typography>
            Approvals typically take 1 day during normal working time
          </Typography>
          <LinkButton variant="secondary" size="lg" href="/signup">
            SIGN UP
          </LinkButton>
        </div>
      </div>
    </form>
  );
};
