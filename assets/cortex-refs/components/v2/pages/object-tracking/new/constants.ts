import { ObjectTrackingObservationMode } from '../enums';
import { NewObjectTrackingFormData } from './types';

export const MODE_BASED_DEFAULTS_MAP: Partial<
  Record<ObjectTrackingObservationMode, Partial<NewObjectTrackingFormData>>
> = {
  [ObjectTrackingObservationMode.Stare]: {
    minTrackSeparation: undefined,
    faintObjectDetection: false,
    deliverAllInFOV: true,
    isDataExclusive: true,
    meta: {
      notAdjustableFields: [
        'faintObjectDetection',
        'deliverAllInFOV',
        'isDataExclusive',
        'isSearchMode',
      ],
    },
  },
  [ObjectTrackingObservationMode.Search]: {
    trackLength: 16,
    minTrackSeparation: 3,
    faintObjectDetection: false,
    deliverAllInFOV: true,
    isDataExclusive: true,
    startEndDates: undefined,
    observationMode: ObjectTrackingObservationMode.Normal,
    meta: {
      notAdjustableFields: [
        'observationMode',
        'trackLength',
        'minTrackSeparation',
        'faintObjectDetection',
        'deliverAllInFOV',
        'isDataExclusive',
      ],
      lockedDuration: { hours: 1 },
    },
  },
};
