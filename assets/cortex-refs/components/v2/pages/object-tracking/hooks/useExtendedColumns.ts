'use client';

import { ColumnDef } from '@tanstack/react-table';
import { OrganizationRole, SpacefluxRole } from 'models/enums/v2/roles';
import { usePermission } from 'providers/permission-provider';
import { useMemo } from 'react';
import { createObjectTrackingColumnsWithActions } from '../columns/object-tracking-detail-columns';
import { ObjectTrackingView } from '../types';
import { useNotificationDialogs } from './useNotificationDialogs';

export const useExtendedColumns = (
  baseColumns: ColumnDef<ObjectTrackingView>[]
) => {
  const { has } = usePermission();
  const shouldShowActionColumn = useMemo(
    () =>
      has({
        globalRole: [SpacefluxRole.Admin, SpacefluxRole.Client],
        orgRoles: [OrganizationRole.Manager, OrganizationRole.Member],
      }),
    [has]
  );
  const { actionHandlers, ...actionDialogProps } = useNotificationDialogs();

  const columns = useMemo(
    () =>
      shouldShowActionColumn
        ? createObjectTrackingColumnsWithActions({
            columns: baseColumns,
            ...actionHandlers,
          })
        : baseColumns,
    [actionHandlers, shouldShowActionColumn]
  );

  return {
    columns,
    actionDialogProps,
  };
};
