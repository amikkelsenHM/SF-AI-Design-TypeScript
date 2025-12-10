import { SelectOption } from '@/components/components/ui/select/utils';
import { FilterItem, FilterOperator } from './custom-filter';

export const FILTER_SEPARATORS = {
  INCLUSION_SEPARATOR: ';', // Separates multiple inclusion filters
  NEGATION_SEPARATOR: '|NOT|', // Separates inclusion from negation filters
  NEGATION_FILTERS_SEPARATOR: '|', // Separates multiple negation filters
  OPERATOR_VALUE_SEPARATOR: ':', // Separates operator from value
} as const;

export const isNullOrUndefined = (value: unknown): value is null | undefined =>
  value === null || value === undefined;

export const isEmpty = (value: unknown): boolean => {
  if (isNullOrUndefined(value)) return true;

  if (typeof value === 'string') {
    return value.trim() === '';
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  return false;
};

export const isNotEmpty = (value: unknown): boolean => !isEmpty(value);

export const normalizeValue = (value: any): string =>
  String(value || '').toLowerCase();

export const compareValues = (
  cellValue: any,
  filterValue: string,
  compareFn: (a: string, b: string) => boolean
): boolean => {
  if (isNullOrUndefined(cellValue)) return false;
  return compareFn(normalizeValue(cellValue), normalizeValue(filterValue));
};

export const splitAndNormalize = (value: string): string[] =>
  value.split(',').map((v) => normalizeValue(v.trim()));

export const stringToFilterOperator = (operatorRaw: string): FilterOperator => {
  const operatorString = operatorRaw.replace(
    FILTER_SEPARATORS.NEGATION_SEPARATOR,
    ''
  );
  if (
    Object.values(FilterOperator).includes(operatorString as FilterOperator)
  ) {
    return operatorString as FilterOperator;
  }

  return FilterOperator.INCLUDES_STRING;
};

export const generateFilterId = () => {
  return `filter-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// TODO: this util should be improved, the logic is too hard to follow and unmaintainable
export function parseFilterValue(
  columnId: string,
  value: unknown,
  options: SelectOption[] | undefined
): FilterItem[] {
  const filters: FilterItem[] = [];

  const id = () => generateFilterId();

  if (value === '__EMPTY__') {
    filters.push({
      id: id(),
      column: columnId,
      operator: FilterOperator.IS_EMPTY,
      value: '',
      options,
    });
  } else if (value === '__NOT_EMPTY__') {
    filters.push({
      id: id(),
      column: columnId,
      operator: FilterOperator.IS_NOT_EMPTY,
      value: '',
      options,
    });
  } else if (
    typeof value === 'string' &&
    value.includes(FILTER_SEPARATORS.NEGATION_SEPARATOR)
  ) {
    const [inclusionPart, negationPart] = value.split(
      FILTER_SEPARATORS.NEGATION_SEPARATOR
    );

    if (inclusionPart && inclusionPart.trim()) {
      inclusionPart
        .split(FILTER_SEPARATORS.INCLUSION_SEPARATOR)
        .filter(Boolean)
        .forEach((filterStr) => {
          if (filterStr === '__EMPTY__') {
            filters.push({
              id: id(),
              column: columnId,
              operator: FilterOperator.IS_EMPTY,
              value: '',
              options,
            });
          } else if (filterStr === '__NOT_EMPTY__') {
            filters.push({
              id: id(),
              column: columnId,
              operator: FilterOperator.IS_NOT_EMPTY,
              value: '',
              options,
            });
          } else {
            const [operator, filterValue] = filterStr.split(
              FILTER_SEPARATORS.OPERATOR_VALUE_SEPARATOR,
              2
            );
            filters.push({
              id: id(),
              column: columnId,
              operator: stringToFilterOperator(operator),
              value: filterValue,
              options,
            });
          }
        });
    }

    if (negationPart && negationPart.trim()) {
      negationPart
        .split(FILTER_SEPARATORS.NEGATION_FILTERS_SEPARATOR)
        .filter(Boolean)
        .forEach((filterStr) => {
          const [operator, filterValue] = filterStr.split(
            FILTER_SEPARATORS.OPERATOR_VALUE_SEPARATOR,
            2
          );
          filters.push({
            id: id(),
            column: columnId,
            operator: stringToFilterOperator(operator),
            value: filterValue,
            options,
          });
        });
    }
  } else if (
    typeof value === 'string' &&
    value.includes(FILTER_SEPARATORS.INCLUSION_SEPARATOR)
  ) {
    value
      .split(FILTER_SEPARATORS.INCLUSION_SEPARATOR)
      .filter(Boolean)
      .forEach((filterStr) => {
        const [operator, filterValue] = filterStr.split(
          FILTER_SEPARATORS.OPERATOR_VALUE_SEPARATOR,
          2
        );
        filters.push({
          id: id(),
          column: columnId,
          operator: stringToFilterOperator(operator),
          value: filterValue,
          options,
        });
      });
  } else if (
    typeof value === 'string' &&
    value.includes(FILTER_SEPARATORS.OPERATOR_VALUE_SEPARATOR)
  ) {
    const [operator, filterValue] = value.split(
      FILTER_SEPARATORS.OPERATOR_VALUE_SEPARATOR,
      2
    );
    filters.push({
      id: id(),
      column: columnId,
      operator: stringToFilterOperator(operator),
      value: filterValue,
      options,
    });
  } else if (Array.isArray(value)) {
    filters.push({
      id: id(),
      column: columnId,
      operator: FilterOperator.IS_ANY_OF,
      value: value.join(', '),
      options,
    });
  } else {
    filters.push({
      id: id(),
      column: columnId,
      operator: FilterOperator.INCLUDES_STRING,
      value: String(value),
      options,
    });
  }

  return filters;
}

export const createEnumFilterOptions = <T extends Record<string, string>>(
  enumObject: T,
  removeDuplicates = false,
  transformLabel?: (value: T[keyof T]) => string
): SelectOption[] => {
  const values = Object.values(enumObject);
  const uniqueValues = removeDuplicates ? Array.from(new Set(values)) : values;

  return uniqueValues.map((value) => ({
    label: transformLabel?.(value as T[keyof T]) || value,
    value,
  }));
};
