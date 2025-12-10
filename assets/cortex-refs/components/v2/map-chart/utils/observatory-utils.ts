import { IObservatory } from 'models/interfaces/v2/observatory';
import { SensorStatus } from '../../pages/sensors/enums';
import { SENSOR_STATUS_ORDER } from '../../table/sorting/sensors-v2';
import {
  DEFAULT_STATUSES,
  OBSERVATORY_ORDER,
} from '../constants/map-constants';

export const getObservatoryOrder = (observatory: IObservatory): number => {
  if (!observatory.telescopes || observatory.telescopes.length === 0) {
    return OBSERVATORY_ORDER.DEFAULT;
  }

  let observatoryOrder: number = OBSERVATORY_ORDER.DEFAULT;

  observatory.telescopes.forEach((telescope) => {
    const statusRaw = telescope?.operationStatus?.value as
      | keyof typeof SensorStatus
      | undefined;

    const status = statusRaw
      ? SensorStatus[statusRaw]
      : DEFAULT_STATUSES.SENSOR;

    const order = SENSOR_STATUS_ORDER[status];

    if (order && order < observatoryOrder) {
      observatoryOrder = order;
    }
  });

  return observatoryOrder;
};

export const sortObservatories = (
  observatories: IObservatory[]
): IObservatory[] =>
  [...observatories].sort((a, b) => {
    const orderA = getObservatoryOrder(a);
    const orderB = getObservatoryOrder(b);
    return orderA - orderB;
  });

export const getDefaultSelectedObservatoryId = (
  observatories: IObservatory[]
): string | undefined => {
  if (!Array.isArray(observatories) || observatories.length === 0) {
    return undefined;
  }

  const sortedObservatories = sortObservatories(observatories);
  return sortedObservatories[0]?.id;
};

export const isValidObservatoriesArray = (
  observatories: unknown
): observatories is IObservatory[] => {
  return Array.isArray(observatories) && observatories.length > 0;
};
