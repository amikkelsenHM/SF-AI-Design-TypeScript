'use client';

import { ObjectTrackingColumnIds } from '@/components/table/hooks/useServerTableState/configs/campaigns';
import { StatusCell } from '@/components/v2/table/components/status-cell';
import { useDownloadCampaignTDM } from '@/hooks/queries/mutations/campaign';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { getDistanceToNow, renderDateCell } from 'helpers/v2/dates';
import { DateFormat } from 'models/enums/v2/common';
import ObjectTrackingDownloadCell from '../common/download-cell/download-cell';
import { UNCORRELATED_OBJECT_CONFIG } from '../constants/object-tracking-detail';
import { ObjectTrackingView } from '../types';
import {
  createObjectTrackingStatusOptions,
  createObjectTrackingTypeOptions,
} from '../utils';

export const manageTasksColumns: ColumnDef<ObjectTrackingView>[] = [
  {
    accessorKey: 'data',
    header: 'Data',
    cell: ({ row }) => {
      const { mutate, isPending } = useDownloadCampaignTDM();

      const handleDownload = () =>
        mutate({
          objectTrackingId: row.original.id,
        });

      return (
        <ObjectTrackingDownloadCell
          isLoading={isPending}
          disabled={!row.original.latestTrack}
          onDownload={handleDownload}
        />
      );
    },
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    id: ObjectTrackingColumnIds.NAME,
    accessorKey: 'name',
    cell: ({ getValue }) => getValue() || UNCORRELATED_OBJECT_CONFIG.NAME,
    header: 'Task Name',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: renderDateCell(DateFormat.TimeWithSeconds),
    meta: {
      filterType: 'date',
    },
  },
  {
    accessorKey: 'createdBy',
    header: 'Created by',
    cell: ({ getValue, row }) => getValue() || row.original.organizationName,
    // TODO: temporary disabled until supported on BE
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: 'tleEpoch',
    header: 'TLE Epoch',
    cell: ({ getValue, row }) => {
      const value =
        getValue<string | undefined>() || row.original.target?.tleEpoch;
      if (!value) return '-';

      const dateValue = new Date(value);

      const distance = getDistanceToNow(dateValue, {
        years: ' yr',
        months: ' mth',
        days: ' day',
      });

      const formattedDate = format(dateValue, DateFormat.DateSlashShort);
      const result = `${formattedDate} (${distance})`;

      return result;
    },
    meta: {
      filterType: 'select',
      filterOptions: createObjectTrackingTypeOptions(),
    },
    // TODO: temporary disabled until supported on BE
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue() as string;
      return <StatusCell status={status} />;
    },
    meta: {
      filterType: 'select',
      filterOptions: createObjectTrackingStatusOptions(),
    },
  },
];
