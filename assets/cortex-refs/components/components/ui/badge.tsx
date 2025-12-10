import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/components/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center text-center justify-center rounded-[38px] border typography-body-sm leading-none whitespace-nowrap shrink-0 gap-1.5 transition-[color,box-shadow] h-6 aria-disabled:text-foreground aria-disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:
          'text-foreground border-transparent aria-disabled:bg-foreground-disabled',
        secondary:
          'text-foreground aria-disabled:bg-foreground/20 aria-disabled:border-foreground',
      },
      state: {
        idle: 'bg-foreground-disabled',
        success: '',
        warning: '',
        error: '',
        accepted: '',
      },
      hasDot: {
        true: 'pl-2 pr-3',
        false: 'px-3',
      },
    },
    defaultVariants: {
      variant: 'primary',
      hasDot: false,
    },
    compoundVariants: [
      {
        variant: 'primary',
        state: 'success',
        class: 'text-foreground-dark bg-background-success',
      },
      {
        variant: 'primary',
        state: 'warning',
        class: 'text-foreground-dark bg-background-warning',
      },
      {
        variant: 'primary',
        state: 'error',
        class: 'text-foreground bg-background-error',
      },

      {
        variant: 'secondary',
        state: 'success',
        class:
          'text-foreground-success border-foreground-success bg-foreground-success/20',
      },
      {
        variant: 'secondary',
        state: 'warning',
        class:
          'text-foreground-warning border-foreground-warning bg-foreground-warning/20',
      },
      {
        variant: 'secondary',
        state: 'error',
        class:
          'text-foreground-error border-foreground-error bg-foreground-error/20',
      },
    ],
  }
);

const dotVariants = cva('size-3 rounded-full aria-disabled:bg-disabled', {
  variants: {
    state: {
      success: 'bg-foreground-success',
      warning: 'bg-foreground-warning',
      error: 'bg-foreground-error',
      idle: 'bg-disabled',
      accepted: 'bg-medium-orchid',
    },
  },
});

interface BadgeProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
  disabled?: boolean;
}

function Badge({
  className,
  variant,
  state,
  hasDot,
  asChild = false,
  disabled,
  children,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      data-slot="badge"
      aria-disabled={disabled}
      className={cn(badgeVariants({ variant, state }), className)}
      {...props}
    >
      {hasDot && (
        <div aria-disabled={disabled} className={cn(dotVariants({ state }))} />
      )}
      {children}
    </Comp>
  );
}

const badgeDotVariants = cva('size-4 border-2 rounded-full shrink-0', {
  variants: {
    variant: {
      idle: 'bg-foreground-contrast',
      live: '',
      accepted: 'bg-medium-orchid',
    },
    state: {
      idle: 'border-background-progress',
      success: 'border-background-success',
      warning: 'border-background-warning',
      error: 'border-background-error',
      accepted: 'border-deep-purple',
    },
  },
  compoundVariants: [
    {
      variant: 'live',
      state: 'success',
      class: 'bg-foreground-success',
    },
    {
      variant: 'live',
      state: 'warning',
      class: 'bg-foreground-warning',
    },
    {
      variant: 'live',
      state: 'error',
      class: 'bg-foreground-error',
    },
  ],
});

interface BadgeDotProps
  extends Omit<React.ComponentProps<'div'>, 'children'>,
    VariantProps<typeof badgeDotVariants> {}

function BadgeDot({ className, variant, state, ...props }: BadgeDotProps) {
  return (
    <div
      data-slot="badge"
      className={cn(badgeDotVariants({ variant, state }), className)}
      {...props}
    />
  );
}

export { Badge, BadgeDot, badgeVariants };
