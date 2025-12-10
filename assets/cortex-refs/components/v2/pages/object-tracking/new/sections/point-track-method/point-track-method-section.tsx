import { BaseTabs } from '@/components/tab-panel/base-tabs';
import { FormSection } from '@/components/v2/pages/object-tracking/common/form/form-section';
import { ITabItem } from 'models/interfaces/v2/tab-panel/IBaseTabs';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { NewObjectTrackingFormData } from '../../types';
import NoradIdField from './tabs/norad-id-field';
import ObjectField from './tabs/object-field';
import TLEField from './tabs/tle-field';

const TAB_KEY = 'point-track-tab';

export enum MethodTabNames {
  OBJECT = 'Object',
  NORAD_ID = 'Norad ID',
  COORDINATES = 'Coordinates',
  TLE = 'TLE',
}

const POINT_TRACK_METHOD_TABS: ITabItem[] = [
  {
    label: MethodTabNames.OBJECT,
    content: <ObjectField />,
  },
  {
    label: MethodTabNames.NORAD_ID,
    content: <NoradIdField />,
  },
  {
    label: MethodTabNames.TLE,
    content: <TLEField />,
  },
  // OUT_OF_SCOPE
  // {
  //   label: MethodTabNames.COORDINATES,
  //   content: <CoordinatesField />,
  // },
];

interface PointTrackMethodSectionProps {
  title: string;
  visibleTabNames?: MethodTabNames[];
}

const PointTrackMethodSection = ({
  title,
  visibleTabNames,
}: PointTrackMethodSectionProps) => {
  const { resetField } = useFormContext<NewObjectTrackingFormData>();

  const handleTabChange = () => resetField('trackMethod');

  const tabs = useMemo(
    () =>
      visibleTabNames
        ? POINT_TRACK_METHOD_TABS.filter((tab) =>
            visibleTabNames.includes(tab.label as MethodTabNames)
          )
        : POINT_TRACK_METHOD_TABS,
    [visibleTabNames]
  );

  return (
    <FormSection title={title}>
      <BaseTabs tabs={tabs} tabKey={TAB_KEY} onTabChange={handleTabChange} />
    </FormSection>
  );
};

export default PointTrackMethodSection;
