'use client';

import { useNavigation } from 'hooks/useNavigation';
import { useFormContext } from 'react-hook-form';
import FormActions from '../../common/form/form-actions';
import { ObjectTrackingView } from '../../types';
import CampaignSummarySection from '../sections/campaign-summary/campaign-summary';

interface FormSectionsProps {
  isLoading: boolean;
  campaignData?: ObjectTrackingView;
}

const FormSections = ({ isLoading, campaignData }: FormSectionsProps) => {
  const { navigate } = useNavigation({ linkTo: '/object-tracking' });
  const { formState } = useFormContext();
  const { isValid, isSubmitting } = formState;
  const submitDisabled = isLoading || isSubmitting || !isValid;

  return (
    <>
      <CampaignSummarySection isLoading={isLoading} data={campaignData} />
      <FormActions
        submitButtonType="submit"
        submitText="Save"
        onCancel={navigate}
        submitDisabled={submitDisabled}
      />
    </>
  );
};

export default FormSections;
