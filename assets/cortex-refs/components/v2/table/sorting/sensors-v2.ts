import { ITelescope } from 'models/interfaces/v2/telescope/index';
import { createSortingFn } from '.';
import { SensorRoofStatus, SensorStatus } from '../../pages/sensors/enums';

export const SENSOR_STATUS_ORDER: Record<SensorStatus, number> = {
  [SensorStatus.OBSERVING]: 1,
  [SensorStatus.OPENING_SOON]: 2,
  [SensorStatus.CLOSING]: 3,
  [SensorStatus.CLOSING_SOON]: 4,
  [SensorStatus.NOT_OBSERVING]: 5,
  [SensorStatus.UNDER_MAINTENANCE]: 6,
  [SensorStatus.IDLE]: 7,
  [SensorStatus.UNKNOWN]: 8,
};

const ROOF_STATUS_ORDER: Record<SensorRoofStatus, number> = {
  [SensorRoofStatus.OPEN]: 1,
  [SensorRoofStatus.OPENING]: 2,
  [SensorRoofStatus.CLOSING]: 3,
  [SensorRoofStatus.CLOSED]: 4,
  [SensorRoofStatus.UNKNOWN]: 5,
};

export const sensorStatusSortingFn = createSortingFn<
  ITelescope,
  typeof SENSOR_STATUS_ORDER
>(SENSOR_STATUS_ORDER);
export const roofStatusSortingFn = createSortingFn<
  ITelescope,
  typeof ROOF_STATUS_ORDER
>(ROOF_STATUS_ORDER);
