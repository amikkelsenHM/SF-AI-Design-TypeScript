'use client';

import { GetObjectFilterKeys } from '@/api/campaigns';
import { useServerTableState } from '@/components/table/hooks/useServerTableState';
import { TableState } from '@tanstack/react-table';
import { useAllObjects } from 'hooks/queries/campaignQuery';
import { useRouter } from 'next/navigation';
import Header from '../../header';
import { Row, SFDataTable } from '../../table-new';
import { objectTrackingColumns } from './columns/object-tracking';
import ObjectTrackingHeaderActions from './common/header/header-actions';
import {
  HEADER_OBJECT_TRACKING_DESCRIPTION,
  HEADER_OBJECT_TRACKING_TITLE,
} from './constants/header';
import { ObjectSummary } from './types';

interface ObjectTrackingHomeProps {
  tableState: Partial<TableState>;
}

export default function ObjectTrackingHome({
  tableState,
}: ObjectTrackingHomeProps) {
  const router = useRouter();

  const {
    params,
    onPaginationChange,
    onSortingChange,
    onSearchChange,
    onFiltersChange,
  } = useServerTableState<GetObjectFilterKeys>(tableState);
  const { data: objects, isLoading } = useAllObjects(params);
  const { payload: objectsPayload } = objects || {};

  const handleRowClick = ({ original: object }: Row<ObjectSummary>) => {
    const url = `/object-tracking/${object.noradId}`;
    if (url) router.push(url);
  };

  return (
    <>
      <Header
        title={HEADER_OBJECT_TRACKING_TITLE}
        description={HEADER_OBJECT_TRACKING_DESCRIPTION}
        actions={<ObjectTrackingHeaderActions />}
      />

      <SFDataTable
        // TODO: investigate why loading tsx doesn't work
        isLoading={isLoading || typeof window === 'undefined'}
        showRowCursor
        initialState={tableState}
        columns={objectTrackingColumns}
        enableFiltering
        enableGlobalFilter
        enableSorting
        enablePagination
        manualControl
        data={objectsPayload || []}
        rowCount={objects?.paging?.total}
        onRowClick={handleRowClick}
        onPaginationChange={onPaginationChange}
        onSearch={onSearchChange}
        onSortingChange={onSortingChange}
        onFiltersChange={onFiltersChange}
        hasRowBorder
      />
    </>
  );
}
