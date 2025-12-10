import { platformAdminColumns } from '@/components/v2/table/columns/account-settings/platform-admin';
import { useGetAllAdmins } from 'hooks/queries/accountQuery';
import { IUserData } from 'models/interfaces/v2/auth';
import TableSection from '../table-section';

const AdminsSection = () => {
  const { data } = useGetAllAdmins();
  const tableData = (data || [])?.map(
    ({ firstName: name, lastName: surname, email }: IUserData) => ({
      name,
      surname,
      email,
    })
  );
  return (
    <div className="max-w-fit">
      <TableSection
        title="Platform Admins"
        data={tableData}
        columns={platformAdminColumns}
        linkTo="/settings?tab=users"
        eventText="Manage Users"
        buttonClassName="flex ml-auto"
      />
    </div>
  );
};

export default AdminsSection;
