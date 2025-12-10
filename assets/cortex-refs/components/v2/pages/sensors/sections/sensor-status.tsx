'use client';

import { NotificationDialog } from '@/components/v2/dialog/notification-dialog';
import KpiCard from '@/components/v2/kpi-card/kpi-card';
import KpiGrid from '@/components/v2/kpi-card/kpi-grid';
import { NotificationBanner } from '@/components/v2/notification-banner/notification-banner';
import SectionTitle from '@/components/v2/section-title/section-title';
import useCommandConfirmationDialog from 'hooks/commands/useCommandConfirmationDialog';
import { useSensorCommandHandler } from 'hooks/commands/useSensorCommandHandler';
import { useAuthSession } from 'hooks/useAuthSession';
import { useKpiCardMenuItems } from 'hooks/useKpiCardMenuItems';
import { useLocalTime } from 'hooks/useLocalTime';
import { useNotificationManager } from 'hooks/useNotificationManager';
import { ITelescope } from 'models/interfaces/v2/telescope';
import { useMemo } from 'react';
import { isAdmin } from 'utils/v2/auth/permissions';
import {
  CommandExecutionState,
  createSensorStatusKpiCards,
  sensorConfig,
} from 'utils/v2/kpi-cards/sensor-status-kpi';
import { generateSkeletonKpiCards } from 'utils/v2/kpi-cards/skeleton-cards';
import SensorPerformance from './sensor-performance';

const SKELETON_CARDS_COUNT = 4;
const GRID_COLUMNS = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 3,
  xl: 3,
} as const;

interface SensorStatusSectionProps {
  data?: ITelescope;
  isLoading?: boolean;
}

const SensorStatusSection = ({
  data,
  isLoading = false,
}: SensorStatusSectionProps) => {
  const notificationManager = useNotificationManager();
  const {
    executeCommand,
    isLoading: isCommandLoading,
    activeCommand,
  } = useSensorCommandHandler(data, notificationManager);
  const { data: session } = useAuthSession();

  const showCommands = useMemo(() => isAdmin(session), [session]);

  const {
    isDialogOpen,
    dialogContent,
    handleCommandSelection,
    handleClose,
    handleConfirm,
  } = useCommandConfirmationDialog(executeCommand);

  const sensorMenuItems = useKpiCardMenuItems(
    sensorConfig,
    handleCommandSelection
  );

  const commandState = useMemo<CommandExecutionState>(
    () => ({
      activeCommand,
      isLoading: isCommandLoading,
    }),
    [activeCommand, isCommandLoading]
  );

  const currentLocalTime = useLocalTime(
    data?.latitude ?? 0,
    data?.longitude ?? 0
  );

  const statusCards = useMemo(() => {
    if (!data || isLoading) {
      return generateSkeletonKpiCards(SKELETON_CARDS_COUNT);
    }
    return createSensorStatusKpiCards(
      data,
      sensorMenuItems,
      commandState,
      showCommands
    );
  }, [
    data,
    isLoading,
    sensorMenuItems,
    commandState,
    showCommands,
    currentLocalTime,
  ]);

  return (
    <div className="mb-5">
      <NotificationBanner
        variant={notificationManager.notification.variant}
        text={notificationManager.notification.message}
        isOpen={notificationManager.notification.isOpen}
        onClose={notificationManager.hideNotification}
        url="#"
      />

      <NotificationDialog
        isOpen={isDialogOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title={dialogContent.title}
        description={dialogContent.description}
        primaryButtonText="Cancel"
        secondaryButtonText="Confirm"
        variant="warning"
      />

      <SectionTitle text="SENSOR STATUS" />
      <div className="flex flex-wrap gap-5">
        <div>
          <SectionTitle text="Live Status" variant="s" />
          <KpiGrid gap="5" columns={GRID_COLUMNS}>
            {statusCards.map(
              ({ show, title, value, component, badges }, index) =>
                show && (
                  <KpiCard
                    key={`kpi-card-${index}`}
                    title={title}
                    content={value}
                    action={component}
                    badges={badges}
                  />
                )
            )}
          </KpiGrid>
        </div>
        <SensorPerformance sensorId={data?.id} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default SensorStatusSection;
