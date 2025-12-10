import { allUsersColumns } from '@/components/v2/table/columns/account-settings/all-users';
import { useGetAllUsers } from 'hooks/queries/accountQuery';
import TableSection from '../table-section';

const AllUsersSection = () => {
  const { data } = useGetAllUsers();

  return (
    <div>
      <TableSection
        title="All Users"
        columns={allUsersColumns}
        data={data || []}
        features={{
          tableKey: 'allUsers',
          sorting: true,
          filtering: true,
          pagination: true,
          globalFilter: true,
          enableSortingRemoval: false,
        }}
      />
    </div>
  );
};

export default AllUsersSection;
