import { default as React } from 'react';

export interface ChartBaseProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    actions?: React.ReactNode;
    children: React.ReactNode;
}
export declare const ChartBase: React.ForwardRefExoticComponent<ChartBaseProps & React.RefAttributes<HTMLDivElement>>;
export default ChartBase;
//# sourceMappingURL=ChartBase.d.ts.map