import React from 'react';

export interface TablePaginationProps {
  currentPage: number;
  totalItems: number;
  rowsPerPage: number;
  rowsPerPageOptions?: number[];
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  className?: string;
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalItems,
  rowsPerPage,
  rowsPerPageOptions = [10, 20, 50],
  onPageChange,
  onRowsPerPageChange,
  className = '',
}) => {
  const startItem = (currentPage - 1) * rowsPerPage + 1;
  const endItem = Math.min(currentPage * rowsPerPage, totalItems);
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange?.(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange?.(currentPage + 1);
    }
  };

  const classes = ['table-footer', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="rows-per-page">
        <span>Rows per page</span>
        <select
          className="rows-select"
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange?.(Number(e.target.value))}
        >
          {rowsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="page-info">
        {startItem}-{endItem} of {totalItems.toLocaleString()}
      </div>
      <div className="pagination-controls">
        <button
          className="pagination-btn"
          onClick={handlePrevious}
          disabled={currentPage <= 1}
          aria-label="Previous page"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 18L9 12L15 6"
              stroke="#EEEEEE"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          className="pagination-btn"
          onClick={handleNext}
          disabled={currentPage >= totalPages}
          aria-label="Next page"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 18L15 12L9 6"
              stroke="#EEEEEE"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

TablePagination.displayName = 'TablePagination';

export default TablePagination;
