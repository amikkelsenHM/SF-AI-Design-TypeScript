import { Skeleton } from '@/components/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/components/ui/table';

const DEFAULT_SKELETON_ROWS = 5;

interface TableRowSkeletonProps {
  columnsCount: number;
  rowsCount?: number;
}

export function TableRowSkeleton({
  columnsCount,
  rowsCount = DEFAULT_SKELETON_ROWS,
}: TableRowSkeletonProps) {
  return (
    <>
      {Array.from({ length: rowsCount }).map((_, index) => (
        <TableRow key={index} className="border-none">
          <TableCell
            colSpan={columnsCount}
            className="text-center text-foreground h-9"
          >
            <Skeleton className="w-full h-full" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
