'use client';

import { signupUser } from '@/api/auth';
import { Button } from '@/components/components/ui/button';
import { LinkButton } from '@/components/components/ui/link-button';
import { Typography } from '@/components/components/ui/typography';
import { yupResolver } from '@hookform/resolvers/yup';
import { emailRegex } from 'helpers/validations/regexValidation';
import { signUpSchema } from 'helpers/validations/signUp';
import { OrganizationTypes } from 'models/enums/OrganizationTypes';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ControlledCheckboxField } from '../../inputs/controlled-checkbox';
import { ControlledInputField } from '../../inputs/controlled-input-field';
import { ControlledSelectField } from '../../select/controlled-select-field';

const TERMS_AND_CONDITIONS_URL =
  'https://spaceflux.io/platform-terms-conditions/';
const PRIVACY_POLICY_URL = 'https://spaceflux.io/privacy-terms/';

interface ISignupForm {
  company: string;
  organizationType: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  termsAndConditions: boolean;
  reason: string;
}

const initValues: ISignupForm = {
  company: '',
  organizationType: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  password: '',
  termsAndConditions: false,
  reason: 'Register via signup form',
};

const organizationTypeOptions = [
  { value: OrganizationTypes.Academic, label: OrganizationTypes.Academic },
  { value: OrganizationTypes.Commercial, label: OrganizationTypes.Commercial },
  { value: OrganizationTypes.Government, label: OrganizationTypes.Government },
  { value: OrganizationTypes.Other, label: OrganizationTypes.Other },
];

export const SignupForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: initValues,
  });

  const onSubmit: SubmitHandler<ISignupForm> = async (data: ISignupForm) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const registerUser = await signupUser(data);

      if (registerUser.status === 'Success') {
        setSuccessMessage(
          'Thank you for signing up! We will be in touch with you about activating your account.'
        );
        reset();
      } else {
        setErrorMessage(registerUser.data.payload || 'Registration failed');
        setIsLoading(false);
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'An error occurred during registration');
      setIsLoading(false);
    }
  };

  const emailValidationRules = {
    pattern: { value: emailRegex, message: 'Invalid email format' },
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
        name="company"
        label="Organisation Name"
        placeholder="Enter organisation name"
        type="text"
        required
        isLoading={isLoading}
      />
      <ControlledSelectField
        control={control}
        name="organizationType"
        label="Organisation Type"
        placeholder="Select organisation type"
        options={organizationTypeOptions}
        required
        isLoading={isLoading}
      />

      <div className="grid grid-cols-2 gap-4">
        <ControlledInputField
          control={control}
          name="firstName"
          label="First Name"
          placeholder="Enter first name"
          type="text"
          required
          isLoading={isLoading}
        />

        <ControlledInputField
          control={control}
          name="lastName"
          label="Last Name"
          placeholder="Enter last name"
          type="text"
          required
          isLoading={isLoading}
        />
      </div>

      <ControlledInputField
        control={control}
        name="email"
        label="Email"
        placeholder="Enter your new email"
        type="email"
        required
        rules={emailValidationRules}
        isLoading={isLoading}
      />

      <ControlledInputField
        control={control}
        name="phoneNumber"
        label="Phone Number"
        placeholder="Enter phone number"
        type="tel"
        prefix="+"
        required
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

      <ControlledCheckboxField
        control={control}
        label={
          <>
            <span>I agree to the </span>
            <a
              href={TERMS_AND_CONDITIONS_URL}
              target="_blank"
              className="typography-link-sm text-medium-orchid"
            >
              Terms & Conditions
            </a>
            <span> and </span>
            <a
              href={PRIVACY_POLICY_URL}
              target="_blank"
              className="typography-link-sm text-medium-orchid"
            >
              Privacy Policy
            </a>
          </>
        }
        name="termsAndConditions"
        labelClassName="typography-body-sm text-foreground"
      />

      {successMessage && (
        <div className="p-3 rounded-md bg-background-success/10 border border-border-success">
          <p className="typography-body-sm text-foreground-success">
            {successMessage}
          </p>
        </div>
      )}

      <div className="flex flex-col">
        <div className="flex flex-col items-end">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isLoading}
          >
            Sign Up
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Typography variant="body-sm">Already have an account?</Typography>
          <LinkButton variant="tertiary" size="lg" href="/signin">
            Sign In
          </LinkButton>
        </div>
      </div>
    </form>
  );
};
