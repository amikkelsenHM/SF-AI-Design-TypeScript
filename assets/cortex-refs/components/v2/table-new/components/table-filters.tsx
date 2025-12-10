'use client';

import { Button } from '@/components/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/components/ui/popover';
import { Select } from '@/components/components/ui/select';
import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';
import { memo, useCallback, useState } from 'react';
import FilterIcon from '../../icons/filter';
import { LOGICAL_OPERATOR_OPTIONS } from '../../table/filters/custom-filter';
import { useFilterableColumns } from '../hooks/useFilterableColumns';
import { useTableFilters } from '../hooks/useTableFilters';
import { SFTableFilterInput } from './table-filter-input';

const ENABLED_LOGICAL_OPERATOR_INDEX = 1;

interface SFTableFiltersProps<TData> {
  customFilters?: React.ReactNode;
  table?: Table<TData>;
  excludeColumns?: string[];
}

function SFTableFiltersComponent<TData>({
  customFilters,
  table,
  excludeColumns = [],
}: SFTableFiltersProps<TData>) {
  const [open, setOpen] = useState(false);

  const {
    filterableColumns,
    getColumnFilterType,
    getColumnFilterOptions,
    getColumnFilterOperators,
  } = useFilterableColumns(table, excludeColumns);

  const {
    filters,
    activeFilterCount,
    logicalOperator,
    addFilter,
    updateFilter,
    removeFilter,
    removeAllFilters,
    applyFilters,
    setLogicalOperator,
  } = useTableFilters(table, filterableColumns, getColumnFilterOptions);

  const handleApplyFilters = useCallback(() => {
    applyFilters();
    setOpen(false);
  }, [applyFilters]);

  if (customFilters) {
    return <>{customFilters}</>;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button iconPosition="left" variant="secondary">
          <FilterIcon />
          <span>Filter</span>
          {activeFilterCount > 0 && (
            <span className="ml-1 bg-deep-purple text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-[650px] p-6 bg-background-progress rounded-xl shadow-xl border-none"
        align="end"
        sideOffset={5}
      >
        {filters.length === 0 ? (
          <div className="text-center text-white py-4">
            No filters added. Click "Add" to create a filter.
          </div>
        ) : (
          filters.map((filter, index) => (
            <div
              key={filter.id}
              className="flex items-center gap-2 mb-3 rounded-md"
            >
              {filters.length > 1 && (
                <Select
                  disabled={index !== ENABLED_LOGICAL_OPERATOR_INDEX}
                  value={logicalOperator}
                  options={LOGICAL_OPERATOR_OPTIONS}
                  className={index === 0 ? 'invisible' : ''}
                  onValueChange={(value) => setLogicalOperator(value)}
                />
              )}
              <Select
                value={filter.column}
                options={filterableColumns.map(({ id, title }) => ({
                  value: id,
                  label: title,
                }))}
                onValueChange={(value) =>
                  updateFilter(filter.id, {
                    column: value,
                    value: '',
                    operator: getColumnFilterOperators(value)[0].value,
                    options: getColumnFilterOptions(value),
                  })
                }
              />

              <Select
                value={filter.operator}
                options={getColumnFilterOperators(filter.column)}
                onValueChange={(value) =>
                  updateFilter(filter.id, { operator: value })
                }
              />

              <SFTableFilterInput
                filterType={getColumnFilterType(filter.column)}
                filter={filter}
                onUpdateFilter={updateFilter}
              />

              <Button
                onClick={() => removeFilter(filter.id)}
                variant="secondary"
                size="icon-sm"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
          ))
        )}

        <div className="flex gap-x-3 mt-4 justify-end">
          {filters.length > 0 && (
            <Button variant="tertiary" onClick={removeAllFilters}>
              Remove All
            </Button>
          )}

          <Button variant="secondary" onClick={addFilter}>
            Add
          </Button>

          <Button variant="primary" onClick={handleApplyFilters}>
            Save
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export const SFTableFilters = memo(
  SFTableFiltersComponent
) as typeof SFTableFiltersComponent;
