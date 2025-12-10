'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  Row,
  SortingState,
  TableState,
} from '@tanstack/react-table';

import { Table } from '@/components/components/ui/table';
import { cn } from '@/components/lib/utils';
import { useLiftStepwise, UseLiftStepwiseConfig } from '@/hooks/useLiftList';
import { ReactNode } from 'react';
import { NotificationBanner } from '../../notification-banner/notification-banner';
import { FilterLogicalOperator } from '../../table/filters/custom-filter';
import { useTableState } from '../hooks/useTableState';
import { SFPagination } from './pagination';
import { SFDataTableBody } from './table-body';
import { SFDataTableHeader } from './table-header';
import { SFDataTableToolbar } from './table-toolbar';

interface SFDataTableProps<TData> {
  tableKey?: string;
  columns: ColumnDef<TData, any>[];
  data: TData[];
  isLoading?: boolean;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  filtersButton?: ReactNode;
  rowCount?: number;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enableGlobalFilter?: boolean;
  enablePagination?: boolean;
  enableExpanding?: boolean;
  singleExpansion?: boolean;
  manualControl?: boolean;
  enableSortingRemoval?: boolean;
  onPaginationChange?: (pagination: PaginationState) => void;
  renderRowSubComponent?: (props: { row: Row<TData> }) => ReactNode;
  onRowClick?: (row: Row<TData>) => void;
  initialState?: Partial<TableState>;
  excludeFilterColumns?: string[];
  tableHeaderName?: string;
  cellHeaderClassName?: string;
  variant?: 'rounded' | 'square';
  width?: string;
  filterSectionClassNames?: string;
  containerClassName?: string;
  hasRowBorder?: boolean;
  hideHeader?: boolean;
  headerActions?: ReactNode;
  emptyMessage?: string;
  onSortingChange?: (sorting: SortingState) => void;
  onFiltersChange?: (
    filters: ColumnFiltersState,
    operator: FilterLogicalOperator
  ) => void;
  getRowId?: (row: TData, index: number) => string;
  animationConfig?: UseLiftStepwiseConfig;
  showRowCursor?: boolean;
}

export function SFDataTable<TData>({
  tableKey = 'table',
  columns,
  data,
  isLoading = false,
  searchPlaceholder = 'Search',
  onSearch,
  filtersButton,
  rowCount,
  enableSorting = false,
  enableFiltering = false,
  enableGlobalFilter = false,
  enablePagination = false,
  enableExpanding = false,
  singleExpansion = false,
  manualControl = false,
  enableSortingRemoval = true,
  onPaginationChange,
  renderRowSubComponent,
  onRowClick,
  initialState,
  excludeFilterColumns = [],
  tableHeaderName,
  cellHeaderClassName,
  variant = 'rounded',
  width,
  filterSectionClassNames,
  containerClassName,
  hasRowBorder = false,
  hideHeader = false,
  headerActions,
  emptyMessage = 'No data available',
  onSortingChange,
  onFiltersChange,
  animationConfig,
  showRowCursor = false,
}: SFDataTableProps<TData>) {
  const animated = !!animationConfig;

  const { localData, liftedId, isAnimatingLift, bannerConfig, closeBanner } =
    useLiftStepwise<TData & { id: string }>({
      ...animationConfig,
      payload: animated ? (data as (TData & { id: string })[]) : undefined,
    });

  const tableData = animated ? (localData as TData[]) : data;

  const table = useTableState({
    tableKey,
    data: tableData,
    columns,
    initialState,
    enableSorting,
    enableFiltering,
    enableGlobalFilter,
    enablePagination,
    enableExpanding,
    manualControl,
    enableSortingRemoval,
    rowCount,
    onPaginationChange,
    onSearch,
    onSortingChange,
    onFiltersChange,
  });

  const showToolbar = enableGlobalFilter || enableFiltering || tableHeaderName;

  return (
    <>
      {bannerConfig && (
        <div className="text-background">
          <NotificationBanner {...bannerConfig} isOpen onClose={closeBanner} />
        </div>
      )}
      <div
        className={cn(
          `bg-foreground-subtle overflow-hidden h-fit w-full ${
            variant === 'rounded' ? 'rounded-lg' : 'rounded-none'
          }`,
          hasRowBorder &&
            '[&_tr]:border-background [&_tr]:border-solid [&_tr]:border-b [&_tr]:border-t',
          width,
          containerClassName
        )}
      >
        <div className="flex flex-col h-full">
          {showToolbar && (
            <SFDataTableToolbar
              table={table}
              searchPlaceholder={searchPlaceholder}
              enableFiltering={enableFiltering}
              enableGlobalFilter={enableGlobalFilter}
              excludeFilterColumns={excludeFilterColumns}
              tableHeaderName={tableHeaderName}
              filterSectionClassNames={filterSectionClassNames}
              filtersButton={filtersButton}
              headerActions={headerActions}
            />
          )}

          <div className="overflow-auto">
            <Table className="w-full border-spacing-0">
              {!hideHeader && (
                <SFDataTableHeader
                  table={table}
                  enableSorting={enableSorting}
                  cellHeaderClassName={cellHeaderClassName}
                />
              )}

              <SFDataTableBody
                table={table}
                columnsCount={columns.length}
                isLoading={isLoading}
                enableExpanding={enableExpanding}
                singleExpansion={singleExpansion}
                emptyMessage={emptyMessage}
                renderRowSubComponent={renderRowSubComponent}
                onRowClick={onRowClick}
                liftedId={animated ? liftedId ?? undefined : undefined}
                isAnimatingLift={animated && isAnimatingLift}
                showRowCursor={showRowCursor}
              />
            </Table>
          </div>

          {enablePagination && (
            <SFPagination table={table} pageSizeOptions={[10, 25, 50, 100]} />
          )}
        </div>
      </div>
    </>
  );
}
