import { ITableConfig } from 'models/interfaces/v2/table/ITableConfig';

export const weatherConfig: ITableConfig = {
  tableKey: 'weather',
  toolbar: 'Weather Forecast (AccuWeather)',
  hideFooter: true,
  disableColumnReorder: true,
  disableRowSelectionOnClick: true,
  pagination: {
    show: false,
    sizeOption: [],
  },
};
