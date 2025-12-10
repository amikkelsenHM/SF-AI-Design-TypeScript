'use client';

import { Card, CardContent } from '@/components/components/ui/card';
import { LinkButton } from '@/components/components/ui/link-button';
import { Typography } from '@/components/components/ui/typography';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren, ReactNode } from 'react';
import logo from '../../../../../public/images/Spaceflux_Logo.svg';

type AuthShellProps = PropsWithChildren<{
  heading?: string;
  subheading?: ReactNode;
  logoHref?: string;
  hideHeader?: boolean;
  children: ReactNode;
  buttonToSignin?: boolean;
}>;

export default function AuthWrapper({
  heading,
  subheading,
  logoHref = '/signin',
  hideHeader = false,
  children,
  buttonToSignin = false,
}: AuthShellProps) {
  return (
    <div className="bg-background flex justify-center overflow-hidden absolute right-[5rem] w-[560px] max-w-[560px]">
      <div className="relative flex bg-foreground-subtle text-foreground ">
        <Card className="w-[560px] max-w-[560px] p-14 bg-transparent border-none shadow-none">
          <Link href={logoHref} aria-label="Go to sign in">
            <Image
              src={logo}
              alt="spaceFlux-logo"
              loading="lazy"
              className="mb-4 cursor-pointer"
              priority={false}
            />
          </Link>
          <CardContent className="p-0">
            <div>
              {!hideHeader && (heading || subheading) && (
                <div className="mb-5 space-y-2">
                  {heading && (
                    <Typography variant="heading-md">{heading}</Typography>
                  )}
                  {subheading && (
                    <Typography variant="body-lg">{subheading}</Typography>
                  )}
                </div>
              )}
              {buttonToSignin && (
                <LinkButton
                  variant="primary"
                  size="lg"
                  href="/signin"
                  aria-label="Go to sign in"
                >
                  Back to sign in
                </LinkButton>
              )}
            </div>
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
