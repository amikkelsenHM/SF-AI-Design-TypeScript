import EditableField from '@/components/v2/custom-shadcn/editable-field';
import {
  ObjectTrackingObservationMode,
  ObjectTrackingStatus,
  ObjectTrackingTargetMode,
} from '../../../enums';
import DateAndTimeField from '../../../new/sections/campaign-duration/tabs/date-and-time-field';
import {
  createTleValidationRules,
  dateRangeRules,
  isFinalStatus,
  nameRules,
  noradRules,
} from './edit-validation-rules';

type FieldConfig = {
  name: 'name' | 'noradId' | 'startEndDates' | 'tle';
  label: string;
  placeholder?: string;
  type?: 'number';
  registerOptions?: Record<string, unknown>;
  readOnly?: boolean;
  render?: (isEditing: boolean) => React.ReactNode;
  editor?: 'input' | 'password' | 'select' | 'textarea';
  rows?: number;
  component: typeof EditableField;
  status?: ObjectTrackingStatus;
};

const SHORT_TIME_MODES = [
  ObjectTrackingObservationMode.Stare,
  ObjectTrackingObservationMode.Search,
  ObjectTrackingObservationMode.Instant,
  ObjectTrackingObservationMode.Scan,
];

export const generateCampaignFields = (
  targetMode?: ObjectTrackingTargetMode,
  status?: ObjectTrackingStatus,
  campaignNoradId?: number,
  observationMode?: ObjectTrackingObservationMode
): FieldConfig[] => {
  const tleRules = createTleValidationRules(status, campaignNoradId);

  const modeFieldMap: Partial<Record<ObjectTrackingTargetMode, FieldConfig>> = {
    [ObjectTrackingTargetMode.TLE]: {
      name: 'tle',
      label: 'TLE',
      component: EditableField,
      readOnly: isFinalStatus(status),
      editor: 'textarea',
      rows: 2,
      placeholder: 'Input a TLE',
      registerOptions: tleRules,
    },
    [ObjectTrackingTargetMode.NoradID]: {
      name: 'noradId',
      label: 'Norad ID',
      component: EditableField,
      readOnly: true,
      type: 'number',
      registerOptions: noradRules,
      placeholder: 'Input an ID',
    },
  };

  const modeField = targetMode ? modeFieldMap[targetMode] : undefined;
  const isShortTimeMode = observationMode
    ? SHORT_TIME_MODES.includes(observationMode)
    : false;

  return [
    {
      name: 'name',
      label: 'Campaign Name',
      component: EditableField,
      registerOptions: nameRules,
    },
    ...(modeField ? [modeField] : []),
    ...(!isShortTimeMode
      ? [
          {
            name: 'startEndDates',
            label: 'Campaign Duration',
            render: (isEditing: boolean) => (
              <DateAndTimeField
                readOnly={!isEditing}
                hasLabels={false}
                status={status!}
                rules={dateRangeRules}
              />
            ),
            component: EditableField,
          } as const,
        ]
      : []),
  ];
};
