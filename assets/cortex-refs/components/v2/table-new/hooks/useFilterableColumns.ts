import { SelectOption } from '@/components/components/ui/select/utils';
import {
  FilterType,
  getOperatorsByType,
} from '@/components/v2/table/filters/custom-filter';
import { Table } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';

export interface FilterableColumn {
  id: string;
  title: string;
  filterType: FilterType;
  options: SelectOption[] | undefined;
}

export const useFilterableColumns = <TData>(
  table: Table<TData> | undefined,
  excludeColumns: string[]
) => {
  const filterableColumns = useMemo<FilterableColumn[]>(() => {
    if (!table) return [];

    return table
      .getAllColumns()
      .filter(
        (column) =>
          column.getCanFilter() &&
          !excludeColumns.includes(column.id) &&
          column.id !== '_subRowIndices'
      )
      .map((column) => ({
        id: column.id,
        title: column.columnDef.header?.toString() || column.id,
        filterType: column.columnDef.meta?.filterType || 'string',
        options: column.columnDef.meta?.filterOptions,
      }));
  }, [table, excludeColumns]);

  const filterableColumnLookup = useMemo(() => {
    const lookup = new Map<string, FilterableColumn>();
    filterableColumns.forEach((column) => lookup.set(column.id, column));
    return lookup;
  }, [filterableColumns]);

  const getColumnFilterType = useCallback(
    (columnId: string) =>
      filterableColumnLookup.get(columnId)?.filterType || 'string',
    [filterableColumnLookup]
  );

  const getColumnFilterOptions = useCallback(
    (columnId: string) => filterableColumnLookup.get(columnId)?.options,
    [filterableColumnLookup]
  );

  const getColumnFilterOperators = useCallback(
    (columnId: string) => getOperatorsByType(getColumnFilterType(columnId)),
    [getColumnFilterType]
  );

  return {
    filterableColumns,
    getColumnFilterType,
    getColumnFilterOptions,
    getColumnFilterOperators,
  };
};
