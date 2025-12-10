import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from '@/utils/v2/common/constants';
import {
  extractNorad,
  splitTle,
  tleFormatError,
} from 'helpers/tle-validations';
import { RegisterOptions } from 'react-hook-form';
import { isWithinSubscriptionPeriod } from '../../../common/form/validations';
import { ObjectTrackingStatus } from '../../../enums';
import { stareModeDurationError } from '../../../new/form/validations';
import { NewObjectTrackingFormData } from '../../../new/types';

export const isBeyondAccepted = (status?: ObjectTrackingStatus) =>
  status === ObjectTrackingStatus.ACTIVE ||
  status === ObjectTrackingStatus.COMPLETED ||
  status === ObjectTrackingStatus.CANCELLED ||
  status === ObjectTrackingStatus.FAILED;

export const isFinalStatus = (status?: ObjectTrackingStatus) =>
  status === ObjectTrackingStatus.COMPLETED ||
  status === ObjectTrackingStatus.CANCELLED ||
  status === ObjectTrackingStatus.FAILED;

export const createTleValidationRules = (
  status?: ObjectTrackingStatus,
  campaignNoradId?: number
) => ({
  setValueAs: (value: string) =>
    typeof value === 'string' ? value.trim() : value,
  validate: {
    format(value: string) {
      const err = tleFormatError(value, true);
      return err ?? true;
    },
    noradMatchesCampaign(value: string) {
      if (!isBeyondAccepted(status) || !campaignNoradId) return true;

      const lines = splitTle(value);
      if (!lines) return true;

      const noradInTle = extractNorad(lines.l1, lines.l2);
      if (noradInTle == null) return true;

      return (
        noradInTle === campaignNoradId ||
        `NORAD ID in TLE (${noradInTle}) must match campaign NORAD ID (${campaignNoradId})`
      );
    },
  },
});

export const nameRules = {
  required: 'Name is required',
  validate: (v: string) => {
    const len = (v ?? '').trim().length;
    if (len < NAME_MIN_LENGTH)
      return `Name must be at least ${NAME_MIN_LENGTH} characters`;
    if (len > NAME_MAX_LENGTH)
      return `Name must be at most ${NAME_MAX_LENGTH} characters`;
    return true;
  },
};

export const noradRules = {
  valueAsNumber: true,
  validate: (value: number | undefined) =>
    value === undefined || value > 0 || 'NORAD ID must be greater than 0',
};

export const dateRangeRules: RegisterOptions<
  NewObjectTrackingFormData,
  'startEndDates'
> = {
  required: 'Duration is required',
  validate: {
    bothSelected: (value) =>
      (!!value?.from && !!value?.to) || 'Start and end date are required',
    correctOrder: (value) =>
      !value?.from ||
      !value?.to ||
      value.to >= value.from ||
      'End date must be after start date',
    withinSubscriptionPeriod: (value, formValues) =>
      isWithinSubscriptionPeriod(value, formValues.subscription) ||
      'Task duration must be within your package period',
    stareModeDuration: (value, formValues) => {
      const error = stareModeDurationError(formValues.observationMode, value);

      return !error || error;
    },
  },
};
