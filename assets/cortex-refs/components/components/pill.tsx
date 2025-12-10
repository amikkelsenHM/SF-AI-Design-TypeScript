import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { cn } from '@/components/lib/utils';

const pillVariants = cva(
  'text-xs inline-flex items-center justify-center rounded-full px-4 py-1 w-fit whitespace-nowrap shrink-0 gap-2 overflow-hidden transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-background-contrast text-foreground',
        secondary: 'bg-foreground-disabled text-foreground',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

interface PillProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof pillVariants> {
  asChild?: boolean;
  closable?: boolean;
  onClose?: () => void;
}

const Pill = React.forwardRef<HTMLDivElement, PillProps>(
  (
    {
      className,
      variant,
      asChild = false,
      closable = false,
      onClose,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        ref={ref}
        data-slot="pill"
        className={cn(pillVariants({ variant }), className)}
        {...props}
      >
        <span>{children}</span>
        {closable && (
          <button
            type="button"
            onClick={onClose}
            className="hover:opacity-80 focus:outline-none ml-1 rounded-full cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </Comp>
    );
  }
);
Pill.displayName = 'Pill';

export { Pill, pillVariants };
