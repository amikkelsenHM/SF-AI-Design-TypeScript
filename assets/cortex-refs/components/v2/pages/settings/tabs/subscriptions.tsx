'use client';

import { InfoBlock } from '@/components/v2/info-block';
import SettingsTabLayout, {
  SettingsTabSection,
} from '@/components/v2/layouts/settings-tab-layout';
import AllSubscriptionsSection from '../sections/subscriptions';

const subscriptionSections: SettingsTabSection[] = [
  {
    id: 'new',
    label: 'New Package',
    content: (
      <InfoBlock
        title="Packages"
        description="Manage packages for all organisations and members"
        buttonLabel="Create a Package"
        link="/settings/package"
        showSeparator
      />
    ),
    showSeparator: false,
  },
  {
    id: 'all',
    label: 'All Packages',
    content: <AllSubscriptionsSection />,
  },
];

const SubscriptionSection = () => (
  <SettingsTabLayout sections={subscriptionSections} />
);

export default SubscriptionSection;
