import { Typography } from '@/components/components/ui/typography';
import { cn } from '@/components/lib/utils';
import { Table } from '@tanstack/react-table';
import { HeaderActionsProvider } from './header-actions-provider';
import { SFTableFilters } from './table-filters';
import { SFTableSearch } from './table-search';

interface SFDataTableToolbarProps<TData> {
  table: Table<TData>;
  searchPlaceholder: string;
  enableFiltering: boolean;
  enableGlobalFilter: boolean;
  excludeFilterColumns: string[];
  tableHeaderName?: string;
  filterSectionClassNames?: string;
  filtersButton?: React.ReactNode;
  headerActions?: React.ReactNode;
}

export function SFDataTableToolbar<TData>({
  table,
  searchPlaceholder,
  filtersButton,
  enableFiltering,
  enableGlobalFilter,
  excludeFilterColumns,
  tableHeaderName,
  filterSectionClassNames,
  headerActions,
}: SFDataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      {tableHeaderName && (
        <div className="bg-foreground-contrast px-3 py-2 w-full h-9">
          <Typography className="text-foreground text-xs">
            {tableHeaderName}
          </Typography>
        </div>
      )}
      {(enableGlobalFilter ||
        enableFiltering ||
        filtersButton ||
        headerActions) && (
        <div
          className={cn(
            'px-6 py-3 flex flex-row items-center justify-between w-full',
            filterSectionClassNames
          )}
        >
          {enableGlobalFilter && (
            <SFTableSearch table={table} placeholder={searchPlaceholder} />
          )}
          <div className="flex flex-row align-middle gap-4">
            {enableFiltering ? (
              <SFTableFilters
                table={table}
                excludeColumns={excludeFilterColumns}
                customFilters={filtersButton}
              />
            ) : (
              filtersButton && <SFTableFilters customFilters={filtersButton} />
            )}
            <HeaderActionsProvider table={table}>
              {headerActions}
            </HeaderActionsProvider>
          </div>
        </div>
      )}
    </div>
  );
}
