'use client';

import BaseTabs from '@/components/tab-panel/base-tabs';
import Header from '@/components/v2/header';
import { OrganizationRole, SpacefluxRole } from 'models/enums/v2/roles';
import { ITabItem } from 'models/interfaces/v2/tab-panel/IBaseTabs';
import { usePermission } from 'providers/permission-provider';
import { useMemo, useState } from 'react';
import OrganisationSection from './tabs/organisation';
import ProfileSection from './tabs/profile';
import SubscriptionSection from './tabs/subscriptions';
import UsersSection from './tabs/users';

const tabs: ITabItem[] = [
  {
    label: 'Profile',
    content: <ProfileSection />,
  },
  // TODO: OUT_OF_SCOPE
  // {
  //   label: 'Platform',
  //   content: <PlatformSection />,
  // },
  // {
  //   label: 'Networks',
  //   content: <NetworkSection />,
  // },
  // {
  //   label: 'Sensors',
  //   content: <SensorsSection />,
  // },
  {
    label: 'Organisations',
    content: <OrganisationSection />,
    visibleWhen: (has) => has({ globalRole: [SpacefluxRole.Admin] }),
  },
  {
    label: 'Users',
    content: <UsersSection />,
    visibleWhen: (has) =>
      has({ globalRole: [SpacefluxRole.Admin] }) ||
      has({ orgRoles: [OrganizationRole.Manager] }),
  },
  {
    label: 'Packages',
    content: <SubscriptionSection />,
    visibleWhen: (has) => has({ globalRole: [SpacefluxRole.Admin] }),
  },
];

const SettingsHome = () => {
  const { has } = usePermission();
  const [activeTitle, setActiveTitle] = useState(tabs[0].label);

  const visibleTabs = useMemo(
    () => tabs.filter((t) => (t.visibleWhen ? t.visibleWhen(has) : true)),
    [has]
  );

  return (
    <>
      <Header
        title={activeTitle}
        description="Manage your personal settings, organisation and API access."
        standardActions={{ logout: true }}
      />
      <section>
        <BaseTabs
          tabs={visibleTabs}
          onTabChange={(index) => {
            setActiveTitle(visibleTabs[index].label);
          }}
        />
      </section>
    </>
  );
};

export default SettingsHome;
