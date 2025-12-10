'use client';

import MapContainer from '@/components/v2/map-chart/map-container';
import { isTleRecent } from '@/utils/v2/tle-utils';
import { useCallback, useMemo } from 'react';
import KpiCard from '../../../kpi-card/kpi-card';
import { SFDataTable } from '../../../table-new';
import { objectDetailsColumns } from '../columns/object-tracking-detail-columns';
import { TABLE_CONFIGS } from '../constants/object-tracking-detail';
import { ObjectDetailItem } from '../mock-data/object-tracking-detail-mock-data';
import { CampaignTarget, KpiItem } from '../types';
import { getObjectDetailsData } from '../utils';

export enum LayoutVariant {
  WithMap = 'withMap',
  WithoutMap = 'withoutMap',
}

interface ObjectTrackingSummaryProps {
  target?: CampaignTarget;
  timeElapsed?: string;
  orbitalRegime?: string;
  leftKpiData: KpiItem[];
  rightKpiData: KpiItem[];
}

const ObjectTrackingSummary = ({
  target,
  timeElapsed,
  leftKpiData,
  rightKpiData,
}: ObjectTrackingSummaryProps) => {
  const { noradId, objectName, type, country, launchDate, tle, orbitalRegime } =
    target || {};

  const objectDetailsData = useMemo(
    () =>
      getObjectDetailsData(
        noradId,
        objectName,
        type,
        country || undefined,
        orbitalRegime || undefined,
        launchDate,
        timeElapsed
      ),
    [noradId, objectName, type, country, orbitalRegime, launchDate, timeElapsed]
  );

  const showMapCard = useMemo<boolean>(() => !!tle && isTleRecent(tle), [tle]);
  const variant: LayoutVariant = showMapCard
    ? LayoutVariant.WithMap
    : LayoutVariant.WithoutMap;

  const renderKpiCards = useCallback((kpiData: KpiItem[]) => {
    return kpiData.map(({ title, content, footnote, isLoading }) => (
      <KpiCard
        key={title}
        title={title}
        content={content}
        footnote={footnote}
        cardClassName="w-full h-full"
        isLoading={isLoading}
      />
    ));
  }, []);

  const Table = useMemo(
    () => (
      <SFDataTable
        columns={objectDetailsColumns}
        data={objectDetailsData as ObjectDetailItem[]}
        {...TABLE_CONFIGS.OBJECT_DETAIL}
      />
    ),
    [objectDetailsData]
  );

  const KPIBlock = useMemo(
    () => (
      <section className="flex flex-col gap-5">
        {variant === LayoutVariant.WithMap ? (
          <div className="flex gap-5 flex-nowrap overflow-x-auto">
            {renderKpiCards(leftKpiData)}
            {renderKpiCards(rightKpiData)}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5">
            {renderKpiCards(leftKpiData)}
            {renderKpiCards(rightKpiData)}
          </div>
        )}
      </section>
    ),
    [leftKpiData, rightKpiData, renderKpiCards, variant]
  );

  const MapCard = useMemo(
    () =>
      variant === LayoutVariant.WithMap ? (
        <KpiCard
          title="Current Location (from public catalogue)"
          content={<MapContainer object={target} height={400} />}
          cardClassName="w-full h-fit"
          contentAreaClassName="p-0"
        />
      ) : null,
    [variant, target]
  );

  return (
    <div className="grid gap-5 grid-cols-2">
      <div className="flex flex-col gap-5">
        {KPIBlock}
        {variant === LayoutVariant.WithMap && Table}
      </div>

      <div className="flex flex-col gap-5">
        {variant === LayoutVariant.WithMap ? MapCard : Table}
      </div>
    </div>
  );
};

export default ObjectTrackingSummary;
