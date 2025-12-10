'use client';

import { useCreateObjectTask } from '@/hooks/queries/mutations/object-tracking';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubscriptionType } from 'models/interfaces/v2/subscriptions';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormContainer from '../../common/form/form-container';
import { createTaskSchema } from '../../common/form/validations';
import {
  FORM_PREVIEW_CONFIG,
  SUBSCRIPTION_TASK_FORM_TITLE,
} from '../../constants/form-header';
import { useHandleTaskCreation } from '../../hooks/useHandleTaskCreation';
import FormPreview from '../../new/form-preview/form-preview';
import { useHaveTasksForSubscription } from '../../new/hooks/useHaveTasksForSub';
import { SubscriptionTaskFormData } from '../types';
import FormSections from './form-sections';

const SUBSCRIPTION_TASK_DEFAULT_VALUES: Partial<SubscriptionTaskFormData> = {
  firstObservationNotification: false,
  subscriptionType: SubscriptionType.Object,
};

enum SubscriptionTaskViewType {
  DEFAULT = 'default',
  PREVIEW = 'preview',
}

const FORM_HEADER_PROPS = {
  [SubscriptionTaskViewType.DEFAULT]: { title: SUBSCRIPTION_TASK_FORM_TITLE },
  [SubscriptionTaskViewType.PREVIEW]: FORM_PREVIEW_CONFIG,
};

const SubscriptionTaskForm = () => {
  const [viewType, setViewType] = useState<SubscriptionTaskViewType>(
    SubscriptionTaskViewType.DEFAULT
  );
  const [hasActiveTasks, setHasActiveTask] = useState(false);
  const { mutateAsync } = useCreateObjectTask();
  const onSuccess = useHandleTaskCreation();

  const methods = useForm<SubscriptionTaskFormData>({
    defaultValues: SUBSCRIPTION_TASK_DEFAULT_VALUES,
    mode: 'onChange',
    resolver: yupResolver(createTaskSchema),
    // if the form is loaded this guarantees the flag is enabled
    context: { isPackageTaskEnabled: true, hasActiveTasks },
  });

  useHaveTasksForSubscription(
    methods.control,
    methods.trigger,
    setHasActiveTask
  );

  const onSubmit = async (data: SubscriptionTaskFormData) => {
    await mutateAsync(data, { onSuccess });
  };

  const handleShowPreview = async () => {
    const isValid = await methods.trigger(undefined, { shouldFocus: true });

    if (isValid) setViewType(SubscriptionTaskViewType.PREVIEW);
  };

  const handleHidePreview = () => setViewType(SubscriptionTaskViewType.DEFAULT);

  const content = {
    [SubscriptionTaskViewType.DEFAULT]: (
      <FormSections onShowPreview={handleShowPreview} />
    ),
    [SubscriptionTaskViewType.PREVIEW]: (
      <FormPreview onHidePreview={handleHidePreview} />
    ),
  };

  return (
    <FormContainer
      methods={methods}
      headerProps={FORM_HEADER_PROPS[viewType]}
      onSubmit={onSubmit}
    >
      {content[viewType]}
    </FormContainer>
  );
};

export default SubscriptionTaskForm;
