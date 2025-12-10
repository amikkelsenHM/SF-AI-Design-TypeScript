import { ColumnDef } from '@tanstack/react-table';
import { TelescopeEvent } from 'hooks/queries/telescopeQuery';

export const columns: ColumnDef<TelescopeEvent>[] = [
  {
    accessorKey: 'date',
    header: 'Date / Time',
  },
  {
    accessorKey: 'event',
    header: 'Event',
  },
  {
    accessorKey: 'description',
    header: 'Description',
    meta: {
      className: 'w-1/2',
      getStyles: () => ({
        className: 'w-1/2 whitespace-normal',
      }),
    },
  },
];
