'use client';

import AuthWrapper from './wrapper';
import { ForgotPasswordForm } from '../../forms/auth/forgot-password-form';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <AuthWrapper
      heading={!isSubmitted ? 'Forgot Password' : 'Check your inbox'}
      subheading={
        !isSubmitted
          ? 'Submit your email address and we’ll send you a link to reset your password.'
          : 'We have sent you an email with instruction to reset your password.'
      }
      logoHref="/signin"
      buttonToSignin={isSubmitted}
    >
      {!isSubmitted && <ForgotPasswordForm setIsSubmitted={setIsSubmitted} />}
    </AuthWrapper>
  );
}
