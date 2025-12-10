import { cn } from '@/components/lib/utils';
import React, { ReactNode } from 'react';

export type SectionTitleVariant = 'm' | 's' | 'dropdown';

export interface SectionTitleProps {
  text: string;
  className?: string;
  variant?: SectionTitleVariant;
  actions?: ReactNode;
  gap?: number;
  justifyContent?: 'space-between' | 'flex-start' | 'flex-end' | 'center';
  dropdown?: ReactNode;
  tooltip?: ReactNode;
}

interface StyleConfig {
  typography: string;
  height?: string;
  alignItems: string;
  border: string;
  margin?: string;
}

const VARIANT_STYLES: Record<SectionTitleVariant, StyleConfig> = {
  m: {
    typography: 'typography-overline-md',
    alignItems: 'items-end',
    border: 'border-none',
    margin: 'mb-3',
  },
  s: {
    typography: 'typography-body-sm',
    height: 'h-11',
    alignItems: 'items-center',
    border: 'border-t border-border-progress',
  },
  dropdown: {
    typography: 'typography-body-sm',
    height: 'h-11',
    alignItems: 'items-center',
    border: 'border-t border-border-progress',
  },
};

const SectionTitle: React.FC<SectionTitleProps> = ({
  text,
  variant = 'm',
  actions,
  gap = 2,
  justifyContent = 'space-between',
  dropdown,
  className,
  tooltip,
}) => {
  const { height, alignItems, border, typography, margin } =
    VARIANT_STYLES[variant];

  const gapClass = `gap-${gap}`;

  const justifyClass =
    {
      'space-between': 'justify-between',
      'flex-start': 'justify-start',
      'flex-end': 'justify-end',
      center: 'justify-center',
    }[justifyContent] || 'justify-between';

  return (
    <div className={cn('flex', height, alignItems, border, margin, className)}>
      <div
        className={cn(
          'flex flex-row items-center w-full',
          gapClass,
          actions ? justifyClass : 'justify-start'
        )}
      >
        <span
          className={cn('text-foreground flex items-center gap-2', typography)}
        >
          {text}
          {tooltip && tooltip}
        </span>

        {dropdown && dropdown}

        {actions && <div className="flex items-center">{actions}</div>}
      </div>
    </div>
  );
};

export default SectionTitle;
