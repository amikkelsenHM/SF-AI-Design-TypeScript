import {
  Alert,
  AlertDescription,
  AlertVariants,
} from '@/components/components/ui/alert';
import { Typography } from '@/components/components/ui/typography';
import Link from 'next/link';
import { CheckIcon } from '../icons';
import CloseIcon from '../icons/close';
import HazardIcon from '../icons/hazard';
import InfoIcon from '../icons/info';

export interface NotificationBannerConfig {
  variant: AlertVariants['variant'];
  text: string;
  url?: string;
  redirectionLinkText?: string;
}

interface NotificationBannerProps extends NotificationBannerConfig {
  title?: string;
  icon?: React.ElementType;
  isOpen: boolean;
  onClose?: () => void;
  type?: 'top' | 'inline';
}

const iconVariants = {
  default: CheckIcon,
  error: HazardIcon,
  warning: InfoIcon,
  info: InfoIcon,
  success: CheckIcon,
};

export const NotificationBanner: React.FC<NotificationBannerProps> = ({
  variant,
  text,
  title,
  redirectionLinkText = 'Contact Support',
  url,
  isOpen,
  icon,
  onClose,
  type = 'top',
}) => {
  if (!isOpen) return null;

  const resolvedVariant = variant ?? 'default';
  const Icon = icon ?? iconVariants[resolvedVariant];

  if (type === 'inline') {
    return (
      <Alert variant={variant} type={type} className="flex flex-col gap-2">
        {title && (
          <div className="flex items-center gap-3 mb-2">
            <Icon />
            <Typography component="span" variant="body-sm">
              {title}
            </Typography>
          </div>
        )}
        <AlertDescription className="typography-body-sm">
          {text}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert variant={variant} type={type}>
      <Icon />
      <AlertDescription className="text-sm">{text}</AlertDescription>
      {url && (
        <Link href={url} className="underline">
          {redirectionLinkText}
        </Link>
      )}
      <CloseIcon className="ml-auto cursor-pointer" onClick={onClose} />
    </Alert>
  );
};
