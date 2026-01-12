import { default as React } from 'react';
import { GridLine } from './ChartGrid';
import { LegendItem } from './ChartLegend';

export type BarDirection = 'positive' | 'negative';
export interface BarValue {
    height: number;
    direction?: BarDirection;
    colorIndex?: 1 | 2 | 3;
}
export interface BarGroup {
    values: BarValue[];
    position?: number;
}
export interface BarChartProps {
    title?: string;
    data: BarGroup[];
    xAxisLabel?: string;
    xAxisValues?: (string | number)[];
    yAxisLabel?: string;
    yAxisValues?: (string | number)[];
    legend?: LegendItem[];
    biDirectional?: boolean;
    horizontalGridLines?: GridLine[];
    verticalGridLines?: GridLine[];
    className?: string;
}
export declare const BarChart: React.FC<BarChartProps>;
export default BarChart;
//# sourceMappingURL=BarChart.d.ts.map