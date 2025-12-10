'use client';

import { ColumnDef } from '@tanstack/react-table';

interface Sensor {
  name: string;
  location: string;
  country: string;
  network: string;
  type: string;
}

export enum ProfileSensorsColumnIds {
  NAME = 'name',
  LOCATION = 'location',
  NETWORK = 'network',
}

export const profileSensors: ColumnDef<Sensor>[] = [
  {
    id: ProfileSensorsColumnIds.NAME,
    accessorKey: 'name',
    header: 'Name',
  },
  {
    id: ProfileSensorsColumnIds.LOCATION,
    accessorFn: (row) => row.location || '',
    header: 'Location',
  },

  {
    id: ProfileSensorsColumnIds.NETWORK,
    accessorFn: (row) => row.network || '',
    header: 'Network',
  },
];
