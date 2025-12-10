import { Subscription } from 'models/interfaces/v2/subscriptions';
import { ApiStartEndDates, PickerDateRange } from 'models/types/common';
import {
  ObjectTrackingObservationMode,
  ObjectTrackingTargetMode,
} from '../enums';

export interface EditObjectTrackingFormData {
  name: string;
  targetMode?: ObjectTrackingTargetMode;
  noradId?: number;
  tle?: string;
  startEndDates?: PickerDateRange;
  observationMode?: ObjectTrackingObservationMode;
  subscription?: Subscription;
}

export interface UpdateCampaignPayload {
  name?: string;
  tle?: string;
  noradId?: number;
  startEndDates?: ApiStartEndDates;
  targetMode?: ObjectTrackingTargetMode;
}
