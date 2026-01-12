import { default as React } from 'react';
import { GridLine } from './ChartGrid';
import { LegendItem } from './ChartLegend';

export interface LineSeriesPoint {
    x: number;
    y: number;
}
export interface LineSeries {
    points: LineSeriesPoint[];
    colorIndex?: 1 | 2 | 3;
}
export interface LineChartProps {
    title?: string;
    series: LineSeries[];
    xAxisLabel?: string;
    xAxisValues?: (string | number)[];
    yAxisLabel?: string;
    yAxisValues?: (string | number)[];
    legend?: LegendItem[];
    horizontalGridLines?: GridLine[];
    verticalGridLines?: GridLine[];
    viewBox?: {
        width: number;
        height: number;
    };
    className?: string;
}
export declare const LineChart: React.FC<LineChartProps>;
export default LineChart;
//# sourceMappingURL=LineChart.d.ts.map