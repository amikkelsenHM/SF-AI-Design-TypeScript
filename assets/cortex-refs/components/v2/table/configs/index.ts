import { ITableConfig } from 'models/interfaces/v2/table/ITableConfig';
import { weatherConfig } from './weather';
import { TableKey } from 'models/interfaces/v2/table/TableKey';
import { sensorDetailsConfig } from './sensor-details';
import { sensorsConfig } from './sensors';

export const TABLE_CONFIGS: Record<TableKey, ITableConfig> = {
  weather: weatherConfig,
  sensors: sensorsConfig,
  sensorDetails: sensorDetailsConfig,
};
