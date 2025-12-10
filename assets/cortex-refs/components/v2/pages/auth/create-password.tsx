'use client';

import { CreatePasswordForm } from '@/components/v2/forms/auth/create-password-form';
import AuthWrapper from './wrapper';
import { createPassword } from '@/api/account';
import { useState } from 'react';

interface ParentProps {
  initialEmail?: string;
  initialToken?: string;
}

export default function CreatePasswordPage({
  initialEmail,
  initialToken,
}: ParentProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  return (
    <AuthWrapper
      heading="ACCOUNT SETUP"
      subheading={
        !isSubmitted
          ? 'Please enter a password'
          : 'Your password has been successfully created'
      }
      logoHref="/signin"
      buttonToSignin={isSubmitted}
    >
      {!isSubmitted && (
        <CreatePasswordForm
          saveAPI={createPassword}
          setIsSubmitted={setIsSubmitted}
          initialEmail={initialEmail}
          initialToken={initialToken}
        />
      )}
    </AuthWrapper>
  );
}
