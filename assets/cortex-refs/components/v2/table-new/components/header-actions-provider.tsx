'use client';

import { ColumnFiltersState, Row, Table } from '@tanstack/react-table';
import { createContext, ReactNode, useContext } from 'react';

export interface HeaderActionContextValue<TData> {
  filters: ColumnFiltersState;
  rows: Row<TData>[];
}

const HeaderActionsContext = createContext<
  HeaderActionContextValue<any> | undefined
>(undefined);

export function useHeaderActions<TData>(): HeaderActionContextValue<TData> {
  const context = useContext(HeaderActionsContext);
  if (context === undefined) {
    throw new Error(
      'useHeaderActions must be used within a HeaderActionsProvider'
    );
  }

  return context;
}

export function HeaderActionsProvider<TData>({
  children,
  table,
}: {
  children: ReactNode;
  table: Table<TData>;
}) {
  return (
    <HeaderActionsContext.Provider
      value={{
        filters: table.getState().columnFilters,
        rows: table.getRowModel().rows,
      }}
    >
      {children}
    </HeaderActionsContext.Provider>
  );
}
