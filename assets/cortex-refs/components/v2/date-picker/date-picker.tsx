import { Button } from '@/components/components/ui/button';
import { Calendar } from '@/components/components/ui/calendar';
import { Input } from '@/components/components/ui/input';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/components/ui/popover';
import { Select } from '@/components/components/ui/select';
import { Typography } from '@/components/components/ui/typography';
import * as React from 'react';
import { DateRange, TZDate } from 'react-day-picker';
import { COLORS } from 'styles/colors';
import HazardIcon from '../icons/hazard';
import {
  DatePickerContentProps,
  DatePickerFooterProps,
  DatePickerProps,
  DateRangePickerContentProps,
  DateSinglePickerContentProps,
} from './types';
import {
  formatTimeValue,
  getInitialDate,
  getInitialRange,
  getInitialTimeZone,
  getTimeZoneOptions,
  isRangeProps,
  MONTH_WIDTH,
  preserveTime,
  RANGE_DISPLAYED_MONTHS,
  SEPARATOR,
  TimeName,
  TIME_BOUNDS,
  TIME_UNITS,
} from './utils';

const TimeInputs = React.memo(function TimeInputs({
  date,
  timeZone,
  onTimeChange,
  disabled = false,
}: {
  date: Date | undefined;
  timeZone: string;
  disabled?: boolean;
  onTimeChange: (getNewTime: (date: Date) => Date) => void;
}) {
  const handleTimeChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      const value = event.target.valueAsNumber;
      const name = event.target.name as TimeName;

      if (Number.isNaN(value)) return;

      const { min, max } = TIME_BOUNDS[name];
      if (value < min || value > max) return;

      const setKey = `set${name}` as const;

      onTimeChange((date) => {
        const newDate = new TZDate(date, timeZone);
        newDate[setKey](value);
        return newDate;
      });
    },
    [onTimeChange, timeZone, disabled]
  );

  return (
    <div className="flex gap-1 text-foreground items-baseline">
      {TIME_UNITS.map(({ name, placeholder }, index) => (
        <React.Fragment key={name}>
          <div className="flex flex-col gap-2 items-center">
            <Input
              type="number"
              name={name}
              value={formatTimeValue(date?.[`get${name}`]())}
              placeholder={placeholder}
              disabled={disabled || !date}
              min={TIME_BOUNDS[name].min}
              max={TIME_BOUNDS[name].max}
              className="justify-center px-0 [&_input:appearance:textfield] [&_input::-webkit-outer-spin-button]:appearance-none [&_input::-webkit-inner-spin-button]:appearance-none [&_input]:w-4.5 w-12 h-8"
              onChange={handleTimeChange}
            />
            <Typography variant="helper">{name}</Typography>
          </div>
          {index < TIME_UNITS.length - 1 && <span>{SEPARATOR}</span>}
        </React.Fragment>
      ))}
    </div>
  );
});

function ConfirmSection({
  selected,
  disabled,
  onConfirm,
}: Pick<DatePickerFooterProps, 'selected' | 'onConfirm'> & {
  disabled?: boolean;
}) {
  const handleConfirm = React.useCallback(() => {
    // @ts-expect-error used because onSelect expects 3 more parameters
    // which are not actually needed for the function to execute correctly and are not possible to be passed here
    onConfirm(selected);
  }, [onConfirm, selected]);

  return (
    <div className="self-center ml-auto">
      <PopoverClose asChild>
        <Button disabled={disabled || !selected} onClick={handleConfirm}>
          Confirm
        </Button>
      </PopoverClose>
    </div>
  );
}

function DatePickerError({ error }: { error: string | undefined }) {
  if (!error) return null;

  return (
    <div className="flex gap-1 [&>svg]:size-6 [&>svg]:shrink-0 w-full">
      <HazardIcon color={COLORS.FOREGROUND_ERROR} />
      <Typography variant="body-sm" className="text-foreground-error">
        Warning:{' '}
        <Typography
          variant="body-sm"
          className="text-foreground"
          component="span"
        >
          {error}
        </Typography>
      </Typography>
    </div>
  );
}

