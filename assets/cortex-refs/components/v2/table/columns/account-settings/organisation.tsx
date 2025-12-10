import { ColumnDef } from '@tanstack/react-table';
import { IMembership } from 'models/interfaces/IMembership';
import { UserRoleActionCell } from '../../components/user-role/user-role-action-cell';

export interface Organisation {
  id: string;
  name: string;
  role: string;
}

/**
 * Creates table column definitions for displaying user organizations with role management.
 *
 * @param orgData - Array of user memberships containing organization and role data
 *                  Example: [{ organization: { id: "123", name: "Acme Corp" }, role: { id: "456", name: "Manager" } }]
 * @param readOnly - Controls if action buttons are shown (default: true)
 *                   true = view-only mode, false = allows role editing
 * @param userId - ID of the user whose roles are being managed
 *                 Example: "user-789" - required when readOnly is false
 *
 * @returns Column definitions for react-table displaying:
 *          - NAME column: Organization name (e.g., "Acme Corp", "Tech Solutions")
 *          - ROLE column: User's role in organization (e.g., "Manager", "Member", "DataViewer")
 *          - ACTION column: Edit/manage buttons (only shown when readOnly=false)
 */
export const organisationColumns = (
  orgData: IMembership[],
  readOnly = true,
  userId?: string
): ColumnDef<Organisation>[] => {
  return [
    {
      accessorKey: 'name',
      header: 'NAME',
      cell: (info) => info.getValue(),
      meta: {
        className: 'border-none w-[150px] min-w-[150px]',
      },
    },
    {
      accessorFn: (row) => row?.role || '',
      id: 'role',
      header: 'ROLE',
      cell: (info) => info.getValue(),
      meta: {
        className: 'border-none',
      },
    },
    {
      accessorKey: 'action',
      header: '',
      enableColumnFilter: false,
      enableSorting: false,
      cell: (info) => {
        const row = info.row.original;
        return (
          !readOnly && (
            <UserRoleActionCell
              userId={userId || ''}
              memberships={orgData}
              currentRow={row}
            />
          )
        );
      },
    },
  ];
};
