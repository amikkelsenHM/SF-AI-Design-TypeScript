import { ControlledCheckboxField } from '@/components/v2/inputs/controlled-checkbox';
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

const ADDITIONAL_SERVICES = [
  {
    name: 'deliverAllInFOV',
    label: 'All-in-view measurement',
    subscriptionFeature: 'deliverAllInFoV' as SubscriptionFeatures,
    tooltipConfig: {
      header: 'All-in-view measurement',
      text: 'Get TDMs for all objects in the field of view during sessions, not only the task target.',
    },
  },
  {
    name: 'faintObjectDetection',
    label: 'Faint object detection',
    subscriptionFeature: 'faintObjectDetection' as SubscriptionFeatures,
    tooltipConfig: {
      header: 'Faint object detection',
      text: 'Use AI to extract the most possible detail from observations. Requires much greater processing time and resources.',
    },
  },
  {
    name: 'isDataExclusive',
    label: 'Exclusive data',
    subscriptionFeature: 'isDataExclusive' as SubscriptionFeatures,
    tooltipConfig: {
      header: 'Exclusive data',
      text: 'Data collected for this task will remain private and accessible only to you.',
    },
  },
  {
    name: 'isSearchMode',
    label: ObjectTrackingObservationMode.Search,
    flagKey: ClientFeatureFlags.SEARCH_MODE,
    subscriptionFeature: 'searchTaskMode' as SubscriptionFeatures,
    hasRoleAccess: (isAdmin: boolean, isManager: boolean) =>
      isAdmin || isManager,
    tooltipConfig: {
      header: 'Search',
      text: "Use search patterns to collect sessions around the given target's expected location. Incurs higher usage of time",
    },
  },
] as const;

const SERVICE_BASED_DEFAULTS_MAP: Record<
  string,
  Partial<NewObjectTrackingFormData>
> = {
  isSearchMode: MODE_BASED_DEFAULTS_MAP.Search || {},
};

const AdditionalServicesSection = () => {
  const { control, setValue } = useFormContext<NewObjectTrackingFormData>();
  const notAdjustableFields = useWatch({
    control,
    name: 'meta.notAdjustableFields',
  });
  const isSearchEnabled = useFeatureFlag(ClientFeatureFlags.SEARCH_MODE, true);

  const hasOptionAccess = useFormFieldAccess(control);

  const services = useMemo(
    () =>
      ADDITIONAL_SERVICES.filter((option) => {
        const hasAccess = hasOptionAccess(option);

        if (
          'flagKey' in option &&
          option.flagKey === ClientFeatureFlags.SEARCH_MODE
        )
          return hasAccess && isSearchEnabled;

        return hasAccess;
      }),
    [hasOptionAccess, isSearchEnabled]
  );

  const handleServiceChange = (event: {
    target: { value: boolean; name: string };
  }) => {
    const { value: isChecked, name } = event.target;

    const defaults = SERVICE_BASED_DEFAULTS_MAP[name];

    if (!defaults || !isChecked) {
      setValue('meta', undefined);
      return;
    }

    Object.entries(defaults).forEach(([key, value]) =>
      setValue(key as keyof NewObjectTrackingFormData, value)
    );
  };

  if (!services.length) return null;

  return (
    <FormSection title="Features" hasSeparator={false}>
      <div className="flex flex-col gap-3">
        {services.map(({ label, name, tooltipConfig }) => (
          <ControlledCheckboxField
            key={name}
            control={control}
            name={name}
            label={label}
            labelClassName="typography-body-sm text-foreground"
            tooltipConfig={tooltipConfig}
            disabled={notAdjustableFields?.includes(name)}
            rules={{ onChange: handleServiceChange }}
          />
        ))}
      </div>
    </FormSection>
  );
};

export default AdditionalServicesSection;
