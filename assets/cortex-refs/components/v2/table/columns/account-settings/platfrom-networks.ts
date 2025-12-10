import { ColumnDef } from '@tanstack/react-table';

interface PlatformNetwork {
  name: string;
  sensors: number;
}

export const platformNetworkColumns: ColumnDef<PlatformNetwork>[] = [
  {
    accessorKey: 'name',
    header: 'NAME',
    cell: (info) => info.getValue(),
    meta: {
      className: 'border-none',
    },
  },
  {
    accessorFn: (row) => row?.sensors || '',
    id: 'sensors',
    header: 'SENSORS',
    cell: (info) => Number(info.getValue()),
    meta: {
      className: 'border-none w-[70px] min-w-[70px]',
    },
  },
];
