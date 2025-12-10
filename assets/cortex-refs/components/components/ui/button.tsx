import { cn } from '@/components/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

const iconTertiaryClassNames =
  'rounded-full hover:bg-foreground-contrast active:bg-foreground-contrast data-[state=active]:bg-foreground-contrast disabled:bg-transparent';

const buttonVariants = cva(
  "h-full inline-flex items-center justify-center gap-2 shrink-0 whitespace-nowrap rounded-xl outline-none border-2 focus-visible:ring-[3px] typography-cta-sm leading-none text-foreground transition-all cursor-pointer [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-6 [&_svg]:shrink-0 disabled:pointer-events-none disabled:text-foreground-disabled",
  {
    variants: {
      variant: {
        primary:
          'bg-deep-purple border-deep-purple hover:bg-deep-purple hover:border-medium-orchid active:bg-foreground-subtle active:border-deep-purple data-[state=active]:bg-deep-purple data-[state=active]:border-medium-orchid disabled:bg-foreground-subtle disabled:border-foreground-disabled',
        secondary:
          'bg-transparent hover:bg-border-progress active:bg-foreground-subtle data-[state=active]:bg-border-progress disabled:bg-foreground-subtle disabled:border-foreground-disabled',
        tertiary:
          'bg-transparent border-transparent hover:bg-border-progress hover:border-border-progress active:bg-foreground-subtle active:border-foreground-subtle data-[state=active]:bg-border-progress data-[state=active]:border-border-progress',
      },
      size: {
        lg: 'px-4 min-h-11',
        sm: 'px-4 min-h-8',
        icon: 'size-11 disabled:bg-disabled',
        'icon-sm': 'size-8 disabled:bg-disabled data-[state=active]:px-0',
      },
      iconPosition: {
        left: 'pl-3',
        right: 'pr-3',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'sm',
    },
    compoundVariants: [
      {
        variant: 'tertiary',
        size: 'sm',
        class: 'disabled:border-transparent',
      },
      {
        variant: 'tertiary',
        size: 'icon',
        class: iconTertiaryClassNames,
      },
      {
        variant: 'tertiary',
        size: 'icon-sm',
        class: iconTertiaryClassNames,
      },
    ],
  }
);

interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

function Button({
  className,
  variant,
  size,
  iconPosition,
  asChild = false,
  isLoading = false,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      data-state={isLoading ? 'active' : undefined}
      className={cn(
        buttonVariants({ variant, size, iconPosition }),
        className,
        isLoading && 'relative text-transparent pointer-events-none px-4'
      )}
      disabled={props.disabled}
      {...props}
    >
      {isLoading && (
        <Loader2 className="absolute animate-spin size-6 text-foreground" />
      )}
      <span
        className={cn(
          'inline-flex items-center gap-2',
          isLoading && 'invisible'
        )}
      >
        {children}
      </span>
    </Comp>
  );
}

export { Button, buttonVariants, type ButtonProps };
