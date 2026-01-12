import React from 'react';

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

export function Table<T extends Record<string, any>>({
  columns,
  data,
  className = '',
  onRowClick,
}: TableProps<T>) {
  const classes = ['table-container', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <table className="table-v2">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} style={col.width ? { width: col.width } : undefined}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => onRowClick?.(row, rowIndex)}
              style={onRowClick ? { cursor: 'pointer' } : undefined}
            >
              {columns.map((col) => {
                const value = row[col.key as keyof T];
                return (
                  <td key={String(col.key)}>
                    {col.render ? col.render(value, row, rowIndex) : String(value ?? '')}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Table.displayName = 'Table';

export default Table;
