'use client';

import { useEffect, useMemo, useState } from 'react';
import Header from '../../header';

import { GetCampaignFilterKeys } from '@/api/campaigns';
import { useServerTableState } from '@/components/table/hooks/useServerTableState';
import { useAccountMy } from '@/hooks/queries/accountQuery';
import {
  useObjectDetails,
  useObjectSessionCountByOrganisations,
  useObservationPrediction,
  useSessions,
} from '@/hooks/queries/campaignQuery';
import { addDays } from 'date-fns';
import Section from '../../section/section';
import { Row, SFDataTable } from '../../table-new';
import HeaderActions from '../../table-new/components/header-actions';
import { objectDetailTaskColumns } from './columns/object-tracking-detail-columns';
import ObjectTrackingActionDialog from './common/action-dialog/action-dialog';
import ObjectTrackingHeaderActions from './common/header/header-actions';
import ObjectTrackingSessions from './components/object-tracking-sessions';
import ObjectTrackingSummary from './components/object-tracking-summary';
import {
  DEFAULT_VALUES,
  OBJECT_TRACKING_DETAIL_CONSTANTS,
  TABLE_CONFIGS,
  UNCORRELATED_OBJECT_CONFIG,
} from './constants/object-tracking-detail';
import { useExtendedColumns } from './hooks/useExtendedColumns';
import { useSessionTableHeaderActions } from './hooks/useHeaderActions';
import { renderTaskSubRow } from './renderers/render-task-sub-row';
import { ObjectTrackingView } from './types';
import {
  getLastObservationData,
  getNextObservationData,
  getTimeElapsed,
  leftKpiDataConfig,
  rightKpiDataConfig,
} from './utils';

const startDate = new Date();
const endDate = addDays(startDate, 2);

const ObjectTrackingDetail = ({
  id,
  taskId,
}: {
  id: string;
  taskId?: string;
}) => {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [taskName, setTaskName] = useState<string | null>(null);
  const { data: accountData } = useAccountMy();
  const { payload: account } = accountData || {};

  const organisationIds = useMemo(() => {
    if (!account) return [];
    const ids =
      account.memberships?.map(
        ({ organizationId }: { organizationId: string }) => organizationId
      ) || [];
    return ids;
  }, [account]);

  const { params, onPaginationChange, onSortingChange } =
    useServerTableState<GetCampaignFilterKeys>(
      TABLE_CONFIGS.TASKS.initialState
    );
  const { data: objectDetails, isLoading } = useObjectDetails(id, params);
  const {
    data: organisationSessionCounts = {
      sessions_last_week: 0,
      total_sessions: 0,
    },
    isLoading: isOrganisationSessionCountsLoading,
  } = useObjectSessionCountByOrganisations(id, organisationIds);

  const { payload: objectDetailsPayload } = objectDetails || {};
  const { target, duration, targetRsoLatestTrack, tasks } =
    objectDetailsPayload || {};

  const { noradId, objectName } = target || {};

  const { payload: taskData, paging } = tasks || {};

  const sortedTaskData = useMemo(() => {
    if (!taskData || !taskId) return taskData;

    const campaignTask = taskData.find(({ id }) => id === taskId);
    if (!campaignTask) return taskData;

    const otherTasks = taskData.filter(({ id }) => id !== taskId);
    return [campaignTask, ...otherTasks];
  }, [taskData, taskId]);

  useEffect(() => {
    if (
      sortedTaskData &&
      sortedTaskData.length > DEFAULT_VALUES.FIRST_TASK_INDEX &&
      !selectedTask
    ) {
      setSelectedTask(sortedTaskData[DEFAULT_VALUES.FIRST_TASK_INDEX]?.id);
      setTaskName(sortedTaskData[DEFAULT_VALUES.FIRST_TASK_INDEX]?.name);
    }
  }, [sortedTaskData, selectedTask]);

  const { createHeaderActionsConfig } = useSessionTableHeaderActions({
    id: selectedTask || '',
    disabled: !targetRsoLatestTrack,
  });
  const headerActions = (
    <HeaderActions createActions={createHeaderActionsConfig} />
  );

  const { columns: taskColumns, actionDialogProps } = useExtendedColumns(
    objectDetailTaskColumns
  );

  const timeElapsed = useMemo(() => getTimeElapsed(duration), [duration]);

  const {
    data: nextObservation,
    error: nextObservationError,
    isLoading: isNextObservationLoading,
  } = useObservationPrediction({
    noradId: noradId || DEFAULT_VALUES.NORAD_ID,
    startDate,
    endDate,
  });

  const onRowClick = ({ original }: Row<ObjectTrackingView>) => {
    if (selectedTask !== original?.id) {
      setSelectedTask(original?.id);
      setTaskName(original?.name);
    }
  };

  const { data: sessionData, isLoading: isSessionsLoading } = useSessions(
    selectedTask || ''
  );

  const leftKpiData = useMemo(() => {
    const nextObsData = getNextObservationData(
      nextObservation,
      nextObservationError
    );
    const lastObsData = getLastObservationData(targetRsoLatestTrack);

    return leftKpiDataConfig(
      lastObsData,
      nextObsData,
      isNextObservationLoading
    );
  }, [
    targetRsoLatestTrack,
    nextObservation,
    nextObservationError,
    isNextObservationLoading,
  ]);

  const rightKpiData = useMemo(() => {
    return rightKpiDataConfig(
      organisationSessionCounts.total_sessions.toString(),
      organisationSessionCounts.sessions_last_week.toString(),
      isOrganisationSessionCountsLoading
    );
  }, [organisationSessionCounts, isOrganisationSessionCountsLoading]);

  return (
    <>
      <ObjectTrackingActionDialog {...actionDialogProps} />

      <Header
        title={objectName || UNCORRELATED_OBJECT_CONFIG.NAME}
        description={OBJECT_TRACKING_DETAIL_CONSTANTS.DESCRIPTION}
        standardActions={{ back: true }}
        actions={<ObjectTrackingHeaderActions />}
      />

      <Section title={OBJECT_TRACKING_DETAIL_CONSTANTS.SECTIONS.SUMMARY}>
        <ObjectTrackingSummary
          timeElapsed={timeElapsed}
          target={target}
          leftKpiData={leftKpiData}
          rightKpiData={rightKpiData}
        />
      </Section>

      <Section
        title={OBJECT_TRACKING_DETAIL_CONSTANTS.SECTIONS.TASKS}
        className="mt-5"
      >
        <SFDataTable
          isLoading={isLoading}
          columns={taskColumns}
          data={sortedTaskData || []}
          renderRowSubComponent={renderTaskSubRow}
          rowCount={paging?.total}
          onPaginationChange={onPaginationChange}
          onSortingChange={onSortingChange}
          onRowClick={onRowClick}
          {...TABLE_CONFIGS.TASKS}
        />
      </Section>

      <Section
        title={`${taskName} ${OBJECT_TRACKING_DETAIL_CONSTANTS.SECTIONS.SESSIONS}`}
        className="mt-5"
      >
        <ObjectTrackingSessions
          sessionData={sessionData}
          isLoading={isSessionsLoading}
          headerActions={headerActions}
        />
      </Section>
    </>
  );
};

export default ObjectTrackingDetail;
