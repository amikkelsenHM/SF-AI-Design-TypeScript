import { ColumnDef } from '@tanstack/react-table';

export enum UsageRowIds {
  PLAN = 'plan',
  THIS_TASK = 'this-task',
  REMAINING = 'remaining',
}

interface TableData {
  id: UsageRowIds;
  label: string;
  value: string;
}

export const usageColumns: ColumnDef<TableData>[] = [
  {
    accessorKey: 'label',
  },
  {
    accessorKey: 'value',
    meta: {
      getStyles: () => ({
        className: 'w-full',
      }),
    },
  },
];
