export interface ThresholdConfig {
  value: number;
  color: string;
}

export interface LegendItem {
  color: string;
  label: string;
}

export interface ChartData {
  [key: string]: number | string | undefined | null;
}
