'use client';

import { NotificationDialog } from '@/components/v2/dialog/notification-dialog';
import { NONE } from '@/utils/v2/common/constants';
import { usePermission } from 'providers/permission-provider';
import { useEffect, useMemo, useRef, useState } from 'react';
import { SFDataTable } from '../../../table-new';
import { objectDetailSessionsColumns } from '../columns/object-tracking-detail-columns';
import { mapStatus, Visibility } from '../columns/status-meta';
import { TABLE_CONFIGS } from '../constants/object-tracking-detail';
import { ObjectTrackingSessionStatus } from '../enums';
import { Session } from '../types';

const LOADING_SESSIONS_DELAY_MS = 5_000;

const DIALOG_CONFIG = {
  title: 'Loading Data',
  contentClassName: 'absolute w-87.5',
  variant: 'default',
  closeOnOutsideInteraction: false,
  description: `Thanks for your patience, this is taking a little longer to load than usual due to the large volume of session data being retrieved. Please bear with us, your data will be ready soon.`,
  primaryButtonText: 'Close',
} as const;

interface ObjectTrackingSessionsProps {
  sessionData?: Session[];
  isLoading?: boolean;
  headerActions: React.ReactNode;
}

const deriveStatus = (row: Session) =>
  row.failureReason
    ? (row.failureReason as string)
    : row.rsoTargetIdentified
    ? ObjectTrackingSessionStatus.SUCCESS
    : ObjectTrackingSessionStatus.NO_DETECTION;

const ObjectTrackingSessions = ({
  sessionData,
  isLoading,
  headerActions,
}: ObjectTrackingSessionsProps) => {
  const { isAdmin } = usePermission();
  const ref = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const visibleData = useMemo(() => {
    const rows = sessionData ?? [];
    return rows.filter((row) => {
      const status = deriveStatus(row);
      const hasData =
        (row.rsoDetected ?? NONE) > 0 || (row.rsoIdentified ?? NONE) > 0;
      const meta = mapStatus(status, hasData);
      return meta.visibility === Visibility.All || isAdmin;
    });
  }, [sessionData, isAdmin]);

  useEffect(() => {
    if (!isLoading) {
      setIsModalOpen(false);
      return;
    }

    const timer = setTimeout(() => {
      if (isLoading) setIsModalOpen(true);
    }, LOADING_SESSIONS_DELAY_MS);

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <div ref={ref} className="relative">
      {ref.current && (
        <NotificationDialog
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => setIsModalOpen(false)}
          container={ref.current}
          {...DIALOG_CONFIG}
        />
      )}
      <SFDataTable
        columns={objectDetailSessionsColumns}
        data={visibleData}
        isLoading={isLoading}
        headerActions={headerActions}
        {...TABLE_CONFIGS.SESSIONS}
      />
    </div>
  );
};

export default ObjectTrackingSessions;
