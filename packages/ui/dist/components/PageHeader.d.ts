import { default as React } from 'react';

export interface NavItem {
    label: string;
    href: string;
}
export interface PageHeaderProps extends React.HTMLAttributes<HTMLElement> {
    logo?: React.ReactNode;
    logoHref?: string;
    navItems?: NavItem[];
}
export declare const PageHeader: React.ForwardRefExoticComponent<PageHeaderProps & React.RefAttributes<HTMLElement>>;
export default PageHeader;
//# sourceMappingURL=PageHeader.d.ts.map