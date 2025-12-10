'use client';

import { Select } from '@/components/components/ui/select';
import KpiCard from '@/components/v2/kpi-card/kpi-card';
import KpiGrid from '@/components/v2/kpi-card/kpi-grid';
import SectionTitle from '@/components/v2/section-title/section-title';
import { createSensorPerformanceKpiCards } from '@/utils/v2/kpi-cards/sensor-performance-kpi';
import { useTelescopeActivity } from 'hooks/queries/telescopeQuery';
import { TimeRangeLabel } from 'models/types/common';
import { useState } from 'react';

const TIME_RANGES = [
  { label: 'Last 24 hrs', value: 'Last 24 hrs' },
  { label: 'Last 7 days', value: 'Last 7 days' },
  { label: 'Last 30 days', value: 'Last 30 days' },
  { label: 'Last 60 days', value: 'Last 60 days' },
  { label: 'Last 90 days', value: 'Last 90 days' },
];

interface SensorPerformanceProps {
  sensorId?: string;
  isLoading?: boolean;
}

const SensorPerformance = ({
  sensorId,
  isLoading: isGlobalLoading,
}: SensorPerformanceProps) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>(
    TIME_RANGES[0].value
  );

  const { data, isLoading: isLoadingActivity } = useTelescopeActivity(
    sensorId || '',
    selectedTimeRange as TimeRangeLabel
  );

  const isLoading = isGlobalLoading || isLoadingActivity;

  const performanceCards = createSensorPerformanceKpiCards(data);

  return (
    <div className="w-fit">
      <SectionTitle
        text="Performance"
        variant="dropdown"
        dropdown={
          <Select
            size="xs"
            disabled={isLoading}
            options={TIME_RANGES}
            value={selectedTimeRange}
            onValueChange={setSelectedTimeRange}
          />
        }
      />

      <KpiGrid gap="5">
        {performanceCards.map(({ title, value }) => (
          <KpiCard
            key={title}
            title={title}
            content={String(value ?? 0)}
            isLoading={isLoadingActivity}
          />
        ))}
      </KpiGrid>
    </div>
  );
};

export default SensorPerformance;
