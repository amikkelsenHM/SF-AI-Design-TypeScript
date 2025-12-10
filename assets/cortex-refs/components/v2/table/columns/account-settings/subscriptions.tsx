import { ColumnDef } from '@tanstack/react-table';
import { SubscriptionUsageRow } from 'models/interfaces/v2/subscriptions';

export const subscriptionUsageColumns: ColumnDef<SubscriptionUsageRow>[] = [
  {
    accessorKey: 'label',
    header: '',
    cell: ({ row }) => (
      <span className="text-foreground">{row.original.label}</span>
    ),
  },
  {
    accessorKey: 'value',
    header: '',
    cell: ({ row }) => (
      <span className="text-foreground-muted">{row.original.value}</span>
    ),
  },
];
