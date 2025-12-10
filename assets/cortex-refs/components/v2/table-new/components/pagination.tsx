import { Select } from '@/components/components/ui/select';
import { Table } from '@tanstack/react-table';
import { useMemo } from 'react';
import { SelectOption } from '../../../components/ui/select/utils';
import ArrowLeft from '../../icons/arrow-left';
import ArrowRight from '../../icons/arrow-right';

interface SFPaginationProps<TData> {
  table: Table<TData>;
  pageSizeOptions?: number[];
}

export function SFPagination<TData>({
  table,
  pageSizeOptions = [10, 25, 50, 100],
}: SFPaginationProps<TData>) {
  const { pageSize, pageIndex } = table.getState().pagination;
  const totalRows = table.getRowCount();

  const options = useMemo<SelectOption[]>(() => {
    const sizeOptions = pageSizeOptions.includes(pageSize)
      ? pageSizeOptions
      : [pageSize, ...pageSizeOptions].sort((a, b) => a - b);

    return sizeOptions.map((size) => {
      const value = size.toString();

      return { label: value, value };
    });
  }, [pageSize]);

  const canGoPrevious = table.getCanPreviousPage();
  const canGoNext = table.getCanNextPage();

  const handlePreviousPage = () => {
    if (canGoPrevious) table.previousPage();
  };

  const handleNextPage = () => {
    if (canGoNext) table.nextPage();
  };

  const startRow = pageIndex * pageSize + 1;
  const endRow = Math.min((pageIndex + 1) * pageSize, totalRows);

  return (
    <div className="flex items-center p-2 ml-auto w-full border-t border-t-foreground-contrast">
      <div className="flex items-center ml-auto">
        <span className="text-xs text-white font-light">Rows per page</span>
        <Select
          className="w-24 ml-4"
          value={pageSize.toString()}
          options={options}
          onValueChange={(value) => table.setPageSize(Number(value))}
        />

        <span className="text-white text-xs font-light ml-9">
          {startRow}-{endRow} of {totalRows}
        </span>

        <div className="flex">
          <PaginationButton
            disabled={canGoPrevious}
            label="Previous page"
            onClick={handlePreviousPage}
          >
            <ArrowLeft />
          </PaginationButton>

          <PaginationButton
            disabled={canGoNext}
            label="Next page"
            onClick={handleNextPage}
          >
            <ArrowRight />
          </PaginationButton>
        </div>
      </div>
    </div>
  );
}

interface PaginationButtonProps {
  children: React.ReactNode;
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

const PaginationButton = ({
  children,
  label,
  disabled,
  onClick,
}: PaginationButtonProps) => {
  return (
    // TODO: replace with shadcn button
    <button
      disabled={!disabled}
      className={`flex items-center justify-center w-10 h-10 rounded focus:outline-none ${
        disabled
          ? 'text-white hover:bg-[#2A2834]'
          : 'text-gray-600 cursor-not-allowed'
      }`}
      aria-label={label}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
