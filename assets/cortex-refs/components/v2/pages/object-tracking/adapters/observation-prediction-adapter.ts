import {
  addDays,
  format,
  formatDistanceToNow,
  formatDistanceToNowStrict,
} from 'date-fns';
import { DateFormat } from 'models/enums/v2/common/index';
import { TZDate } from 'react-day-picker';
import { UTC_TIME_ZONE } from '../../../date-picker/utils';
import { getNoradIdFromTrackMethod } from '../new/form-preview/sections/utils';
import { NewObjectTrackingFormData } from '../new/types';

export interface GetObservationPredictionsParams {
  noradId: number;
  startDate: Date;
  endDate: Date;
}

export const observationPredictionsParamsAdapter = (
  trackMethod: NewObjectTrackingFormData['trackMethod']
): GetObservationPredictionsParams | null => {
  const noradId = getNoradIdFromTrackMethod(trackMethod);

  const startDate = new Date();
  return {
    noradId: Number(noradId),
    startDate: startDate,
    endDate: addDays(startDate, 2),
  };
};

interface ObservationPredictionResponse {
  end_time: string;
  start_time: string;
  telescope_id: string;
}

export interface ObservationPrediction {
  telescopeId: string;
  startTime: Date;
  endTime: Date;
  formattedDistance: string;
  formattedDistanceStrict: string;
  startTimeFormatted: string;
  endTimeFormatted: string;
}

export const observationPredictionsResponseAdapter = (
  data: ObservationPredictionResponse[]
): ObservationPrediction[] => {
  return data
    .map((item) => {
      const startTime = new TZDate(`${item.start_time}Z`, UTC_TIME_ZONE);
      const endTime = new TZDate(`${item.end_time}Z`, UTC_TIME_ZONE);

      return {
        telescopeId: item.telescope_id.toLowerCase(),
        startTime,
        endTime,
        formattedDistance: formatDistanceToNow(startTime),
        formattedDistanceStrict: formatDistanceToNowStrict(startTime),
        startTimeFormatted: `${format(startTime, DateFormat.TimeShort)}(UTC)`,
        endTimeFormatted: `${format(endTime, DateFormat.TimeShort)}(UTC)`,
      };
    })
    .sort((a, b) => Number(a.startTime) - Number(b.startTime));
};
