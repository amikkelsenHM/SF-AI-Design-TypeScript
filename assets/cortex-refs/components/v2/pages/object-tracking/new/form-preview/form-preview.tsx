'use client';

import { useFormContext } from 'react-hook-form';
import FormActions from '../../common/form/form-actions';
import { ObjectTrackingTargetMode } from '../../enums';
import { NewObjectTrackingFormData } from '../types';
import CoordinatesSection from './sections/coordinates';
import ObjectDetailsSection from './sections/object-details';
import SubscriptionUsageSection from './sections/subscription-usage/subscription-usage';
import TrackSummarySection from './sections/track-summary/track-summary';

interface FormPreviewProps {
  isUsageSectionVisible?: boolean;
  onHidePreview: () => void;
}

const FormPreview = ({
  isUsageSectionVisible = true,
  onHidePreview,
}: FormPreviewProps) => {
  const {
    getValues,
    formState: { isSubmitting },
  } = useFormContext<NewObjectTrackingFormData>();
  const { mode, meta } = getValues('trackMethod') || {};

  return (
    <>
      {mode === ObjectTrackingTargetMode.Coordinates ? (
        <CoordinatesSection
          preview={meta?.jsonPreview}
          fileName={meta?.fileName}
        />
      ) : (
        <ObjectDetailsSection />
      )}
      <TrackSummarySection />
      {isUsageSectionVisible && <SubscriptionUsageSection />}
      <FormActions
        isSubmitting={isSubmitting}
        submitButtonType="submit"
        onCancel={onHidePreview}
      />
    </>
  );
};

export default FormPreview;
