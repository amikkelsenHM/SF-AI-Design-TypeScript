import { NotificationDialog } from '@/components/v2/dialog/notification-dialog';
import { useDeleteSubscriptionById } from '@/hooks/queries/mutations/useDeleteSubscriptionById';
import Link from 'next/link';
import { useState } from 'react';
import DeleteIcon from '../../icons/delete';
import EditOutlinedIcon from '../../icons/edit-outlined';

export const SubscriptionActionCell = ({
  subscription,
}: {
  subscription: any;
}) => {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useDeleteSubscriptionById();

  const handleDelete = () => {
    mutate(
      {
        subscriptionId: subscription.id,
      },
      {
        onSuccess: () => setOpen(false),
      }
    );
  };

  return (
    <>
      <div className="flex flex-row-reverse gap-2">
        <Link
          href={`/settings/package/${subscription.id}/edit`}
          className="cursor-pointer"
        >
          <EditOutlinedIcon />
        </Link>
        <button onClick={() => setOpen(true)} className="cursor-pointer">
          <DeleteIcon />
        </button>
      </div>

      <NotificationDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        title="Delete Pakcage"
        description="This will permanently delete the package. Are you sure?"
        primaryButtonText="Cancel"
        secondaryButtonText="Confirm"
        variant="warning"
        isLoading={isPending}
      />
    </>
  );
};
