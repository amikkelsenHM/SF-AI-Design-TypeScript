'use client';

import { SignupForm } from '@/components/v2/forms/auth/sign-up-form';
import AuthWrapper from './wrapper';

export default function SignupPage() {
  return (
    <AuthWrapper
      heading="SIGN UP"
      subheading="Fill in all the fields to start your journey"
      logoHref="/signin"
    >
      <SignupForm />
    </AuthWrapper>
  );
}
