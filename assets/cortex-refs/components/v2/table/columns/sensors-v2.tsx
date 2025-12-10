import { ColumnDef, TableState } from '@tanstack/react-table';
import { Unit } from 'models/enums/v2/common';
import { ITelescope } from 'models/interfaces/v2/telescope';
import {
  createDayNightFilterOptions,
  createRoofStatusFilterOptions,
  createSensorStatusFilterOptions,
  mapToDayNight,
  mapToRoofStatus,
  mapToSensorStatus,
  mapToWeatherMetric,
} from '../../pages/sensors/utils';
import { StatusCell } from '../components/status-cell';
import {
  roofStatusSortingFn,
  sensorStatusSortingFn,
} from '../sorting/sensors-v2';

const FALLBACK_VALUE = 'N/A';

enum ColumnIds {
  NAME = 'name',
  OBSERVATORY_NAME = 'observatoryName',
  DAY_NIGHT_PHASE = 'dayNightPhase',
  OBSERVATORY_COUNTRY = 'observatoryCountry',
  STATUS = 'status',
  ROOF_STATUS = 'roofStatus',
  SESSION_24H = 'sessionCount24h',
  PRECIPITATION = 'precipitation',
  HUMIDITY = 'humidity',
  WIND_SPEED = 'windSpeed',
}

export const INITIAL_STATE: Partial<TableState> = {
  sorting: [{ id: ColumnIds.STATUS, desc: false }],
};

const COMMON_COLUMNS = {
  NAME: {
    id: ColumnIds.NAME,
    accessorKey: 'name',
    header: 'Name',
  } as ColumnDef<ITelescope>,
  LOCATION: {
    id: ColumnIds.OBSERVATORY_NAME,
    accessorFn: (row) => row.observatory?.name || '',
    header: 'Location',
  } as ColumnDef<ITelescope>,
  STATUS: {
    id: ColumnIds.STATUS,
    accessorFn: (row) => mapToSensorStatus(row.operationStatus?.value),
    header: 'Sensor Status',
    cell: (info) => {
      const status = info.getValue() as string;
      const tooltipConfig = info.row.original.operationStatus?.tooltipConfig;

      return <StatusCell status={status} tooltipConfig={tooltipConfig} />;
    },
    sortingFn: sensorStatusSortingFn,
    meta: {
      filterType: 'select',
      filterOptions: createSensorStatusFilterOptions(),
    },
  } as ColumnDef<ITelescope>,
};

export const detailedColumns: ColumnDef<ITelescope>[] = [
  COMMON_COLUMNS.NAME,
  COMMON_COLUMNS.LOCATION,
  {
    id: ColumnIds.DAY_NIGHT_PHASE,
    accessorFn: (row) =>
      mapToDayNight(row.latestMetrics?.day_night_phase_cycle?.value),
    header: 'Day/Night',
    cell: (info) => info.getValue() || FALLBACK_VALUE,
    meta: {
      filterType: 'select',
      filterOptions: createDayNightFilterOptions(),
    },
  },
  COMMON_COLUMNS.STATUS,
  {
    id: ColumnIds.ROOF_STATUS,
    accessorFn: (row) => mapToRoofStatus(row.roofStatus?.value),
    header: 'Roof Status',
    cell: (info) => {
      const roofStatus = info.getValue() as string;
      const tooltipConfig = info.row.original.roofStatus?.tooltipConfig;

      return <StatusCell status={roofStatus} tooltipConfig={tooltipConfig} />;
    },
    sortingFn: roofStatusSortingFn,
    meta: {
      filterType: 'select',
      filterOptions: createRoofStatusFilterOptions(),
    },
  },
  {
    id: ColumnIds.SESSION_24H,
    accessorFn: (row) => row.sessionCount24h?.value ?? '',
    header: 'Sessions (24hrs)',
    meta: { filterType: 'number' },
  },
  {
    id: ColumnIds.PRECIPITATION,
    accessorFn: (row) => row.observatory?.weather?.current?.precipitation,
    header: 'Precipitation',
    cell: (info) =>
      mapToWeatherMetric(
        info.getValue<number>(),
        Unit.Millimeter,
        FALLBACK_VALUE
      ),
    meta: { filterType: 'number' },
  },
  {
    id: ColumnIds.HUMIDITY,
    accessorFn: (row) => row.observatory?.weather?.current?.humidity,
    header: 'Humidity',
    cell: (info) =>
      mapToWeatherMetric(info.getValue<number>(), Unit.Percent, FALLBACK_VALUE),
    meta: { filterType: 'number' },
  },
  {
    id: ColumnIds.WIND_SPEED,
    accessorFn: (row) => row.observatory?.weather?.current?.windSpeed,
    header: 'Wind Speed',
    cell: (info) =>
      mapToWeatherMetric(
        info.getValue<number>(),
        Unit.KmPerHour,
        FALLBACK_VALUE
      ),
    meta: { filterType: 'number' },
  },
];

export const summaryColumns: ColumnDef<ITelescope>[] = [
  COMMON_COLUMNS.NAME,
  COMMON_COLUMNS.LOCATION,
  COMMON_COLUMNS.STATUS,
];
