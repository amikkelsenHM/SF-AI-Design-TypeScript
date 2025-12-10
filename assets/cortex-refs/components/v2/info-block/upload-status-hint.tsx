'use client';

import { useNavigation } from '@/hooks/useNavigation';
import { cn } from '@/components/lib/utils';

type UploadStatusHintProps = {
  created?: boolean;
  sent?: boolean;
  errorText?: string | null;
  className?: string;
};

export function UploadStatusHint({
  created,
  sent,
  errorText,
  className,
}: UploadStatusHintProps) {
  const { navigate } = useNavigation({ linkTo: '/settings?tab=users' });

  if (errorText) {
    return (
      <p className={cn('text-xs text-foreground', className)}>
        <span className="text-red-500">Upload failed:</span>
        <span className="opacity-90">Please try again</span>
      </p>
    );
  }

  if (created && !sent) {
    return (
      <p className={cn('text-xs text-foreground', className)}>
        <span className="text-green-500 mr-1">Upload complete:</span>
        Please review and send invites
      </p>
    );
  }

  if (sent) {
    return (
      <p
        className={cn(
          'flex flex-wrap items-center gap-1 text-xs text-foreground',
          className
        )}
      >
        <span className="text-green-500 mr-1">Invites sent:</span>
        <span>You can review the invite status via the</span>
        <button
          type="button"
          onClick={navigate}
          className="underline underline-offset-2 transition cursor-pointer"
        >
          Users
        </button>
        <span>page</span>
      </p>
    );
  }

  return null;
}
