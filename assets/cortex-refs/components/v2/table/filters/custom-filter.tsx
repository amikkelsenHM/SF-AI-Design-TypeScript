import { SelectOption } from '@/components/components/ui/select/utils';
import {
  ColumnFilter,
  FilterFn,
  getFilteredRowModel,
  Row,
  Table,
} from '@tanstack/react-table';
import { isAfter, isBefore, isEqual } from 'date-fns';
import {
  FILTER_SEPARATORS,
  isEmpty,
  isNotEmpty,
  isNullOrUndefined,
  normalizeValue,
  splitAndNormalize,
} from './filter-util';

export type FilterType = 'string' | 'number' | 'date' | 'select';

export enum FilterOperator {
  INCLUDES_STRING = 'includesString',
  NOT_INCLUDES_STRING = 'notIncludesString',
  EQUALS = 'equals',
  NOT_EQUALS = 'notEquals',
  STARTS_WITH = 'startsWith',
  ENDS_WITH = 'endsWith',
  IS_EMPTY = 'isEmpty',
  IS_NOT_EMPTY = 'isNotEmpty',
  IS_ANY_OF = 'isAnyOf',

  GREATER_THAN = 'greaterThan',
  GREATER_THAN_EQUAL = 'greaterThanEqual',
  LESS_THAN = 'lessThan',
  LESS_THAN_EQUAL = 'lessThanEqual',

  BEFORE = 'before',
  AFTER = 'after',
  DATE_EQUALS = 'dateEquals',
  DATE_NOT_EQUALS = 'dateNotEquals',
}

export enum SpecialFilterValue {
  EMPTY = '__EMPTY__',
  NOT_EMPTY = '__NOT_EMPTY__',
}

export enum FilterLogicalOperator {
  AND = 'and',
  OR = 'or',
}

export const LOGICAL_OPERATOR_OPTIONS = [
  { value: FilterLogicalOperator.AND, label: 'And' },
  { value: FilterLogicalOperator.OR, label: 'Or' },
];

const EMPTY_OPERATORS = [
  { value: FilterOperator.IS_EMPTY, label: 'Is empty' },
  { value: FilterOperator.IS_NOT_EMPTY, label: 'Is not empty' },
];

const COMMON_OPERATORS = [
  { value: FilterOperator.EQUALS, label: 'Equals' },
  { value: FilterOperator.NOT_EQUALS, label: 'Does not equal' },
  ...EMPTY_OPERATORS,
];

const STRING_OPERATORS = [
  { value: FilterOperator.INCLUDES_STRING, label: 'Contains' },
  { value: FilterOperator.NOT_INCLUDES_STRING, label: 'Does not contain' },
  { value: FilterOperator.STARTS_WITH, label: 'Starts with' },
  { value: FilterOperator.ENDS_WITH, label: 'Ends with' },
  ...COMMON_OPERATORS,
  { value: FilterOperator.IS_ANY_OF, label: 'Is any of' },
];

const NUMBER_OPERATORS = [
  { value: FilterOperator.GREATER_THAN, label: 'Greater than' },
  { value: FilterOperator.GREATER_THAN_EQUAL, label: 'Greater than or equal' },
  { value: FilterOperator.LESS_THAN, label: 'Less than' },
  { value: FilterOperator.LESS_THAN_EQUAL, label: 'Less than or equal' },
  ...COMMON_OPERATORS,
];

const DATE_OPERATORS = [
  { value: FilterOperator.BEFORE, label: 'Before' },
  { value: FilterOperator.AFTER, label: 'After' },
  { value: FilterOperator.DATE_EQUALS, label: 'Equals' },
  { value: FilterOperator.DATE_NOT_EQUALS, label: 'Does not equal' },
  ...EMPTY_OPERATORS,
];

const OPERATORS: Record<
  FilterType,
  { value: FilterOperator; label: string }[]
> = {
  string: STRING_OPERATORS,
  number: NUMBER_OPERATORS,
  date: DATE_OPERATORS,
  select: COMMON_OPERATORS,
};

export const getOperatorsByType = (type: FilterType) => OPERATORS[type];

