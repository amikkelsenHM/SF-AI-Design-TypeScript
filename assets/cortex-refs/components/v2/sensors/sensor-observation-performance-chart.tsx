'use client';

import BaseTabs from '@/components/tab-panel/base-tabs';
import {
  PercentageNightTimeChartConfig,
  PercentageOperatingTimeChartConfig,
  SessionChartConfig,
} from '@/components/v2/charts/configs/chart-configs';
import GenericChart from '@/components/v2/charts/generic-chart';
import { ITabItem } from 'models/interfaces/v2/tab-panel/IBaseTabs';
import {
  ITelescopeHistoryPerformance,
  SensorPerformanceTab,
} from 'models/interfaces/v2/telescope';
import { memo, useMemo } from 'react';
import {
  processObservableNightOperatingPercentage,
  processTelescopeDataByDaysInHours,
  processTelescopeDataByHours,
} from 'utils/v2/chart-data-parsers';
import { getProcessedSensorMetrics } from 'utils/v2/sensor-chart-helpers';
import { SENSOR_CHART_TOOLTIPS } from 'utils/v2/tooltips/tooltip-config';

interface SensorObservationPerformanceChartProps {
  data: ITelescopeHistoryPerformance | undefined;
  isAllSensorsData?: boolean;
  visibleTabs?: SensorPerformanceTab[];
}

const SensorObservationPerformanceChart = ({
  data,
  isAllSensorsData = false,
  visibleTabs = [
    SensorPerformanceTab.Sessions,
    SensorPerformanceTab.NightTime,
    SensorPerformanceTab.OperatingTime,
  ],
}: SensorObservationPerformanceChartProps) => {
  const chartData = useMemo(() => {
    if (!data?.payload?.metrics) return null;

    const metrics = data.payload.metrics;
    const { sessionsMetric, processedAvailableNight, processedOperatingTime } =
      getProcessedSensorMetrics(metrics, isAllSensorsData);

    return {
      sessions: processTelescopeDataByHours(sessionsMetric),
      nightTime: processTelescopeDataByDaysInHours(processedAvailableNight),
      operatingTime: processObservableNightOperatingPercentage(
        processedAvailableNight,
        processedOperatingTime
      ),
    };
  }, [data, isAllSensorsData]);

  const tabs: ITabItem[] = useMemo(() => {
    const allTabs = {
      [SensorPerformanceTab.Sessions]: {
        id: SensorPerformanceTab.Sessions,
        label: 'Sessions',
        content: (
          <GenericChart
            key="sessions-chart"
            config={SessionChartConfig}
            data={chartData?.sessions || []}
          />
        ),
        tooltip: SENSOR_CHART_TOOLTIPS.Sessions,
      },
      [SensorPerformanceTab.NightTime]: {
        id: SensorPerformanceTab.NightTime,
        label: 'Hours of Night Time',
        content: (
          <GenericChart
            key="night-time-chart"
            config={PercentageNightTimeChartConfig}
            data={chartData?.nightTime || []}
          />
        ),
        tooltip: SENSOR_CHART_TOOLTIPS.NightTime,
      },
      [SensorPerformanceTab.OperatingTime]: {
        id: SensorPerformanceTab.OperatingTime,
        label: '% of Operating Time',
        content: (
          <GenericChart
            key="operating-time-chart"
            config={PercentageOperatingTimeChartConfig}
            data={chartData?.operatingTime || []}
          />
        ),
        tooltip: SENSOR_CHART_TOOLTIPS.OperatingTime,
      },
    };

    return visibleTabs.map((tab) => allTabs[tab]);
  }, [chartData, visibleTabs]);

  return <BaseTabs tabs={tabs} />;
};

export default memo(SensorObservationPerformanceChart);
