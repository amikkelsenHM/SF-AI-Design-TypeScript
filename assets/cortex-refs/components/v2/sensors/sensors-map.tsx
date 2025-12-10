'use client';

import { useObservatories } from 'hooks/queries/observatoryQuery';
import Map from '../map-chart';
import { CampaignTarget } from '../pages/object-tracking/types';

const SensorsMap = ({ object }: { object?: CampaignTarget }) => {
  const { data: observatoriesData } = useObservatories();

  const observatories = observatoriesData?.payload || [];

  return <Map observatories={observatories} object={object} height={'full'} />;
};

export default SensorsMap;
