'use client';

import SettingsTabLayout, {
  SettingsTabSection,
} from '@/components/v2/layouts/settings-tab-layout';
import { useFeatureFlag } from '@/hooks/useFeatureFlag';
import { ClientFeatureFlags } from 'lib/config/feature-flag-config';
import { useMemo } from 'react';
import { SETTINGS_TAB_LAYOUT_MAX_WIDTH } from 'static/v2/general-constants';
import ApiKeySection from '../sections/profile/api-key-section';
import OrganisationsSection from '../sections/profile/organisations-section';
import PersonalDetailsSection from '../sections/profile/personal-details-section';
import PreferencesSection from '../sections/profile/preferences-section';
import UsageSection from '../sections/profile/subscription-section';

const profileSections: SettingsTabSection[] = [
  {
    id: 'details',
    label: 'Details',
    content: <PersonalDetailsSection />,
  },
  {
    id: 'organisations',
    label: 'Organisations',
    content: <OrganisationsSection />,
  },
  {
    id: 'api-keys',
    label: 'API Key',
    content: <ApiKeySection />,
  },
  {
    id: 'preferences',
    label: 'Preferences',
    content: <PreferencesSection />,
  },
];

const ProfileSection = () => {
  const isPackageTaskEnabled = useFeatureFlag(
    ClientFeatureFlags.PACKAGE_TASK,
    true
  );

  const sections = useMemo(
    () =>
      isPackageTaskEnabled
        ? [
            ...profileSections,
            {
              id: 'usage',
              label: 'Usage',
              content: <UsageSection />,
            },
          ]
        : profileSections,
    [isPackageTaskEnabled]
  );

  return (
    <SettingsTabLayout
      sections={sections}
      maxWidth={SETTINGS_TAB_LAYOUT_MAX_WIDTH}
    />
  );
};

export default ProfileSection;
