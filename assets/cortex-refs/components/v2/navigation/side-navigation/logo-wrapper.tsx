import { cn } from '@/components/lib/utils';
import { ReactNode } from 'react';
import { LOGO_CONFIG } from './logo-config';

type LogoWrapperProps = {
  isVisible: boolean;
  ariaHidden?: boolean;
  children: ReactNode;
};

export function LogoWrapper({
  isVisible,
  ariaHidden,
  children,
}: LogoWrapperProps) {
  return (
    <div
      className={cn(
        'transition-opacity',
        LOGO_CONFIG.ANIMATION.DURATION,
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none absolute'
      )}
      aria-hidden={ariaHidden}
    >
      {children}
    </div>
  );
}
