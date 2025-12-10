import { Button } from '@/components/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogVariants,
} from '@/components/components/ui/dialog';
import { cn } from '@/components/lib/utils';
import { ComponentProps, useMemo } from 'react';
import { InfoIcon } from '../icons';

type ContentProps = ComponentProps<typeof DialogContent>;

type ContentHandlers = {
  [K in keyof ContentProps as K extends `on${string}`
    ? K
    : never]: ContentProps[K];
};

interface NotificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  variant: DialogVariants['variant'];
  description?: React.ReactNode;
  children?: React.ReactNode;
  contentClassName?: string;
  isLoading?: boolean;
  disableSecondaryButton?: boolean;
  container?: Element;
  closeOnOutsideInteraction?: boolean;
}

export const NotificationDialog: React.FC<NotificationDialogProps> = ({
  title,
  primaryButtonText,
  secondaryButtonText,
  isOpen,
  variant,
  onClose,
  onConfirm,
  description = 'Are you sure you want to proceed?',
  isLoading,
  children,
  contentClassName,
  disableSecondaryButton,
  container,
  closeOnOutsideInteraction = true,
}) => {
  const handlers = useMemo<ContentHandlers>(
    () =>
      closeOnOutsideInteraction
        ? {}
        : {
            onPointerDownOutside: (event) => event.preventDefault(),
            onInteractOutside: (event) => event.preventDefault(),
          },
    [closeOnOutsideInteraction]
  );

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
      modal={closeOnOutsideInteraction}
    >
      <DialogContent
        className={cn(
          'bg-background-contrast p-0 rounded-t-xl border-0 w-113',
          contentClassName
        )}
        variant={variant}
        container={container}
        {...handlers}
      >
        {/* Header */}
        <DialogHeader variant={variant}>
          <InfoIcon width="24" height="24" />
          <DialogTitle className="font-semibold text-m font-sans min-h-[18px]">
            {title}
          </DialogTitle>
          <div className="ml-auto cursor-pointer" onClick={onClose}></div>
        </DialogHeader>

        {/* Content */}
        {typeof description === 'string' ? (
          <DialogDescription className="text-sm font-primary min-h-7.5 py-[15px] px-6 gap-6 text-foreground">
            {description}
          </DialogDescription>
        ) : (
          <div className="text-sm font-primary min-h-7.5 py-[15px] px-6 gap-6 text-foreground">
            {description}
          </div>
        )}
        {children}

        {/* Footer */}
        <DialogFooter className="flex justify-end gap-2.5 pr-2 h-15 border-t border-foreground-contrast items-center px-2">
          <div className="flex flex-row h-8 gap-3">
            <Button
              variant="tertiary"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              disabled={isLoading}
            >
              {primaryButtonText}
            </Button>
            {secondaryButtonText && (
              <Button
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  onConfirm();
                }}
                isLoading={isLoading}
                disabled={disableSecondaryButton}
              >
                {secondaryButtonText}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
