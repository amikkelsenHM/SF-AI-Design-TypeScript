'use client';

import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as React from 'react';

import { cn } from '@/components/lib/utils';

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'group inline-flex h-5 w-8 shrink-0 items-center rounded-full border border-transparent transition-all outline-none cursor-pointer data-[state=checked]:bg-deep-purple data-[state=unchecked]:bg-foreground data-[state=unchecked]:border-background disabled:pointer-events-none disabled:data-[state=checked]:bg-border-light disabled:data-[state=unchecked]:bg-foreground disabled:data-[state=unchecked]:border-disabled',
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'bg-background data-[state=unchecked]:bg-storm-gray data-[state=checked]:bg-foreground pointer-events-none block size-4 rounded-full transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-px group-hover:data-[state=unchecked]:bg-dark-gray group-hover:outline-4 group-hover:outline-black/8 group-active:data-[state=unchecked]:bg-dark-gray group-active:size-5 group-active:outline-3 group-active:data-[state=unchecked]:-translate-x-px group-active:data-[state=checked]:translate-x-[55%] group-active:transition-none group-disabled:data-[state=unchecked]:bg-disabled'
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
