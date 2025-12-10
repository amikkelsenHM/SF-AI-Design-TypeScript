import { TableState } from '@tanstack/react-table';
import {
  FilterLogicalOperator,
  FilterOperator,
} from '../../table/filters/custom-filter';

const safeUrlEncode = (value: string): string => {
  let cleanValue = value;
  let previousValue = '';
  let iterations = 0;
  const maxIterations = 5;

  while (
    cleanValue !== previousValue &&
    cleanValue.includes('%') &&
    iterations < maxIterations
  ) {
    previousValue = cleanValue;
    try {
      cleanValue = decodeURIComponent(cleanValue);
      iterations++;
    } catch {
      break;
    }
  }

  return cleanValue
    .replace(/ /g, '+')
    .replace(/[^\w+.-]/g, (char) => encodeURIComponent(char));
};

const safeUrlDecode = (value: string): string => {
  try {
    return decodeURIComponent(value.replace(/\+/g, ' '));
  } catch {
    return value.replace(/\+/g, ' ');
  }
};

export const TABLE_STATE_DEFAULTS = {
  PAGE_INDEX: 0,
  PAGE_SIZE: 25,
  GLOBAL_FILTER: '',
  COLUMN_FILTERS: [],
  SORTING: [],
  LOGICAL_OPERATOR: FilterLogicalOperator.AND,
};

export const TABLE_STATE_CONFIG = {
  PARAM_SUFFIXES: {
    PAGE: '_page',
    PAGE_SIZE: '_pageSize',
    SORT: '_sort',
    FILTER: '_filter',
    SEARCH: '_search',
    LOGICAL_OPERATOR: '_logicalOp',
  },

  SEPARATORS: {
    SORT_ITEMS: ',',
    SORT_DIRECTION: '.',
    FILTER_ITEMS: ',',
    FILTER_KEY_VALUE: '_',
  },

  SORT_DIRECTIONS: {
    DESC: 'desc',
    ASC: 'asc',
  },
} as const;

export const encodeTableState = (
  tableKey: string,
  state: TableState
): Record<string, string> => {
  const params: Record<string, string> = {};
  const { PARAM_SUFFIXES, SEPARATORS, SORT_DIRECTIONS } = TABLE_STATE_CONFIG;

  const { pagination, sorting, columnFilters, globalFilter, logicalOperator } =
    state;

  if (pagination?.pageIndex !== undefined) {
    params[`${tableKey}${PARAM_SUFFIXES.PAGE}`] = String(
      pagination.pageIndex + 1
    );
  }

  if (pagination?.pageSize !== undefined) {
    params[`${tableKey}${PARAM_SUFFIXES.PAGE_SIZE}`] = String(
      pagination.pageSize
    );
  }

  if (sorting?.length) {
    params[`${tableKey}${PARAM_SUFFIXES.SORT}`] = sorting
      .map(
        (s) =>
          `${s.id}${SEPARATORS.SORT_DIRECTION}${
            s.desc ? SORT_DIRECTIONS.DESC : SORT_DIRECTIONS.ASC
          }`
      )
      .join(SEPARATORS.SORT_ITEMS);
  }

  if (columnFilters?.length) {
    params[`${tableKey}${PARAM_SUFFIXES.FILTER}`] = columnFilters
      .map((f) => {
        const encodedValue = safeUrlEncode(String(f.value));
        const filterValue = Array.isArray(f.value)
          ? `${FilterOperator.IS_ANY_OF}${encodedValue}`
          : encodedValue;

        return `${f.id}${SEPARATORS.FILTER_KEY_VALUE}${filterValue}`;
      })
      .join(SEPARATORS.FILTER_ITEMS);
  }

  if (globalFilter) {
    params[`${tableKey}${PARAM_SUFFIXES.SEARCH}`] = safeUrlEncode(globalFilter);
  }

  if (logicalOperator) {
    params[`${tableKey}${PARAM_SUFFIXES.LOGICAL_OPERATOR}`] =
      safeUrlEncode(logicalOperator);
  }

  return params;
};

export function decodeTableState({
  query,
  tableKey = 'table',
  defaultState,
}: {
  query: URLSearchParams | Record<string, string> | null;
  tableKey?: string;
  defaultState: Partial<TableState>;
}): TableState {
  const state: Partial<TableState> = { ...defaultState };
  if (!query) return state as TableState;

  const params: Record<string, string> =
    query instanceof URLSearchParams
      ? Object.fromEntries(query.entries())
      : query;

  if (!Object.keys(params).length) return state as TableState;

  const { PARAM_SUFFIXES, SEPARATORS, SORT_DIRECTIONS } = TABLE_STATE_CONFIG;

  const page = params[`${tableKey}${PARAM_SUFFIXES.PAGE}`];
  const pageSize = params[`${tableKey}${PARAM_SUFFIXES.PAGE_SIZE}`];
  if (page || pageSize) {
    state.pagination = {
      pageIndex: page
        ? Number(page) - 1
        : defaultState.pagination?.pageIndex ?? TABLE_STATE_DEFAULTS.PAGE_INDEX,
      pageSize: pageSize
        ? Number(pageSize)
        : defaultState.pagination?.pageSize ?? TABLE_STATE_DEFAULTS.PAGE_SIZE,
    };
  }

  const sortRaw = params[`${tableKey}${PARAM_SUFFIXES.SORT}`];
  if (sortRaw) {
    state.sorting = sortRaw.split(SEPARATORS.SORT_ITEMS).map((sort) => {
      const [id, dir] = sort.split(SEPARATORS.SORT_DIRECTION);
      return { id, desc: dir === SORT_DIRECTIONS.DESC };
    });
  }

  const filterRaw = params[`${tableKey}${PARAM_SUFFIXES.FILTER}`];
  if (filterRaw) {
    state.columnFilters = filterRaw
      .split(SEPARATORS.FILTER_ITEMS)
      .map((filter) => {
        const separatorIndex = filter.indexOf(SEPARATORS.FILTER_KEY_VALUE);
        if (separatorIndex === -1) return { id: filter, value: '' };

        const id = filter.substring(0, separatorIndex);
        const rawValue = filter.substring(separatorIndex + 1);
        const decodedValue = safeUrlDecode(
          rawValue.replace(FilterOperator.IS_ANY_OF, '')
        );
        const value = rawValue.includes(FilterOperator.IS_ANY_OF)
          ? decodedValue.split(',')
          : decodedValue;

        return { id, value };
      });
  }

  const search = params[`${tableKey}${PARAM_SUFFIXES.SEARCH}`];
  if (search) {
    state.globalFilter = safeUrlDecode(search);
  }

  const logicalOperator =
    params[`${tableKey}${PARAM_SUFFIXES.LOGICAL_OPERATOR}`];
  if (logicalOperator) {
    state.logicalOperator = safeUrlDecode(
      logicalOperator
    ) as FilterLogicalOperator;
  }

  return state as TableState;
}

export const getUpdatedParams = (
  searchParams: URLSearchParams | null,
  tableKey: string,
  state: TableState
) => {
  const params = new URLSearchParams(searchParams?.toString());
  const encoded = encodeTableState(tableKey, state);

  Array.from(params.keys())
    .filter((key) => key.startsWith(`${tableKey}_`))
    .forEach((key) => params.delete(key));

  const existingParams = params.toString();
  const newParams = Object.entries(encoded)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');

  return [existingParams, newParams].filter(Boolean).join('&');
};
