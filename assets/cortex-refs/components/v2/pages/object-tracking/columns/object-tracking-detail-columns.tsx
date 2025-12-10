import { Badge } from '@/components/components/ui/badge';
import { UTC_TIME_ZONE } from '@/components/v2/date-picker/utils';
import SfTooltip from '@/components/v2/tooltip/sf-tooltip';
import { useDownloadCampaignTDM } from '@/hooks/queries/mutations/campaign';
import { NONE } from '@/utils/v2/common/constants';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { getDistanceToNow, renderDateCell } from 'helpers/v2/dates';
import { DateFormat } from 'models/enums/v2/common';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { TZDate } from 'react-day-picker';
import { StatusCell } from '../../../table/components/status-cell';
import ObjectTrackingActionCell from '../common/action-cell/action.cell';
import ObjectTrackingDownloadCell from '../common/download-cell/download-cell';
import { TASK_FILTER_CONSTANTS } from '../constants/object-tracking-detail';
import { ObjectTrackingSessionStatus } from '../enums';
import {
  ObjectDetailItem,
  TrackDetailItem,
} from '../mock-data/object-tracking-detail-mock-data';
import { ObjectTrackingView, Session, TaskDetailsRowIds } from '../types';
import {
  createObjectTrackingSessionStatusOptions,
  getTaskTypeValue,
} from '../utils';
import { mapStatus } from './status-meta';

type CellValue = string | number | null;

const renderValue = (value: CellValue): string =>
  value != null ? String(value) : '-';

const OTIdLink = ({
  noradId,
  taskId,
  children,
}: {
  noradId: number;
  taskId?: string;
  children: ReactNode;
}) => {
  const basePath = `/object-tracking/${noradId}`;
  const href = taskId ? `${basePath}?taskId=${taskId}` : basePath;

  const pathname = usePathname();

  if (pathname.startsWith(basePath)) return <>{children}</>;

  return (
    <Link href={href} className="underline">
      {children}
    </Link>
  );
};

const CELL_RENDERERS: Partial<
  Record<TaskDetailsRowIds, Exclude<ColumnDef<TrackDetailItem>['cell'], string>>
> = {
  [TaskDetailsRowIds.TleValue]: ({ getValue }) => {
    const parts = getValue<string | undefined>()?.split('\n');

    return parts?.map((part, index) => <div key={index}>{part}</div>);
  },
  [TaskDetailsRowIds.TaskId]: ({ getValue, row }) => {
    const taskId = getValue<string>();
    const { noradId, status } = row.original.meta ?? {};

    const isValidTask =
      noradId &&
      status &&
      TASK_FILTER_CONSTANTS.VALID_STATUSES.includes(status);

    if (!isValidTask) return taskId;

    return (
      <OTIdLink noradId={noradId} taskId={taskId}>
        {taskId}
      </OTIdLink>
    );
  },
  [TaskDetailsRowIds.ObjectName]: ({ getValue, row }) => {
    const objectName = getValue<string>();
    const { noradId } = row.original.meta ?? {};

    if (!noradId) return objectName;

    return <OTIdLink noradId={noradId}>{objectName}</OTIdLink>;
  },
};

export const trackDetailsColumns: ColumnDef<TrackDetailItem>[] = [
  {
    accessorKey: 'label',
    header: 'Task Details',
    meta: {
      getStyles: () => ({
        className: 'w-[150px] min-w-[150px]',
      }),
    },
  },
  {
    accessorKey: 'value',
    header: '',
    cell: (params) => {
      const cell =
        CELL_RENDERERS[params.row.original.id as TaskDetailsRowIds]?.(params) ||
        params.getValue();

      return cell;
    },
  },
];

export const objectDetailsColumns: ColumnDef<ObjectDetailItem>[] = [
  {
    accessorKey: 'label',
    header: 'Object Details',
    meta: {
      className: 'w-[180px] min-w-[180px] h-8',
    },
  },
  {
    accessorKey: 'value',
    header: '',
    cell: ({ getValue, row }) => {
      const value = getValue() as string;
      const item = row.original;

      if (item.id === 'object-type') {
        return (
          <Badge state="idle" className="bg-foreground-contrast">
            {value}
          </Badge>
        );
      }

      return value;
    },
    meta: {
      className: 'h-8',
    },
  },
];

