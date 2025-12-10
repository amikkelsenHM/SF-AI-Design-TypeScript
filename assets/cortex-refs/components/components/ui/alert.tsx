import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/components/lib/utils';

const alertVariants = cva(
  'relative w-full border-b-2 rounded-lg px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:text-current',
  {
    variants: {
      variant: {
        default:
          'bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90 bg-background-success border-border-success',
        error:
          'text-white bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90 bg-background-error border-border-error',
        warning:
          'bg-card [&>svg]:text-foreground-dark *:data-[slot=alert-description]:text-foreground-dark *:data-[slot=alert-title]:text-foreground-dark bg-background-warning border-border-warning',
        info: 'text-white bg-background-contrast [&>svg]:text-white *:data-[slot=alert-description]:text-white',
        success:
          'bg-card [&>svg]:text-foreground-dark *:data-[slot=alert-description]:text-foreground-dark *data-[slot=alert-title]:text-foreground-dark bg-background-success border-green-600',
      },
      type: {
        top: 'fixed inset-0 z-[9999] h-11 px-4 py-2 flex items-center gap-4 rounded-none',
        inline:
          'relative rounded-lg border-b-0 border-l-current min-h-[80px] p-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      type: 'top',
    },
  }
);

export type AlertVariants = VariantProps<typeof alertVariants>;

function Alert({
  className,
  variant,
  type,
  ...props
}: React.ComponentProps<'div'> & AlertVariants) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant, type }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        'col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight',
        className
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        'text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed',
        className
      )}
      {...props}
    />
  );
}

export { Alert, AlertDescription, AlertTitle };
