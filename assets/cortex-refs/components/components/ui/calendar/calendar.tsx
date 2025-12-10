'use client';

import { buttonVariants } from '@/components/components/ui/button';
import { cn } from '@/components/lib/utils';
import { RANGE_DISPLAYED_MONTHS } from '@/components/v2/date-picker/utils';
import Arrow from '@/components/v2/icons/arrow';
import { VariantProps } from 'class-variance-authority';
import { format } from 'date-fns';
import * as React from 'react';
import {
  DateLib,
  DayButton,
  DayPicker,
  getDefaultClassNames,
  MonthGridProps,
  useDayPicker,
} from 'react-day-picker';
import { Typography } from '../typography';
import { getIsCurrentYear, getYearOptions } from './utils';

type ViewType = 'month' | 'year';

const ROTATION_ANGLES = {
  DEFAULT: 0,
  FLIPPED: 180,
} as const;

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: VariantProps<typeof buttonVariants>['variant'];
};

const toggleView = (prev: ViewType) => (prev === 'month' ? 'year' : 'month');

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'tertiary',
  formatters,
  components,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames();
  const [view, setView] = React.useState<ViewType>('month');

  const defaultMonth = React.useMemo(
    () =>
      props.mode === 'single'
        ? props.selected
        : props.mode === 'range'
        ? props.selected?.from
        : undefined,
    [props]
  );

  return (
    <DayPicker
      defaultMonth={defaultMonth}
      showOutsideDays={showOutsideDays}
      className={cn(
        'bg-background group/calendar [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent text-foreground',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString('default', { month: 'short' }),
        formatWeekdayName: (weekday) => format(weekday, 'EEEEE'),
        ...formatters,
      }}
      classNames={{
        root: cn('w-full', defaultClassNames.root),
        months: cn(
          'grid gap-x-8 gap-y-2 px-4 relative',
          props.numberOfMonths === RANGE_DISPLAYED_MONTHS && 'grid-cols-2',
          defaultClassNames.months
        ),
        nav: cn(
          'flex items-center gap-6 w-full justify-between absolute top-0 inset-x-0 h-13 px-6 border-b border-b-background-contrast',
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
          defaultClassNames.button_next
        ),
        month_caption: cn(
          'flex items-center h-13 w-fit',
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          'w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5',
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          'relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md',
          defaultClassNames.dropdown_root
        ),
        dropdown: cn('absolute inset-0 opacity-0', defaultClassNames.dropdown),
        caption_label: cn(
          'select-none',
          captionLayout === 'label'
            ? 'typography-body-sm'
            : 'rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-foreground [&>svg]:size-3.5',
          defaultClassNames.caption_label
        ),
        table: 'w-full border-collapse',
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn(
          'text-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none',
          defaultClassNames.weekday
        ),
        week: cn('flex w-full mt-2', defaultClassNames.week),
        week_number_header: cn(
          'select-none w-(--cell-size)',
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          'text-[0.8rem] select-none text-foreground',
          defaultClassNames.week_number
        ),
        day: cn(
          'relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-full [&:last-child[data-selected=true]_button]:rounded-r-full group/day aspect-square select-none',
          defaultClassNames.day
        ),
        range_start: cn(
          '!rounded-l-full bg-medium-orchid/30',
          defaultClassNames.range_start
        ),
        range_middle: cn('rounded-none', defaultClassNames.range_middle),
        range_end: cn(
          'rounded-r-full bg-medium-orchid/30',
          defaultClassNames.range_end
        ),
        today: cn(
          'text-foreground has-[button[data-range-middle=true]]:bg-medium-orchid/30 [&_button]:!rounded-full [&_button]:border [&_button]:border-foreground [&_button[data-range-middle=true]]:bg-transparent',
          defaultClassNames.today
        ),
        outside: cn(
          'text-foreground aria-selected:text-foreground',
          defaultClassNames.outside
        ),
        disabled: cn('text-foreground opacity-50', defaultClassNames.disabled),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          );
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        Nav: ({
          onPreviousClick,
          onNextClick,
          children,
          previousMonth,
          nextMonth,
          ...props
        }) => (
          <nav {...props}>
            <button onClick={onPreviousClick} className="cursor-pointer">
              <Arrow rotate={ROTATION_ANGLES.FLIPPED} />
            </button>
            {children}
            <button onClick={onNextClick} className="cursor-pointer">
              <Arrow />
            </button>
          </nav>
        ),
        MonthCaption: ({ children, className, displayIndex }) => {
          const { months } = useDayPicker();

          return (
            <button
              className={cn(
                className,
                'cursor-pointer z-1 row-start-1',
                displayIndex === 0
                  ? 'col-start-1 justify-self-end mr-3'
                  : 'ml-3',
                months.length === 1 ? 'justify-self-center mx-0' : ''
              )}
              onClick={() => setView(toggleView)}
            >
              {children}
            </button>
          );
        },
        MonthGrid: (props) => (
          <CalendarMonthGrid {...props} view={view} setView={setView} />
        ),
        Month: (props) => (
          <>
            {React.Children.map(props.children, (child) => {
              if (
                React.isValidElement(child) &&
                child.props.role === 'grid' &&
                props.displayIndex !== 0 &&
                view === 'year'
              )
                return null;

              return child;
            })}
          </>
        ),
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarMonthGrid({
  view,
  setView,
  ...props
}: MonthGridProps & {
  view: ViewType;
  setView: React.Dispatch<React.SetStateAction<ViewType>>;
}) {
  const { goToMonth, months } = useDayPicker();

  const displayedDate = React.useMemo(() => months[0].date, [months]);

  const handleYearChange = React.useCallback(
    (selectedYear: number) => () => {
      const dateLib = new DateLib();
      const month = dateLib.setYear(
        dateLib.startOfMonth(displayedDate),
        selectedYear
      );
      goToMonth(month);
      setView(toggleView);
    },
    [displayedDate, goToMonth, setView]
  );

  const years = getYearOptions();
  const getIsYearSelected = React.useCallback(
    (year: number) => year === displayedDate.getFullYear(),
    [displayedDate]
  );

  const setYearRef = React.useCallback((node: HTMLDivElement | null) => {
    const isSelected = node?.dataset.selected === 'true';
    if (isSelected) node.scrollIntoView({ block: 'center' });
  }, []);

  if (view === 'month') return <table {...props} />;

  return (
    <div className="col-span-full grid grid-cols-4 max-h-[250px] overflow-auto no-scrollbar">
      {years.map((year) => (
        <div
          key={year}
          ref={setYearRef}
          className="flex items-center justify-center p-4 border border-transparent select-none cursor-pointer data-[selected=true]:bg-medium-orchid data-[selected=true]:text-foreground-dark data-[current=true]:border-foreground hover:bg-foreground hover:text-foreground-dark"
          onClick={handleYearChange(year)}
          data-selected={getIsYearSelected(year)}
          data-current={getIsCurrentYear(year)}
        >
          <Typography>{year}</Typography>
        </div>
      ))}
    </div>
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <button
      ref={ref}
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        'typography-body-sm cursor-pointer items-center justify-center data-[selected-single=true]:bg-medium-orchid data-[selected-single=true]:text-foreground-dark data-[selected-single=true]:rounded-full data-[range-middle=true]:bg-medium-orchid/30 data-[range-middle=true]:text-foreground data-[range-start=true]:bg-medium-orchid data-[range-start=true]:text-foreground-dark data-[range-end=true]:bg-medium-orchid data-[range-end=true]:text-foreground-dark group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 data-[range-end=true]:rounded-full data-[range-end=true]:rounded-r-full data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-full data-[range-start=true]:rounded-l-full [&>span]:text-xs hover:bg-foreground hover:text-foreground-dark hover:rounded-full',
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
