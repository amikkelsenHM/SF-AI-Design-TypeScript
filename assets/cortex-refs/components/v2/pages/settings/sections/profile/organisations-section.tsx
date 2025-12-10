'use client';

import { organisationColumns } from '@/components/v2/table/columns/account-settings/organisation';
import { useMembershipsMy } from 'hooks/queries/accountQuery';
import { IMembership } from 'models/interfaces/IMembership';
import TableSection from '../table-section';

const OrganisationsSection = () => {
  const { data } = useMembershipsMy();

  const tableData = (data || []).map((entry: IMembership) => ({
    name: entry.organization.name,
    role: entry.role.name,
  }));

  return (
    <TableSection
      title="Organisations"
      data={tableData}
      columns={organisationColumns(data)}
      titleClasses="mb-7"
    />
  );
};

export default OrganisationsSection;
