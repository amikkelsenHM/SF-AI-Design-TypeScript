import { default as React } from 'react';

export interface ComponentGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    label?: string;
    children: React.ReactNode;
}
export declare const ComponentGroup: React.ForwardRefExoticComponent<ComponentGroupProps & React.RefAttributes<HTMLDivElement>>;
export interface ComponentWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    label?: string;
    children: React.ReactNode;
}
export declare const ComponentWrapper: React.ForwardRefExoticComponent<ComponentWrapperProps & React.RefAttributes<HTMLDivElement>>;
export default ComponentGroup;
//# sourceMappingURL=ComponentGroup.d.ts.map