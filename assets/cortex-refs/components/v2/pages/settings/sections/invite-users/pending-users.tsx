'use client';

import { NotificationDialog } from '@/components/v2/dialog/notification-dialog';
import {
  getPendingUsersColumns,
  PendingUser,
} from '@/components/v2/table/columns/account-settings/pending-users';
import { useGetPendingUsers } from '@/hooks/queries/accountQuery';
import { useRejectPendingUser } from '@/hooks/queries/mutations/useRejectPendingUser';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import TableSection from '../table-section';
import { ApproveUserDialog } from './dialogs/approve-user-dialog';
import { UserDetailsSection } from './dialogs/user-details-section';

export const PendingUsersSection = () => {
  const { data } = useGetPendingUsers();
  const pendingUsers = data?.payload || [];
  const searchParams = useSearchParams();
  const approveId = searchParams?.get('approveId');
  const rejectId = searchParams?.get('rejectId');

  const [selectedUser, setSelectedUser] = useState<PendingUser | null>(null);
  const [dialogType, setDialogType] = useState<'approve' | 'reject' | null>(
    null
  );

  const handleApproveClick = (user: PendingUser) => {
    setSelectedUser(user);
    setDialogType('approve');
  };

  const handleRejectClick = (user: PendingUser) => {
    setSelectedUser(user);
    setDialogType('reject');
  };

  const { mutate: rejectUser, isPending: isRejecting } = useRejectPendingUser();

  const handleRejectConfirm = () => {
    if (!selectedUser?.id) return;
    rejectUser(selectedUser.id, {
      onSuccess: () => {
        setSelectedUser(null);
        setDialogType(null);
      },
    });
  };

  const columns = useMemo(
    () =>
      getPendingUsersColumns({
        onApprove: handleApproveClick,
        onReject: handleRejectClick,
      }),
    []
  );

  useEffect(() => {
    const pendingUserId = approveId || rejectId;
    if (!pendingUserId) return;

    const pendingUser = pendingUsers.find(
      (user: PendingUser) => user.id === pendingUserId
    );
    if (!pendingUser) return;

    setSelectedUser(pendingUser);
    setDialogType(approveId ? 'approve' : 'reject');
  }, [approveId, rejectId, pendingUsers]);

  return (
    <>
      <TableSection
        title="Pending Users"
        description="Approve user who have requested access to the platfrom"
        titleClasses="mb-3"
        columns={columns}
        data={pendingUsers}
        variant="rounded"
        features={{
          tableKey: 'pendingUsers',
          sorting: true,
          sortState: [{ id: 'name', desc: false }],
        }}
      />

      <ApproveUserDialog
        isOpen={dialogType === 'approve'}
        onClose={() => setDialogType(null)}
        onSubmit={async () => {}}
        isLoading={false}
        user={selectedUser}
      />

      {dialogType === 'reject' && selectedUser && (
        <NotificationDialog
          isOpen
          onClose={() => setDialogType(null)}
          onConfirm={handleRejectConfirm}
          title={'Reject User'}
          description={
            <UserDetailsSection
              user={selectedUser}
              showOrganisationFields={false}
            />
          }
          variant="warning"
          isLoading={isRejecting}
          primaryButtonText="Cancel"
          secondaryButtonText="Confirm"
        />
      )}
    </>
  );
};
