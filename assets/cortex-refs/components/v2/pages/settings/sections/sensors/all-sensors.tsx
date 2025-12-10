import {
  profileSensors,
  ProfileSensorsColumnIds,
} from '@/components/v2/table/columns/account-settings/profile-sensors';
import { useMyNetworks } from 'hooks/queries/networksQuery';
import { useTelescopes } from 'hooks/queries/telescopeQuery';
import { ITelescope } from 'models/interfaces/v2/telescope';
import { useMemo } from 'react';
import TableSection from '../table-section';

const AllSensorsSection = () => {
  const { data } = useTelescopes();
  const tableData = (data?.payload || []).map((entry: ITelescope) => ({
    name: entry.name,
    location: entry.observatory.name,
    country: entry.observatory.country,
    network: entry.network.name,
    type: 'N/A',
  }));

  const { data: networks } = useMyNetworks();

  const columns = useMemo(
    () =>
      profileSensors.map((colDef) => {
        if (colDef.id !== ProfileSensorsColumnIds.NETWORK) return colDef;

        const networkOptions =
          networks?.map(({ name }) => ({
            label: name,
            value: name,
          })) || [];

        return {
          ...colDef,
          meta: {
            filterType: 'select' as const,
            filterOptions: networkOptions,
          },
        };
      }),
    [networks]
  );

  return (
    <TableSection
      title="All Sensors"
      columns={columns}
      data={tableData}
      features={{
        tableKey: 'allSensors',
        filtering: true,
        sorting: true,
        pagination: true,
        globalFilter: true,
      }}
    />
  );
};

export default AllSensorsSection;
