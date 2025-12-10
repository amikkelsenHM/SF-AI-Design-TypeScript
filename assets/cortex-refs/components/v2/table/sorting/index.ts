import { SortingFn } from '@tanstack/react-table';

export const alphanumericWithFallbackSortingFn =
  <T>(fallback: string): SortingFn<T> =>
  (rowA, rowB, columnId) => {
    const valueA = rowA.getValue(columnId)?.toString();
    const valueB = rowB.getValue(columnId)?.toString();

    const isFallbackA = !valueA || valueA === fallback;
    const isFallbackB = !valueB || valueB === fallback;

    if (isFallbackA && isFallbackB) return 0;

    if (isFallbackA) return 1;
    if (isFallbackB) return -1;

    return valueA.localeCompare(valueB, undefined, {
      numeric: true,
      sensitivity: 'base',
    });
  };

const FALLBACK_ORDER = 999;

export const createSortingFn =
  <TData, TOrder extends Record<string, number>>(
    sortingOrder: TOrder
  ): SortingFn<TData> =>
  (rowA, rowB, columnId) => {
    const valueA = rowA.getValue(columnId)?.toString() as keyof TOrder;
    const valueB = rowB.getValue(columnId)?.toString() as keyof TOrder;

    const orderA = sortingOrder[valueA] ?? FALLBACK_ORDER;
    const orderB = sortingOrder[valueB] ?? FALLBACK_ORDER;

    return orderA - orderB;
  };
