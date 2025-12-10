import { SelectOption } from '@/components/components/ui/select/utils';
import {
  applyFiltersToTable,
  createBaseFilter,
  FilterItem,
  FilterLogicalOperator,
  registerCustomFilterFunctions,
} from '@/components/v2/table/filters/custom-filter';
import { parseFilterValue } from '@/components/v2/table/filters/filter-util';
import { Table } from '@tanstack/react-table';
import { useCallback, useEffect, useState } from 'react';
import { FilterableColumn } from './useFilterableColumns';

export const useTableFilters = <TData>(
  table: Table<TData> | undefined,
  filterableColumns: FilterableColumn[],
  getColumnFilterOptions: (columnId: string) => SelectOption[] | undefined
) => {
  const [filters, setFilters] = useState<FilterItem[]>([]);
  const [activeFilterCount, setActiveFilterCount] = useState(0);
  const [logicalOperator, setLogicalOperator] = useState(
    FilterLogicalOperator.AND
  );

  const addFilter = useCallback(() => {
    if (filterableColumns.length === 0) return;

    const { id, filterType, options } = filterableColumns[0];
    const newFilter = createBaseFilter(id, filterType, options);

    setFilters((prev) => [...prev, newFilter]);
  }, [filterableColumns]);

  const updateFilter = useCallback(
    (id: string, updatedValue: Partial<FilterItem>) => {
      setFilters((prev) =>
        prev.map((filter) =>
          filter.id === id ? { ...filter, ...updatedValue } : filter
        )
      );
    },
    []
  );

  const removeFilter = useCallback((id: string) => {
    setFilters((prev) => prev.filter((filter) => filter.id !== id));
  }, []);

  const removeAllFilters = useCallback(() => {
    setFilters([]);

    if (table) {
      table.resetColumnFilters();
    }

    setActiveFilterCount(0);
  }, [table]);

  const applyFilters = useCallback(() => {
    if (!table) return;

    const count = applyFiltersToTable(filters, logicalOperator, table);
    setActiveFilterCount(count);
  }, [filters, logicalOperator, table]);

  useEffect(() => {
    if (filterableColumns.length > 0 && filters.length === 0) {
      addFilter();
    }

    if (table) {
      registerCustomFilterFunctions(table);
    }
  }, [filterableColumns, filters.length, addFilter, table]);

  useEffect(() => {
    if (!table) return;

    const tableState = table.getState();
    const activeColumnFilters = tableState.columnFilters;
    if (activeColumnFilters.length === 0) return;

    const newFilters: FilterItem[] = [];

    activeColumnFilters.forEach(({ id: columnId, value }) => {
      const options = getColumnFilterOptions(columnId);
      newFilters.push(...parseFilterValue(columnId, value, options));
    });

    const appliedLogicalOperator = tableState.logicalOperator;

    if (appliedLogicalOperator) {
      setLogicalOperator(appliedLogicalOperator);
    }

    if (newFilters.length > 0) {
      setFilters(newFilters);
      setActiveFilterCount(newFilters.length);
    }
  }, [table, getColumnFilterOptions]);

  return {
    filters,
    activeFilterCount,
    logicalOperator,
    addFilter,
    updateFilter,
    removeFilter,
    removeAllFilters,
    applyFilters,
    setLogicalOperator,
  };
};
