'use client';

import { Pill } from '@/components/components/pill';
import { ColumnDef } from '@tanstack/react-table';
import {
  SubscriptionStatus,
  SubscriptionType,
  SubscriptionTypeLabel,
} from 'models/interfaces/v2/subscriptions';
import { SubscriptionActionCell } from '../../components/package-action-cell';
import { StatusCell } from '../../components/status-cell';

export type AllSubscriptionsRow = {
  id: string;
  name: string;
  type: SubscriptionType;
  organisation: string;
  usage: string;
  status: SubscriptionStatus;
  network?: string | string[];
};

export const allSubscriptionsColumns: ColumnDef<AllSubscriptionsRow>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: (info) => {
      const value = info.getValue() as SubscriptionType;
      const label =
        SubscriptionTypeLabel[value as keyof typeof SubscriptionTypeLabel] ??
        value;
      return <span className="capitalize">{label}</span>;
    },
  },
  {
    accessorKey: 'organisation',
    header: 'Organisation',
  },
  {
    accessorKey: 'usage',
    header: 'Usage',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (info) => <StatusCell status={info.getValue() as string} />,
  },
  {
    accessorKey: 'network',
    header: 'Network',
    cell: (info) => {
      const value = info.getValue() as string | string[] | undefined;
      if (!value) return <span>-</span>;
      if (Array.isArray(value)) {
        return (
          <>
            {value.map((val, idx) => (
              <Pill key={idx} className="mr-1">
                {val}
              </Pill>
            ))}
          </>
        );
      }
      return <Pill>{value}</Pill>;
    },
  },
  {
    id: 'action',
    header: '',
    enableColumnFilter: false,
    enableSorting: false,
    cell: (info) => {
      const row = info.row.original;
      return <SubscriptionActionCell subscription={row} />;
    },
  },
];
