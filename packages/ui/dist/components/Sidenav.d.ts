import { default as React } from 'react';

export interface SidenavItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    href?: string;
    onClick?: () => void;
}
export interface SidenavProps {
    items: SidenavItem[];
    activeId?: string;
    collapsed?: boolean;
    onToggle?: (collapsed: boolean) => void;
    onItemClick?: (item: SidenavItem) => void;
    logo?: React.ReactNode;
    logoCollapsed?: React.ReactNode;
    className?: string;
}
export declare const Sidenav: React.FC<SidenavProps>;
export default Sidenav;
//# sourceMappingURL=Sidenav.d.ts.map