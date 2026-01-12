import { default as React } from 'react';
import { GridLine } from './ChartGrid';
import { LegendItem } from './ChartLegend';

export type ScatterPointSize = 'xs' | 'sm' | 'md' | 'lg';
export type ScatterPointColor = 1 | 2 | 3;
export interface ScatterPoint {
    x: number;
    y: number;
    size?: ScatterPointSize;
    colorIndex?: ScatterPointColor;
}
export interface ScatterChartProps {
    title?: string;
    points: ScatterPoint[];
    xAxisLabel?: string;
    xAxisValues?: (string | number)[];
    yAxisLabel?: string;
    yAxisValues?: (string | number)[];
    legend?: LegendItem[];
    horizontalGridLines?: GridLine[];
    verticalGridLines?: GridLine[];
    className?: string;
}
export declare const ScatterChart: React.FC<ScatterChartProps>;
export default ScatterChart;
//# sourceMappingURL=ScatterChart.d.ts.map