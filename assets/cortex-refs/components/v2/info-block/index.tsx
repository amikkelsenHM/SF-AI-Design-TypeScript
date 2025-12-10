'use client';

import { Button, buttonVariants } from '@/components/components/ui/button';
import { Separator } from '@/components/components/ui/separator';
import { cn } from '@/components/lib/utils';
import { VariantProps } from 'class-variance-authority';
import { useFeatureFlag } from 'hooks/useFeatureFlag';
import { useRouter } from 'next/navigation';
import { ReactNode, RefObject } from 'react';
import SfTooltip from '../tooltip/sf-tooltip';

interface InfoBlockProps {
  title: string;
  description?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  link?: string;
  scrollToRef?: RefObject<HTMLElement>;
  className?: string;
  buttonVariant?: VariantProps<typeof buttonVariants>['variant'];
  rightSlot?: ReactNode;
  titleClassNames?: string;
  showSeparator?: boolean;
  featureFlagKey?: string;
  isOutOfScopePage?: boolean;
  buttonAdjacent?: ReactNode;
}

export function InfoBlock({
  title,
  description,
  buttonLabel,
  onButtonClick,
  link,
  scrollToRef,
  className,
  buttonVariant,
  rightSlot,
  titleClassNames,
  showSeparator = false,
  featureFlagKey,
  isOutOfScopePage,
  buttonAdjacent,
}: InfoBlockProps) {
  const router = useRouter();
  const isFeatureEnabled = useFeatureFlag(featureFlagKey || '', true);

  const handleClick = () => {
    if (scrollToRef?.current) {
      scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (onButtonClick) {
      onButtonClick();
      return;
    }

    if (link) {
      router.push(link);
    }
  };

  return (
    <>
      <div className={cn('flex justify-between items-start gap-4', className)}>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-foreground">
            <h2
              style={{ fontFamily: 'NBRegular' }}
              className={cn(
                'text-[18px] leading-[110%] tracking-[0.022px] uppercase font-normal',
                'text-foreground',
                !description && !buttonLabel && 'pb-3',
                titleClassNames
              )}
            >
              {title}
            </h2>
            {isOutOfScopePage && (
              <SfTooltip text="This page is currently out of scope and it's flagged with LD" />
            )}
          </div>

          {(description || buttonLabel) && (
            <div className="pt-1">
              {description && (
                <p
                  className={cn(
                    'text-[12px] leading-[140%] font-normal text-foreground font-plex',
                    buttonLabel && 'pb-4'
                  )}
                >
                  {description}
                </p>
              )}

              {buttonLabel && isFeatureEnabled && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={handleClick}
                      variant={buttonVariant ?? 'primary'}
                    >
                      {buttonLabel}
                    </Button>
                    {buttonAdjacent}
                  </div>
                  {featureFlagKey && (
                    <div className="text-foreground">
                      <SfTooltip text="This button is only visible for admins and it's flagged with LD" />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {rightSlot && <div>{rightSlot}</div>}
      </div>
      {showSeparator && (
        <Separator className="mt-11 mb-8 bg-border-progress max-w-[600px]" />
      )}
    </>
  );
}
