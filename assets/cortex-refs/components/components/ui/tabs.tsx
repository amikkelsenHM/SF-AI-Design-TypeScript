'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';

import { cn } from '@/components/lib/utils';

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col', className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'bg-muted text-muted-foreground inline-flex w-fit items-center justify-center rounded-lg',
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        `data-[state=active]:bg-foreground-subtle dark:data-[state=active]:text-foreground hover:bg-foreground-contrast
        dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-12 flex-1 items-center 
        justify-center gap-1.5 rounded-t-md rounded-b-none border border-transparent px-2 py-1 typography-body-sm whitespace-nowrap transition-[color,box-shadow]
        focus-visible:outline-none focus-visible:border-border-focus focus-visible:!bg-foreground-contrast
        disabled:pointer-events-none disabled:opacity-50 disabled:text-foreground-contrast [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer
        relative after:absolute after:bottom-2 after:left-8 after:right-8 after:h-[2px]
        after:scale-x-0 focus-visible:after:scale-x-100
        after:bg-foreground`,
        className
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        'flex-1 outline-none bg-foreground-subtle p-6 rounded-b-lg rounded-tr-lg',
        className
      )}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
