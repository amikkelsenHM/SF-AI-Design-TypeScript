import { ControlledRadioGroupField } from '@/components/v2/inputs/controlled-radio-group';
import { FormSection } from '@/components/v2/pages/object-tracking/common/form/form-section';
import { useFeatureFlag } from '@/hooks/useFeatureFlag';
import { ClientFeatureFlags } from 'lib/config/feature-flag-config';
import { SubscriptionFeatures } from 'models/interfaces/v2/subscriptions';
import { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { ObjectTrackingObservationMode } from '../../../enums';
import { MODE_BASED_DEFAULTS_MAP } from '../../constants';
import { useFormFieldAccess } from '../../hooks/useFormFieldAccess';
import { NewObjectTrackingFormData } from '../../types';

const MIN_OPTIONS_COUNT = 1;

const OBSERVATION_MODE_OPTIONS = [
  {
    value: ObjectTrackingObservationMode.Normal,
    label: 'Default',
    subscriptionFeature: false,
    tooltipConfig: {
      header: 'Default',
      text: 'Standard observation mode, used for most tasks.',
    },
  },
  {
    value: ObjectTrackingObservationMode.Stare,
    label: ObjectTrackingObservationMode.Stare,
    subscriptionFeature: 'stareTaskMode' as SubscriptionFeatures,
    hasRoleAccess: (isAdmin: boolean, isManager: boolean) =>
      isAdmin || isManager,
    flagKey: ClientFeatureFlags.STARE_MODE,
    tooltipConfig: {
      header: 'Stare',
      text: 'Continuous, repeated observations of a single target for a specified duration of time.',
    },
  },
  {
    value: ObjectTrackingObservationMode.Calibration,
    label: ObjectTrackingObservationMode.Calibration,
    subscriptionFeature: false,
    hasRoleAccess: (isAdmin: boolean) => isAdmin,
    tooltipConfig: {
      header: 'Calibration',
      text: 'Our standard calibration tasking.',
    },
  },
] as const;

const ObservationModeSection = () => {
  const { control, setValue } = useFormContext<NewObjectTrackingFormData>();
  const notAdjustableFields = useWatch({
    control,
    name: 'meta.notAdjustableFields',
  });
  const isStareEnabled = useFeatureFlag(ClientFeatureFlags.STARE_MODE, true);

  const hasOptionAccess = useFormFieldAccess(control);

  const options = useMemo(
    () =>
      OBSERVATION_MODE_OPTIONS.map((option) => ({
        ...option,
        disabled: notAdjustableFields?.includes('observationMode'),
      })).filter((option) => {
        const hasAccess = hasOptionAccess(option);

        if (
          'flagKey' in option &&
          option.flagKey === ClientFeatureFlags.STARE_MODE
        )
          return hasAccess && isStareEnabled;

        return hasAccess;
      }),
    [hasOptionAccess, notAdjustableFields, isStareEnabled]
  );

  const handleModeChange = (event: {
    target: { value: ObjectTrackingObservationMode };
  }) => {
    const mode = event.target.value;

    const defaults = MODE_BASED_DEFAULTS_MAP[mode];
    if (!defaults) {
      setValue('meta', undefined);
      return;
    }

    Object.entries(defaults).forEach(([key, value]) =>
      setValue(key as keyof NewObjectTrackingFormData, value)
    );
  };

  if (options.length <= MIN_OPTIONS_COUNT) return null;

  return (
    <FormSection title="Mode">
      <ControlledRadioGroupField
        control={control}
        name="observationMode"
        required
        labelClassName="typography-body-sm"
        options={options}
        rules={{
          onChange: handleModeChange,
        }}
      />
    </FormSection>
  );
};

export default ObservationModeSection;
