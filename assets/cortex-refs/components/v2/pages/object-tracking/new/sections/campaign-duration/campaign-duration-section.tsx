import { BaseTabs } from '@/components/tab-panel/base-tabs';
import { FormSection } from '@/components/v2/pages/object-tracking/common/form/form-section';
import { ITabItem } from 'models/interfaces/v2/tab-panel/IBaseTabs';
import { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { ObjectTrackingObservationMode } from '../../../enums';
import { NewObjectTrackingFormData } from '../../types';
import DateAndTimeField from './tabs/date-and-time-field';
import DurationInDaysField from './tabs/duration-in-days-field';

const TAB_KEY = 'campaign-duration-tab';
const DATE_TIME_TAB_LABEL = 'Date & Time';

const SHORT_TIME_OBSERVATION_MODES = [ObjectTrackingObservationMode.Stare];

const CAMPAIGN_DURATION_TABS: ITabItem[] = [
  {
    label: 'Days',
    content: <DurationInDaysField />,
  },
  {
    label: DATE_TIME_TAB_LABEL,
    content: <DateAndTimeField />,
  },
];

const CampaignDurationSection = () => {
  const { control } = useFormContext<NewObjectTrackingFormData>();
  const [observationMode, isSearchMode] = useWatch({
    control,
    name: ['observationMode', 'isSearchMode'],
  });

  const isShortTimeMode =
    isSearchMode || SHORT_TIME_OBSERVATION_MODES.includes(observationMode);
  const tabKey = `${TAB_KEY}-${isShortTimeMode ? 'short' : 'normal'}`;
  const tabs = useMemo(() => {
    return isShortTimeMode
      ? CAMPAIGN_DURATION_TABS.filter(
          (tab) => tab.label === DATE_TIME_TAB_LABEL
        )
      : CAMPAIGN_DURATION_TABS;
  }, [isShortTimeMode]);

  return (
    <FormSection title="Duration">
      <BaseTabs key={tabKey} tabs={tabs} tabKey={TAB_KEY} />
    </FormSection>
  );
};

export default CampaignDurationSection;
