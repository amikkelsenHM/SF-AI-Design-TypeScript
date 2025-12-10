import { cn } from '@/components/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { FC, ReactNode, useMemo } from 'react';

const gapVariants = cva('', {
  variants: {
    gap: {
      '0': 'gap-0',
      '1': 'gap-1',
      '2': 'gap-2',
      '3': 'gap-3',
      '4': 'gap-4',
      '5': 'gap-5',
      '6': 'gap-6',
      '8': 'gap-8',
      '10': 'gap-10',
      '12': 'gap-12',
      '16': 'gap-16',
    },
  },
  defaultVariants: {
    gap: '4',
  },
});

const layoutVariants = cva('w-full', {
  variants: {
    direction: {
      horizontal: 'flex flex-row flex-wrap',
      vertical: 'grid',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
  },
  defaultVariants: {
    direction: 'horizontal',
    align: 'stretch',
    justify: 'start',
  },
});

type ResponsiveValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface ColumnConfig {
  xs?: ResponsiveValue;
  sm?: ResponsiveValue;
  md?: ResponsiveValue;
  lg?: ResponsiveValue;
  xl?: ResponsiveValue;
  '2xl'?: ResponsiveValue;
}

interface KpiGridProps
  extends VariantProps<typeof gapVariants>,
    VariantProps<typeof layoutVariants> {
  children: ReactNode;
  columns?: ColumnConfig;
  className?: string;
  customGap?: string;
  minItemWidth?: string;
  maxItemWidth?: string;
}

const KpiGrid: FC<KpiGridProps> = ({
  children,
  gap = '4',
  direction = 'horizontal',
  align = 'stretch',
  justify = 'start',
  columns = { xs: 1, sm: 2, md: 3, lg: 3, xl: 4 },
  className,
  customGap,
  minItemWidth = '200px',
  maxItemWidth,
}) => {
  const gridClasses = useMemo(() => {
    if (direction !== 'vertical') return '';

    const classes: string[] = [];

    if (columns.xs) classes.push(`grid-cols-1`);
    if (columns.sm) classes.push(`sm:grid-cols-2`);
    if (columns.md) classes.push(`md:grid-cols-3`);
    if (columns.lg) classes.push(`lg:grid-cols-3`);
    if (columns.xl) classes.push(`xl:grid-cols-4`);

    return classes.join(' ');
  }, [direction, columns]);

  const childStyles = useMemo(() => {
    if (direction !== 'horizontal') return {};

    const styles: React.CSSProperties = {};
    if (minItemWidth) styles.minWidth = minItemWidth;
    if (maxItemWidth) styles.maxWidth = maxItemWidth;

    return styles;
  }, [direction, minItemWidth, maxItemWidth]);

  const customGapStyle = customGap ? { gap: customGap } : {};

  const renderChildren = () => {
    if (direction === 'horizontal' && (minItemWidth || maxItemWidth)) {
      return React.Children.map(
        children,
        (child, index) =>
          child && (
            <div key={index} style={childStyles}>
              {child}
            </div>
          )
      );
    }
    return children;
  };

  return (
    <div
      className={cn(
        layoutVariants({ direction, align, justify }),
        gridClasses,
        !customGap && gapVariants({ gap }),
        className
      )}
      style={customGapStyle}
    >
      {renderChildren()}
    </div>
  );
};

export default KpiGrid;
export type { ColumnConfig, KpiGridProps, ResponsiveValue };
