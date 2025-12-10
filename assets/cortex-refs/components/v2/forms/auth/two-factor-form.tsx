'use client';

import { loginAPI, loginAPI2fa } from '@/api/auth';
import { Button } from '@/components/components/ui/button';
import { Typography } from '@/components/components/ui/typography';
import { useSpacefluxStore } from '@/store/useStore';
import { yupResolver } from '@hookform/resolvers/yup';
import { TwoFactorSchema } from 'helpers/validations/2fa';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { processLoginResponse } from 'utils/processLoginResponse';
import { ControlledInputField } from '../../inputs/controlled-input-field';

export interface ITwoFactorForm {
  code: string;
}

const INIT_TIMER = 120;
const ERROR_MESSAGE = 'Invalid verification code';

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
};

interface TwoFactorFormProps {
  data: any;
}

export const TwoFactorForm = ({ data }: TwoFactorFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(INIT_TIMER);

  const { setAdminLoginStatus, setOrganizationInfo } = useSpacefluxStore();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!canResend) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            setCanResend(true);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [canResend]);

  const resendCode = async () => {
    await loginAPI(data);
  };

  const handleResendClick = () => {
    if (canResend) {
      resendCode();
      setCanResend(false);
      setCountdown(INIT_TIMER);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ITwoFactorForm>({
    resolver: yupResolver(TwoFactorSchema),
  });

  const onSubmit: SubmitHandler<ITwoFactorForm> = async ({ code }) => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const res = await loginAPI2fa({
        code: code,
      });

      await processLoginResponse(
        res.data.token,
        setIsLoading,
        setAdminLoginStatus,
        setOrganizationInfo
      );
    } catch (err: any) {
      const errorData = err.response?.data;
      let errorMsg = ERROR_MESSAGE;

      if (typeof errorData === 'string') {
        errorMsg = errorData;
      } else if (errorData && typeof errorData === 'object') {
        errorMsg = errorData.payload || ERROR_MESSAGE;
      }

      setErrorMessage(errorMsg);
      setIsLoading(false);
    }
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
        name="code"
        label="Verification Code"
        placeholder="Enter 6-digit code"
        type="text"
        required
        isLoading={isLoading}
      />

      <div className="flex-col">
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isLoading}
          >
            Send
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Typography variant="body-sm" component="span">
            Didn't receive the code?
          </Typography>
          <Button
            type="button"
            variant="tertiary"
            size="sm"
            onClick={handleResendClick}
            disabled={!canResend}
          >
            {canResend ? 'Resend' : `Resend in ${formatTime(countdown)}`}
          </Button>
        </div>
      </div>
    </form>
  );
};
