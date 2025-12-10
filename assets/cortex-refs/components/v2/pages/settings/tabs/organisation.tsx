'use client';

import { InfoBlock } from '@/components/v2/info-block';
import SettingsTabLayout, {
  SettingsTabSection,
} from '@/components/v2/layouts/settings-tab-layout';
import AllOrganisationsSection from '../sections/organisations/all-oraganisations';

const organisationSections: SettingsTabSection[] = [
  {
    id: 'new',
    label: 'New Organisation',
    content: (
      <InfoBlock
        title="ORGANISATIONS"
        description="Manage organisations and their users. View user accounts, monitor access and maintain organisation settings."
        buttonLabel="Create an Organisation"
        link="/settings/organisation"
        showSeparator
      />
    ),
    showSeparator: false,
  },
  {
    id: 'all',
    label: 'All Organisations',
    content: <AllOrganisationsSection />,
  },
];

const OrganisationSection = () => (
  <SettingsTabLayout sections={organisationSections} />
);

export default OrganisationSection;
