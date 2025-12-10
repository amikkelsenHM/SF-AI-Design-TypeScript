import CheckSmallIcon from '@/components/v2/icons/check-small';
import CloseSmallIcon from '@/components/v2/icons/close-small';
import { ColumnDef } from '@tanstack/react-table';
import { renderDateCell } from 'helpers/v2/dates';

export interface PendingUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  reason: string;
  createdAt: string;
  phoneNumber?: string;
}

interface PendingUsersColumnProps {
  onApprove: (user: PendingUser) => void;
  onReject: (user: PendingUser) => void;
}

export const getPendingUsersColumns = ({
  onApprove,
  onReject,
}: PendingUsersColumnProps): ColumnDef<PendingUser>[] => [
  {
    header: 'Name',
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    id: 'name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'company',
    header: 'Company',
  },
  {
    accessorKey: 'reason',
    header: 'Reason',
  },
  {
    accessorKey: 'createdAt',
    header: 'Requested',
    cell: renderDateCell(),
  },
  {
    id: 'action',
    header: '',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex flex-row-reverse">
          <div className="flex gap-1">
            <div className="cursor-pointer" onClick={() => onApprove(user)}>
              <CheckSmallIcon />
            </div>
            <div className="cursor-pointer" onClick={() => onReject(user)}>
              <CloseSmallIcon />
            </div>
          </div>
        </div>
      );
    },
    enableSorting: false,
  },
];
