'use client';

import { allSubscriptionsColumns } from '@/components/v2/table/columns/account-settings/all-subsriptions';
import { useGetAllSubscriptions } from '@/hooks/queries/subscriptionQuery';
import TableSection from '../table-section';

const AllSubscriptionsSection = () => {
  const { data } = useGetAllSubscriptions();
  const tableData = data?.payload ?? [];

  return (
    <TableSection
      title="All Packages"
      columns={allSubscriptionsColumns}
      data={tableData}
      features={{
        tableKey: 'allSubscriptions',
        sorting: true,
        filtering: true,
        pagination: true,
        globalFilter: true,
        sortState: [{ id: 'name', desc: false }],
      }}
    />
  );
};

export default AllSubscriptionsSection;
