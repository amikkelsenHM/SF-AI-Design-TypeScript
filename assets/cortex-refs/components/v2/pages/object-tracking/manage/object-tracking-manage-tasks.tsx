'use client';

import { GetCampaignFilterKeys } from '@/api/campaigns';
import BaseTabs from '@/components/tab-panel/base-tabs';
import { useServerTableState } from '@/components/table/hooks/useServerTableState';
import { GET_CAMPAIGN_FIELDS_MAP } from '@/components/table/hooks/useServerTableState/configs/campaigns';
import Header from '@/components/v2/header';
import { SFDataTable } from '@/components/v2/table-new';
import { useMyCampaigns } from '@/hooks/queries/campaignQuery';
import { useFeatureFlag } from '@/hooks/useFeatureFlag';
import {
  OT_BANNER_CONFIG_SESSION_KEY,
  OT_SESSION_KEY,
} from '@/hooks/useLiftList';
import { TableState } from '@tanstack/react-table';
import { ClientFeatureFlags } from 'lib/config/feature-flag-config';
import { manageTasksColumns } from '../columns/manage-tasks';
import ObjectTrackingActionDialog from '../common/action-dialog/action-dialog';
import ObjectTrackingHeaderActions from '../common/header/header-actions';
import {
  HEADER_MANAGE_TASKS_DESCRIPTION,
  HEADER_MANAGE_TASKS_TITLE,
} from '../constants/header';
import { TABLE_CONFIGS } from '../constants/object-tracking-detail';
import { ManageTasksTabLabels } from '../enums';
import { useExtendedColumns } from '../hooks/useExtendedColumns';
import { renderTaskSubRow } from '../renderers/render-task-sub-row';

const TABS = [
  {
    label: ManageTasksTabLabels.OBJECT,
    content: null,
    isVisible: (flagEnabled: boolean) => flagEnabled,
  },
  {
    label: ManageTasksTabLabels.TIME,
    content: null,
    isVisible: () => true,
  },
];

interface ObjectTrackingManageProps {
  tableState: Partial<TableState>;
  subscriptionTypeParam: string | undefined;
}

export default function ObjectTrackingManageTasks({
  tableState,
  subscriptionTypeParam,
}: ObjectTrackingManageProps) {
  const isPackageTaskEnabled = useFeatureFlag(
    ClientFeatureFlags.PACKAGE_TASK,
    true
  );
  const {
    params,
    onPaginationChange,
    onSortingChange,
    onSearchChange,
    onFiltersChange,
  } = useServerTableState<GetCampaignFilterKeys>(
    tableState,
    GET_CAMPAIGN_FIELDS_MAP
  );

  const { data: campaigns, isLoading } = useMyCampaigns({
    ...params,
    subscriptionType: isPackageTaskEnabled ? subscriptionTypeParam : undefined,
  });
  const { payload: campaignsPayload } = campaigns || {};

  const { columns, actionDialogProps } = useExtendedColumns(manageTasksColumns);
  const tabs = TABS.filter((t) => t.isVisible(isPackageTaskEnabled));

  return (
    <>
      <ObjectTrackingActionDialog {...actionDialogProps} />

      <Header
        title={HEADER_MANAGE_TASKS_TITLE}
        description={HEADER_MANAGE_TASKS_DESCRIPTION}
        actions={<ObjectTrackingHeaderActions />}
      />

      <BaseTabs tabs={tabs} tabPanelClassName="p-0" />
      <SFDataTable
        {...TABLE_CONFIGS.MANAGE}
        isLoading={isLoading}
        columns={columns}
        initialState={tableState}
        data={campaignsPayload || []}
        rowCount={campaigns?.paging.total}
        renderRowSubComponent={renderTaskSubRow}
        onPaginationChange={onPaginationChange}
        onSearch={onSearchChange}
        onSortingChange={onSortingChange}
        onFiltersChange={onFiltersChange}
        animationConfig={{
          sessionKey: OT_SESSION_KEY,
          bannerKey: OT_BANNER_CONFIG_SESSION_KEY,
        }}
      />
    </>
  );
}
