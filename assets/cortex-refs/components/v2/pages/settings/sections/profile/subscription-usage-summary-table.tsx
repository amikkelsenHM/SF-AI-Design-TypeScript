import { SFDataTable } from '@/components/v2/table-new';
import { subscriptionUsageColumns } from '@/components/v2/table/columns/account-settings/subscriptions';
import {
  clampNonNegative,
  formatRefreshValue,
  formatUsageValue,
} from '@/utils/v2/subscriptions';
import {
  SubscriptionType,
  SubscriptionTypeLabel,
  SubscriptionUsageRow,
  SubscriptionUsageType,
} from 'models/interfaces/v2/subscriptions';

type Props = {
  subType: SubscriptionType;
  maxUsage: number;
  totalUsage: number;
};

export default function SubscriptionUsageSummaryTable({
  subType,
  maxUsage,
  totalUsage,
}: Props) {
  const remainingVal = clampNonNegative(maxUsage - totalUsage);
  const remainingLabel =
    subType === SubscriptionType.Time
      ? `${SubscriptionTypeLabel.Time} Remaining`
      : `${SubscriptionTypeLabel.Object}s Remaining`;

  const rows: SubscriptionUsageRow[] = [
    {
      id: SubscriptionUsageType.SUBSCRIPTION,
      label: 'Package',
      value: formatUsageValue(subType, maxUsage),
    },
    {
      id: SubscriptionUsageType.REMAINING,
      label: remainingLabel,
      value: formatUsageValue(subType, remainingVal),
    },
    {
      id: SubscriptionUsageType.TIME_REFRESH,
      label: 'Time Refresh',
      value: subType === SubscriptionType.Time ? formatRefreshValue() : '—',
    },
  ];

  return (
    <SFDataTable
      columns={subscriptionUsageColumns}
      data={rows}
      hideHeader
      variant="square"
    />
  );
}
