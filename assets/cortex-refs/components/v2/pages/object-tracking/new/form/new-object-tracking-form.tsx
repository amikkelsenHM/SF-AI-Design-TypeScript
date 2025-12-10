'use client';

import {
  useCreateObjectTracking,
  useCreateTimeTask,
} from '@/hooks/queries/mutations/object-tracking';
import { useAuthSession } from '@/hooks/useAuthSession';
import { useFeatureFlag } from '@/hooks/useFeatureFlag';
import { hasRequiredRoles } from '@/utils/v2/auth/permissions';
import { isAdmin as isAdminSession } from '@/utils/v2/permissions';
import { yupResolver } from '@hookform/resolvers/yup';
import { ClientFeatureFlags } from 'lib/config/feature-flag-config';
import { OrganizationRole } from 'models/enums/v2/roles';
import { SubscriptionType } from 'models/interfaces/v2/subscriptions';
import { Suspense, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormContainer from '../../common/form/form-container';
import {
  CUSTOM_TASK_FORM_TITLE,
  FORM_PREVIEW_CONFIG,
} from '../../constants/form-header';
import { ObjectTrackingObservationMode } from '../../enums';
import { useHandleTaskCreation } from '../../hooks/useHandleTaskCreation';
import FormPreview from '../form-preview/form-preview';
import { NewObjectTrackingFormData } from '../types';
import FormSections from './form-sections';
import { objectTrackingSchema } from './validations';

const OBJECT_TRACKING_DEFAULT_VALUES: Partial<NewObjectTrackingFormData> = {
  networkIds: [],
  observationMode: ObjectTrackingObservationMode.Normal,
  deliverAllInFOV: false,
  faintObjectDetection: false,
  isDataExclusive: false,
  isSearchMode: false,
  firstObservationNotification: false,
  subscriptionType: SubscriptionType.Time,
};

enum NewObjectTrackingFormView {
  DEFAULT = 'default',
  PREVIEW = 'preview',
}

const NewObjectTrackingForm = () => {
  const [viewType, setViewType] = useState<NewObjectTrackingFormView>(
    NewObjectTrackingFormView.DEFAULT
  );
  const isPackageTaskEnabled = useFeatureFlag(
    ClientFeatureFlags.PACKAGE_TASK,
    true
  );
  const { mutateAsync: createCampaign } = useCreateObjectTracking();
  const { mutateAsync: createTimeTask } = useCreateTimeTask();
  const onSuccess = useHandleTaskCreation();

  const { data: session } = useAuthSession();
  const isAdmin = useMemo(() => isAdminSession(session), [session]);
  const isManager = hasRequiredRoles(session, [], [OrganizationRole.Manager]);

  const methods = useForm<NewObjectTrackingFormData>({
    defaultValues: OBJECT_TRACKING_DEFAULT_VALUES,
    mode: 'onChange',
    resolver: yupResolver(objectTrackingSchema),
    context: { isAdmin, isManager, isPackageTaskEnabled },
  });

  const onSubmit = async (data: NewObjectTrackingFormData) => {
    const mutateAsync = isPackageTaskEnabled ? createTimeTask : createCampaign;

    await mutateAsync(data, { onSuccess });
  };

  const handleShowPreview = async () => {
    const isValid = await methods.trigger(undefined, { shouldFocus: true });

    if (isValid) setViewType(NewObjectTrackingFormView.PREVIEW);
  };

  const handleHidePreview = () =>
    setViewType(NewObjectTrackingFormView.DEFAULT);

  const formHeaderProps = {
    [NewObjectTrackingFormView.DEFAULT]: { title: CUSTOM_TASK_FORM_TITLE },
    [NewObjectTrackingFormView.PREVIEW]: FORM_PREVIEW_CONFIG,
  };

  const content = {
    [NewObjectTrackingFormView.DEFAULT]: (
      <FormSections onShowPreview={handleShowPreview} />
    ),
    [NewObjectTrackingFormView.PREVIEW]: (
      <FormPreview
        isUsageSectionVisible={isPackageTaskEnabled}
        onHidePreview={handleHidePreview}
      />
    ),
  };

  return (
    // TODO: add loading state
    <Suspense fallback={null}>
      <FormContainer
        methods={methods}
        headerProps={formHeaderProps[viewType]}
        onSubmit={onSubmit}
      >
        {content[viewType]}
      </FormContainer>
    </Suspense>
  );
};

export default NewObjectTrackingForm;
