import { Typography } from '@/components/components/ui/typography';
import { cn } from '@/components/lib/utils';
import { FieldError as FieldErrorType } from 'react-hook-form';

const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
};

export const FieldError = ({
  error,
  hideError = false,
  className,
}: {
  error?: FieldErrorType;
  hideError?: boolean;
  className?: string;
}) => {
  if (hideError || !error) return null;

  return (
    <Typography
      variant="helper"
      className={cn('text-foreground-error', className)}
    >
      {error.message || ERROR_MESSAGES.REQUIRED_FIELD}
    </Typography>
  );
};
