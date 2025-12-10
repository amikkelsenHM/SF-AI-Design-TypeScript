'use client';

import { useTelescopes } from 'hooks/queries/telescopeQuery';
import { useEventSimulator } from 'hooks/useEventSimulator';
import { ITelescope } from 'models/interfaces/v2/telescope';
import { useRouter } from 'next/navigation';
import { NotificationBanner } from '../notification-banner/notification-banner';
import { SensorTableView } from '../pages/sensors/enums';
import { handleUpdateTelescopeStatus } from '../pages/sensors/utils';
import { ColumnDef, Row, SFDataTable } from '../table-new';
import {
  SENSORS_V2_INITIAL_STATE,
  sensorsV2DetailedColumns,
  sensorsV2SummaryColumns,
} from '../table/columns';

interface SensorsTableProps {
  isLoading?: boolean;
  view?: SensorTableView;
  features?: {
    filtering?: boolean;
    globalFilter?: boolean;
    sorting?: boolean;
    pagination?: boolean;
  };
}

const COLUMNS: Record<SensorTableView, ColumnDef<ITelescope, unknown>[]> = {
  [SensorTableView.Summary]: sensorsV2SummaryColumns,
  [SensorTableView.Detailed]: sensorsV2DetailedColumns,
};

const SensorsTable = ({
  isLoading = false,
  view = SensorTableView.Detailed,
  features,
}: SensorsTableProps) => {
  const { filtering, globalFilter, sorting, pagination } = features || {};

  const columns = COLUMNS[view];

  const router = useRouter();
  const { data: telescopesData } = useTelescopes();

  const telescopes = telescopesData?.payload || [];

  const handleRowClick = ({ original: sensor }: Row<ITelescope>) => {
    const url = `/sensors/${encodeURIComponent(sensor.name)}`;
    if (url) router.push(url);
  };

  const sensorId = telescopes[0]?.id;
  const {
    alertState: { description, variant },
    handleClose: handleCloseBanner,
  } = useEventSimulator(sensorId, handleUpdateTelescopeStatus);

  return (
    <>
      <NotificationBanner
        variant={variant}
        text={description}
        isOpen={!!variant}
        onClose={handleCloseBanner}
      />
      <SFDataTable
        tableKey="sensors"
        showRowCursor
        isLoading={isLoading}
        columns={columns}
        enableFiltering={filtering}
        enableGlobalFilter={globalFilter}
        enableSorting={sorting}
        enablePagination={pagination}
        data={telescopes}
        initialState={SENSORS_V2_INITIAL_STATE}
        onRowClick={handleRowClick}
      />
    </>
  );
};

export default SensorsTable;