export interface FilterItem {
  id: string;
  column: string;
  operator: FilterOperator;
  value: string;
  options?: SelectOption[];
}

const NEGATION_OPERATORS = new Set([
  FilterOperator.NOT_INCLUDES_STRING,
  FilterOperator.NOT_EQUALS,
  FilterOperator.DATE_NOT_EQUALS,
]);

const FILTER_HANDLERS: Record<
  FilterOperator,
  (cellValue: unknown, filterValue: string) => boolean
> = {
  [FilterOperator.INCLUDES_STRING]: (cellValue, filterValue) =>
    typeof cellValue === 'string' && cellValue.includes(filterValue),
  [FilterOperator.NOT_INCLUDES_STRING]: (cellValue, filterValue) =>
    typeof cellValue === 'string' && !cellValue.includes(filterValue),
  [FilterOperator.EQUALS]: (cellValue, filterValue) => {
    const cellType = typeof cellValue;
    switch (cellType) {
      case 'number':
        return cellValue === Number(filterValue);
      case 'string':
        return cellValue === filterValue;

      default:
        return false;
    }
  },
  [FilterOperator.NOT_EQUALS]: (cellValue, filterValue) => {
    const cellType = typeof cellValue;
    switch (cellType) {
      case 'number':
        return cellValue !== Number(filterValue);
      case 'string':
        return cellValue !== filterValue;

      default:
        return false;
    }
  },
  [FilterOperator.STARTS_WITH]: (cellValue, filterValue) =>
    typeof cellValue === 'string' && cellValue.startsWith(filterValue),
  [FilterOperator.ENDS_WITH]: (cellValue, filterValue) =>
    typeof cellValue === 'string' && cellValue.endsWith(filterValue),
  [FilterOperator.IS_ANY_OF]: (cellValue, filterValue) => {
    if (!filterValue) return false;
    const values = splitAndNormalize(filterValue);
    return values.some(
      (val) => typeof cellValue === 'string' && cellValue.includes(val)
    );
  },
  [FilterOperator.GREATER_THAN]: (cellValue, filterValue) => {
    const normalizedFilter = Number(filterValue);
    if (Number.isNaN(normalizedFilter)) return false;

    return typeof cellValue === 'number' && cellValue > normalizedFilter;
  },
  [FilterOperator.GREATER_THAN_EQUAL]: (cellValue, filterValue) => {
    const normalizedFilter = Number(filterValue);
    if (Number.isNaN(normalizedFilter)) return false;

    return typeof cellValue === 'number' && cellValue >= normalizedFilter;
  },
  [FilterOperator.LESS_THAN]: (cellValue, filterValue) => {
    const normalizedFilter = Number(filterValue);
    if (Number.isNaN(normalizedFilter)) return false;

    return typeof cellValue === 'number' && cellValue < normalizedFilter;
  },
  [FilterOperator.LESS_THAN_EQUAL]: (cellValue, filterValue) => {
    const normalizedFilter = Number(filterValue);
    if (Number.isNaN(normalizedFilter)) return false;

    return typeof cellValue === 'number' && cellValue <= normalizedFilter;
  },
  [FilterOperator.BEFORE]: (cellValue, filterValue) => {
    const normalizedFilter = new Date(Number(filterValue));
    return cellValue instanceof Date && isBefore(cellValue, normalizedFilter);
  },
  [FilterOperator.AFTER]: (cellValue, filterValue) => {
    const normalizedFilter = new Date(Number(filterValue));
    return cellValue instanceof Date && isAfter(cellValue, normalizedFilter);
  },
  [FilterOperator.DATE_EQUALS]: (cellValue, filterValue) => {
    const normalizedFilter = new Date(Number(filterValue));
    return cellValue instanceof Date && isEqual(cellValue, normalizedFilter);
  },
  [FilterOperator.DATE_NOT_EQUALS]: (cellValue, filterValue) => {
    const normalizedFilter = new Date(Number(filterValue));
    return cellValue instanceof Date && !isEqual(cellValue, normalizedFilter);
  },
  [FilterOperator.IS_EMPTY]: () => false,
  [FilterOperator.IS_NOT_EMPTY]: () => false,
};

