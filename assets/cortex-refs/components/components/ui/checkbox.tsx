'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/components/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const checkboxVariants = cva(
  "flex items-center justify-center data-[state=checked]:bg-medium-orchid data-[state=checked]:text-background data-[state=checked]:border-medium-orchid shrink-0 rounded-sm border-2 outline-none cursor-pointer z-1 relative disabled:cursor-not-allowed disabled:opacity-50 after:content-[''] after:absolute after:size-[42px] after:rounded-full after:border-2 after:border-border-focus after:scale-0 after:transition-transform after:duration-150 focus-visible:after:scale-100",
  {
    variants: {
      size: {
        s: 'size-3.5 [&_svg]:size-3.5',
        l: 'size-4.5 [&_svg]:size-4.5',
      },
    },
    defaultVariants: {
      size: 's',
    },
  }
);

function Checkbox({
  className,
  size,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> &
  VariantProps<typeof checkboxVariants>) {
  return (
    <div className="relative group/checkbox size-6 flex items-center justify-center">
      <span className="absolute size-10 rounded-full scale-0 bg-foreground-contrast transition-transform duration-200 group-hover/checkbox:scale-100" />
      <CheckboxPrimitive.Root
        data-slot="checkbox"
        className={cn(checkboxVariants({ size }), className)}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="flex items-center justify-center text-current transition-none"
        >
          <CheckIcon />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    </div>
  );
}

export { Checkbox };
