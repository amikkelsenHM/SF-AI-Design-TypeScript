'use client';

import { Skeleton } from '@/components/components/ui/skeleton';
import KpiCard from '@/components/v2/kpi-card/kpi-card';
import KpiGrid from '@/components/v2/kpi-card/kpi-grid';
import SectionTitle from '@/components/v2/section-title/section-title';
import { SFDataTable } from '@/components/v2/table-new';
import { weatherV2Columns } from '@/components/v2/table/columns';
import { computeAdjustedStatus } from '@/utils/v2/sensors/compute-adjusted-status';
import { useTelescopeConditions } from 'hooks/queries/telescopeQuery';
import {
  AdjustedWeatherMetrics,
  WeatherStatus,
} from 'models/interfaces/v2/metrics';
import dynamic from 'next/dynamic';
import { useMemo, useRef } from 'react';
import { generateSkeletonKpiCards } from 'utils/v2/kpi-cards/skeleton-cards';
import { createTelescopeKpiCards } from 'utils/v2/kpi-cards/telescope-kpi';
import { createWeatherRows } from 'utils/v2/weather';

interface SensorConditionsSectionProps {
  sensorId?: string;
  sensorCoordinates?: { lat: number; lng: number };
  isLoading?: boolean;
}

const SensorConditionsSection = ({
  sensorId,
  sensorCoordinates,
  isLoading = false,
}: SensorConditionsSectionProps) => {
  const previousStatusRef = useRef<Record<string, WeatherStatus>>({});
  const { data } = useTelescopeConditions(sensorId!);
  const { payload } = data || {};

  const weatherRows: AdjustedWeatherMetrics[] = useMemo(() => {
    const rows = createWeatherRows(payload?.weather);

    return rows.map(({ metric, statusNow, statusNext, ...rest }) => {
      const adjustedStatusNow = computeAdjustedStatus(
        metric,
        statusNow ?? WeatherStatus.Unknown,
        previousStatusRef.current
      );

      const adjustedStatusNext = computeAdjustedStatus(
        metric,
        statusNext ?? WeatherStatus.Unknown,
        previousStatusRef.current
      );

      return {
        metric,
        statusNow,
        statusNext,
        ...rest,
        adjustedStatusNow,
        adjustedStatusNext,
      };
    });
  }, [payload]);

  const kpiCards = useMemo(
    () =>
      isLoading
        ? generateSkeletonKpiCards(2)
        : createTelescopeKpiCards(payload?.latestMetrics),
    [payload, isLoading]
  );

  const SensorWeatherMap = useMemo(
    () =>
      dynamic(() => import('./sensor-weather-map'), {
        loading: () => <Skeleton className="w-full h-full rounded-t-none" />,
        ssr: false,
      }),
    []
  );

  return (
    <section className="mb-5">
      <SectionTitle text="ENVIRONMENT CONDITIONS" />
      <div className="flex gap-5 flex-col md:flex-row">
        {!isLoading && kpiCards.length > 0 && (
          <div className="md:w-min lg:flex-1/2">
            <KpiGrid gap="5">
              {kpiCards.map(
                ({ show, title, value, component }, index) =>
                  show && (
                    <KpiCard
                      key={`kpi-card-${index}`}
                      title={title}
                      content={value}
                      footnote={component}
                    />
                  )
              )}
            </KpiGrid>
          </div>
        )}

        <div className="grow lg:flex-1/2">
          <div className="grid grid-cols-2 gap-5">
            <SFDataTable
              columns={weatherV2Columns}
              data={weatherRows}
              tableHeaderName="Weather Forecast"
              cellHeaderClassName="bg-background"
              containerClassName="rounded-t-base"
              hasRowBorder
            />

            <div>
              <div className="flex items-center h-9 bg-foreground-contrast typography-body-sm text-foreground py-1.5 px-3 rounded-t-base">
                Weather Map
              </div>
              <div className="relative w-auto h-[calc(100%_-_2rem)] rounded-b-lg overflow-hidden">
                <SensorWeatherMap sensorCoordinates={sensorCoordinates} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SensorConditionsSection;
