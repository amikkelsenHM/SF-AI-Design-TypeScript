import {
  useArchiveTrack,
  useExtendTrack,
} from '@/hooks/queries/mutations/object-tracking';
import { useCallback, useMemo, useState } from 'react';
import {
  DialogType,
  DIALOG_CONFIGS,
  DurationValueKey,
} from '../constants/object-tracking-detail';
import { ObjectTrackingView } from '../types';

interface ActiveDialogState {
  type: DialogType;
  rowData?: ObjectTrackingView;
}

const INITIAL_ACTIVE_DIALOG_STATE: ActiveDialogState = {
  type: DialogType.NONE,
};

export const useNotificationDialogs = () => {
  const [activeDialog, setActiveDialog] = useState<ActiveDialogState>(
    INITIAL_ACTIVE_DIALOG_STATE
  );
  const [extendValue, setExtendValue] = useState<DurationValueKey>();
  const { mutate: archiveTrack, isPending: isArchivePending } =
    useArchiveTrack();
  const { mutate: extendTrack, isPending: isExtendPending } = useExtendTrack();

  const openDialog = useCallback((dialogState: ActiveDialogState) => {
    setActiveDialog(dialogState);
  }, []);

  const closeDialog = useCallback(() => {
    setActiveDialog(INITIAL_ACTIVE_DIALOG_STATE);
    setExtendValue(undefined);
  }, []);

  const handleArchiveConfirm = useCallback(() => {
    archiveTrack(activeDialog.rowData?.id!, {
      onSuccess: () => closeDialog(),
    });
  }, [archiveTrack, activeDialog.rowData?.id, closeDialog]);

  const handleExtendConfirm = useCallback(() => {
    if (!extendValue || !activeDialog.rowData) {
      return;
    }

    extendTrack(
      {
        id: activeDialog.rowData.id,
        startEndDates: activeDialog.rowData.startEndDates,
        value: extendValue,
      },
      { onSuccess: () => closeDialog() }
    );
  }, [extendValue, closeDialog, activeDialog.rowData]);

  const getConfirmHandler = useCallback(() => {
    switch (activeDialog.type) {
      case DialogType.REMOVE:
      case DialogType.ARCHIVE:
        return handleArchiveConfirm;
      case DialogType.EXTEND:
        return handleExtendConfirm;
      default:
        return closeDialog;
    }
  }, [activeDialog, handleArchiveConfirm, handleExtendConfirm, closeDialog]);

  const isDialogOpen = activeDialog.type !== DialogType.NONE;
  const currentDialogConfig = useMemo(() => {
    const config =
      activeDialog.type !== DialogType.NONE
        ? DIALOG_CONFIGS[activeDialog.type]
        : null;

    if (!config) return null;

    return {
      ...config,
      title: config.title(activeDialog.rowData?.target?.objectName),
    };
  }, [activeDialog]);

  const actionHandlers = {
    openArchiveDialog: (rowData: ObjectTrackingView) =>
      openDialog({ rowData, type: DialogType.ARCHIVE }),
    openExtendDialog: (rowData: ObjectTrackingView) =>
      openDialog({ rowData, type: DialogType.EXTEND }),
    openRemoveDialog: (rowData: ObjectTrackingView) =>
      openDialog({ rowData, type: DialogType.REMOVE }),
  };

  return {
    isLoading: isArchivePending || isExtendPending,
    activeDialog,
    isDialogOpen,
    currentDialogConfig,
    extendValue,
    openDialog,
    closeDialog,
    getConfirmHandler,
    setExtendValue,
    openArchiveDialog: actionHandlers.openArchiveDialog,
    openExtendDialog: actionHandlers.openExtendDialog,
    actionHandlers,
  };
};
