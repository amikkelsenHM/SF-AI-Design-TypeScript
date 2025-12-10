import { ColumnDef } from '@tanstack/react-table';

interface Admins {
  name: string;
  surname: string;
  email: string;
}

export const platformAdminColumns: ColumnDef<Admins>[] = [
  {
    accessorKey: 'name',
    header: 'FIRST NAME',
    cell: (info) => info.getValue(),
    meta: {
      className: 'border-none w-[180px] min-w-[180px]',
    },
  },
  {
    accessorFn: (row) => row?.surname || '',
    id: 'surname',
    header: 'SURNAME',
    cell: (info) => info.getValue(),
    meta: {
      className: 'border-none w-[180px] min-w-[180px]',
    },
  },
  {
    accessorFn: (row) => row?.email || '',
    id: 'email',
    header: 'EMAIL',
    cell: (info) => info.getValue(),
    meta: {
      className: 'border-none',
    },
  },
];
