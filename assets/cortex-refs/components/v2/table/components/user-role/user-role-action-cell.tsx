import { IMembership } from 'models/interfaces/IMembership';
import EditOutlinedIcon from '../../../icons/edit-outlined';
import TrashIcon from '../../../icons/trash';
import { Organisation } from '../../columns/account-settings/organisation';
import { useUserRoleActionDialog } from './useUserRoleActionDialog';

export const UserRoleActionCell = ({
  memberships,
  userId,
  currentRow,
}: {
  memberships: IMembership[];
  userId: string;
  currentRow: Organisation;
}) => {
  const { triggerEdit, triggerTableDelete, Dialog } = useUserRoleActionDialog({
    memberships,
    userId,
    currentRow,
  });

  return (
    <>
      <div className="flex flex-row-reverse gap-2">
        <button onClick={triggerTableDelete} className="cursor-pointer">
          <TrashIcon size="sm" />
        </button>
        <button onClick={triggerEdit} className="cursor-pointer">
          <EditOutlinedIcon />
        </button>
      </div>
      {Dialog}
    </>
  );
};
