'use client';

import { LinkButton } from '@/components/components/ui/link-button';
import { usePathname } from 'next/navigation';
import { HEADER_ACTIONS_CONFIG } from '../../constants/object-tracking-detail';
import CreateTaskButton from './create-task-button';

export default function ObjectTrackingHeaderActions() {
  const pathname = usePathname();

  return (
    <div className="flex gap-3">
      {HEADER_ACTIONS_CONFIG.map((config) =>
        config.id === 'manage' ? (
          config.visibleWhen(pathname) && (
            <LinkButton
              key={config.id}
              variant={config.variant}
              href={config.href}
            >
              {config.label}
            </LinkButton>
          )
        ) : (
          <CreateTaskButton
            key={config.id}
            subscriptionType={config.type}
            variant={config.variant}
          />
        )
      )}
    </div>
  );
}
