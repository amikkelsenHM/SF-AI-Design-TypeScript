import { COLORS } from 'styles/colors';
import { ChartConfig } from '../types/chart-config';

const HEIGHT = 400;
const DATE_LABEL = 'Date';
const PERCENTAGE_LABEL = 'Percentage';
const HOURS_LABEL = 'Hours';

export const SessionChartConfig: ChartConfig = {
  title: 'Sessions from',
  seriesLabels: ['Sessions'],
  height: HEIGHT,
  width: '100%',
  minValue: 0,
  maxValue: 2,
  thresholds: [],
  xAxisLabel: DATE_LABEL,
  yAxisLabel: 'Session Count',
  showTooltip: true,
  legendItems: [
    {
      color: COLORS.MEDIUM_ORCHID,
      label: 'Sessions',
    },
  ],
};

export const PercentageNightTimeChartConfig: ChartConfig = {
  title: 'Hours of Night time',
  seriesLabels: ['Hours of Night time'],
  height: HEIGHT,
  width: '100%',
  minValue: 0,
  maxValue: 2,
  customBarSize: 40,
  thresholds: [],
  xAxisLabel: DATE_LABEL,
  yAxisLabel: HOURS_LABEL,
  showTooltip: true,
  legendItems: [
    {
      color: COLORS.MEDIUM_ORCHID,
      label: 'Hours of Night time',
    },
  ],
};

export const PercentageOperatingTimeChartConfig: ChartConfig = {
  title: '% of Operating time',
  seriesLabels: ['% of Operating time'],
  height: HEIGHT,
  width: '100%',
  minValue: 0,
  maxValue: 2,
  customBarSize: 40,
  thresholds: [],
  xAxisLabel: DATE_LABEL,
  yAxisLabel: PERCENTAGE_LABEL,
  showTooltip: true,
  legendItems: [
    {
      color: COLORS.MEDIUM_ORCHID,
      label: '% of Operating time',
    },
  ],
};
