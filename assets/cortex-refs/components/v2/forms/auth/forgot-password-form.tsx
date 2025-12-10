import { forgotPassword } from '@/api/account';
import { yupResolver } from '@hookform/resolvers/yup';
import { forgotPasswordSchema } from 'helpers/validations/forgotPassword';
import { IForgotPasswordForm } from 'models/interfaces/IForm';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ControlledInputField } from '../../inputs/controlled-input-field';
import { Button } from '@/components/components/ui/button';

interface ParentProps {
  // eslint-disable-next-line no-unused-vars
  setIsSubmitted?: (value: boolean) => void;
}

const initValues: IForgotPasswordForm = {
  userEmail: '',
};

export const ForgotPasswordForm = ({ setIsSubmitted }: ParentProps) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: initValues,
  });

  const onSubmit: SubmitHandler<IForgotPasswordForm> = async (
    data: IForgotPasswordForm
  ) => {
    setIsLoading(true);
    try {
      const res = await forgotPassword(data);
      if (res) {
        setIsSubmitted && setIsSubmitted(true);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong');
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errorMessage && (
        <div className="p-3 rounded-md bg-background-error/10 border border-border-error">
          <p className="typography-body-sm text-foreground-error">
            {errorMessage}
          </p>
        </div>
      )}
      <ControlledInputField
        control={control}
        name="userEmail"
        label="Email"
        placeholder="Email"
        type="email"
        required
        isLoading={isLoading}
      />
      <div className="flex justify-end gap-2 mt-3">
        <Button type="submit" variant="primary" size="lg" isLoading={isLoading}>
          Save
        </Button>
      </div>
    </form>
  );
};
