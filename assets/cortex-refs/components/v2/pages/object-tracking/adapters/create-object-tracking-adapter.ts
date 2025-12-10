import {
  ObjectTrackingObservationMode,
  ObjectTrackingTargetMode,
} from '../enums';
import { NewObjectTrackingFormData } from '../new/types';

interface TrackMethodData {
  noradId?: number;
  tle?: string;
  targetMode: ObjectTrackingTargetMode;
}

type TrackMethodAdapter = (
  value: NewObjectTrackingFormData['trackMethod']['value']
) => TrackMethodData;

const TRACK_METHOD_ADAPTER_MAP: Record<
  ObjectTrackingTargetMode,
  TrackMethodAdapter
> = {
  [ObjectTrackingTargetMode.NoradID]: (value) => ({
    targetMode: ObjectTrackingTargetMode.NoradID,
    noradId: Number(value),
  }),
  [ObjectTrackingTargetMode.TLE]: (value) => ({
    targetMode: ObjectTrackingTargetMode.TLE,
    tle: value.toString(),
  }),
  // TODO: handle coordinates type
  [ObjectTrackingTargetMode.Coordinates]: (value) => ({
    targetMode: ObjectTrackingTargetMode.Coordinates,
  }),
};

export const getTrackMethodData = (
  mode: ObjectTrackingTargetMode,
  value: string | number
) => TRACK_METHOD_ADAPTER_MAP[mode](value);

const HOURS_TO_SECONDS = 3600;

export const createObjectTrackingAdapter = ({
  startEndDates,
  trackMethod,
  observationMode,
  minTrackSeparation,
  orbitalRegime,
  meta,
  isSearchMode,
  ...data
}: NewObjectTrackingFormData) => {
  const trackMethodData = TRACK_METHOD_ADAPTER_MAP[trackMethod.mode](
    trackMethod.value
  );

  // TODO: remove this mapping when Observation Mode support Calibration option on the BE
  const modeData =
    observationMode === ObjectTrackingObservationMode.Calibration
      ? {
          isCalibration: true,
          observationMode: ObjectTrackingObservationMode.Normal,
        }
      : {
          isCalibration: false,
          observationMode: isSearchMode
            ? ObjectTrackingObservationMode.Search
            : observationMode,
        };

  return {
    ...data,
    ...trackMethodData,
    ...modeData,
    startEndDates: [{ start: startEndDates.from, end: startEndDates.to }],
    minTrackSeparation:
      minTrackSeparation && minTrackSeparation * HOURS_TO_SECONDS,
  };
};
