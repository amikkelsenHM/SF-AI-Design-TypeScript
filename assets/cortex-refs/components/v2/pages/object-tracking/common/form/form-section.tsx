import { Separator } from '@/components/components/ui/separator';
import { Typography } from '@/components/components/ui/typography';
import { cn } from '@/components/lib/utils';
import { ReactNode } from 'react';

const GRID_COLS_CLASS_MAP: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
};

interface FormSectionProps {
  title?: string;
  hasSeparator?: boolean;
  gridCols?: number;
  className?: string;
  children: ReactNode;
}

export function FormSection({
  title,
  hasSeparator = true,
  gridCols = 1,
  className,
  children,
}: FormSectionProps) {
  return (
    <section
      className={cn('grid gap-8', GRID_COLS_CLASS_MAP[gridCols], className)}
    >
      {title && (
        <Typography
          component="h3"
          variant="overline-md"
          className="text-foreground col-span-full"
        >
          {title}
        </Typography>
      )}

      {children}

      {hasSeparator && (
        <Separator className="bg-border-progress col-span-full" />
      )}
    </section>
  );
}
