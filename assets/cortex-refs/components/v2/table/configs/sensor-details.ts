import { ITableConfig } from 'models/interfaces/v2/table/ITableConfig';

export const sensorDetailsConfig: ITableConfig = {
  tableKey: 'sensor-details',
  hideFooter: true,
  disableColumnReorder: true,
  disableRowSelectionOnClick: true,
  pagination: {
    show: false,
    sizeOption: [],
  },
};