function DatePickerFooter({
  withTime = false,
  mode,
  selected,
  timeZone,
  error,
  onSelect,
  onTimeZoneChange,
  onConfirm,
  lockStart,
  disableAll,
}: DatePickerFooterProps) {
  const handleTimeChange = React.useCallback(
    (key?: 'from' | 'to') => (getNewTime: (date: Date) => Date) => {
      if (disableAll) return;

      if (isRangeProps(mode, selected) && key) {
        const date = selected?.[key];
        if (!selected || !date) return;

        if (lockStart && key === 'from') return;

        const newValue = { ...selected, [key]: getNewTime(date) };
        onSelect?.(newValue);
      } else if (selected instanceof Date) {
        onSelect?.(getNewTime(selected));
      }
    },
    [mode, selected, onSelect, lockStart, disableAll]
  );

  const timeInputs = React.useMemo(() => {
    if (isRangeProps(mode, selected)) {
      return [
        {
          date: selected?.from,
          key: 'from' as const,
          label: 'Start Time (24hr)',
        },
        { date: selected?.to, key: 'to' as const, label: 'End Time (24hr)' },
      ];
    }

    return [{ date: selected, key: undefined, label: 'Time (24hr)' }];
  }, [mode, selected]);

  return (
    <div className="flex flex-wrap gap-3 pt-3 border-t border-t-background-contrast px-6">
      {withTime && (
        <div className="flex gap-12">
          {timeInputs.map(({ date, key, label }) => {
            const disabledForThisInput =
              disableAll || (lockStart && key === 'from');
            return (
              <div key={key || 'single'}>
                <Typography variant="body-sm" className="text-foreground mb-3">
                  {label}
                </Typography>
                <TimeInputs
                  date={date}
                  timeZone={timeZone}
                  onTimeChange={handleTimeChange(key)}
                  disabled={disabledForThisInput}
                />
              </div>
            );
          })}
          <div>
            <Typography variant="body-sm" className="text-foreground mb-3">
              Timezone
            </Typography>
            <Select
              value={timeZone}
              options={getTimeZoneOptions()}
              onValueChange={onTimeZoneChange}
              disabled={!selected || disableAll}
            />
          </div>
        </div>
      )}
      <DatePickerError error={error} />
      <ConfirmSection
        selected={selected}
        disabled={!!error || disableAll}
        onConfirm={onConfirm}
      />
    </div>
  );
}

function DateRangePickerContent({
  withTime,
  selected: initialValue,
  timeZone,
  error,
  onSelect,
  onTimeZoneChange,
  lockStart = false,
  disableAll = false,
  ...calendarProps
}: DateRangePickerContentProps) {
  const [selected, setSelected] = React.useState<DateRange | undefined>(() =>
    getInitialRange(initialValue, timeZone)
  );

  const lockedFrom = React.useMemo(
    () => (lockStart ? initialValue?.from : undefined),
    [lockStart, initialValue?.from]
  );

  const handleTimeZoneChange = React.useCallback(
    (value: string) => {
      onTimeZoneChange(value);
      setSelected({
        from: preserveTime(
          lockedFrom ?? selected?.from,
          lockedFrom ?? selected?.from,
          value
        ),
        to: preserveTime(selected?.to, selected?.to, value),
      });
    },
    [onTimeZoneChange, selected?.from, selected?.to, lockedFrom]
  );

  const handleCalendarSelect = React.useCallback(
    (value: DateRange | undefined) => {
      if (disableAll) return;
      if (!value) return setSelected(undefined);

      if (lockedFrom) {
        const candidate =
          value.to ??
          (value.from && value.from >= lockedFrom ? value.from : undefined);
        setSelected({
          from: lockedFrom,
          to: withTime
            ? preserveTime(candidate, selected?.to, timeZone)
            : candidate,
        });
        return;
      }

      setSelected(
        !withTime
          ? value
          : {
              from: preserveTime(value.from, selected?.from, timeZone),
              to: preserveTime(value.to, selected?.to, timeZone),
            }
      );
    },
    [withTime, selected?.from, selected?.to, timeZone, lockedFrom, disableAll]
  );

  const handleDayClick = React.useCallback(
    (day: Date, _mods: any, e: any) => {
      if (disableAll) {
        e?.preventDefault?.();
        e?.stopPropagation?.();
        return;
      }
      if (lockedFrom && day.getTime() === lockedFrom.getTime()) {
        e?.preventDefault?.();
        e?.stopPropagation?.();
      }
    },
    [lockedFrom, disableAll]
  );

  return (
    <>
      <Calendar
        mode="range"
        showOutsideDays={false}
        timeZone={timeZone}
        selected={selected}
        onSelect={handleCalendarSelect}
        disabled={
          disableAll
            ? [() => true]
            : lockedFrom
            ? [{ before: lockedFrom }]
            : calendarProps.disabled
        }
        onDayClick={handleDayClick}
        {...calendarProps}
      />

      <DatePickerFooter
        mode="range"
        withTime={withTime}
        selected={selected}
        timeZone={timeZone}
        error={error}
        onSelect={(next) => {
          if (!next || disableAll) return;
          const newDate = next as DateRange;
          setSelected({
            from: lockedFrom ?? newDate.from,
            to: newDate.to,
          });
        }}
        onTimeZoneChange={handleTimeZoneChange}
        onConfirm={onSelect}
        lockStart={lockStart}
        disableAll={disableAll}
      />
    </>
  );
}

