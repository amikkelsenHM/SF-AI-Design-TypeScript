import { Input } from '@/components/components/ui/input';
import { Select } from '@/components/components/ui/select';
import { HTMLInputTypeAttribute, useCallback, useMemo, useState } from 'react';
import { TZDate } from 'react-day-picker';
import { DatePicker } from '../../date-picker/date-picker';
import {
  FilterItem,
  FilterOperator,
  FilterType,
} from '../../table/filters/custom-filter';

const INPUT_TYPES_MAP: Partial<Record<FilterType, HTMLInputTypeAttribute>> = {
  string: 'text',
  number: 'number',
};

const CLASSNAME = 'flex-1';
const DEFAULT_PLACEHOLDER = 'Filter value';

interface SFTableFilterInputProps {
  filterType: FilterType;
  filter: FilterItem;
  onUpdateFilter: (filterId: string, updatedValue: Partial<FilterItem>) => void;
}

export function SFTableFilterInput({
  filterType,
  filter,
  onUpdateFilter,
}: SFTableFilterInputProps) {
  const shouldShowValueInput = useCallback((operator: string) => {
    return (
      operator !== FilterOperator.IS_EMPTY &&
      operator !== FilterOperator.IS_NOT_EMPTY
    );
  }, []);

  const handleUpdateFilter = useCallback(
    (value: string) => onUpdateFilter(filter.id, { value }),
    [onUpdateFilter]
  );

  const [timeZone, setTimeZone] = useState('+00:00');

  const dateValue = useMemo(
    () =>
      filter.value ? new TZDate(Number(filter.value), timeZone) : undefined,
    [filter.value, timeZone]
  );

  if (!shouldShowValueInput(filter.operator)) return <div className="flex-1" />;

  if (filterType === 'date') {
    return (
      <DatePicker
        withTime
        mode="single"
        selected={dateValue}
        onSelect={(value) => {
          handleUpdateFilter(Number(value).toString());
          setTimeZone((value as TZDate).timeZone || '+00:00');
        }}
        trigger={
          <Input
            className={CLASSNAME}
            placeholder={DEFAULT_PLACEHOLDER}
            value={dateValue?.toUTCString() || ''}
          />
        }
      />
    );
  }

  if (filterType === 'select') {
    return (
      <Select
        className={CLASSNAME}
        placeholder={DEFAULT_PLACEHOLDER}
        value={filter.value}
        options={filter.options || []}
        onValueChange={handleUpdateFilter}
      />
    );
  }

  return (
    <Input
      className={CLASSNAME}
      type={INPUT_TYPES_MAP[filterType]}
      placeholder={
        filter.operator === FilterOperator.IS_ANY_OF
          ? 'Value1, Value2, ...'
          : DEFAULT_PLACEHOLDER
      }
      value={filter.value}
      onChange={(e) => handleUpdateFilter(e.target.value)}
    />
  );
}
