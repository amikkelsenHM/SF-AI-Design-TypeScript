import { SKELETON_WIDTHS } from '@/components/lib/skeleton/constants';
import { useSkeleton } from '@/components/lib/skeleton/patterns';
import EditableField from '@/components/v2/custom-shadcn/editable-field';
import { NotificationBanner } from '@/components/v2/notification-banner/notification-banner';
import { observationPredictionsParamsAdapter } from '@/components/v2/pages/object-tracking/adapters/observation-prediction-adapter';
import { FormSection } from '@/components/v2/pages/object-tracking/common/form/form-section';
import { getObservationPredictionMessage } from '@/components/v2/pages/object-tracking/utils';
import { useObservationPrediction } from '@/hooks/queries/campaignQuery';
import { useTelescopeDetails } from 'hooks/queries/telescopeQuery';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { NewObjectTrackingFormData } from '../../../types';
import TrackSummaryTable from './track-summary-table';

const TrackSummarySection = () => {
  const { getValues } = useFormContext<NewObjectTrackingFormData>();
  const [trackMethod] = getValues(['trackMethod']);
  const params = useMemo(
    () => observationPredictionsParamsAdapter(trackMethod),
    [trackMethod]
  );
  const {
    data,
    error,
    isLoading: isObservationPredictionsLoading,
  } = useObservationPrediction(params);
  const closestObservation = data?.[0];
  // TODO: we fetch the entire telescope object only for the name, it will be better if the api returns it
  const { data: telescope, isLoading: isTelescopeLoading } =
    useTelescopeDetails(closestObservation?.telescopeId || '');
  const isLoading = isObservationPredictionsLoading || isTelescopeLoading;

  const { textFields } = useSkeleton();
  const predictionSkeleton = textFields({
    fields: [
      { count: 1, width: SKELETON_WIDTHS.CONTENT_MD },
      { count: 1, width: SKELETON_WIDTHS.LARGE_SM },
    ],
    className: 'bg-background-contrast rounded-lg p-4',
  }).build();

  const message = useMemo(() => {
    return getObservationPredictionMessage(
      closestObservation,
      telescope?.payload.name,
      error
    );
  }, [closestObservation, telescope?.payload.name, error]);

  return (
    <FormSection title="Track Summary">
      {isLoading ? (
        predictionSkeleton
      ) : (
        <NotificationBanner
          type="inline"
          variant="info"
          title="Observation Prediction (Beta Feature)"
          text={message}
          isOpen
        />
      )}

      <EditableField
        name="name"
        label="Name"
        placeholder="Enter a name"
        inputSize="l"
        iconButtonSize="icon"
        labelClassName="typography-body-sm text-foreground"
      />

      <TrackSummaryTable />
    </FormSection>
  );
};

export default TrackSummarySection;
