'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import * as React from 'react';

import { Checkbox } from '@/components/components/ui/checkbox';
import { cn } from '@/components/lib/utils';
import Chevron from '@/components/v2/icons/chevron';
import { cva, VariantProps } from 'class-variance-authority';
import { getMultiValue, getMultiValueLabel, SelectOption } from './utils';

const selectTriggerVariants = cva(
  'grid grid-cols-[min-content_auto] items-center data-[placeholder]:text-foreground whitespace-nowrap gap-1.5 w-full min-w-0 px-4 text-foreground typography-body-sm shadow-xs rounded-xl border-1 border-foreground-subtle outline-none bg-background-progress transition-colors disabled:bg-foreground-subtle disabled:cursor-not-allowed disabled:text-foreground-disabled! disabled:border-foreground-disabled hover:border-border-light focus-within:border-border-light data-[state=open]:[&>svg]:rotate-180 data-[state=open]:bg-background-progress data-[state=open]:border-border-light data-[state=open]:group-has-data-[side=bottom]/select:rounded-b-none data-[state=open]:group-has-data-[side=top]/select:rounded-t-none',
  {
    variants: {
      size: {
        xs: 'h-6',
        s: 'h-9',
        l: 'h-11',
      },
      inputed: {
        true: '',
        false: '',
      },
      fluid: {
        true: 'flex [&_svg]:shrink-0 [&>span]:max-w-[calc(100%_-_24px)]',
        false: '',
      },
      avoidCollision: { true: '', false: 'data-[state=open]:rounded-b-none' },
    },
    defaultVariants: {
      size: 's',
    },
    compoundVariants: [
      {
        inputed: true,
        class: 'bg-background-progress border-border-light',
      },
    ],
  }
);

const selectItemVariants = cva(
  'relative flex w-full cursor-pointer items-center gap-2 py-1 px-4 outline-none border-b-foreground-contrast border-b *:[span]:inline-block *:[span]:overflow-hidden *:[span]:text-ellipsis hover:bg-foreground-contrast data-[state=checked]:bg-deep-purple data-[disabled]:pointer-events-none data-[disabled]:bg-foreground-subtle!',
  {
    variants: {
      size: {
        xs: 'h-6',
        s: 'h-9',
        l: 'h-11',
      },
    },
    defaultVariants: {
      size: 's',
    },
  }
);

type SelectRootProps = React.ComponentProps<typeof SelectPrimitive.Root>;

