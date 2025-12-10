'use client';

import { SpacefluxRole } from 'models/enums/v2/roles';
import { usePermission } from 'providers/permission-provider';
import { useMemo } from 'react';
import { SETTINGS_TAB_LAYOUT_MAX_WIDTH } from 'static/v2/general-constants';
import SettingsTabLayout, {
  SettingsTabSection,
} from '../../layouts/settings-tab-layout';
import { DeleteAccountSection } from './sections/delete-account';
import { PersonalDetails } from './sections/personal-details';
import { RoleSection } from './sections/role-section';
import { StatusSection } from './sections/status-section';
import UserPreferencesSection from './sections/user-preferences-section';

const editUserSections: SettingsTabSection[] = [
  {
    id: 'details',
    label: 'Details',
    content: <PersonalDetails />,
  },
  {
    id: 'status',
    label: 'Status',
    content: <StatusSection />,
    visibleWhen: (has) => has({ globalRole: [SpacefluxRole.Admin] }),
  },
  {
    id: 'role',
    label: 'Role',
    content: <RoleSection />,
  },
  {
    id: 'delete-account',
    label: 'Delete Account',
    content: <DeleteAccountSection />,
    visibleWhen: (has) => has({ globalRole: [SpacefluxRole.Admin] }),
  },
  {
    id: 'preferences',
    label: 'Preferences',
    content: <UserPreferencesSection />,
  },
];

const EditUserPage = () => {
  const { has } = usePermission();

  const sections = useMemo(
    () =>
      editUserSections.filter((s) =>
        s.visibleWhen ? s.visibleWhen(has) : true
      ),
    [has]
  );

  return (
    <SettingsTabLayout
      sections={sections}
      maxWidth={SETTINGS_TAB_LAYOUT_MAX_WIDTH}
    />
  );
};

export default EditUserPage;
