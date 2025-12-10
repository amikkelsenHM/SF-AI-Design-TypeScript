'use client';

import { flexRender, Table } from '@tanstack/react-table';

import {
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/components/ui/table';
import { cn } from '@/components/lib/utils';
import { SortArrow } from '../../icons/sort-arrow';

const SortDirection = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

interface SFDataTableHeaderProps<TData> {
  table: Table<TData>;
  enableSorting: boolean;
  cellHeaderClassName?: string;
}

export function SFDataTableHeader<TData>({
  table,
  enableSorting,
  cellHeaderClassName,
}: SFDataTableHeaderProps<TData>) {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id} className="border-none">
          {headerGroup.headers.map((header) => (
            <TableHead
              key={header.id}
              className={cn(
                'typography-body-sm h-9 font-normal bg-foreground-contrast border-b border-foreground-subtle text-left text-foreground',
                header.column.columnDef.meta?.className,
                cellHeaderClassName,
                enableSorting && header.column.getCanSort() && 'cursor-pointer'
              )}
              onClick={header.column.getToggleSortingHandler()}
            >
              <div className="flex items-center">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                {enableSorting && header.column.getCanSort() && (
                  <span className="ml-2">
                    <SortArrow
                      rotate={
                        header.column.getIsSorted() === SortDirection.ASC
                          ? 180
                          : undefined
                      }
                      className={
                        !header.column.getIsSorted() ? 'invisible' : undefined
                      }
                    />
                  </span>
                )}
              </div>
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
}
