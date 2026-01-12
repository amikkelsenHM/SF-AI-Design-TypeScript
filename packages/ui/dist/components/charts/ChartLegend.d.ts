import { default as React } from 'react';

export interface LegendItem {
    label: string;
    color: string;
}
export interface ChartLegendProps extends React.HTMLAttributes<HTMLDivElement> {
    items: LegendItem[];
}
export declare const ChartLegend: React.ForwardRefExoticComponent<ChartLegendProps & React.RefAttributes<HTMLDivElement>>;
export default ChartLegend;
//# sourceMappingURL=ChartLegend.d.ts.map