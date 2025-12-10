'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';

import { cn } from '@/components/lib/utils';
import SfTooltip from '@/components/v2/tooltip/sf-tooltip';
import { PERCENT_DEFAULT, PERCENT_MAX } from '@/utils/v2/common/constants';

type SliderProps = React.ComponentProps<typeof SliderPrimitive.Root> & {
  showTooltip?: boolean;
  formatTooltip?: (value: number, index: number) => React.ReactNode;
};

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  showTooltip = false,
  formatTooltip,
  ...props
}: SliderProps) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
        ? defaultValue
        : [min, max],
    [value, defaultValue, min, max]
  );

  const [isDragging, setIsDragging] = React.useState(false);

  const percent = React.useMemo(() => {
    const v = _values[0] ?? min;
    const clamped = Math.min(Math.max(v, min), max);
    const span = max - min || PERCENT_DEFAULT;
    return ((clamped - min) / span) * PERCENT_MAX;
  }, [_values, min, max]);

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        'relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
        className
      )}
      onPointerDown={() => setIsDragging(true)}
      onPointerUp={() => setIsDragging(false)}
      onBlur={() => setIsDragging(false)}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          'bg-white relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-0.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-0.5'
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            'absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full'
          )}
        />
      </SliderPrimitive.Track>

      {Array.from({ length: _values.length }, (_, index) => {
        const thumb = (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            className="ring-ring/50 block size-4 shrink-0 rounded-full border bg-foreground-subtle shadow-sm transition-[color,box-shadow] ring-1 focus-visible:ring-1 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
          />
        );
        if (!showTooltip) return React.cloneElement(thumb, { key: index });
        return (
          <SfTooltip
            key={index}
            open={isDragging}
            text={
              formatTooltip
                ? formatTooltip(_values[index] ?? 0, index)
                : _values[index]
            }
            trigger={thumb}
            triggerProps={{
              className: cn('absolute top-[-7px] translate-x-[-50%]'),
              style: { left: `${percent}%` },
            }}
            contentProps={{ className: 'w-fit p-3' }}
          />
        );
      })}
    </SliderPrimitive.Root>
  );
}

export { Slider };
