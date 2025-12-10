import { Select } from '@/components/components/ui/select';
import { Typography } from '@/components/components/ui/typography';
import { useSkeleton } from '@/components/lib/skeleton/patterns';
import SensorObservationPerformanceChart from '@/components/v2/sensors/sensor-observation-performance-chart';
import {
  useAllTelescopeHistoryPerformance,
  useTelescopeHistoryPerformance,
  useTelescopes,
} from 'hooks/queries/telescopeQuery';
import {
  ITelescope,
  SensorPerformanceTab,
} from 'models/interfaces/v2/telescope';
import { useMemo, useState } from 'react';

interface ObservationPerformanceSectionProps {
  isLoading?: boolean;
}

const ALL_SENSORS_OPTION = { label: 'All Sensors', value: 'all' };

const ObservationPerformanceSection = ({
  isLoading: isGlobalLoading = false,
}: ObservationPerformanceSectionProps) => {
  const { liveFeedRectangles } = useSkeleton();
  const [sensorId, setSensorId] = useState(ALL_SENSORS_OPTION.value);

  const chartSkeleton = liveFeedRectangles({
    count: 1,
    rectangleWidth: 'full',
    className: 'pt-4',
  }).build();

  const {
    data: selectedSensorHistoryPerformance,
    isLoading: isPerformanceLoading,
  } = useTelescopeHistoryPerformance(
    sensorId === ALL_SENSORS_OPTION.value ? '' : sensorId
  );
  const {
    data: allSensorsHistoryPerformance,
    isLoading: isAllPerformanceLoading,
  } = useAllTelescopeHistoryPerformance();
  const { data: telescopesData } = useTelescopes();

  const isLoading =
    isGlobalLoading ||
    (sensorId === ALL_SENSORS_OPTION.value
      ? isAllPerformanceLoading
      : isPerformanceLoading);

  const sensorOptions = useMemo(() => {
    const individualSensorOptions =
      telescopesData?.payload?.map(({ id, name }: ITelescope) => ({
        label: name,
        value: id,
      })) || [];

    return [ALL_SENSORS_OPTION, ...individualSensorOptions];
  }, [telescopesData]);
  const data = useMemo(
    () =>
      sensorId === ALL_SENSORS_OPTION.value
        ? allSensorsHistoryPerformance
        : selectedSensorHistoryPerformance,
    [sensorId, selectedSensorHistoryPerformance, allSensorsHistoryPerformance]
  );

  if (isLoading) return chartSkeleton;

  return (
    <div className="grid gap-y-3 mt-5">
      <Typography variant="overline-md" className="text-foreground">
        Observation Performance
      </Typography>
      <div className="flex gap-x-3 items-center">
        <Typography className="text-foreground">Sensor:</Typography>
        <Select
          size="xs"
          placeholder="Select a sensor"
          disabled={isLoading}
          options={sensorOptions}
          value={sensorId}
          onValueChange={setSensorId}
          fluid
          className="w-[120px]"
        />
      </div>

      <SensorObservationPerformanceChart
        data={data}
        isAllSensorsData={sensorId === ALL_SENSORS_OPTION.value}
        visibleTabs={[SensorPerformanceTab.Sessions]}
      />
    </div>
  );
};

export default ObservationPerformanceSection;
