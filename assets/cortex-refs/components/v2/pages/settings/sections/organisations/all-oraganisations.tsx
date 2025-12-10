import {
  allOrganisations,
  Organisation,
} from '@/components/v2/table/columns/account-settings/all-organisations';
import { Row } from '@tanstack/react-table';
import { useGetAllOrganisations } from 'hooks/queries/accountQuery';
import { IOrganisation } from 'models/interfaces/v2/organisations';
import { useRouter } from 'next/navigation';
import TableSection from '../table-section';

const AllOrganisationsSection = () => {
  const router = useRouter();
  const { data } = useGetAllOrganisations();
  const tableData = (data || []).map((entry: IOrganisation) => ({
    id: entry.id,
    name: entry.name,
    members: entry.userCount,
    networks: entry.networks.map((net) => net.name),
  }));

  const handleRowClick = (row: Row<Organisation>) => {
    const organisationId = row.original.id;
    router.push(`/settings/organisation/${organisationId}`);
  };

  return (
    <TableSection
      title="All Organisations"
      columns={allOrganisations}
      data={tableData}
      onRowClick={handleRowClick}
      showRowCursor
      features={{
        tableKey: 'allOrganisations',
        filtering: true,
        sorting: true,
        pagination: true,
        globalFilter: true,
        enableSortingRemoval: false,
      }}
    />
  );
};

export default AllOrganisationsSection;
