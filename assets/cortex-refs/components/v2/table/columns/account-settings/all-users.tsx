'use client';

import { Pill } from '@/components/components/pill';
import EditOutlinedIcon from '@/components/v2/icons/edit-outlined';
import { UserStatus } from '@/utils/v2/adapters/user-adapter';
import { ColumnDef } from '@tanstack/react-table';
import { renderDateCell } from 'helpers/v2/dates';
import { DateFormat } from 'models/enums/v2/common';
import { IUserData } from 'models/interfaces/v2/auth';
import Link from 'next/link';
import { StatusCell } from '../../components/status-cell';
import { createEnumFilterOptions } from '../../filters/filter-util';

export const allUsersColumns: ColumnDef<IUserData>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    sortDescFirst: true,
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (info) => <StatusCell status={info.getValue() as string} />,
    meta: {
      filterType: 'select',
      filterOptions: createEnumFilterOptions(UserStatus),
    },
  },
  {
    accessorKey: 'lastAccess',
    header: 'Last Access',
    cell: renderDateCell(DateFormat.TimeShort),
    meta: {
      filterType: 'date',
    },
  },

  {
    accessorKey: 'memberships',
    header: 'Organisation',
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
      return (
        <div className="flex flex-row-reverse">
          <Link href={`/user/${row.id}`} className="cursor-pointer">
            <EditOutlinedIcon />
          </Link>
        </div>
      );
    },
  },
];
