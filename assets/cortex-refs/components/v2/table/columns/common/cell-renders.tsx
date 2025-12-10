import { getTrackDurationValue } from '@/components/v2/pages/object-tracking/utils';
import { formatDistanceToNowStrict } from 'date-fns';
import { FORMAT_DISTANCE_LOCALE } from 'helpers/v2/dates';

const FALLBACK = '-';

export const lastObservationCell = (value: Date | null) =>
  value
    ? formatDistanceToNowStrict(value, {
        locale: FORMAT_DISTANCE_LOCALE,
      })
    : FALLBACK;

export const taskDurationCell = (start: string, end: string) => {
  const value = getTrackDurationValue({
    from: new Date(start),
    to: new Date(end),
  });

  return value || FALLBACK;
};
