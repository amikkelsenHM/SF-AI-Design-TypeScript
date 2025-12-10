'use client';

import { Button } from '@/components/components/ui/button';
import { Input, InputProps } from '@/components/components/ui/input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';

const PasswordInput = ({
  ...props
}: Omit<InputProps, 'type' | 'iconPosition' | 'icon'>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      {...props}
      type={!showPassword ? 'password' : 'text'}
      iconPosition="right"
      icon={
        <Button
          type="button"
          variant="secondary"
          size="icon-sm"
          className="hover:border-transparent border-transparent active:border-transparent hover:bg-transparent"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <EyeOffIcon className="size-6" />
          ) : (
            <EyeIcon className="size-6" />
          )}
        </Button>
      }
    />
  );
};

export { PasswordInput };
