'use client';

import { ObjectTrackingColumnIds } from '@/components/table/hooks/useServerTableState/configs/campaigns';
import { lastObservationCell } from '@/components/v2/table/columns/common/cell-renders';
import { StatusCell } from '@/components/v2/table/components/status-cell';
import {
  useDownloadCampaignTDM,
  useDownloadTDMByNoradId,
} from '@/hooks/queries/mutations/campaign';
import { ColumnDef } from '@tanstack/react-table';
import { ITooltip } from 'models/interfaces/v2/tooltip/ITooltip';
import Link from 'next/link';
import { MouseEvent } from 'react';
import ObjectTrackingDownloadCell from '../common/download-cell/download-cell';
import { UNCORRELATED_OBJECT_CONFIG } from '../constants/object-tracking-detail';
import { TrackStatus } from '../enums';
import { ObjectSummary, TaskCountByStatus } from '../types';
import { createOrbitalRegimeOptions, createTrackStatusOptions } from '../utils';

const NEXT_OBSERVATION_TOOLTIP_CONFIG: ITooltip = {
  header: 'Observation times are predicted values.',
  text: 'Results are calculated using orbital models and telescope data, but actual visibility can vary due to orbital changes, weather, or other environmental factors.',
};

const capitalizeString = (() => {
  const cache = new Map<string, string>();
  return (str: string = ''): string => {
    if (cache.has(str)) return cache.get(str)!;
    const result = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    cache.set(str, result);
    return result;
  };
})();

const TelescopeLink = ({
  telescopeName,
  textColor,
}: {
  telescopeName: string;
  textColor: string;
}) => {
  const handleClick = (e: MouseEvent) => e.stopPropagation();

  return (
    <Link
      href={`/sensors/${encodeURIComponent(telescopeName)}`}
      className={`text-xs ${textColor}`}
      onClick={handleClick}
    >
      via {telescopeName}
    </Link>
  );
};

const COMMON_COLUMNS = {
  NAME: {
    id: ObjectTrackingColumnIds.NAME,
    accessorFn: (row) => row.name || '',
    header: 'Name',
    cell: ({ getValue }) => getValue() || UNCORRELATED_OBJECT_CONFIG.NAME,
    size: 150,
    enableSorting: true,
  } as ColumnDef<ObjectSummary>,
  NORAD_ID: {
    id: ObjectTrackingColumnIds.NORAD_ID,
    accessorFn: (row) => row.noradId || '',
    header: 'ID',
    cell: ({ getValue }) =>
      getValue() || UNCORRELATED_OBJECT_CONFIG.FALLBACK_VALUE,
    size: 100,
    enableSorting: true,
    meta: { filterType: 'number' },
  } as ColumnDef<ObjectSummary>,
  LAST_OBSERVATION: {
    id: ObjectTrackingColumnIds.LAST_OBSERVATION,
    accessorFn: (row) => row.lastObservation?.startTime || '',
    header: 'Last Observation',
    cell: ({ getValue }) => {
      const value = getValue() as Date | null;
      return lastObservationCell(value);
    },
    size: 130,
    meta: { filterType: 'date' },
  } as ColumnDef<ObjectSummary>,
  WARNINGS: {
    id: ObjectTrackingColumnIds.WARNINGS,
    accessorKey: 'warnings',
    header: 'Warnings (24hrs)',
    cell: ({ getValue }) => {
      const warnings = getValue() as number;
      return warnings && warnings > 0 ? warnings.toString() : '-';
    },
    size: 100,
    meta: { filterType: 'number' },
    // TODO: temporary disabled until supported on BE
    enableSorting: false,
    enableColumnFilter: false,
  } as ColumnDef<ObjectSummary>,
  ORBIT: {
    id: ObjectTrackingColumnIds.ORBITAL_REGIME,
    accessorKey: 'orbitalRegime',
    header: 'Orbit',

    enableSorting: true,
    meta: {
      filterType: 'select',
      filterOptions: createOrbitalRegimeOptions(),
    },
  } as ColumnDef<ObjectSummary>,
};

