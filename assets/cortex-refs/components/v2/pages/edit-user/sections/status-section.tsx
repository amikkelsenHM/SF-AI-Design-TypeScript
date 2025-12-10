'use client';

import { Switch } from '@/components/components/ui/switch';
import { InfoBlock } from '@/components/v2/info-block';
import { NotificationBanner } from '@/components/v2/notification-banner/notification-banner';
import { useGetUserById } from 'hooks/queries/accountQuery';
import { useUpdateUserById } from 'hooks/queries/mutations/useUpdateUserById';
import { useParams } from 'next/navigation';
import { useCallback, useState } from 'react';

export const StatusSection = () => {
  const { id } = useParams() as { id: string };
  const { data } = useGetUserById(id);
  const { mutateAsync, isPending } = useUpdateUserById(id);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isDisabled = data?.disabled ?? false;
  const isActive = !isDisabled;

  const handleToggle = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      await mutateAsync({ key: 'disabled', value: (!isDisabled).toString() });
    } catch (err: any) {
      const msg = err?.payload || err?.message || 'Unexpected error';
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  }, [isDisabled, mutateAsync]);

  return (
    <>
      <NotificationBanner
        variant="error"
        text={errorMessage}
        isOpen={!!errorMessage}
        onClose={() => setErrorMessage('')}
      />
      <InfoBlock title="Status" />
      <div className="flex items-center gap-3">
        <label htmlFor="account-status" className="text-sm text-foreground">
          User account active:
        </label>
        <Switch
          id="account-status"
          checked={isActive}
          disabled={isPending || isLoading}
          onCheckedChange={handleToggle}
        />
      </div>
    </>
  );
};