const compareValues = (
  cellValue: any,
  filterValue: string,
  compareFn: (a: string, b: string) => boolean
): boolean => {
  if (isNullOrUndefined(cellValue)) return false;
  return compareFn(normalizeValue(cellValue), normalizeValue(filterValue));
};

const normalizeCellValue = (cellValue: unknown) =>
  typeof cellValue === 'string' || Array.isArray(cellValue)
    ? normalizeValue(cellValue)
    : cellValue;

const customOperatorFilter = <T,>(
  row: Row<T>,
  { id: columnId, value: filterValue }: ColumnFilter,
  logicalOperator: FilterLogicalOperator
): boolean => {
  if (!filterValue) return true;

  if (
    typeof filterValue === 'string' &&
    filterValue.includes(FILTER_SEPARATORS.NEGATION_SEPARATOR)
  ) {
    const [inclusionPart, ...negationParts] = filterValue.split(
      FILTER_SEPARATORS.NEGATION_SEPARATOR
    );
    const negationFilters = negationParts
      .join(FILTER_SEPARATORS.NEGATION_SEPARATOR)
      .split(FILTER_SEPARATORS.NEGATION_FILTERS_SEPARATOR)
      .filter(Boolean);

    const passesNegationFilters = negationFilters.every((filter) => {
      if (!filter.includes(FILTER_SEPARATORS.OPERATOR_VALUE_SEPARATOR))
        return true;

      const [operator, value] = filter.split(
        FILTER_SEPARATORS.OPERATOR_VALUE_SEPARATOR,
        2
      );
      const cellValue = row.getValue(columnId);

      if (isNullOrUndefined(cellValue)) {
        return NEGATION_OPERATORS.has(operator as FilterOperator);
      }

      const normalizedCellValue = normalizeCellValue(cellValue);
      const strFilterValue = normalizeValue(value);

      const handler = FILTER_HANDLERS[operator as FilterOperator];
      return handler ? handler(normalizedCellValue, strFilterValue) : true;
    });

    if (!passesNegationFilters) return false;

    if (inclusionPart) {
      if (!inclusionPart.includes(FILTER_SEPARATORS.INCLUSION_SEPARATOR))
        return evaluateSingleFilter(row, columnId, inclusionPart);

      const inclusionFilters = inclusionPart.split(
        FILTER_SEPARATORS.INCLUSION_SEPARATOR
      );

      return evaluateMultipleFilters(
        logicalOperator,
        inclusionFilters,
        row,
        columnId
      );
    }

    return true;
  }

  if (
    typeof filterValue === 'string' &&
    filterValue.includes(FILTER_SEPARATORS.INCLUSION_SEPARATOR)
  ) {
    const filters = filterValue
      .split(FILTER_SEPARATORS.INCLUSION_SEPARATOR)
      .filter(Boolean);

    return evaluateMultipleFilters(logicalOperator, filters, row, columnId);
  }

  return evaluateSingleFilter(row, columnId, filterValue);
};

function evaluateSingleFilter<T>(
  row: Row<T>,
  columnId: string,
  filterValue: any
): boolean {
  if (filterValue === SpecialFilterValue.EMPTY) {
    return isEmpty(row.getValue(columnId));
  }

  if (filterValue === SpecialFilterValue.NOT_EMPTY) {
    return isNotEmpty(row.getValue(columnId));
  }

  if (
    typeof filterValue === 'string' &&
    filterValue.includes(FILTER_SEPARATORS.OPERATOR_VALUE_SEPARATOR)
  ) {
    const [operator, value] = filterValue.split(
      FILTER_SEPARATORS.OPERATOR_VALUE_SEPARATOR,
      2
    );
    const cellValue = row.getValue(columnId);

    if (isNullOrUndefined(cellValue)) {
      if (
        (operator === FilterOperator.NOT_EQUALS ||
          operator === FilterOperator.NOT_INCLUDES_STRING) &&
        value
      )
        return true;
      return false;
    }

    const normalizedCellValue = normalizeCellValue(cellValue);
    const strFilterValue = normalizeValue(value);

    const handler = FILTER_HANDLERS[operator as FilterOperator];
    return handler ? handler(normalizedCellValue, strFilterValue) : false;
  }

  if (Array.isArray(filterValue)) {
    const cellValue = row.getValue(columnId);
    return compareValues(cellValue, '', (strCellValue) =>
      filterValue.some((val) => strCellValue.includes(normalizeValue(val)))
    );
  }

  const value = row.getValue(columnId);
  return compareValues(value, filterValue, (strCellValue, strFilterValue) =>
    strCellValue.includes(strFilterValue)
  );
}

