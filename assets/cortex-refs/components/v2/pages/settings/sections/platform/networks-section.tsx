import { platformNetworkColumns } from '@/components/v2/table/columns/account-settings/platfrom-networks';
import { useMyNetworks } from 'hooks/queries/networksQuery';
import { INetwork } from 'models/interfaces/v2/network';
import TableSection from '../table-section';

const NetworksSection = () => {
  const { data } = useMyNetworks();
  const tableData = (data || []).map((entry: INetwork) => ({
    name: entry.name,
    sensors: entry.telescopes!.length,
  }));

  return (
    <div className="max-w-fit">
      <TableSection
        title="Networks"
        data={tableData}
        columns={platformNetworkColumns}
        linkTo="/settings?tab=networks"
        eventText="Manage Network"
        buttonClassName="flex ml-auto"
      />
    </div>
  );
};

export default NetworksSection;
