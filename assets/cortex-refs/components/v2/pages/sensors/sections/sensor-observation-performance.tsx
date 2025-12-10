'use client';

import { useSkeleton } from '@/components/lib/skeleton/patterns';
import SectionTitle from '@/components/v2/section-title/section-title';
import SensorObservationPerformanceChart from '@/components/v2/sensors/sensor-observation-performance-chart';
import { useTelescopeHistoryPerformance } from 'hooks/queries/telescopeQuery';

interface SensorObservationPerformanceProps {
  sensorId?: string;
}

const SensorObservationPerformance = ({
  sensorId,
}: SensorObservationPerformanceProps) => {
  const { data, isLoading } = useTelescopeHistoryPerformance(sensorId || '');
  const { liveFeedRectangles } = useSkeleton();

  const chartSkeleton = liveFeedRectangles({
    count: 1,
    rectangleWidth: 'full',
  }).build();

  if (isLoading) return chartSkeleton;

  return (
    <section className="mb-5 min-h-[600px]">
      <SectionTitle text="OBSERVATION PERFORMANCE" />
      <SectionTitle text="Observation Data" variant="s" />

      <SensorObservationPerformanceChart data={data} />
    </section>
  );
};

export default SensorObservationPerformance;
