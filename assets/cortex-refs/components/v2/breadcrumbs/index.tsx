'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/components/ui/breadcrumb';
import { Typography } from '@/components/components/ui/typography';
import { BreadcrumbsProps } from 'models/interfaces/v2/IBreadcrumb';
import { generateBreadcrumbs } from 'utils/v2/generateBreadcrumbs';

const Breadcrumbs: FC<BreadcrumbsProps> = ({ customBreadcrumbs }) => {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(customBreadcrumbs, pathname);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map(({ href, text }, index) => (
          <div key={index} className="flex items-center">
            <BreadcrumbItem>
              {href ? (
                <BreadcrumbLink asChild>
                  <Link href={href}>{text}</Link>
                </BreadcrumbLink>
              ) : (
                <Typography>{text}</Typography>
              )}
            </BreadcrumbItem>

            {index !== breadcrumbs.length - 1 && (
              <BreadcrumbSeparator>|</BreadcrumbSeparator>
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
