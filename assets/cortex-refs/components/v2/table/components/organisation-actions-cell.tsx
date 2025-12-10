import { NotificationDialog } from '@/components/v2/dialog/notification-dialog';
import { useDeleteOrganisationById } from 'hooks/queries/mutations/useDeleteOrganisationById';
import Link from 'next/link';
import { useState } from 'react';
import DeleteIcon from '../../icons/delete';
import EditOutlinedIcon from '../../icons/edit-outlined';
import { Organisation } from '../columns/account-settings/all-organisations';

export const OrganisationActionsCell = ({
  organisation,
}: {
  organisation: Organisation;
}) => {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useDeleteOrganisationById();

  const handleDelete = () => {
    mutate(
      {
        organisationId: organisation.id,
      },
      {
        onSuccess: () => setOpen(false),
      }
    );
  };

  return (
    <>
      <div
        className="flex flex-row-reverse gap-2"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <Link
          href={`/settings/organisation/${organisation.id}/edit`}
          className="cursor-pointer"
        >
          <EditOutlinedIcon />
        </Link>
        <button
          onClick={(event) => {
            event.stopPropagation();
            setOpen(true);
          }}
          className="cursor-pointer"
        >
          <DeleteIcon />
        </button>
      </div>

      <NotificationDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        title="Delete Organisation"
        description="This will permanently delete the organisation. Are you sure?"
        primaryButtonText="Cancel"
        secondaryButtonText="Confirm"
        variant="warning"
        isLoading={isPending}
      />
    </>
  );
};
