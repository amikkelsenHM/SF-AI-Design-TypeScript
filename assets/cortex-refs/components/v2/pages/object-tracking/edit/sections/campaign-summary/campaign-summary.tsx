import EditableField from '@/components/v2/custom-shadcn/editable-field';
import { FormSection } from '@/components/v2/pages/object-tracking/common/form/form-section';
import { ObjectTrackingView } from '../../../types';
import { generateCampaignFields } from './generate-fields';

const SHARED_FIELD_CONFIG = {
  inputSize: 'l' as const,
  iconButtonSize: 'icon' as const,
  labelClassName: 'typography-body-sm text-foreground',
};

interface CampaignSummarySectionProps {
  isLoading?: boolean;
  data?: ObjectTrackingView;
}

const CampaignSummarySection = ({
  isLoading = false,
  data,
}: CampaignSummarySectionProps) => {
  if (!data) return null;
  const fieldsToRender = generateCampaignFields(
    data.targetMode,
    data.status,
    data.noradId ?? undefined,
    data.observationMode
  );

  return (
    <FormSection title="Campaign Summary">
      {fieldsToRender.map((field) => (
        <EditableField
          key={field.name}
          {...SHARED_FIELD_CONFIG}
          {...field}
          isInitialLoading={isLoading}
        />
      ))}
    </FormSection>
  );
};

export default CampaignSummarySection;
