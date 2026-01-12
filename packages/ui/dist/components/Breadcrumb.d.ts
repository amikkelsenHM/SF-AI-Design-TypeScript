import { default as React } from 'react';

export interface BreadcrumbItem {
    label: string;
    href?: string;
    onClick?: () => void;
}
export interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}
export declare const Breadcrumb: React.FC<BreadcrumbProps>;
export default Breadcrumb;
//# sourceMappingURL=Breadcrumb.d.ts.map