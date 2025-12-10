import { ColumnDef } from '@tanstack/react-table';
import {
  AdjustedWeatherMetrics,
  WeatherStatus,
} from 'models/interfaces/v2/metrics';
import { METRIC_SPECIFIC_TOOLTIPS } from 'utils/v2/tooltips/tooltip-config';
import StatusWithTooltip from '../components/status-with-tooltip';

const WEATHER_STATUS_CLASSNAMES: Record<WeatherStatus, string> = {
  [WeatherStatus.Warning]: 'bg-background-warning text-foreground-dark',
  [WeatherStatus.Danger]: 'bg-background-error',
  [WeatherStatus.Good]: 'bg-background-success',
  [WeatherStatus.Unknown]: '',
};

const getStatusCellClassName = (status: WeatherStatus | null): string => {
  if (!status || status === WeatherStatus.Unknown) return '';
  return WEATHER_STATUS_CLASSNAMES[status] || '';
};

export const columns: ColumnDef<AdjustedWeatherMetrics>[] = [
  {
    accessorKey: 'metric',
    header: 'Metric',
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => {
      return row?.now || '';
    },
    id: 'now',
    header: 'Now',
    cell: (info) => {
      const statusNow = info?.row?.original?.adjustedStatusNow;
      const value = info.getValue() as string;

      const metricName = info?.row?.original?.metric;

      return (
        <StatusWithTooltip
          value={value}
          status={statusNow}
          metricSpecificTooltipMap={METRIC_SPECIFIC_TOOLTIPS}
          metricName={metricName}
          excludeStatuses={[WeatherStatus.Unknown]}
        />
      );
    },
    meta: {
      getStyles: ({ row: { adjustedStatusNow } }) => ({
        className: getStatusCellClassName(adjustedStatusNow),
      }),
    },
  },
  {
    accessorFn: (row) => row?.next || '',
    id: 'next',
    header: '+1hr',
    cell: (info) => {
      const statusNext = info?.row?.original?.adjustedStatusNext;
      const value = info.getValue() as string;

      const metricName = info?.row?.original?.metric;

      return (
        <StatusWithTooltip
          value={value}
          status={statusNext}
          metricSpecificTooltipMap={METRIC_SPECIFIC_TOOLTIPS}
          metricName={metricName}
          excludeStatuses={[WeatherStatus.Unknown]}
        />
      );
    },
    meta: {
      getStyles: ({ row: { adjustedStatusNext } }) => ({
        className: getStatusCellClassName(adjustedStatusNext),
      }),
    },
  },
];
