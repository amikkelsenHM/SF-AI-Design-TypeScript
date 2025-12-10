'use client';

import { TableBody, TableCell } from '@/components/components/ui/table';
import { cn } from '@/components/lib/utils';
import { flexRender, Row, Table } from '@tanstack/react-table';
import { Easing, LayoutGroup, motion } from 'framer-motion';
import { ReactNode, useCallback } from 'react';
import { TableRowSkeleton } from './table-row-skeleton';

const layoutEase = [0.22, 1, 0.36, 1] as Easing;

interface SFDataTableBodyProps<TData> {
  table: Table<TData>;
  columnsCount: number;
  isLoading: boolean;
  enableExpanding: boolean;
  singleExpansion: boolean;
  emptyMessage: string;
  renderRowSubComponent?: (props: { row: Row<TData> }) => ReactNode;
  onRowClick?: (row: Row<TData>) => void;
  liftedId?: string;
  isAnimatingLift?: boolean;
  onRowBringToTopStepwise?: (row: Row<TData>) => Promise<void>;
  showRowCursor?: boolean;
}

export function SFDataTableBody<TData>({
  table,
  columnsCount,
  isLoading,
  enableExpanding,
  singleExpansion,
  emptyMessage,
  renderRowSubComponent,
  onRowClick,
  liftedId,
  isAnimatingLift,
  showRowCursor = false,
}: SFDataTableBodyProps<TData>) {
  const rows = table.getRowModel().rows;

  const handleRowClick = useCallback(
    (row: Row<TData>) => {
      if (enableExpanding) {
        const isExpanded = row.getIsExpanded();
        if (singleExpansion) table.resetExpanded();

        row.toggleExpanded(!isExpanded);
      }

      onRowClick && onRowClick(row);
    },
    [enableExpanding, table, onRowClick]
  );

  const renderRows = () => {
    if (isLoading) return <TableRowSkeleton columnsCount={columnsCount} />;

    if (rows.length === 0) {
      return (
        <tr>
          <TableCell
            colSpan={columnsCount}
            className="text-center text-foreground py-8"
          >
            {emptyMessage}
          </TableCell>
        </tr>
      );
    }

    return rows.flatMap((row) => {
      const isExpanded = row.getIsExpanded();
      const originalId =
        (row.original as TData & { id?: string })?.id ?? row.id;
      const selected = originalId === liftedId;

      const mainRow = (
        <motion.tr
          key={`row-${originalId}`}
          layout="position"
          transition={{
            layout: { duration: 0.2, ease: layoutEase },
          }}
          style={{ position: 'relative', willChange: 'transform' }}
          className={cn(
            'hover:bg-foreground-contrast border-none',
            showRowCursor && 'cursor-pointer',
            isExpanded && 'bg-border-progress',
            selected && 'bg-foreground-contrast',
            isAnimatingLift && !selected && 'pointer-events-none select-none'
          )}
          onClick={() => handleRowClick(row)}
        >
          {row.getVisibleCells().map((cell) => (
            <TableCell
              key={cell.id}
              className={cn(
                'border-none typography-body-sm text-foreground h-9',
                cell.column.columnDef.meta?.getStyles?.({
                  row: row.original,
                  value: cell.getValue(),
                  columnId: cell.column.id,
                })?.className
              )}
            >
              <motion.div
                layout
                animate={{ scale: selected ? 1.1 : 1 }}
                transition={{ duration: 0.18 }}
                style={{ transformOrigin: '50% 50%' }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </motion.div>
            </TableCell>
          ))}
        </motion.tr>
      );

      if (renderRowSubComponent && isExpanded) {
        return [
          mainRow,
          <tr
            key={`subrow-${originalId}`}
            className="bg-background border-none"
          >
            <TableCell
              colSpan={columnsCount}
              className="p-3 typography-body-sm text-foreground "
            >
              {renderRowSubComponent({ row })}
            </TableCell>
          </tr>,
        ];
      }

      return [mainRow];
    });
  };

  return (
    <LayoutGroup id="sf-table-layout">
      <TableBody>{renderRows()}</TableBody>
    </LayoutGroup>
  );
}
