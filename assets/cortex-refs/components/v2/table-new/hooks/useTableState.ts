import {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  TableState,
  useReactTable,
} from '@tanstack/react-table';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  customGetFilteredRowModel,
  FilterLogicalOperator,
} from '../../table/filters/custom-filter';
import {
  decodeTableState,
  getUpdatedParams,
  TABLE_STATE_DEFAULTS,
} from '../utils/url-state';

const DEFAULT_TIMEOUT = 300;

interface UseTableStateProps<TData> {
  tableKey: string;
  data: TData[];
  columns: ColumnDef<TData, any>[];
  initialState?: Partial<
    TableState & { logicalOperator: FilterLogicalOperator }
  >;
  enableSorting: boolean;
  enableFiltering: boolean;
  enableGlobalFilter: boolean;
  enablePagination: boolean;
  enableExpanding: boolean;
  manualControl: boolean;
  enableSortingRemoval?: boolean;
  rowCount?: number;
  onPaginationChange?: (pagination: PaginationState) => void;
  onSearch?: (value: string) => void;
  onSortingChange?: (sorting: SortingState) => void;
  onFiltersChange?: (
    filters: ColumnFiltersState,
    operator: FilterLogicalOperator
  ) => void;
}

export function useTableState<TData>({
  tableKey,
  data,
  columns,
  initialState,
  enableSorting,
  enableFiltering,
  enableGlobalFilter,
  enablePagination,
  enableExpanding,
  manualControl,
  enableSortingRemoval = true,
  rowCount,
  onPaginationChange,
  onSearch,
  onSortingChange,
  onFiltersChange,
}: UseTableStateProps<TData>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const updateTimeoutRef = useRef<NodeJS.Timeout>();

  const defaultState = useMemo(
    () => ({
      sorting: initialState?.sorting || TABLE_STATE_DEFAULTS.SORTING,
      columnFilters:
        initialState?.columnFilters || TABLE_STATE_DEFAULTS.COLUMN_FILTERS,
      globalFilter:
        initialState?.globalFilter || TABLE_STATE_DEFAULTS.GLOBAL_FILTER,
      pagination: {
        pageIndex:
          initialState?.pagination?.pageIndex ||
          TABLE_STATE_DEFAULTS.PAGE_INDEX,
        pageSize:
          initialState?.pagination?.pageSize || TABLE_STATE_DEFAULTS.PAGE_SIZE,
      },
      logicalOperator:
        initialState?.logicalOperator || TABLE_STATE_DEFAULTS.LOGICAL_OPERATOR,
    }),
    [initialState]
  );

  const urlState = useMemo(
    () =>
      manualControl
        ? defaultState
        : decodeTableState({
            query: searchParams,
            defaultState,
            tableKey,
          }),
    [searchParams, tableKey, defaultState]
  );

  const [globalFilter, setGlobalFilter] = useState(urlState.globalFilter);
  const [sorting, setSorting] = useState(urlState.sorting);
  const [columnFilters, setColumnFilters] = useState(urlState.columnFilters);
  const [pagination, setPagination] = useState(urlState.pagination);
  const [expanded, setExpanded] = useState<ExpandedState>(
    initialState?.expanded || {}
  );
  const [logicalOperator, setLogicalOperator] = useState(
    urlState.logicalOperator
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: enableExpanding ? getExpandedRowModel() : undefined,
    getPaginationRowModel: enablePagination
      ? getPaginationRowModel()
      : undefined,
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableFiltering
      ? customGetFilteredRowModel()
      : undefined,
    enableSortingRemoval,
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === 'function' ? updater(sorting) : updater;
      setSorting(newSorting);
      onSortingChange?.(newSorting);

      handleStateChange(true);
    },
    onColumnFiltersChange: (updater) => {
      setColumnFilters((prev) => {
        const newFilters =
          typeof updater === 'function' ? updater(prev) : updater;

        return newFilters;
      });

      handleStateChange(true);
    },
    onGlobalFilterChange: (updater) => {
      const newGlobalFilter =
        typeof updater === 'function' ? updater(globalFilter) : updater;
      setGlobalFilter(newGlobalFilter);
      onSearch?.(newGlobalFilter);

      handleStateChange(true);
    },
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === 'function' ? updater(pagination) : updater;
      setPagination(newPagination);
      onPaginationChange?.(newPagination);

      handleStateChange();
    },
    onStateChange: (updater) => {
      const newLogicalOperator =
        typeof updater === 'function'
          ? updater({} as TableState).logicalOperator
          : updater.logicalOperator;

      setLogicalOperator(newLogicalOperator);

      handleStateChange(true);
    },
    onExpandedChange: setExpanded,
    manualPagination: manualControl,
    manualSorting: manualControl,
    manualFiltering: manualControl,
    autoResetPageIndex: false,
    rowCount,
    state: {
      sorting,
      globalFilter: enableGlobalFilter ? globalFilter : undefined,
      columnFilters: enableFiltering ? columnFilters : undefined,
      pagination: enablePagination ? pagination : undefined,
      expanded: enableExpanding ? expanded : undefined,
      logicalOperator,
    },
  });

  const debouncedUpdateURL = useCallback(() => {
    if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current);

    updateTimeoutRef.current = setTimeout(() => {
      const state = table.getState();
      const params = getUpdatedParams(searchParams, tableKey, state);
      const newUrl = `?${params}`;
      const currentUrl = `?${searchParams?.toString()}`;

      if (currentUrl !== newUrl) {
        router.replace(newUrl, { scroll: false });
      }
    }, DEFAULT_TIMEOUT);
  }, [searchParams, tableKey, table]);

  const handleStateChange = useCallback(
    (reset = false) => {
      if (reset) {
        table.setPageIndex(TABLE_STATE_DEFAULTS.PAGE_INDEX);
      }

      debouncedUpdateURL();
    },
    [table, debouncedUpdateURL]
  );

  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    onFiltersChange?.(columnFilters, logicalOperator);
  }, [logicalOperator, onFiltersChange, columnFilters]);

  return table;
}
