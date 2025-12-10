import { DayData } from 'utils/v2/chart-data-parsers';

export interface ThresholdConfig {
  value: number;
  color: string;
  label: string;
  style: 'solid' | 'dashed';
}

export interface LegendItem {
  color: string;
  label: string;
}

export interface ChartConfig {
  title: string;
  seriesLabels: string[];
  height?: number;
  width?: string | number;
  minValue?: number;
  maxValue?: number;
  customBarSize?: number;
  thresholds: ThresholdConfig[];
  legendItems: LegendItem[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  showTooltip?: boolean;
  containerStyle?: {
    borderRadius?: string;
    padding?: string;
    width?: string | number;
  };
}

export interface GenericChartProps {
  config: ChartConfig;
  data?: DayData[];
}
