import { format } from 'date-fns';
import { extractNoradIDfromTLE } from 'helpers/checkTleForNoradId';
import { DateFormat } from 'models/enums/v2/common';
import { IOrganisation } from 'models/interfaces/v2/organisations';
import { DateRange } from 'react-day-picker';
import {
  ObjectTrackingObservationMode,
  ObjectTrackingTargetMode,
} from '../../../enums';
import { formatFeaturesValue, formatOptionalValue } from '../../../utils';
import { NewObjectTrackingFormData } from '../../types';
import { TrackSummaryRowIds } from './track-summary/columns';

const VALUE_GETTERS: Record<
  ObjectTrackingTargetMode,
  (value: string | number) => string
> = {
  [ObjectTrackingTargetMode.NoradID]: (value) => value.toString(),
  [ObjectTrackingTargetMode.TLE]: (value) =>
    extractNoradIDfromTLE(value.toString()) || '',
  [ObjectTrackingTargetMode.Coordinates]: () => '',
};

export const getNoradIdFromTrackMethod = (
  trackMethod: NewObjectTrackingFormData['trackMethod'] | undefined
) => {
  if (!trackMethod?.value) return '';

  return VALUE_GETTERS[trackMethod.mode](trackMethod.value) || '';
};

const getNetworksValue = (
  networkIds: string[],
  selectedOrganisation: IOrganisation | undefined
) => {
  const networks =
    selectedOrganisation?.networks?.filter(({ id }) =>
      networkIds.includes(id)
    ) || [];

  return networks.map(({ name }) => name).join(', ');
};

const formatTrackDuration = (value: DateRange | undefined) => {
  if (!value || !value.from || !value.to) return '';

  const startDate = new Date(value.from);
  const endDate = new Date(value.to);

  const dateFormat = `${DateFormat.DateSlashShort} - ${DateFormat.TimeShort}`;

  const formattedRange = `(${format(startDate, dateFormat)}) (${format(
    endDate,
    dateFormat
  )})`;

  return formattedRange;
};

const TRACK_METHOD_LABELS: Record<ObjectTrackingTargetMode, string> = {
  [ObjectTrackingTargetMode.NoradID]: 'Norad ID',
  [ObjectTrackingTargetMode.TLE]: 'TLE',
  [ObjectTrackingTargetMode.Coordinates]: 'Coordinates',
};

export const getTrackSummaryData = (
  {
    startEndDates,
    organizationID,
    networkIds,
    deliverAllInFOV,
    faintObjectDetection,
    isDataExclusive,
    minTrackSeparation,
    observationMode,
    isSearchMode,
    trackLength,
    trackMethod,
  }: NewObjectTrackingFormData,
  organisations: IOrganisation[] | undefined,
  fullName: string
) => {
  const selectedOrganisation = organisations?.find(
    ({ id }) => id === organizationID
  );

  return [
    {
      id: TrackSummaryRowIds.TRACK_METHOD_VALUE,
      label: TRACK_METHOD_LABELS[trackMethod.mode],
      value: trackMethod.value.toString(),
    },
    {
      id: TrackSummaryRowIds.TRACK_LENGTH,
      label: 'Track length',
      value: formatOptionalValue(trackLength, { unit: 'seconds' }),
    },
    {
      id: TrackSummaryRowIds.TRACK_SEPARATION,
      label: 'Track separation',
      value: formatOptionalValue(minTrackSeparation, { unit: 'hours' }),
    },
    {
      id: TrackSummaryRowIds.OBSERVATION_MODE,
      label: 'Mode',
      value: formatOptionalValue(observationMode, {
        condition: observationMode !== ObjectTrackingObservationMode.Normal,
      }),
    },
    {
      id: TrackSummaryRowIds.TRACK_DURATION,
      label: 'Track Duration',
      value: formatTrackDuration(startEndDates),
    },
    {
      id: TrackSummaryRowIds.FEATURES,
      label: 'Features',
      value: formatFeaturesValue({
        deliverAllInFoV: deliverAllInFOV,
        faintObjectDetection,
        isCalibration: false,
        isDataExclusive,
        isSearchMode,
      }),
    },
    {
      id: TrackSummaryRowIds.NETWORK,
      label: 'Networks',
      value: getNetworksValue(networkIds, selectedOrganisation),
    },
    {
      id: TrackSummaryRowIds.ORGANISATION,
      label: 'Organisation',
      value: formatOptionalValue(selectedOrganisation?.name),
    },
    { id: TrackSummaryRowIds.CREATED_BY, label: 'Created by', value: fullName },
  ].filter((el) => !!el.value);
};

export const generateObjectTaskName = (objectName: string) =>
  `${objectName} - ${format(new Date(), DateFormat.DateSlash)}`;
