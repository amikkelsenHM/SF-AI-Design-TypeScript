import { FilterOperator } from '@/components/v2/table/filters/custom-filter';
import { parseFilterValue } from '@/components/v2/table/filters/filter-util';
import {
  ColumnFilter,
  ColumnFiltersState,
  ColumnSort,
  PaginationState,
  TableState,
} from '@tanstack/react-table';
import { GetListParams } from 'models/types/common/index';

const DESCENDING_CHAR = '-';

const isNotEmptyValue = (val: any) =>
  val !== undefined && val !== null && val !== '';

const transformDateValue = (value: unknown) => {
  const parsedValue = typeof value === 'number' ? value : Number(value);

  if (isNaN(parsedValue)) return '';

  const date = new Date(parsedValue);

  return date.toISOString();
};

const OPERATORS_MAP: Record<FilterOperator, string | ((value: any) => string)> =
  {
    // string
    [FilterOperator.INCLUDES_STRING]: (value) => `ilike(*${value}*)`,
    [FilterOperator.NOT_INCLUDES_STRING]: (value) => `nilike(*${value}*)`, // not available!
    [FilterOperator.EQUALS]: (value) => `eq(${value})`,
    [FilterOperator.NOT_EQUALS]: (value) => `ne(${value})`,
    [FilterOperator.STARTS_WITH]: (value) => `ilike(${value}*)`,
    [FilterOperator.ENDS_WITH]: (value) => `ilike(*${value})`,
    [FilterOperator.IS_EMPTY]: 'empty()', // doesn't handle null as empty
    [FilterOperator.IS_NOT_EMPTY]: 'nempty()', // not available!
    [FilterOperator.IS_ANY_OF]: (value) => `anyof(${value})`,

    // number
    [FilterOperator.GREATER_THAN]: (value) => `gt(${value})`,
    [FilterOperator.GREATER_THAN_EQUAL]: (value) => `ge(${value})`,
    [FilterOperator.LESS_THAN]: (value) => `lt(${value})`,
    [FilterOperator.LESS_THAN_EQUAL]: (value) => `le(${value})`,

    // date
    [FilterOperator.AFTER]: (value) => `gt(${transformDateValue(value)})`,
    [FilterOperator.BEFORE]: (value) => `lt(${transformDateValue(value)})`,
    [FilterOperator.DATE_EQUALS]: (value) => `eq(${transformDateValue(value)})`,
    [FilterOperator.DATE_NOT_EQUALS]: (value) =>
      `ne(${transformDateValue(value)})`,
  };

export const getSortParam = <T extends string>(
  item: ColumnSort | undefined,
  fieldsMap: Record<string, T> | undefined
) => {
  if (!item) return;

  const { id, desc } = item;

  const sortKey = fieldsMap?.[id] || id;

  return `${desc ? DESCENDING_CHAR : ''}${sortKey}` as T | `-${T}`;
};

const getFilterParam = <T extends string>(
  item: ColumnFilter,
  fieldsMap: Record<string, T> | undefined
) => {
  const { id, value: filter } = item;

  const newFilters = parseFilterValue(id, filter, undefined);

  const key = fieldsMap?.[id] || id;

  return newFilters.map(({ value, operator }) => {
    const apiOperator =
      OPERATORS_MAP[operator as keyof typeof OPERATORS_MAP] ||
      OPERATORS_MAP.equals;

    if (typeof apiOperator === 'string') return `${key}=${apiOperator}`;

    return `${key}=${isNotEmptyValue(value) ? apiOperator(value) : value}`;
  });
};

export const getFilterParams = <T extends string>(
  filters: ColumnFiltersState,
  fieldsMap: Record<string, T> | undefined
) => {
  const params = filters
    .map((item) => getFilterParam(item, fieldsMap))
    .flat()
    .join(',');

  if (!params) return undefined;

  return `(${params})`;
};

export const getPaginationParams = ({
  pageIndex,
  pageSize,
}: PaginationState) => ({
  offset: pageIndex * pageSize,
  limit: pageSize,
});

export const getParamsFromTableState = <T extends string>(
  tableState: Partial<TableState>,
  fieldsMap?: Record<string, T>
): GetListParams<T> => {
  const { pagination, globalFilter, sorting, columnFilters, logicalOperator } =
    tableState;

  return {
    ...(pagination ? getPaginationParams(pagination) : {}),
    ...(columnFilters && logicalOperator
      ? { [logicalOperator]: getFilterParams(columnFilters, fieldsMap) }
      : {}),
    sort: sorting ? getSortParam(sorting[0], fieldsMap) : undefined,
    search: globalFilter,
  } as GetListParams<T>;
};