export const latestObservationsColumns: ColumnDef<ObjectSummary>[] = [
  {
    id: ObjectTrackingColumnIds.DOWNLOAD,
    header: 'Data',
    cell: ({ row }) => {
      const lastObservationInfo = row.original.lastObservation;

      const { mutate, isPending } = useDownloadCampaignTDM();

      const handleDownload = () => {
        if (!lastObservationInfo?.sessionId) return;

        mutate({
          objectTrackingId: lastObservationInfo.campaignId,
          sessionId: lastObservationInfo.sessionId,
        });
      };

      return (
        <ObjectTrackingDownloadCell
          isLoading={isPending}
          disabled={!lastObservationInfo?.sessionId}
          onDownload={handleDownload}
        />
      );
    },
    size: 50,
    meta: { getStyles: () => ({ className: 'py-0' }) },
    enableSorting: false,
    enableColumnFilter: false,
  },
  COMMON_COLUMNS.NAME,
  COMMON_COLUMNS.NORAD_ID,
  COMMON_COLUMNS.ORBIT,
  // TODO: OUT_OF_SCOPE
  // {
  //   id: 'nextObservation',
  //   accessorFn: (row) => row.prediction?.hoursUntilVisible,
  //   header: () => {
  //     return (
  //       <div className="flex gap-2 items-center">
  //         Next Observation <SfTooltip {...NEXT_OBSERVATION_TOOLTIP_CONFIG} />
  //       </div>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const prediction = row.original.prediction;
  //     const textColor =
  //       row.original.prediction?.hoursUntilVisible === 0
  //         ? 'text-dark-gray'
  //         : 'text-storm-gray';

  //     if (!prediction)
  //       return <span className={`${textColor} italic`}>Loading...</span>;

  //     if (!prediction.success) return 'Unknown';

  //     const formattedTime = formatNextObservation(prediction.hoursUntilVisible);

  //     return (
  //       <div className="flex flex-col">
  //         <span>{formattedTime}</span>
  //         <div className="flex gap-1">
  //           {prediction.telescopes.map((telescope) => (
  //             <TelescopeLink
  //               key={telescope.id}
  //               telescopeName={telescope.name}
  //               textColor={textColor}
  //             />
  //           ))}
  //         </div>
  //       </div>
  //     );
  //   },
  //   sortingFn: predictionsSortingFn,
  //   size: 150,
  //   enableSorting: true,
  //   meta: {
  //     getStyles: ({ row }) =>
  //       row.prediction?.hoursUntilVisible === 0
  //         ? { className: 'bg-background-success text-foreground-dark' }
  //         : {},
  //   },
  // },
  COMMON_COLUMNS.LAST_OBSERVATION,
  COMMON_COLUMNS.WARNINGS,
];

export const objectTrackingColumns: ColumnDef<ObjectSummary>[] = [
  {
    id: ObjectTrackingColumnIds.DOWNLOAD,
    header: 'Data',
    cell: ({ row }) => {
      const { mutate, isPending } = useDownloadTDMByNoradId();

      const handleDownload = () =>
        mutate({
          noradId: row.original.noradId,
          campaignIds: row.original.campaignIds,
        });

      return (
        <ObjectTrackingDownloadCell
          isLoading={isPending}
          disabled={!row.original.lastObservation}
          onDownload={handleDownload}
        />
      );
    },
    size: 50,
    meta: { getStyles: () => ({ className: 'py-0' }) },
    enableSorting: false,
    enableColumnFilter: false,
  },
  COMMON_COLUMNS.NORAD_ID,
  COMMON_COLUMNS.NAME,
  {
    id: ObjectTrackingColumnIds.STATUS,
    accessorFn: (row) => {
      const status = row.isTracked
        ? TrackStatus.Tracked
        : TrackStatus.NotTracked;
      return status.replace(/_/g, ' ');
    },
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue() as string;
      const formatted = capitalizeString(status);
      return <StatusCell status={formatted} />;
    },
    sortDescFirst: true,
    size: 120,
    enableSorting: true,
    meta: {
      filterType: 'select',
      filterOptions: createTrackStatusOptions(),
    },
  },
  COMMON_COLUMNS.ORBIT,
  COMMON_COLUMNS.LAST_OBSERVATION,
  COMMON_COLUMNS.WARNINGS,
  {
    id: 'taskCounts',
    accessorKey: 'taskCounts',
    header: 'Ongoing Tasks',
    cell: ({ getValue }) => {
      const tasksCount = getValue() as TaskCountByStatus | undefined;
      if (!tasksCount) return '-';

      const { accepted = 0, active = 0 } = tasksCount;
      const ongoingTasksCount = accepted + active;

      return ongoingTasksCount > 0 ? ongoingTasksCount : '-';
    },
    size: 100,
    meta: { filterType: 'number' },
    enableSorting: false,
    enableColumnFilter: false,
  },
];
