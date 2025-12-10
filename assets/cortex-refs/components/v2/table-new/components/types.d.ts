import { SelectOption } from '@/components/components/ui/select/utils';
import '@tanstack/react-table';
import {
  FilterLogicalOperator,
  FilterType,
} from '../../table/filters/custom-filter';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    className?: string;
    getStyles?: (context: { row: TData; value: TValue; columnId: string }) => {
      className?: string;
      style?: React.CSSProperties;
    };
    /**
     * Defines the data type of filtering to apply for this column.
     *
     * Determines how the filter value is interpreted and how the filter UI behaves.
     *
     * If not explicitly provided, the default filter type is `'string'`.
     *
     * @example
     * filterType: 'number'
     */
    filterType?: FilterType;
    /**
     * An array of selectable filter options for the column's filter UI.
     * This property is only relevant when `filterType` is `'select'`.
     *
     * ### Static Example (Directly in the column definition):
     * ```ts
     * filterType: 'select',
     * filterOptions: [
     *   { label: 'Active', value: 'active' },
     *   { label: 'Inactive', value: 'inactive' },
     *   { label: 'Pending', value: 'pending' },
     * ]
     * ```
     *
     * ### Dynamic Example (Fetched from API):
     * ```ts
     * const { data } = useGetAllOrganisations();
     *
     * const columns = useMemo(() =>
     *   networkColumns.map((colDef) => {
     *     if (colDef.id !== ColumnIds.ORGANISATION) return colDef;
     *
     *     return {
     *       ...colDef,
     *       meta: {
     *         filterType: 'select' as const,
     *         filterOptions: data.map(({ id, name }) => ({
     *           value: id,
     *           label: name,
     *         })),
     *       },
     *     };
     *   }),
     * [data]);
     * ```
     */
    filterOptions?: SelectOption[];
  }

  interface TableState {
    logicalOperator: FilterLogicalOperator;
  }
}
