import { default as React } from 'react';

export interface TableColumn<T> {
    key: keyof T | string;
    header: string;
    render?: (value: any, row: T, index: number) => React.ReactNode;
    width?: string;
}
export interface TableProps<T extends Record<string, any>> {
    columns: TableColumn<T>[];
    data: T[];
    className?: string;
    onRowClick?: (row: T, index: number) => void;
}
export declare function Table<T extends Record<string, any>>({ columns, data, className, onRowClick, }: TableProps<T>): import("react/jsx-runtime").JSX.Element;
export declare namespace Table {
    var displayName: string;
}
export default Table;
//# sourceMappingURL=Table.d.ts.map