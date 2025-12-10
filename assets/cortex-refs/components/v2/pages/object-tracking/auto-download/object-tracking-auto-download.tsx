'use client';

import { useEffect, useRef } from 'react';

import { useDownloadCampaignTDM } from '@/hooks/queries/mutations/campaign';
import { useRouter } from 'next/navigation';

const ObjectTrackingAutoDownload = ({
  id,
  campaignId,
  sessionId,
}: {
  id: string;
  campaignId: string;
  sessionId: string | undefined;
}) => {
  const hasDownloadRef = useRef(false);
  const { mutate } = useDownloadCampaignTDM();
  const router = useRouter();

  useEffect(() => {
    if (hasDownloadRef.current) return;

    hasDownloadRef.current = true;

    mutate(
      { objectTrackingId: campaignId, sessionId },
      {
        onSuccess: () => {
          if (history.length === 1) window.close();

          // fallback if unable to close the window
          router.replace(`/object-tracking/${id}`);
        },
      }
    );
  }, [campaignId, id, sessionId, mutate, router]);

  return null;
};

export default ObjectTrackingAutoDownload;
