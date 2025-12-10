import { Transform } from '@/components/v2/inputs/controlled-field';
import { NUMBER_TRANSFORMER } from '@/components/v2/inputs/transformers/common-transformers';
import { addDays, differenceInDays } from 'date-fns';
import { ObjectTrackingTargetMode } from '../../enums';
import { NewObjectTrackingFormData } from '../types';

const EMPTY_LINE = '\n';
const MAX_LINES = 2;

export const NORAD_ID_TRANSFORMER: Transform<
  NewObjectTrackingFormData['trackMethod']
> = {
  input: (value) => value?.value,
  output: (eventOrValue) => {
    const event =
      typeof eventOrValue === 'object' && 'target' in eventOrValue
        ? eventOrValue
        : { target: { value: eventOrValue } };

    const value = NUMBER_TRANSFORMER.output(event) ?? '';

    return {
      mode: ObjectTrackingTargetMode.NoradID,
      value,
    };
  },
  error: (err) => err?.value,
};

export const TLE_TRANSFORMER: Transform<
  NewObjectTrackingFormData['trackMethod']
> = {
  input: (value) => value?.value,
  output: (event) => {
    const rawValue = event.target.value;
    const lines = rawValue.split(EMPTY_LINE);
    const nonEmptyLines = lines.filter((line: string) => line.trim() !== '');

    const cleanedValue =
      nonEmptyLines.length >= MAX_LINES
        ? nonEmptyLines.join(EMPTY_LINE)
        : rawValue;

    return {
      mode: ObjectTrackingTargetMode.TLE,
      value: cleanedValue,
    };
  },
  error: (err) => err?.value,
};

export const DURATION_IN_DAYS_TRANSFORMER: Transform<
  NewObjectTrackingFormData['startEndDates']
> = {
  input: (value) => {
    if (!value) return '';

    const startDate = new Date(value.from);
    const endDate = new Date(value.to);
    return differenceInDays(endDate, startDate);
  },
  output: (event) => {
    const duration = NUMBER_TRANSFORMER.output(event) ?? 0;
    const today = new Date();

    return { from: today, to: addDays(today, duration) };
  },
  error: (err) => err?.from || err?.to || err,
};
