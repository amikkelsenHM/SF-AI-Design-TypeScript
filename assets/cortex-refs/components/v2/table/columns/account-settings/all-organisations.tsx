'use client';

import { Pill } from '@/components/components/pill';
import { ColumnDef, Row, SortingFn } from '@tanstack/react-table';
import { OrganisationActionsCell } from '../../components/organisation-actions-cell';

export interface Organisation {
  id: string;
  name: string;
  members: number;
  networks: string | string[];
}

const caseInsensitiveSortingFn: SortingFn<Organisation> = (
  rowA: Row<Organisation>,
  rowB: Row<Organisation>,
  columnId: string
) => {
  const valueA = rowA.getValue(columnId)?.toString() || '';
  const valueB = rowB.getValue(columnId)?.toString() || '';

  return valueA.localeCompare(valueB, undefined, {
    sensitivity: 'base',
  });
};

export const allOrganisations: ColumnDef<Organisation>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    sortingFn: caseInsensitiveSortingFn,
    sortDescFirst: true,
  },
  {
    accessorKey: 'members',
    header: 'Members',
    meta: { filterType: 'number' },
  },
  {
    accessorKey: 'networks',
    header: 'Network',
    cell: (info) => {
      const value = info.getValue() as string | string[];

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
    accessorKey: 'action',
    header: '',
    enableColumnFilter: false,
    enableSorting: false,
    cell: (info) => {
      const row = info.row.original;
      return <OrganisationActionsCell organisation={row} />;
    },
  },
];
