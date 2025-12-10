'use client';

import { useUpdateCampaign } from '@/hooks/queries/mutations/useUpdateCampaign';
import { useGetSubscriptionById } from '@/hooks/queries/subscriptionQuery';
import { toApiRange, toPickerRange } from '@/utils/v2/dates';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormContainer from '../../common/form/form-container';
import FormSuccess from '../../common/form/form-success/form-success';
import FormSuccessDescription from '../../common/form/form-success/form-success-description';
import { ObjectTrackingView } from '../../types';
import { EditObjectTrackingFormData, UpdateCampaignPayload } from '../types';
import FormSections from './form-sections';

enum EditObjectTrackingFormView {
  DEFAULT = 'default',
  SUCCESS = 'success',
}

interface EditObjectTrackingFormProps {
  id?: string;
  data?: ObjectTrackingView;
  isLoading?: boolean;
}

const EditObjectTrackingForm = ({
  id,
  data,
  isLoading = false,
}: EditObjectTrackingFormProps) => {
  const { mutate, isPending } = useUpdateCampaign();
  const [viewType, setViewType] = useState<EditObjectTrackingFormView>(
    EditObjectTrackingFormView.DEFAULT
  );
  const { data: subscription } = useGetSubscriptionById(
    data?.taskingSubscriptionID || ''
  );

  const defaultValues: EditObjectTrackingFormData = {
    name: data?.name ?? '',
    targetMode: data?.targetMode,
    noradId: data?.noradId ?? undefined,
    startEndDates: toPickerRange(data?.startEndDates),
    tle: data?.tle ?? '',
    observationMode: data?.observationMode,
  };

  const methods = useForm<EditObjectTrackingFormData>({
    defaultValues,
    mode: 'onChange',
  });

  useEffect(() => {
    if (subscription) {
      methods.setValue('subscription', subscription);
    }
  }, [subscription, methods.setValue]);

  const onSubmit = (formData: EditObjectTrackingFormData) => {
    if (!id) return;

    const payloadToSubmit: UpdateCampaignPayload = {
      name: formData.name,
      ...(formData?.tle && { tle: formData.tle }),
      ...(formData?.noradId && { noradId: formData.noradId }),
      targetMode: formData.targetMode,
      startEndDates: toApiRange(formData.startEndDates),
    };

    mutate(
      { id, payload: payloadToSubmit },
      {
        onSuccess: () => {
          setViewType(EditObjectTrackingFormView.SUCCESS);
        },
      }
    );
  };

  const formHeaderProps = {
    [EditObjectTrackingFormView.DEFAULT]: {
      title: data?.name ?? '',
      description:
        'Please review the data below and consider what is best for you needs.',
    },
    [EditObjectTrackingFormView.SUCCESS]: {
      title: 'Edit Accepted',
      description: (
        <FormSuccessDescription taskId={id || ''} noradId={data?.noradId} />
      ),
    },
  };

  const content = {
    [EditObjectTrackingFormView.DEFAULT]: (
      <FormSections isLoading={isLoading || isPending} campaignData={data} />
    ),
    [EditObjectTrackingFormView.SUCCESS]: <FormSuccess />,
  };

  return (
    <FormContainer
      methods={methods}
      headerProps={formHeaderProps[viewType]}
      onSubmit={onSubmit}
    >
      {content[viewType]}
    </FormContainer>
  );
};

export default EditObjectTrackingForm;