function evaluateLogicalOperator<T>(
  logicalOperator: FilterLogicalOperator,
  items: T[],
  match: (item: T) => boolean
) {
  return logicalOperator === FilterLogicalOperator.AND
    ? items.every(match)
    : items.some(match);
}

function evaluateMultipleFilters<T>(
  logicalOperator: FilterLogicalOperator,
  filters: string[],
  row: Row<T>,
  columnId: string
) {
  return evaluateLogicalOperator(logicalOperator, filters, (filter) =>
    evaluateSingleFilter(row, columnId, filter)
  );
}

export const customGetFilteredRowModel: typeof getFilteredRowModel =
  <TData extends unknown>() =>
  (table: Table<TData>) =>
  () => {
    const rowModel = table.getCoreRowModel();
    const { logicalOperator, columnFilters } = table.getState();

    if (!columnFilters.length) return getFilteredRowModel<TData>()(table)();

    const filteredRows = rowModel.rows.filter((row) =>
      evaluateLogicalOperator(logicalOperator, columnFilters, (columnFilter) =>
        customOperatorFilter(row, columnFilter, logicalOperator)
      )
    );

    const rowsById = Object.fromEntries(
      Object.entries(rowModel.rowsById).filter(([_key, row]) =>
        filteredRows.some(({ id }) => id === row.id)
      )
    );

    return {
      rows: filteredRows,
      flatRows: filteredRows,
      rowsById,
    };
  };

export const registerCustomFilterFunctions = <T,>(table: Table<T>): void => {
  if (!table || !table.options) return;

  const filterFunctions: Record<string, FilterFn<T>> = {
    [FilterOperator.NOT_INCLUDES_STRING]: (
      row: Row<T>,
      columnId: string,
      filterValue: string
    ) => {
      const value = row.getValue(columnId);
      if (isNullOrUndefined(value)) return filterValue === '';
      return !normalizeValue(value).includes(normalizeValue(filterValue));
    },

    [FilterOperator.NOT_EQUALS]: (
      row: Row<T>,
      columnId: string,
      filterValue: string
    ) => {
      const value = row.getValue(columnId);
      if (isNullOrUndefined(value)) return filterValue !== '';
      return normalizeValue(value) !== normalizeValue(filterValue);
    },

    [FilterOperator.IS_EMPTY]: (row: Row<T>, columnId: string) =>
      isEmpty(row.getValue(columnId)),

    [FilterOperator.IS_NOT_EMPTY]: (row: Row<T>, columnId: string) =>
      isNotEmpty(row.getValue(columnId)),

    [FilterOperator.STARTS_WITH]: (
      row: Row<T>,
      columnId: string,
      filterValue: string
    ) =>
      compareValues(row.getValue(columnId), filterValue, (value, filter) =>
        value.startsWith(filter)
      ),

    [FilterOperator.ENDS_WITH]: (
      row: Row<T>,
      columnId: string,
      filterValue: string
    ) =>
      compareValues(row.getValue(columnId), filterValue, (value, filter) =>
        value.endsWith(filter)
      ),

    [FilterOperator.IS_ANY_OF]: (
      row: Row<T>,
      columnId: string,
      filterValue: string | string[]
    ) => {
      const value = row.getValue(columnId);
      if (isNullOrUndefined(value)) return false;
      const strCellValue = normalizeValue(value);

      const values = Array.isArray(filterValue)
        ? filterValue.map(normalizeValue)
        : splitAndNormalize(filterValue);

      return values.some((item) => strCellValue.includes(item));
    },
  };

  table.options.filterFns = {
    ...table.options.filterFns,
    ...filterFunctions,
  };
};

