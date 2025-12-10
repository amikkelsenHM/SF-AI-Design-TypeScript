import { cn } from '@/components/lib/utils';
import { SearchIcon } from '@/components/v2/icons';
import { ReactNode, useMemo, useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from './command';
import { Input, InputProps } from './input';
import { Popover, PopoverAnchor, PopoverContent } from './popover';
import { SelectOption } from './select/utils';
import { Skeleton } from './skeleton';

const ComboboxOptionsSkeleton = ({ count = 5 }: { count?: number }) => (
  <>
    {Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className="h-9 px-4 py-1 flex items-center w-full border-b-foreground-contrast border-b"
      >
        <Skeleton className="h-5 w-1/2" />
      </div>
    ))}
  </>
);

type ComboboxInputProps = Pick<
  InputProps,
  | 'placeholder'
  | 'inputSize'
  | 'className'
  | 'readOnly'
  | 'id'
  | 'state'
  | 'disabled'
>;

interface ComboboxProps extends ComboboxInputProps {
  options: SelectOption[];
  value: string;
  search: string;
  isLoading?: boolean;
  isLoadingNextPage?: boolean;
  loadMoreElement?: ReactNode;
  onSearchChange: (newValue: string) => void;
  onChange: (newValue: string) => void;
}

export function Combobox({
  options,
  className,
  value,
  search,
  isLoading = false,
  isLoadingNextPage = false,
  loadMoreElement,
  onSearchChange,
  onChange,
  ...inputProps
}: ComboboxProps) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const displayValue = useMemo(() => {
    const selectedOptionLabel = options.find((op) => op.value === value)?.label;

    if (typeof selectedOptionLabel === 'string') return selectedOptionLabel;

    return value;
  }, [value, options]);

  return (
    <div ref={setContainer} className={cn('group/combobox')}>
      <Popover open={open} onOpenChange={setOpen} modal={false}>
        <PopoverAnchor className={cn(className, 'relative')}>
          <Input
            {...inputProps}
            iconPosition="right"
            icon={<SearchIcon />}
            value={open ? search : displayValue}
            onChange={(e) => onSearchChange(e.target.value)}
            onClick={() => setOpen(true)}
            className="group-has-data-[side=bottom]/combobox:rounded-b-none group-has-data-[side=top]/combobox:rounded-t-none"
          />
        </PopoverAnchor>
        <PopoverContent
          sideOffset={0}
          className="w-[var(--radix-popper-anchor-width)] p-0 bg-background-progress text-foreground typography-body-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 overflow-x-hidden overflow-y-auto rounded-xl border-transparent shadow-xs data-[side=bottom]:rounded-t-none data-[side=top]:rounded-b-none"
          onOpenAutoFocus={(e) => e.preventDefault()}
          container={container}
        >
          <Command>
            <CommandList>
              {!isLoading && <CommandEmpty>No options found.</CommandEmpty>}
              <CommandGroup>
                {isLoading && !isLoadingNextPage && <ComboboxOptionsSkeleton />}
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    size={inputProps.inputSize}
                    checked={value === option.value}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? '' : currentValue);
                      setOpen(false);
                    }}
                  >
                    {option.label}
                  </CommandItem>
                ))}
                {loadMoreElement}
                {isLoadingNextPage && <ComboboxOptionsSkeleton />}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