export const objectDetailSessionsColumns: ColumnDef<Session>[] = [
  {
    accessorFn: (row) =>
      row.startTime ? new TZDate(row.startTime, UTC_TIME_ZONE) : '',
    header: 'UTC Time',
    cell: renderDateCell(DateFormat.TimeWithSeconds),
    meta: {
      className: 'w-[180px] min-w-[180px] h-8',
      filterType: 'date',
    },
  },
  {
    accessorKey: 'telescopeName',
    header: 'Sensor',
    cell: ({ getValue }) => getValue() as string,
  },
  {
    accessorFn: (row) =>
      row.failureReason
        ? (row.failureReason as ObjectTrackingSessionStatus)
        : row.rsoTargetIdentified
        ? ObjectTrackingSessionStatus.SUCCESS
        : ObjectTrackingSessionStatus.NO_DETECTION,
    id: 'status',
    header: 'Status',
    cell: ({ getValue, row }) => {
      const status = getValue() as string;
      const hasData =
        (row.original.rsoDetected ?? NONE) > 0 ||
        (row.original.rsoIdentified ?? NONE) > 0;

      const meta = mapStatus(status, hasData);

      const badge = (
        <Badge state={meta.severity} variant="secondary">
          {meta.label}
        </Badge>
      );

      return <SfTooltip {...meta.tooltip} trigger={badge} />;
    },
    meta: {
      filterType: 'select',
      filterOptions: createObjectTrackingSessionStatusOptions(),
    },
  },
  {
    accessorFn: (row) => (row.rsoTargetIdentified ? 'Yes' : 'No'),
    header: 'Object Found',
    cell: ({ getValue }) => renderValue(getValue() as CellValue),
    meta: {
      filterType: 'select',
      filterOptions: [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' },
      ],
    },
  },
  {
    accessorKey: 'rsoIdentified',
    header: 'Total RSOs Found',
    cell: ({ getValue }) => renderValue(getValue() as CellValue),
    meta: { filterType: 'number' },
  },
  {
    accessorKey: 'rsoDetected',
    header: 'Associated(RSO)',
    cell: ({ getValue }) => {
      const value = getValue() as CellValue;
      return renderValue(value);
    },
    meta: { filterType: 'number' },
  },
  {
    accessorKey: 'data',
    header: 'Data',
    cell: ({ row }) => {
      const { mutate, isPending } = useDownloadCampaignTDM();

      const handleDownload = () =>
        mutate({
          objectTrackingId: row.original.objectTrackingId,
          sessionId: row.original.id,
        });

      const detected = row.original.rsoDetected;
      const identified = row.original.rsoIdentified;

      const isDisabled = detected === NONE && identified === NONE;

      return (
        <ObjectTrackingDownloadCell
          isLoading={isPending}
          disabled={isDisabled}
          onDownload={handleDownload}
        />
      );
    },
    enableSorting: false,
    enableColumnFilter: false,
  },
];

export const objectDetailTaskColumns: ColumnDef<ObjectTrackingView>[] = [
  {
    accessorKey: 'name',
    header: 'Task Name',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue() as string;
      return <StatusCell status={status} />;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: renderDateCell(DateFormat.TimeWithSeconds),
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
  },
  {
    accessorKey: 'taskingSubscriptionType',
    header: 'Type',
    cell: ({ getValue }) =>
      getTaskTypeValue(getValue<string | null | undefined>()),
  },
  {
    accessorKey: 'createdBy',
    header: 'Created by',
    cell: ({ getValue, row }) => getValue() || row.original.organizationName,
  },
];

export const createObjectTrackingColumnsWithActions = ({
  columns,
  openArchiveDialog,
  openExtendDialog,
  openRemoveDialog,
}: {
  columns: ColumnDef<ObjectTrackingView>[];
  openArchiveDialog: (rowData: ObjectTrackingView) => void;
  openExtendDialog: (rowData: ObjectTrackingView) => void;
  openRemoveDialog: (rowData: ObjectTrackingView) => void;
}): ColumnDef<ObjectTrackingView>[] => [
  ...columns,
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => (
      <ObjectTrackingActionCell
        rowData={row.original}
        openArchiveDialog={openArchiveDialog}
        openExtendDialog={openExtendDialog}
        openRemoveDialog={openRemoveDialog}
      />
    ),
    meta: {
      className: 'w-23',
    },
    enableSorting: false,
    enableColumnFilter: false,
  },
];
