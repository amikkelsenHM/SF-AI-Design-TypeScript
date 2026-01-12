import { default as React } from 'react';

export interface TablePaginationProps {
    currentPage: number;
    totalItems: number;
    rowsPerPage: number;
    rowsPerPageOptions?: number[];
    onPageChange?: (page: number) => void;
    onRowsPerPageChange?: (rowsPerPage: number) => void;
    className?: string;
}
export declare const TablePagination: React.FC<TablePaginationProps>;
export default TablePagination;
//# sourceMappingURL=TablePagination.d.ts.map