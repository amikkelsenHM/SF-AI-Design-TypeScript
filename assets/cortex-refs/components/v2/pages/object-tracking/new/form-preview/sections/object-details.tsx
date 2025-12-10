import { FormSection } from '@/components/v2/pages/object-tracking/common/form/form-section';
import { SFDataTable } from '@/components/v2/table-new';
import { useObjectDetails } from '@/hooks/queries/campaignQuery';
import { SubscriptionType } from 'models/interfaces/v2/subscriptions';
import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { objectDetailsColumns } from '../../../columns/object-tracking-detail-columns';
import { ObjectDetailItem } from '../../../mock-data/object-tracking-detail-mock-data';
import { CampaignTarget } from '../../../types';
import { getObjectDetailsData } from '../../../utils';
import { NewObjectTrackingFormData } from '../../types';
import { generateObjectTaskName, getNoradIdFromTrackMethod } from './utils';

const ObjectDetailsSection = () => {
  const { getValues, setValue } = useFormContext<NewObjectTrackingFormData>();
  const [trackMethod, subscriptionType] = getValues([
    'trackMethod',
    'subscriptionType',
  ]);

  const { data, isLoading } = useObjectDetails(
    getNoradIdFromTrackMethod(trackMethod)
  );

  const target = data?.payload?.target as CampaignTarget | undefined;

  const tableData = useMemo(() => {
    const { noradId, objectName, type, country, launchDate, orbitalRegime } =
      target || {};

    return getObjectDetailsData(
      noradId,
      objectName,
      type,
      country || undefined,
      orbitalRegime || undefined,
      launchDate
    ) as ObjectDetailItem[];
  }, [target]);

  useEffect(() => {
    if (subscriptionType !== SubscriptionType.Object || !target?.objectName)
      return;

    setValue('name', generateObjectTaskName(target.objectName), {
      shouldValidate: true,
    });
  }, [setValue, target, subscriptionType]);

  return (
    <FormSection title="Object Details">
      <SFDataTable
        columns={objectDetailsColumns}
        data={tableData}
        hideHeader
        hasRowBorder
        isLoading={isLoading}
      />
    </FormSection>
  );
};

export default ObjectDetailsSection;
