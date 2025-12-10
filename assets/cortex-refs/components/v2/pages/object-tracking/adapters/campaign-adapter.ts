import {
  CampaignResponse,
  CampaignTarget,
  ObjectTrackingView,
  Track,
  TrackResponse,
} from '../types';

const getStartEndDates = (
  startEndDates: CampaignResponse['startEndDates']
): ObjectTrackingView['startEndDates'] => {
  if (!startEndDates || startEndDates.length === 0) return;

  const firstDateRange = startEndDates[0];
  const from = new Date(firstDateRange.start);
  const to = new Date(firstDateRange.end);

  return {
    from,
    to,
  };
};

const trackAdapter = ({ startTime, ...response }: TrackResponse): Track => ({
  ...response,
  startTime: new Date(startTime),
});

export const campaignAdapter = (
  {
    startEndDates,
    targetRsoLatestTrack,
    latestTrack,
    ...response
  }: CampaignResponse,
  target?: CampaignTarget
): ObjectTrackingView => {
  return {
    ...response,
    target: response.target || target,
    startEndDates: getStartEndDates(startEndDates),
    targetRsoLatestTrack: targetRsoLatestTrack
      ? trackAdapter(targetRsoLatestTrack)
      : undefined,
    latestTrack: latestTrack ? trackAdapter(latestTrack) : undefined,
  };
};
