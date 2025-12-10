import { Badge } from '@/components/components/ui/badge';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/components/ui/card';
import { Skeleton } from '@/components/components/ui/skeleton';
import { Typography } from '@/components/components/ui/typography';
import { cn } from '@/components/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

interface BadgeConfig {
  text: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

interface KpiInnerCardConfig {
  title: string;
  content: string | React.ReactNode;
  footnote?: React.ReactNode;
}

interface DetailItemConfig {
  title: string;
  content: React.ReactNode;
}

const kpiCardVariants = cva('', {
  variants: {
    variant: {
      large: 'min-h-[150px] h-auto w-[250px] rounded-b-lg',
      small: 'w-fit flex flex-col gap-1 border-r border-r-border-progress px-2',
      detailed: 'rounded-b-lg min-h-[275px] w-[275px]',
    },
    width: {
      fill: 'w-full',
    },
  },
  defaultVariants: {
    variant: 'large',
  },
});

const kpiCardHeaderVariants = cva('rounded-t-base text-foreground', {
  variants: {
    status: {
      success: 'bg-background-success text-foreground-dark',
      warning: 'bg-background-warning text-foreground-dark',
      error: 'bg-background-error',
    },
  },
});

const KpiCardDetailItem: React.FC<DetailItemConfig> = ({ title, content }) => (
  <div className="flex min-h-9">
    <div className="px-3 py-2 w-22.5">
      <Typography variant="body-sm">{title}</Typography>
    </div>
    <div className="px-3 py-2">
      <Typography variant="body-sm">{content}</Typography>
    </div>
  </div>
);

interface KpiCardProps
  extends VariantProps<typeof kpiCardVariants>,
    VariantProps<typeof kpiCardHeaderVariants>,
    KpiInnerCardConfig {
  badges?: BadgeConfig[];
  action?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
  footnoteClassName?: string;
  cardClassName?: string;
  headerClassName?: string;
  contentAreaClassName?: string;
  innerCards?: KpiInnerCardConfig[];
  detailItems?: DetailItemConfig[];
  isLoading?: boolean;
}

const KpiCard: React.FC<KpiCardProps> = ({
  variant,
  status,
  width,
  title,
  content,
  footnote,
  badges = [],
  action,
  innerCards = [],
  detailItems = [],
  className,
  titleClassName,
  contentClassName,
  footnoteClassName,
  cardClassName,
  headerClassName,
  contentAreaClassName,
  isLoading = false,
}) => {
  const isStringContent = typeof content === 'string';
  if (variant === 'small') {
    return (
      <div className={cn(kpiCardVariants({ variant, width }), className)}>
        <Typography
          variant="label"
          className={cn('font-normal text-white', titleClassName)}
        >
          {title}
        </Typography>
        <Typography
          variant="body-lg"
          className={cn('font-normal text-white', contentClassName)}
        >
          {content}
        </Typography>
        {footnote && (
          <Typography
            variant="footnote"
            className={cn('font-normal text-medium-orchid', footnoteClassName)}
          >
            {footnote}
          </Typography>
        )}
      </div>
    );
  }

  return (
    <Card className={cn(kpiCardVariants({ variant, width }), cardClassName)}>
      <CardHeader
        className={cn(
          'bg-foreground-contrast',
          kpiCardHeaderVariants({ status }),
          headerClassName
        )}
      >
        <CardTitle className={cn(titleClassName)}>{title}</CardTitle>
        {action && <CardAction>{action}</CardAction>}
      </CardHeader>
      <CardContent
        className={cn(contentAreaClassName, variant === 'detailed' && 'pt-3')}
      >
        {isLoading ? (
          <Skeleton className="h-[30px] w-[50px]" />
        ) : isStringContent ? (
          <Typography
            variant="heading-md"
            className={cn(
              'font-normal text-white capitalize',
              contentClassName,
              variant === 'detailed' && 'px-2.5'
            )}
          >
            {content}
          </Typography>
        ) : (
          content
        )}

        {innerCards.length > 0 && (
          <div className="flex px-1 my-3">
            {innerCards.map((innerCard, index) => (
              <KpiCard
                key={index}
                {...innerCard}
                variant="small"
                width="fill"
              />
            ))}
          </div>
        )}
        {detailItems.length > 0 && (
          <div className="flex flex-col text-foreground pb-3.5">
            {detailItems.map((detailItem, index) => (
              <KpiCardDetailItem key={index} {...detailItem} />
            ))}
          </div>
        )}
        <div className="flex flex-col gap-2">
          {footnote && (
            <Typography className={cn('text-white pt-2', footnoteClassName)}>
              {footnote}
            </Typography>
          )}
          {badges.length > 0 && (
            <div className="flex gap-2">
              {badges.map(({ text, variant, className }, index) => (
                <Badge
                  key={`${text}-${index}`}
                  variant={variant || 'primary'}
                  className={cn(
                    'bg-background-warning font-normal text-xs my-1',
                    className
                  )}
                >
                  {text}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default KpiCard;
export type { BadgeConfig, KpiCardProps };