function SelectRoot({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({
  className,
  ...props
}: Omit<React.ComponentProps<typeof SelectPrimitive.Value>, 'children'>) {
  return (
    <span
      className={cn(
        'col-start-1 row-start-1 flex *:[span]:overflow-hidden *:[span]:text-ellipsis',
        className
      )}
    >
      <SelectPrimitive.Value data-slot="select-value" {...props} />
    </span>
  );
}
type SelectTriggerVariants = VariantProps<typeof selectTriggerVariants>;

function SelectTrigger({
  size,
  fluid,
  className,
  children,
  inputed,
  avoidCollision,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> &
  SelectTriggerVariants) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        selectTriggerVariants({ size, inputed, fluid, avoidCollision }),
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild className="ml-auto">
        <Chevron />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  container,
  className,
  children,
  position = 'popper',
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content> & {
  container?: HTMLElement | null;
}) {
  return (
    <SelectPrimitive.Portal container={container}>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          'bg-background-progress text-foreground typography-body-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-51 max-h-(--radix-select-content-available-height) origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-xl border-transparent shadow-xs data-[side=bottom]:rounded-t-none data-[side=top]:rounded-b-none',
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-[var(--radix-select-trigger-width)] scroll-my-1'
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn('text-muted-foreground px-2 py-1.5 text-xs', className)}
      {...props}
    />
  );
}

function SelectItem({
  size,
  className,
  children,
  selected,
  isMulti,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item> &
  VariantProps<typeof selectItemVariants> & {
    isMulti?: boolean;
    selected?: boolean;
  }) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(selectItemVariants({ size }), className)}
      {...props}
    >
      {isMulti && <Checkbox checked={!!selected} />}
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn('bg-border pointer-events-none -mx-1 my-1 h-px', className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

interface SelectProps<
  ValueType extends IsMulti extends true ? string[] : string,
  IsMulti extends boolean = false
> extends Omit<SelectRootProps, 'children' | 'value' | 'onValueChange'> {
  ref?: React.RefAttributes<HTMLButtonElement>['ref'];
  id?: string;
  size?: SelectTriggerVariants['size'];
  fluid?: SelectTriggerVariants['fluid'];
  triggerClassName?: string;
  className?: string;
  placeholder?: React.ReactNode;
  options: SelectOption[];
  isMulti?: IsMulti;
  value?: ValueType;
  avoidCollision?: boolean;
  onValueChange?: (value: ValueType) => void;
}

function Select<
  ValueType extends IsMulti extends true ? string[] : string,
  IsMulti extends boolean = false
>({
  id,
  size,
  triggerClassName,
  className,
  placeholder,
  options,
  value,
  fluid = false,
  avoidCollision = true,
  isMulti,
  onValueChange,
  ref,
  ...props
}: SelectProps<ValueType, IsMulti>) {
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const ignoreNextCloseRef = React.useRef(false);

  const isArrayValue = React.useMemo(() => Array.isArray(value), [value]);

  const hasArrayValue = React.useMemo(
    () => isArrayValue && value!.length > 0,
    [isArrayValue, value]
  );

  const longestOptionLabel = React.useMemo(
    () =>
      options.reduce(
        (longest, current) => {
          const currentLength =
            typeof current.label === 'string' ? current.label.length : 0;
          const longestLength =
            typeof longest.label === 'string' ? longest.label.length : 0;

          return currentLength > longestLength ? current : longest;
        },
        { label: placeholder }
      )?.label,
    [options]
  );

  const selectValue = React.useMemo(
    () => (isArrayValue ? '' : (value as string)),
    [isArrayValue, value]
  );

  const selectPlaceholder = React.useMemo(
    () =>
      hasArrayValue
        ? getMultiValueLabel(value as string[], options)
        : placeholder,
    [hasArrayValue, value, options, placeholder]
  );

  const getIsItemSelected = React.useCallback(
    (option: string) => !!(Array.isArray(value) && value.includes(option)),
    [value]
  );
  const inputed = React.useMemo(() => {
    if (isArrayValue) return hasArrayValue;
    return !!value && value !== '';
  }, [isArrayValue, hasArrayValue, value]);

  const selectableCount = React.useMemo(
    () => options.filter((o) => !o.disabled).length,
    [options]
  );

  const handleValueChange = React.useCallback(
    (option: string) => {
      const next = (
        isMulti ? getMultiValue((value || []) as string[], option) : option
      ) as ValueType;

      onValueChange?.(next);

      if (isMulti && Array.isArray(next)) {
        if (next.length >= selectableCount) {
          ignoreNextCloseRef.current = false;
          setOpen(false);
        } else {
          ignoreNextCloseRef.current = true;
        }
      }
    },
    [isMulti, onValueChange, value, selectableCount]
  );

  const handleOpenChange = React.useCallback(
    (newOpenState: boolean) => {
      if (isMulti) {
        if (!newOpenState && ignoreNextCloseRef.current) {
          ignoreNextCloseRef.current = false;
          return;
        }
        setOpen(newOpenState);
      } else {
        setOpen(newOpenState);
      }
    },
    [isMulti]
  );

  return (
    <div
      ref={avoidCollision ? setContainer : null}
      className={cn('group/select', className)}
    >
      <SelectRoot
        open={open}
        onOpenChange={handleOpenChange}
        value={selectValue}
        onValueChange={handleValueChange}
        {...props}
      >
        <SelectTrigger
          ref={ref}
          id={id}
          className={triggerClassName}
          size={size}
          fluid={fluid}
          inputed={inputed}
          avoidCollision={avoidCollision}
        >
          {!fluid && (
            <span
              className="invisible whitespace-nowrap col-start-1 row-start-1"
              aria-hidden
            >
              {longestOptionLabel}
            </span>
          )}
          <SelectValue placeholder={selectPlaceholder} />
        </SelectTrigger>
        <SelectContent container={container} avoidCollisions={avoidCollision}>
          {options.map(({ label, value, disabled }) => (
            <SelectItem
              key={value}
              value={value}
              size={size}
              disabled={disabled}
              selected={getIsItemSelected(value)}
              isMulti={isMulti}
            >
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </div>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
