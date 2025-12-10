import { allNetworkColumns } from '@/components/v2/table/columns/account-settings/all-networks';
import { useMyNetworks } from 'hooks/queries/networksQuery';
import { INetwork } from 'models/interfaces/v2/network';
import TableSection from '../table-section';

const AllNetworksSection = () => {
  const { data } = useMyNetworks();
  const tableData = (data || []).map(({ name, telescopes }: INetwork) => ({
    name,
    sensors: telescopes!.length,
  }));
  return (
    <div className="max-w-fit">
      <TableSection
        title="All Networks"
        data={tableData}
        columns={allNetworkColumns}
      />
    </div>
  );
};

export default AllNetworksSection;
