'use client';

import { InfoBlock } from '@/components/v2/info-block';
import SettingsTabLayout, {
  SettingsTabSection,
} from '@/components/v2/layouts/settings-tab-layout';
import { OrganizationRole } from 'models/enums/OrganizationRole';
import { SpacefluxRole } from 'models/enums/v2/roles';
import { usePermission } from 'providers/permission-provider';
import { useMemo } from 'react';
import { PendingUsersSection } from '../sections/invite-users/pending-users';
import AllUsersSection from '../sections/users/all-users-section';

const usersSections: SettingsTabSection[] = [
  {
    id: 'invite',
    label: 'Invite Users',
    content: (
      <InfoBlock
        title="Invite Users"
        description="Invite users to setup a password and login into the platform via their organisation"
        buttonLabel="Invite Users"
        link="/settings/invite"
        showSeparator
      />
    ),
    showSeparator: false,
    visibleWhen: (has) =>
      has({ globalRole: [SpacefluxRole.Admin] }) ||
      has({ orgRoles: [OrganizationRole.Manager] }),
  },
  {
    id: 'pending',
    label: 'Pending Users',
    content: <PendingUsersSection />,
    visibleWhen: (has) =>
      has({ globalRole: [SpacefluxRole.Admin] }) ||
      has({ orgRoles: [OrganizationRole.Manager] }),
  },
  {
    id: 'all',
    label: 'All Users',
    content: <AllUsersSection />,
  },
];

const UsersSection = () => {
  const { has } = usePermission();

  const sections = useMemo(
    () =>
      usersSections.filter((s) => (s.visibleWhen ? s.visibleWhen(has) : true)),

    [has]
  );
  return <SettingsTabLayout sections={sections} />;
};

export default UsersSection;
