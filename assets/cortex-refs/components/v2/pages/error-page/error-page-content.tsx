'use client';

import { Button } from '@/components/components/ui/button';
import { Typography } from '@/components/components/ui/typography';
import MainLayout from '@/components/v2/layouts/main-layout';
import { useRouter } from 'next/navigation';
import { Action, ActionConfig, getErrorConfig } from './error-configs';

interface ErrorPageContentProps {
  errorType: string | null;
  customActions?: ActionConfig[];
}

const renderActionButtons = (actions: Action[]) => {
  return (
    <div className="flex flex-row justify-center gap-2">
      {actions.map(({ key, label, variant, onClick, show }: Action) => (
        <Button
          key={key}
          variant={variant}
          size="lg"
          onClick={onClick}
          hidden={show}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

export function ErrorPageContent({
  errorType,
  customActions,
}: ErrorPageContentProps) {
  const router = useRouter();
  const config = getErrorConfig(errorType || 'default', {
    router,
    customActions,
  });

  const { title, message, subtitle, helpText, actions } = config;

  return (
    <MainLayout>
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-3/6 flex flex-col text-center gap-4">
          <Typography
            component="h3"
            variant="overline-md"
            className="text-foreground"
          >
            {title}
          </Typography>
          <Typography
            component="h1"
            variant="display-lg"
            className="text-foreground"
          >
            {message}
          </Typography>
          <Typography
            component="p"
            variant="body-lg"
            className="text-foreground"
          >
            {subtitle}
          </Typography>
          <Typography component="p" className="text-foreground pt-4">
            {helpText}
          </Typography>
          {renderActionButtons(actions)}
        </div>
      </div>
    </MainLayout>
  );
}
