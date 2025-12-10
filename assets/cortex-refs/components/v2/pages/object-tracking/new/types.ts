import {
  Subscription,
  SubscriptionType,
} from 'models/interfaces/v2/subscriptions';
import {
  ObjectTrackingObservationMode,
  ObjectTrackingOrbitalRegime,
  ObjectTrackingTargetMode,
} from '../enums';

interface CoordinatesModeMeta {
  jsonPreview: string;
  fileName: string;
}

// TODO extract common types between the two forms and move some sections to the common directory
export interface NewObjectTrackingFormData {
  name: string;
  organizationID: string;
  networkIds: string[];
  orbitalRegime: ObjectTrackingOrbitalRegime | null;
  trackMethod: {
    mode: ObjectTrackingTargetMode;
    value: number | string;
    meta?: CoordinatesModeMeta;
  };
  observationMode: ObjectTrackingObservationMode;
  trackLength: number | null;
  minTrackSeparation: number | null;
  startEndDates: {
    from: Date;
    to: Date;
  };
  isDataExclusive: boolean;
  deliverAllInFOV: boolean;
  faintObjectDetection: boolean;
  firstObservationNotification: boolean;
  isSearchMode: boolean;
  subscriptionType: SubscriptionType;
  subscriptionId: string;
  subscription: Subscription | null;

  meta?: {
    notAdjustableFields?: (keyof NewObjectTrackingFormData)[];
    lockedDuration?: { hours: number };
  };
}
