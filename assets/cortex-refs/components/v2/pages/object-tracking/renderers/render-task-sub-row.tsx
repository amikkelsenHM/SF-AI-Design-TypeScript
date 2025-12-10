import { SFDataTable } from '@/components/v2/table-new';
import { Row } from '@tanstack/react-table';
import { trackDetailsColumns } from '../columns/object-tracking-detail-columns';
import { TABLE_CONFIGS } from '../constants/object-tracking-detail';
import { TrackDetailItem } from '../mock-data/object-tracking-detail-mock-data';
import { ObjectTrackingView } from '../types';
import { buildTaskDetailsData } from '../utils';

export const renderTaskSubRow = ({ row }: { row: Row<ObjectTrackingView> }) => (
  <SFDataTable
    columns={trackDetailsColumns as TrackDetailItem[]}
    data={buildTaskDetailsData(row.original, row.original.startEndDates!)}
    {...TABLE_CONFIGS.TASK_DETAIL}
  />
);
