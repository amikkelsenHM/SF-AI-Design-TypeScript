import { SelectOption } from '@/components/components/ui/select/utils';
import { DateRange, TZDate } from 'react-day-picker';
import { CalendarProps } from '../../components/ui/calendar/calendar';
import {
  DateRangePickerContentProps,
  DateSinglePickerContentProps,
} from './types';

export const SEPARATOR = ':';

export const PLACEHOLDERS = {
  HOURS: 'hh',
  MINUTES: 'mm',
};

export const TIME_UNITS = [
  {
    name: 'Hours',
    placeholder: PLACEHOLDERS.HOURS,
  },
  {
    name: 'Minutes',
    placeholder: PLACEHOLDERS.MINUTES,
  },
] as const;

export const TIME_BOUNDS = {
  Hours: { min: 0, max: 23 },
  Minutes: { min: 0, max: 59 },
};

export const MONTH_WIDTH = 300;
export const RANGE_DISPLAYED_MONTHS = 2;

export type TimeName = (typeof TIME_UNITS)[number]['name'];

export const isRangeProps = (
  mode: CalendarProps['mode'],
  selected: unknown
): selected is DateRangePickerContentProps['selected'] => mode === 'range';

export const formatTimeValue = (value: number | undefined) =>
  value !== undefined ? value.toString().padStart(2, '0') : '';

export const preserveTime = (
  targetDate: Date | undefined,
  sourceDate: Date | undefined,
  timeZone: string
): Date | undefined => {
  if (!targetDate) return undefined;

  return new TZDate(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate(),
    sourceDate?.getHours() || 0,
    sourceDate?.getMinutes() || 0,
    sourceDate?.getSeconds() || 0,
    timeZone
  );
};

export const getTimeZoneOptions = () => {
  const options: SelectOption[] = [];

  for (let i = -12; i <= 12; i++) {
    const offset = Math.abs(i);
    const sign = i < 0 ? '-' : '+';
    const value = `${sign}${offset.toString().padStart(2, '0')}:00`;

    options.push({
      label: i === 0 ? 'UTC' : `UTC${sign}${offset}`,
      value,
    });
  }

  return options;
};

export const UTC_TIME_ZONE = '+00:00';

export const getInitialTimeZone = (
  mode: CalendarProps['mode'],
  props: DateRangePickerContentProps | DateSinglePickerContentProps
) => {
  let timeZone: string | undefined;

  if (isRangeProps(mode, props.selected)) {
    if (props.selected?.from)
      timeZone = (props.selected.from as TZDate).timeZone;
  } else {
    if (props.selected) {
      timeZone = (props.selected as TZDate).timeZone;
    }
  }

  return timeZone || UTC_TIME_ZONE;
};

export const getInitialDate = (
  date: Date | undefined,
  timeZone: string = UTC_TIME_ZONE
) => {
  if (!date) return;

  return new TZDate(date, timeZone);
};

export const getInitialRange = (
  range: DateRange | undefined,
  timeZone: string = UTC_TIME_ZONE
) => {
  if (!range) return;

  return {
    from: getInitialDate(range.from, timeZone),
    to: getInitialDate(range.to, timeZone),
  };
};
