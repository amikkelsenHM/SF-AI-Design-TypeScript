import { FilterLogicalOperator } from '@/components/v2/table/filters/custom-filter';
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  TableState,
} from '@tanstack/react-table';
import { GetListParams } from 'models/types/common/index';
import { useCallback, useRef, useState } from 'react';
import {
  getFilterParams,
  getPaginationParams,
  getParamsFromTableState,
  getSortParam,
} from './utils';

const DEFAULT_TIMEOUT = 300;

export function useServerTableState<T extends string>(
  initialTableState: Partial<TableState>,
  fieldsMap?: Record<string, T>
) {
  const [params, setParams] = useState<GetListParams<T>>(() =>
    getParamsFromTableState(initialTableState)
  );
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  const onPaginationChange = useCallback(
    (pagination: PaginationState) =>
      setParams((prev) => ({
        ...prev,
        ...getPaginationParams(pagination),
      })),
    []
  );

  const onSortingChange = useCallback(
    ([item]: SortingState) =>
      setParams((prev) => ({
        ...prev,
        offset: 0,
        sort: getSortParam(item, fieldsMap),
      })),
    [fieldsMap]
  );

  const onSearchChange = useCallback((value: string) => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      setParams((prev) => ({
        ...prev,
        offset: 0,
        search: value,
      }));
    }, DEFAULT_TIMEOUT);
  }, []);

  const onFiltersChange = useCallback(
    (filters: ColumnFiltersState, logicalOperator: FilterLogicalOperator) => {
      setParams((prev) => {
        const baseParams = {
          limit: prev.limit,
          offset: 0,
          search: prev.search,
          sort: prev.sort,
        } as GetListParams<T>;

        const filterParams = getFilterParams(filters, fieldsMap);

        return { ...baseParams, [logicalOperator]: filterParams };
      });
    },
    [fieldsMap]
  );

  return {
    params,
    onFiltersChange,
    onPaginationChange,
    onSortingChange,
    onSearchChange,
  };
}
