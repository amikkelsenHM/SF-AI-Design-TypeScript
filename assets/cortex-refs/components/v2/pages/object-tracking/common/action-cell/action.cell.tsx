import KpiCardOptions from '@/components/v2/kpi-card/kpi-card-options';
import { useNavigation } from '@/hooks/useNavigation';
import { SubscriptionType } from 'models/interfaces/v2/subscriptions';
import { memo, useMemo } from 'react';
import {
  ObjectTrackingObservationMode,
  ObjectTrackingStatus,
} from '../../enums';
import { ObjectTrackingView } from '../../types';

enum Action {
  EDIT = 'edit',
  ARCHIVE = 'archive',
  EXTEND = 'extend',
}

const MODE_BASED_ACTIONS_MAP: Partial<
  Record<ObjectTrackingObservationMode, Action[]>
> = {
  [ObjectTrackingObservationMode.Stare]: [Action.EDIT, Action.ARCHIVE],
  [ObjectTrackingObservationMode.Search]: [Action.EDIT, Action.ARCHIVE],
  [ObjectTrackingObservationMode.Scan]: [Action.EDIT, Action.ARCHIVE],
  [ObjectTrackingObservationMode.Instant]: [Action.ARCHIVE],
};

const ObjectTrackingActionCell = memo(
  ({
    rowData,
    openArchiveDialog,
    openExtendDialog,
    openRemoveDialog,
  }: {
    rowData: ObjectTrackingView;
    openArchiveDialog: (rowData: ObjectTrackingView) => void;
    openExtendDialog: (rowData: ObjectTrackingView) => void;
    openRemoveDialog: (rowData: ObjectTrackingView) => void;
  }) => {
    const { navigate } = useNavigation({
      linkTo: `/object-tracking/${rowData.id}/edit`,
    });
    const items = useMemo(() => {
      const { status, observationMode, taskingSubscriptionType } = rowData;

      if (
        status === ObjectTrackingStatus.COMPLETED ||
        status === ObjectTrackingStatus.CANCELLED
      )
        return [];

      if (taskingSubscriptionType === SubscriptionType.Object) {
        return [
          { label: 'Remove Object', onClick: () => openRemoveDialog(rowData) },
        ];
      }

      const actions = [
        {
          action: Action.EDIT,
          label: 'Edit Task',
          onClick: () => navigate(),
        },
        {
          action: Action.ARCHIVE,
          label: 'Archive Task',
          onClick: () => openArchiveDialog(rowData),
        },
        {
          action: Action.EXTEND,
          label: 'Extend Task',
          onClick: () => openExtendDialog(rowData),
        },
      ];

      const modeBasedActions = MODE_BASED_ACTIONS_MAP[observationMode];

      return modeBasedActions
        ? actions.filter(({ action }) => modeBasedActions.includes(action))
        : actions;
    }, [rowData, openArchiveDialog, openExtendDialog]);

    return (
      <KpiCardOptions triggerClassName="w-fit mx-auto" menuItems={items} />
    );
  }
);

export default ObjectTrackingActionCell;
