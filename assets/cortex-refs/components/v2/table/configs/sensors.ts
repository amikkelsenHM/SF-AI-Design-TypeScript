'use client';

import { ITableConfig } from 'models/interfaces/v2/table/ITableConfig';
import { DEFAULT_PAGINATION_OPTIONS } from 'utils/v2/table';

export const sensorsConfig: ITableConfig = {
  tableKey: 'sensors',
  disableColumnReorder: true,
  disableRowSelectionOnClick: true,
  toolbar: true,
  pagination: {
    show: true,
    sizeOption: DEFAULT_PAGINATION_OPTIONS,
  },
  onRowClick: (row) => `/sensors/${row.id}`,
};
