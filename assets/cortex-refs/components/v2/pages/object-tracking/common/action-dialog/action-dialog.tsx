'use client';

import { memo } from 'react';

import { Select } from '@/components/components/ui/select';

import { NotificationDialog } from '@/components/v2/dialog/notification-dialog';
import {
  DialogType,
  DURATION_OPTIONS,
} from '../../constants/object-tracking-detail';
import { useNotificationDialogs } from '../../hooks/useNotificationDialogs';

type ObjectTrackingActionDialogProps = Omit<
  ReturnType<typeof useNotificationDialogs>,
  'actionHandlers'
>;

const ObjectTrackingActionDialog = memo(
  ({
    isLoading,
    activeDialog,
    isDialogOpen,
    currentDialogConfig,
    extendValue,
    closeDialog,
    getConfirmHandler,
    setExtendValue,
  }: ObjectTrackingActionDialogProps) => {
    const removeSpacing =
      activeDialog.type === DialogType.EXTEND ? 'gap-0' : '';
    const disableExtendButton =
      activeDialog.type === DialogType.EXTEND && !extendValue;

    if (!currentDialogConfig) return null;

    return (
      <NotificationDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onConfirm={getConfirmHandler()}
        contentClassName={removeSpacing}
        {...currentDialogConfig}
        isLoading={isLoading}
        disableSecondaryButton={disableExtendButton}
      >
        {activeDialog.type === DialogType.EXTEND && (
          <div className="w-4/5 px-5 pb-8 align-center">
            <Select
              size="s"
              options={DURATION_OPTIONS}
              placeholder="Please select a duration"
              value={extendValue}
              onValueChange={setExtendValue}
            />
          </div>
        )}
      </NotificationDialog>
    );
  }
);

export default ObjectTrackingActionDialog;
