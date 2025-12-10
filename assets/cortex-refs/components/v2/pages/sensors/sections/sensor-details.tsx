'use client';

import SectionTitle from '@/components/v2/section-title/section-title';
import { SFDataTable } from '@/components/v2/table-new';
import {
  sensorEventColumns,
  sensorsDetailsV2Columns,
} from '@/components/v2/table/columns';
import SfTooltip from '@/components/v2/tooltip/sf-tooltip';
import { useGetTelescopeEvents } from '@/hooks/queries/telescopeQuery';
import { useFeatureFlag } from '@/hooks/useFeatureFlag';
import { TableState } from '@tanstack/react-table';
import { ClientFeatureFlags } from 'lib/config/feature-flag-config';
import { ITelescope } from 'models/interfaces/v2/telescope';
import { useMemo } from 'react';
import { createSensorDetails } from 'utils/v2/sensors/createSensorDetails';

const SENSOR_EVENTS_INITIAL_STATE: Partial<TableState> = {
  pagination: { pageIndex: 0, pageSize: 5 },
};

interface SensorDetailsSectionProps {
  sensor?: ITelescope;
}

const SensorDetailsSection = ({ sensor }: SensorDetailsSectionProps) => {
  const details = useMemo(() => createSensorDetails(sensor!), [sensor]);
  const sensorName = useMemo(() => sensor?.name || 'N/A', [sensor?.name]);
  const { data } = useGetTelescopeEvents(sensor?.id!);
  const isFeatureEnabled = useFeatureFlag(
    ClientFeatureFlags.OUT_OF_SCOPE_COMPONENT
  );

  return (
    <section className="grid grid-cols-2 gap-5">
      <div>
        <SectionTitle text="SENSOR DETAILS" />

        <SFDataTable
          columns={sensorsDetailsV2Columns(sensorName)}
          data={details}
          hasRowBorder
        />
      </div>

      {isFeatureEnabled && (
        <div>
          <SectionTitle
            text="SENSOR EVENTS"
            tooltip={
              <SfTooltip
                header="Sensor Events"
                text="Dome closure events will be shown here"
                triggerAriaLabel="Sensor events info"
              ></SfTooltip>
            }
          />

          <SFDataTable
            tableKey="events"
            columns={sensorEventColumns}
            data={data}
            tableHeaderName={`Sensor: ${sensorName}`}
            cellHeaderClassName="bg-background"
            hasRowBorder
            initialState={SENSOR_EVENTS_INITIAL_STATE}
            enablePagination
          />
        </div>
      )}
    </section>
  );
};

export default SensorDetailsSection;
