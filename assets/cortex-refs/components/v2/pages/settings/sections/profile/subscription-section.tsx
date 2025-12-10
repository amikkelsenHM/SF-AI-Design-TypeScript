import { useMemo } from 'react';

import { Select } from '@/components/components/ui/select';
import { InfoBlock } from '@/components/v2/info-block';

import UsageGauge from '@/components/v2/gauge/usage-gauge';
import { useGetAllSubscriptions } from '@/hooks/queries/subscriptionQuery';
import { useSubscriptionSelection } from '@/hooks/subscriptions/useSubscriptionSelection';
import { ZERO } from '@/utils/v2/common/constants';
import SubscriptionUsageSummaryTable from './subscription-usage-summary-table';

const UsageSection = () => {
  const { data } = useGetAllSubscriptions();
  const subsctiptions = data?.payload || [];

  const {
    options,
    selectedId,
    setSelectedId,
    subType,
    maxUsage,
    currentUsage,
  } = useSubscriptionSelection(subsctiptions);

  const taskUsage = ZERO;
  const totalUsage = useMemo(
    () => currentUsage + taskUsage,
    [currentUsage, taskUsage]
  );
  return (
    <div className="flex-row gap-3">
      <InfoBlock title="Package Usage" />

      <Select
        options={options}
        value={selectedId ?? undefined}
        placeholder="Package"
        onValueChange={(value) => setSelectedId(value)}
      />

      {subType && (
        <div className="flex gap-10 mt-5 items-start">
          <UsageGauge
            current={currentUsage}
            max={maxUsage}
            background={totalUsage}
          />

          <SubscriptionUsageSummaryTable
            subType={subType}
            maxUsage={maxUsage}
            totalUsage={totalUsage}
          />
        </div>
      )}
    </div>
  );
};

export default UsageSection;
