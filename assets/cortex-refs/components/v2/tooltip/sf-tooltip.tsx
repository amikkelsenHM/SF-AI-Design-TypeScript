import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/components/ui/tooltip';
import { Typography } from '@/components/components/ui/typography';
import { cn } from '@/components/lib/utils';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { InfoIcon } from 'lucide-react';
import {
  cloneElement,
  ComponentProps,
  HTMLAttributes,
  isValidElement,
  MouseEvent,
  ReactElement,
  ReactNode,
} from 'react';

interface SfTooltipProps
  extends Omit<ComponentProps<typeof Tooltip>, 'children'> {
  icon?: ReactNode;
  header?: string;
  text?: string | ReactNode;
  trigger?: ReactNode | ReactElement<HTMLAttributes<HTMLElement>>;
  triggerAriaLabel?: string;
  stopPropagation?: boolean;
  contentProps?: Omit<
    ComponentProps<typeof TooltipPrimitive.Content>,
    'children'
  >;
  triggerProps?: Omit<
    ComponentProps<typeof TooltipTrigger>,
    'children' | 'asChild'
  >;
}

const SfTooltip: React.FC<SfTooltipProps> = ({
  icon,
  header,
  text,
  trigger,
  triggerAriaLabel = 'More info',
  stopPropagation = true,
  contentProps,
  triggerProps,
  ...tooltipProps
}) => {
  const triggerNode =
    trigger && isValidElement<HTMLAttributes<HTMLElement>>(trigger)
      ? cloneElement(trigger, {
          'aria-label': triggerAriaLabel,
          onClick: (e: MouseEvent<HTMLElement>) => {
            if (stopPropagation) e.stopPropagation();
            trigger.props.onClick?.(e);
          },
        })
      : null;
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip {...tooltipProps}>
        <TooltipTrigger asChild {...triggerProps}>
          {triggerNode ?? (
            <span role="button" aria-label={triggerAriaLabel}>
              <InfoIcon width="20" height="20" />
            </span>
          )}
        </TooltipTrigger>
        <TooltipContent
          {...contentProps}
          className={cn(
            'bg-tooltip-background text-white border-0 rounded-none',
            'p-6 gap-6 w-sm shadow-md z-[9999]',
            'flex flex-col text-wrap text-start',
            contentProps?.className
          )}
        >
          <>
            {(icon || header) && (
              <div className="flex flex-row items-center gap-2">
                {icon}
                {header && (
                  <Typography variant="heading-sm" className="text-white">
                    {header}
                  </Typography>
                )}
              </div>
            )}
            {text && <Typography className="text-white">{text}</Typography>}
          </>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SfTooltip;
