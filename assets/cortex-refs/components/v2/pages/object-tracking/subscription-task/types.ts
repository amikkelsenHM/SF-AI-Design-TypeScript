import {
  Subscription,
  SubscriptionType,
} from 'models/interfaces/v2/subscriptions';
import {
  ObjectTrackingOrbitalRegime,
  ObjectTrackingTargetMode,
} from '../enums';

export interface SubscriptionTaskFormData {
  name: string;
  trackMethod: {
    mode: ObjectTrackingTargetMode;
    value: number | string;
  };
  firstObservationNotification: boolean;
  organizationID: string;
  orbitalRegime: ObjectTrackingOrbitalRegime | null;
  startEndDates: {
    from: Date;
    to: Date;
  };
  subscriptionType: SubscriptionType;
  subscriptionId: string;
  subscription: Subscription;
}
