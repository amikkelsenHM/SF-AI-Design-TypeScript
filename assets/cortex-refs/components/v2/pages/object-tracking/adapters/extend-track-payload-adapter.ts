import { addDays, addMonths, addWeeks } from 'date-fns';
import { DurationValueKey } from '../constants/object-tracking-detail';
import { ObjectTrackingView } from '../types';

export interface ExtendTrackData {
  id: string;
  value: DurationValueKey;
  startEndDates: ObjectTrackingView['startEndDates'];
}

const DURATION_VALUES: Record<
  DurationValueKey,
  { days?: number; weeks?: number; months?: number }
> = {
  [DurationValueKey.DAY]: { days: 1 },
  [DurationValueKey.DAYS_3]: { days: 3 },
  [DurationValueKey.DAYS_5]: { days: 5 },
  [DurationValueKey.WEEK]: { weeks: 1 },
  [DurationValueKey.WEEKS_2]: { weeks: 2 },
  [DurationValueKey.MONTH]: { months: 1 },
};

export const extendTrackPayloadAdapter = ({
  value,
  startEndDates,
}: ExtendTrackData): {
  startEndDates: { start: Date; end: Date }[];
} => {
  const { days = 0, weeks = 0, months = 0 } = DURATION_VALUES[value];

  let end = startEndDates?.to!;

  if (days > 0) {
    end = addDays(end, days);
  }
  if (weeks > 0) {
    end = addWeeks(end, weeks);
  }
  if (months > 0) {
    end = addMonths(end, months);
  }

  return {
    startEndDates: [
      {
        start: startEndDates?.from!,
        end,
      },
    ],
  };
};
