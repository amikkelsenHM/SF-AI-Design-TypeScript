'use client';

import Header from '@/components/v2/header';
import { useCampaignById } from '@/hooks/queries/campaignQuery';
import { HOME_BREADCRUMB_ITEM } from '@/utils/v2/generateBreadcrumbs';
import { BreadcrumbItem } from 'models/interfaces/v2/IBreadcrumb';
import { HEADER_EDIT_OBJECT_TRACKING_TITLE } from '../constants/header';
import EditObjectTrackingForm from './form/edit-object-tracking-form';

interface EditObjectTrackingProps {
  id: string;
}

const EditObjectTracking = ({ id }: EditObjectTrackingProps) => {
  const { data, isLoading } = useCampaignById(id);

  const breadcrumbs: BreadcrumbItem[] = [
    HOME_BREADCRUMB_ITEM,
    { text: 'Object Tracking', href: '/object-tracking' },
    ...(data
      ? [
          {
            text: data.name,
            href: `/object-tracking/${data.noradId}?taskId=${data.id}`,
          },
        ]
      : []),
  ];

  return (
    <>
      <Header
        title={HEADER_EDIT_OBJECT_TRACKING_TITLE}
        standardActions={{ back: true }}
        customBreadcrumbs={breadcrumbs}
      />

      <EditObjectTrackingForm id={id} data={data} isLoading={isLoading} />
    </>
  );
};

export default EditObjectTracking;
