'use client';

import { InfoBlock } from '@/components/v2/info-block';
import SettingsTabLayout, {
  SettingsTabSection,
} from '@/components/v2/layouts/settings-tab-layout';
import AllSensorsSection from '../sections/sensors/all-sensors';

const sectionWidth = 'max-w-[600px]';

const sensorsSections: SettingsTabSection[] = [
  {
    id: 'new',
    label: 'New Sensor',
    content: (
      <InfoBlock
        title="Sensors"
        description="Sensors are associated with networks and can be..."
      />
    ),
  },
  {
    id: 'all',
    label: 'All Sensors',
    showSeparator: false,
    content: <AllSensorsSection />,
  },
];

const SensorsSection = () => (
  <SettingsTabLayout separatorWidth={sectionWidth} sections={sensorsSections} />
);

export default SensorsSection;
