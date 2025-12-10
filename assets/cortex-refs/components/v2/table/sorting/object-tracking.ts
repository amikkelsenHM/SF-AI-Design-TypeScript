import { createSortingFn } from '.';
import { ObjectTrackingStatus } from '../../pages/object-tracking/enums';
import { ObjectTrackingView } from '../../pages/object-tracking/types';

export const STATUS_ORDER: Record<ObjectTrackingStatus, number> = {
  [ObjectTrackingStatus.ACTIVE]: 1,
  [ObjectTrackingStatus.COMPLETED]: 2,
  [ObjectTrackingStatus.ACCEPTED]: 3,
  [ObjectTrackingStatus.CANCELLED]: 4,
  [ObjectTrackingStatus.FAILED]: 5,
};

export const objectTrackingStatusSortingFn = createSortingFn<
  ObjectTrackingView,
  typeof STATUS_ORDER
>(STATUS_ORDER);
