'use client';

import { CreatePasswordForm } from '@/components/v2/forms/auth/create-password-form';
import AuthWrapper from './wrapper';
import { useState } from 'react';

interface ParentProps {
  initialEmail?: string;
  initialToken?: string;
}

export default function ChangePasswordPage({
  initialEmail,
  initialToken,
}: ParentProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  return (
    <AuthWrapper
      heading="Change Password"
      subheading={
        !isSubmitted
          ? 'Please enter your new password'
          : 'Your password has been successfully changed'
      }
      logoHref="/signin"
      buttonToSignin={isSubmitted}
    >
      {!isSubmitted && (
        <CreatePasswordForm
          setIsSubmitted={setIsSubmitted}
          initialEmail={initialEmail}
          initialToken={initialToken}
        />
      )}
    </AuthWrapper>
  );
}
