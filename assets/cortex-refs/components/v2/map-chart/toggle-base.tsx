'use client';

import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/components/ui/toggle-group';
import { cn } from '@/components/lib/utils';
import { memo, ReactNode } from 'react';

export interface ToggleItem {
  value: string;
  label?: ReactNode;
  icon?: ReactNode;
  ariaLabel?: string;
  disabled?: boolean;
}

export interface ToggleBaseProps<T extends string = string> {
  value: T | null;
  onChange: (value: T) => void;
  items: ReadonlyArray<ToggleItem>;
  className?: string;
  compact?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  'aria-label'?: string;
}

function ToggleBaseInner<T extends string = string>({
  value,
  onChange,
  items,
  className,
  compact = false,
  disabled = false,
  fullWidth = false,
  'aria-label': ariaLabel,
}: ToggleBaseProps<T>) {
  return (
    <div
      className={cn('z-10', compact ? 'px-3 py-1' : '', className)}
      role="group"
      aria-label={ariaLabel}
    >
      <ToggleGroup
        type="single"
        value={value ?? undefined}
        onValueChange={(v) => v && onChange(v as T)}
        className={cn('inline-flex', fullWidth && 'w-full')}
        disabled={disabled}
      >
        {items.map((it, idx) => (
          <ToggleGroupItem
            key={it.value}
            value={it.value}
            aria-label={it.ariaLabel}
            disabled={disabled || it.disabled}
            segment={
              idx === 0 ? 'left' : idx === items.length - 1 ? 'right' : 'middle'
            }
            className={cn(fullWidth && 'flex-1')}
          >
            {it.icon}
            {it.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

const ToggleBase = memo(ToggleBaseInner) as <T extends string = string>(
  props: ToggleBaseProps<T>
) => JSX.Element;

export default ToggleBase;
