'use client';

import { organisationColumns } from '@/components/v2/table/columns/account-settings/organisation';
import { useUserMemberships } from 'hooks/queries/accountQuery';
import { IMembership } from 'models/interfaces/IMembership';
import { useParams } from 'next/navigation';
import TableSection from '../../settings/sections/table-section';

export const RoleSection = () => {
  const { id } = useParams() as { id: string };
  const { data } = useUserMemberships(id);

  const tableData = (data || []).map(({ organization, role }: IMembership) => ({
    id: organization.id,
    name: organization.name,
    role: role.name,
  }));
  return (
    <TableSection
      title="Role"
      data={tableData}
      columns={organisationColumns(data, false, id)}
      titleClasses="mb-7"
    />
  );
};