export const applyFiltersToTable = <T,>(
  filters: FilterItem[],
  logicalOperator: FilterLogicalOperator,
  table: Table<T>
) => {
  table.resetColumnFilters();

  const validFilters = filters.filter(
    (filter) =>
      filter.operator === FilterOperator.IS_EMPTY ||
      filter.operator === FilterOperator.IS_NOT_EMPTY ||
      filter.value.trim() !== ''
  );

  if (validFilters.length === 0) {
    return 0;
  }

  const filtersByColumn: Record<string, FilterItem[]> = {};

  validFilters.forEach((filter) => {
    if (!filtersByColumn[filter.column]) {
      filtersByColumn[filter.column] = [];
    }
    filtersByColumn[filter.column].push(filter);
  });

  Object.entries(filtersByColumn).forEach(([columnId, columnFilters]) => {
    const column = table.getColumn(columnId);
    if (!column) return;

    const negationFilters = columnFilters.filter((f) =>
      NEGATION_OPERATORS.has(f.operator)
    );

    const inclusionFilters = columnFilters.filter(
      (f) => !NEGATION_OPERATORS.has(f.operator)
    );

    if (negationFilters.length > 0) {
      let filterValue = '';

      if (inclusionFilters.length > 0) {
        filterValue = inclusionFilters
          .map((filter) => {
            if (filter.operator === FilterOperator.IS_EMPTY)
              return SpecialFilterValue.EMPTY;
            if (filter.operator === FilterOperator.IS_NOT_EMPTY)
              return SpecialFilterValue.NOT_EMPTY;
            return `${filter.operator}${FILTER_SEPARATORS.OPERATOR_VALUE_SEPARATOR}${filter.value}`;
          })
          .join(FILTER_SEPARATORS.INCLUSION_SEPARATOR);
      }

      const negationPart = negationFilters
        .map(
          (filter) =>
            `${filter.operator}${FILTER_SEPARATORS.OPERATOR_VALUE_SEPARATOR}${filter.value}`
        )
        .join(FILTER_SEPARATORS.NEGATION_FILTERS_SEPARATOR);

      if (filterValue) {
        filterValue += `${FILTER_SEPARATORS.NEGATION_SEPARATOR}${negationPart}`;
      } else {
        filterValue = `${FILTER_SEPARATORS.NEGATION_SEPARATOR}${negationPart}`;
      }

      column.setFilterValue(filterValue);
    } else if (columnFilters.length === 1) {
      const filter = columnFilters[0];

      if (filter.operator === FilterOperator.IS_EMPTY) {
        column.setFilterValue(SpecialFilterValue.EMPTY);
      } else if (filter.operator === FilterOperator.IS_NOT_EMPTY) {
        column.setFilterValue(SpecialFilterValue.NOT_EMPTY);
      } else if (filter.operator === FilterOperator.IS_ANY_OF) {
        const values = filter.value.split(',').map((v) => v.trim());
        column.setFilterValue(values);
      } else {
        column.setFilterValue(
          `${filter.operator}${FILTER_SEPARATORS.OPERATOR_VALUE_SEPARATOR}${filter.value}`
        );
      }
    } else {
      const combinedFilter = columnFilters
        .map((filter) => {
          if (filter.operator === FilterOperator.IS_EMPTY)
            return SpecialFilterValue.EMPTY;
          if (filter.operator === FilterOperator.IS_NOT_EMPTY)
            return SpecialFilterValue.NOT_EMPTY;
          return `${filter.operator}${FILTER_SEPARATORS.OPERATOR_VALUE_SEPARATOR}${filter.value}`;
        })
        .join(FILTER_SEPARATORS.INCLUSION_SEPARATOR);

      column.setFilterValue(combinedFilter);
    }
  });

  table.setState((prev) => ({ ...prev, logicalOperator }));

  return validFilters.length;
};

export const createBaseFilter = (
  columnId: string,
  type: FilterType,
  options?: SelectOption[]
): FilterItem => ({
  id: `filter-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
  column: columnId,
  operator: getOperatorsByType(type)[0].value,
  value: '',
  options,
});
