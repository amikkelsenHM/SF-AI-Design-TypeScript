'use client';

import { InfoBlock } from '@/components/v2/info-block';
import SettingsTabLayout, {
  SettingsTabSection,
} from '@/components/v2/layouts/settings-tab-layout';
import { ClientFeatureFlags } from 'lib/config/feature-flag-config';
import { SETTINGS_TAB_LAYOUT_MAX_WIDTH } from 'static/v2/general-constants';
import AllNetworksSection from '../sections/networks/all-networks-section';

const networkSections: SettingsTabSection[] = [
  {
    id: 'new',
    label: 'New Network',
    content: (
      <InfoBlock
        title="Networks"
        description="Networks are a group of sensors which can be assigned to one to many organisations"
        buttonLabel="Create a Network"
        link="/settings/networks"
        featureFlagKey={ClientFeatureFlags.OUT_OF_SCOPE_COMPONENT}
      />
    ),
  },
  {
    id: 'all',
    label: 'All Networks',
    showSeparator: false,
    content: <AllNetworksSection />,
  },
];

const NetworkSection = () => (
  <SettingsTabLayout
    sections={networkSections}
    maxWidth={SETTINGS_TAB_LAYOUT_MAX_WIDTH}
  />
);

export default NetworkSection;
