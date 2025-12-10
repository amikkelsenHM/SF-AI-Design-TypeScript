'use client';

import { InfoBlock } from '@/components/v2/info-block';
import SettingsTabLayout, {
  SettingsTabSection,
} from '@/components/v2/layouts/settings-tab-layout';
import { SETTINGS_TAB_LAYOUT_MAX_WIDTH } from 'static/v2/general-constants';
import AdminsSection from '../sections/platform/admins-section';
import NetworksSection from '../sections/platform/networks-section';

const platformSections: SettingsTabSection[] = [
  {
    id: 'details',
    label: 'Details',
    content: (
      <InfoBlock
        title="Plaform Details"
        description="You are using the Spaceflux platform"
      />
    ),
  },
  {
    id: 'admins',
    label: 'Admins',
    content: <AdminsSection />,
  },
  {
    id: 'networks',
    label: 'Networks',
    showSeparator: false,
    content: <NetworksSection />,
  },
];

const PlatformSection = () => (
  <SettingsTabLayout
    separatorWidth={SETTINGS_TAB_LAYOUT_MAX_WIDTH}
    sections={platformSections}
  />
);

export default PlatformSection;
