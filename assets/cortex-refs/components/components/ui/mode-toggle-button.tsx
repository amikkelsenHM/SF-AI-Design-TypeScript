'use client';

import { Button } from '@/components/components/ui/button';
import { cn } from '@/components/lib/utils';
import SfTooltip from '@/components/v2/tooltip/sf-tooltip';
import { ComponentProps, ReactNode } from 'react';

type ButtonStyleProps = Pick<
  ComponentProps<typeof Button>,
  'variant' | 'size' | 'className'
>;

interface ModeToggleButtonProps extends ButtonStyleProps {
  isActive: boolean;
  onToggle: () => void;

  activeContent: ReactNode;
  inactiveContent: ReactNode;

  activeLabel: string;
  inactiveLabel: string;

  activeTooltip?: string;
  inactiveTooltip?: string;

  disabled?: boolean;
}

const ModeToggleButton = ({
  isActive,
  onToggle,
  activeContent,
  inactiveContent,
  activeLabel,
  inactiveLabel,
  activeTooltip,
  inactiveTooltip,
  variant = 'secondary',
  size = 'icon-sm',
  disabled,
  className,
}: ModeToggleButtonProps) => {
  const label = isActive ? activeLabel : inactiveLabel;
  const tooltip = isActive ? activeTooltip : inactiveTooltip;
  const content = isActive ? activeContent : inactiveContent;

  const button = (
    <Button
      type="button"
      variant={variant}
      size={size}
      disabled={disabled}
      aria-pressed={isActive}
      aria-label={label}
      className={cn(className)}
      onClick={onToggle}
    >
      {content}
    </Button>
  );

  if (!tooltip) return button;

  return (
    <SfTooltip
      text={tooltip}
      trigger={button}
      triggerAriaLabel={label}
      contentProps={{ className: 'w-fit p-3' }}
    />
  );
};

export default ModeToggleButton;
