import { ColumnDef } from '@tanstack/react-table';

export enum TrackSummaryRowIds {
  // track summary
  TRACK_METHOD_VALUE = 'trackMethodValue',
  REGIME = 'regime',
  TRACK_LENGTH = 'trackLength',
  TRACK_SEPARATION = 'trackSeparation',
  OBSERVATION_MODE = 'observationMode',
  TRACK_DURATION = 'trackDuration',
  FEATURES = 'features',
  NETWORK = 'network',
  ORGANISATION = 'organisation',
  CREATED_BY = 'createdBy',

  // coordinates
  FILE_UPLOADED = 'fileUploaded',
}

interface TableData {
  id: TrackSummaryRowIds;
  label: string;
  value: string;
}

const CELL_RENDERERS: Partial<
  Record<TrackSummaryRowIds, Exclude<ColumnDef<TableData>['cell'], string>>
> = {
  [TrackSummaryRowIds.TRACK_METHOD_VALUE]: ({ getValue }) => {
    const parts = getValue<string | undefined>()?.split('\n');

    return parts?.map((part, index) => <div key={index}>{part}</div>);
  },
};

export const columns: ColumnDef<TableData>[] = [
  {
    accessorKey: 'label',
  },
  {
    accessorKey: 'value',
    cell: (params) => {
      const cell =
        CELL_RENDERERS[params.row.original.id]?.(params) || params.getValue();

      return cell;
    },
    meta: {
      getStyles: () => ({
        className: 'w-full',
      }),
    },
  },
];
