'use client';

import { Typography } from '@/components/components/ui/typography';
import Arrow from '@/components/v2/icons/arrow';
import ArrowSmall from '@/components/v2/icons/arrow-small';
import { useHandleLogout } from 'helpers/useHandleLogout';
import { useNavigation } from 'hooks/useNavigation';
import { BreadcrumbItem } from 'models/interfaces/v2/IBreadcrumb';
import Image from 'next/image';
import { FC, ReactNode } from 'react';
import { Button } from '../../components/ui/button';
import Breadcrumbs from '../breadcrumbs';

const IMAGE_DIMENSION = 142;

interface HeaderProps {
  title: string | ReactNode;
  description?: string;
  component?: ReactNode;
  actionComponent?: ReactNode;
  imgSrc?: string;
  actions?: ReactNode;
  showBreadcrumbs?: boolean;
  customBreadcrumbs?: BreadcrumbItem[];
  onSearch?: () => void;
  standardActions?: {
    back?: boolean;
    logout?: boolean;
  };
}

const Header: FC<HeaderProps> = ({
  title,
  description,
  imgSrc,
  actions,
  onSearch,
  showBreadcrumbs = true,
  customBreadcrumbs,
  standardActions = {},
  component,
  actionComponent,
}) => {
  const { back, logout } = standardActions;

  const { navigate: handleBack } = useNavigation({
    back,
    linkTo: '/',
  });
  // TODO: need to be implemented
  const handleLogout = useHandleLogout({});

  return (
    <div className="flex gap-4.5 w-full pb-5 rounded-md text-foreground">
      {imgSrc && (
        <div className="size-35.5 rounded-full shrink-0">
          <Image
            src={imgSrc}
            alt="image"
            width={IMAGE_DIMENSION}
            height={IMAGE_DIMENSION}
            className="object-cover rounded-full"
          />
        </div>
      )}
      <div className="flex flex-col gap-2 w-full">
        {showBreadcrumbs && (
          <Breadcrumbs customBreadcrumbs={customBreadcrumbs} />
        )}

        <Typography
          component="h2"
          variant="heading-md"
          className="whitespace-nowrap max-w-[700px]"
        >
          {title}
        </Typography>
        {description && <Typography>{description}</Typography>}

        {component && component}
      </div>
      <div className="flex flex-col items-end gap-1">
        <div className="flex gap-1">
          {back && (
            <Button variant="secondary" size="icon-sm" onClick={handleBack}>
              <Arrow rotate={180} />
            </Button>
          )}

          {logout && (
            <Button
              variant="tertiary"
              iconPosition="left"
              onClick={handleLogout}
            >
              <ArrowSmall className="size-3" />
              Logout
            </Button>
          )}
        </div>
        {actionComponent && actionComponent}

        {actions && <div className="flex mt-auto gap-2">{actions}</div>}
      </div>
    </div>
  );
};

export default Header;
