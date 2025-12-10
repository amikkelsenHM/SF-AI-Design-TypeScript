'use client';

import { Typography } from '@/components/components/ui/typography';
import { LoginForm } from '@/components/v2/forms/auth/sign-in-form';
import { TwoFactorForm } from '@/components/v2/forms/auth/two-factor-form';
import { useState } from 'react';
import AuthWrapper from './wrapper';

export default function SigninPage() {
  const [is2fa, setIs2fa] = useState(false);
  const [data, setData] = useState({});

  return (
    <AuthWrapper
      heading={!is2fa ? 'SIGN IN' : ''}
      subheading={!is2fa ? 'Welcome back. Please sign in to continue' : ''}
      logoHref="/signin"
    >
      {!is2fa ? (
        <LoginForm setIs2fa={setIs2fa} setData={setData} />
      ) : (
        <div className="space-y-6">
          <div className="space-y-2">
            <Typography variant="body-lg">
              Welcome, please enter your unique passcode to begin setup.
            </Typography>
          </div>
          <TwoFactorForm data={data} />
        </div>
      )}
    </AuthWrapper>
  );
}
