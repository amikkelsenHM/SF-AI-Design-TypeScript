import {
  useDownloadCampaignTDM,
  useDownloadFilteredTDM,
} from '@/hooks/queries/mutations/campaign';
import { useCallback } from 'react';
import { HeaderActionContextValue } from '../../../table-new/components/header-actions-provider';
import { Session } from '../types';

export const useSessionTableHeaderActions = ({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean;
}) => {
  const { mutate: downloadAll, isPending: isAllPending } =
    useDownloadCampaignTDM();
  const { mutate: downloadFiltered, isPending: isFilteredPending } =
    useDownloadFilteredTDM();

  const handleDownloadAll = useCallback(() => {
    downloadAll({ objectTrackingId: id });
  }, [downloadAll, id]);

  const handleDownloadFiltered = useCallback(
    (sessionIds: string[]) => () => {
      downloadFiltered({ objectTrackingId: id, sessionIds });
    },
    [downloadFiltered, id]
  );

  const createHeaderActionsConfig = useCallback(
    ({ filters, rows }: HeaderActionContextValue<Session>) => {
      const baseActions = [
        {
          label: 'Download All',
          variant: 'secondary' as const,
          icon: 'download',
          iconPosition: 'right' as const,
          disabled,
          isLoading: isAllPending,
          onClick: handleDownloadAll,
        },
      ];

      if (!filters.length) return baseActions;

      const sessionIds = rows.map(({ original: { id } }) => id);

      return [
        ...baseActions,
        {
          label: 'Download Filtered',
          variant: 'secondary' as const,
          icon: 'download',
          iconPosition: 'right' as const,
          disabled: disabled || !sessionIds.length,
          isLoading: isFilteredPending,
          onClick: handleDownloadFiltered(sessionIds),
        },
      ];
    },
    [
      handleDownloadAll,
      disabled,
      isAllPending,
      isFilteredPending,
      handleDownloadFiltered,
    ]
  );

  return {
    createHeaderActionsConfig,
    handleDownloadAll,
  };
};
