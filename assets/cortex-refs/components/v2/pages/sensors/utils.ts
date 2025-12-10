import { SelectOption } from '@/components/components/ui/select/utils';
import { QueryClient } from '@tanstack/react-query';
import { GET_TELESCOPES, TelescopeEvent } from 'hooks/queries/telescopeQuery';
import { ITelescope } from 'models/interfaces/v2/telescope';
import { ApiResponse } from 'models/types/common';
import { mapToEnum } from 'utils/v2/mapper';
import { SENSOR_STATUS_TOOLTIPS } from 'utils/v2/tooltips/tooltip-config';
import { createEnumFilterOptions } from '../../table/filters/filter-util';
import { DayNightPhase, SensorRoofStatus, SensorStatus } from './enums';

const STATUS = SensorStatus.CLOSING;

export const handleUpdateTelescopeStatus = (
  queryClient: QueryClient,
  id: string,
  telescopeEvent: TelescopeEvent
) => {
  queryClient.setQueryData<ApiResponse<ITelescope[]>>(
    [GET_TELESCOPES],
    (prev) => {
      if (!prev?.payload) return prev;

      const telescopeIndex = prev.payload.findIndex(
        (telescope) => telescope.id === id
      );
      if (telescopeIndex === -1) return prev;

      const telescope = prev.payload[telescopeIndex];

      const tooltipConfig = {
        ...SENSOR_STATUS_TOOLTIPS[STATUS],
        header: telescopeEvent.event,
        text: telescopeEvent.description,
        triggerAriaLabel: telescopeEvent.event,
      };

      const updatedTelescope = {
        ...telescope,
        operationStatus: {
          value: STATUS,
        },
        roofStatus: { value: STATUS, tooltipConfig },
      } as ITelescope;

      const newPayload = [...prev.payload];
      newPayload[telescopeIndex] = updatedTelescope;

      return {
        ...prev,
        payload: newPayload,
      };
    }
  );
};

export const mapToDayNight = (value: string | undefined) =>
  mapToEnum(DayNightPhase, value);

export const createDayNightFilterOptions = (): SelectOption[] =>
  createEnumFilterOptions(DayNightPhase, true);

export const mapToSensorStatus = (value: string | undefined) =>
  mapToEnum(SensorStatus, value, SensorStatus.UNKNOWN);

export const createSensorStatusFilterOptions = (): SelectOption[] =>
  createEnumFilterOptions(SensorStatus);

export const mapToRoofStatus = (value: string | undefined) =>
  mapToEnum(SensorRoofStatus, value, SensorRoofStatus.UNKNOWN);

export const createRoofStatusFilterOptions = (): SelectOption[] =>
  createEnumFilterOptions(SensorRoofStatus);

export const mapToWeatherMetric = (
  value: number | undefined,
  unit: string,
  fallback: string
) => (value !== undefined && value !== null ? `${value} ${unit}` : fallback);