function DateSinglePickerContent({
  withTime,
  selected: initialValue,
  timeZone,
  error,
  onSelect,
  onTimeZoneChange,
  ...calendarProps
}: DateSinglePickerContentProps) {
  const [selected, setSelected] = React.useState<Date | undefined>(() =>
    getInitialDate(initialValue, timeZone)
  );

  const handleTimeZoneChange = React.useCallback(
    (value: string) => {
      onTimeZoneChange(value);
      setSelected(preserveTime(selected, selected, value));
    },
    [onTimeZoneChange, selected]
  );

  const handleCalendarSelect = React.useCallback(
    (value: Date | undefined) => {
      setSelected(withTime ? preserveTime(value, selected, timeZone) : value);
    },
    [withTime, selected, timeZone]
  );

  return (
    <>
      <Calendar
        mode="single"
        showOutsideDays={false}
        timeZone={timeZone}
        selected={selected}
        onSelect={handleCalendarSelect}
        {...calendarProps}
      />

      <DatePickerFooter
        mode="single"
        withTime={withTime}
        selected={selected}
        timeZone={timeZone}
        error={error}
        onSelect={setSelected}
        onTimeZoneChange={handleTimeZoneChange}
        onConfirm={onSelect}
      />
    </>
  );
}

function DatePickerContent({ mode, ...props }: DatePickerContentProps) {
  const [timeZone, setTimeZone] = React.useState(() =>
    getInitialTimeZone(
      mode,
      props as DateSinglePickerContentProps | DateRangePickerContentProps
    )
  );

  const contents = {
    single: (
      <DateSinglePickerContent
        {...(props as DateSinglePickerContentProps)}
        timeZone={timeZone}
        onTimeZoneChange={setTimeZone}
      />
    ),
    range: (
      <DateRangePickerContent
        {...(props as DateRangePickerContentProps)}
        timeZone={timeZone}
        onTimeZoneChange={setTimeZone}
        lockStart={props.lockStart}
        disableAll={props.disableAll}
      />
    ),
    multiple: null,
  };

  if (!mode) return null;
  return contents[mode];
}

export const DatePicker = React.memo(function DatePicker({
  trigger,
  align = 'center',
  open,
  numberOfMonths,
  setOpen,
  lockStart,
  disableAll,
  ...contentProps
}: DatePickerProps) {
  const displayedMonths = React.useMemo(
    () =>
      contentProps.mode === 'range' ? RANGE_DISPLAYED_MONTHS : numberOfMonths,
    [contentProps.mode, numberOfMonths]
  );

  const popoverStyle = React.useMemo(
    () => ({
      width: displayedMonths ? displayedMonths * MONTH_WIDTH : MONTH_WIDTH,
    }),
    [displayedMonths]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="w-full">{trigger}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="bg-background-progress border-none p-0 rounded-xl pb-6"
        style={popoverStyle}
      >
        <DatePickerContent
          {...contentProps}
          numberOfMonths={displayedMonths}
          lockStart={lockStart}
          disableAll={disableAll}
        />
      </PopoverContent>
    </Popover>
  );
});
