'use client';

import { NotificationDialog } from '@/components/v2/dialog/notification-dialog';
import { InfoBlock } from '@/components/v2/info-block';
import { useNavigation } from '@/hooks/useNavigation';
import { useDeleteUserById } from 'hooks/queries/mutations/useDeleteUserById';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const DEFAULT_FALLBACK = '/settings?tab=users';

export const DeleteAccountSection = () => {
  const { id } = useParams() as { id: string };
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useDeleteUserById(id);
  const { navigate } = useNavigation({
    back: true,
    linkTo: DEFAULT_FALLBACK,
  });

  const handleDelete = () => {
    mutate(undefined, {
      onSuccess: () => {
        setOpen(false);
        navigate();
      },
    });
  };

  return (
    <>
      <InfoBlock
        title="Delete Account"
        description="Deleting account, you will remove all information about user in system"
        buttonLabel="Delete Account"
        buttonVariant="secondary"
        onButtonClick={() => setOpen(true)}
        titleClassNames="mb-8"
      />

      <NotificationDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        description="This action will permanently remove the user from the system. Are you sure you want to continue?"
        primaryButtonText="Cancel"
        secondaryButtonText="Confirm"
        variant="warning"
        isLoading={isPending}
      />
    </>
  );
};
