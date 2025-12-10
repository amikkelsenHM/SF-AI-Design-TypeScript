import { ColumnDef } from '@tanstack/react-table';
import { DetailItem } from 'utils/v2/sensors/createSensorDetails';

export const columns = (sensorName: string): ColumnDef<DetailItem>[] => [
  {
    accessorKey: 'label',
    header: `Sensor: ${sensorName}`,
    cell: (info) => info.getValue(),
    meta: {
      className: 'w-[200px] min-w-[200px]',
    },
  },
  {
    accessorFn: (row) => row?.value || '',
    id: 'value',
    header: '',
    cell: (info) => info.getValue(),
  },
];
