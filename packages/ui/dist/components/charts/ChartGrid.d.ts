import { default as React } from 'react';

export interface GridLine {
    position: number;
    style?: 'solid' | 'dashed' | 'dotted';
}
export interface ChartGridProps {
    horizontalLines?: GridLine[];
    verticalLines?: GridLine[];
    children?: React.ReactNode;
    className?: string;
}
export declare const ChartGrid: React.FC<ChartGridProps>;
export default ChartGrid;
//# sourceMappingURL=ChartGrid.d.ts.map