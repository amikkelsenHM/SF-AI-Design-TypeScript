'use client';

import { useObservatories } from 'hooks/queries/observatoryQuery';

import Map from '.';
import { CampaignTarget } from '../pages/object-tracking/types';

const MapContainer = ({
  object,
  height,
}: {
  object?: CampaignTarget;
  height?: number;
}) => {
  const { data: observatoriesData } = useObservatories();
  const observatories = observatoriesData?.payload || [];

  return <Map observatories={observatories} object={object} height={height} />;
};

export default MapContainer;
