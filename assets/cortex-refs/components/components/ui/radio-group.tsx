'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as React from 'react';

import { cn } from '@/components/lib/utils';
import SfTooltip from '@/components/v2/tooltip/sf-tooltip';
import { cva, VariantProps } from 'class-variance-authority';
import { CircleIcon } from 'lucide-react';
import { ITooltip } from 'models/interfaces/v2/tooltip/ITooltip';
import { Label } from './label';

const radioGroupItemVariants = cva(
  "aspect-square shrink-0 rounded-full border-2 border-foreground data-[state=checked]:border-medium-orchid outline-none z-1 cursor-pointer relative disabled:cursor-not-allowed disabled:opacity-50 after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-1/2 after:size-[42px] after:rounded-full after:border-2 after:border-border-focus after:scale-0 after:transition-[scale] after:duration-150 focus-visible:after:scale-100",
  {
    variants: {
      size: {
        s: 'size-4 [&_svg]:size-2',
        l: 'size-5 [&_svg]:size-2.5',
      },
    },
    defaultVariants: {
      size: 's',
    },
  }
);

function RadioGroupRoot({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn('grid gap-3', className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <div className="relative group/radio size-6 flex items-center justify-center">
      <span className="absolute size-10 rounded-full scale-0 bg-white/25 transition-transform duration-200 group-hover/radio:scale-100" />
      <RadioGroupPrimitive.Item
        data-slot="radio-group-item"
        className={cn(
          'aspect-square shrink-0 rounded-full border-2 border-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator
          data-slot="radio-group-indicator"
          className="relative flex items-center justify-center"
        >
          <CircleIcon className="fill-medium-orchid stroke-none size-2.5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
    </div>
  );
}

export interface RadioGroupOption {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
  tooltipConfig?: ITooltip;
}

interface RadioGroupProps
  extends React.ComponentProps<typeof RadioGroupPrimitive.Root>,
    VariantProps<typeof radioGroupItemVariants> {
  labelClassName?: string;
  optionClassName?: string;
  options: RadioGroupOption[];
}

function RadioGroup({
  labelClassName,
  optionClassName,
  size,
  options,
  ...props
}: RadioGroupProps) {
  return (
    <RadioGroupRoot {...props}>
      {options.map(({ value, label, disabled, tooltipConfig }) => {
        const item = (
          <Label
            key={value}
            className={cn(
              'flex items-center gap-2 text-foreground cursor-pointer w-fit',
              labelClassName
            )}
          >
            <RadioGroupItem
              value={value}
              disabled={disabled}
              className={cn(radioGroupItemVariants({ size }), optionClassName)}
            />
            <span>{label}</span>
          </Label>
        );

        return tooltipConfig ? (
          <SfTooltip
            key={value}
            {...tooltipConfig}
            trigger={item}
            triggerProps={{ className: 'w-fit' }}
          />
        ) : (
          item
        );
      })}
    </RadioGroupRoot>
  );
}

export { RadioGroupRoot, RadioGroupItem, RadioGroup };
