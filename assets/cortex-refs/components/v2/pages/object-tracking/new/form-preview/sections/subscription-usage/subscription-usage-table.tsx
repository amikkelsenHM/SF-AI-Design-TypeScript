import { SFDataTable } from '@/components/v2/table-new';
import { SubscriptionType } from 'models/interfaces/v2/subscriptions';
import { useMemo } from 'react';
import { usageColumns, UsageRowIds } from './columns';
import { formatUsageLabels, formatUsageValue } from './utils';

interface SubscriptionUsageTableProps {
  limit: number;
  taskUsage: number;
  totalUsage: number;
  type: SubscriptionType;
}

const SubscriptionUsageTable = ({
  limit,
  taskUsage,
  totalUsage,
  type,
}: SubscriptionUsageTableProps) => {
  const tableData = useMemo(
    () => [
      {
        id: UsageRowIds.PLAN,
        label: formatUsageLabels(UsageRowIds.PLAN, type),
        value: formatUsageValue(type, limit),
      },
      {
        id: UsageRowIds.THIS_TASK,
        label: formatUsageLabels(UsageRowIds.THIS_TASK, type),
        value: formatUsageValue(type, taskUsage),
      },
      {
        id: UsageRowIds.REMAINING,
        label: formatUsageLabels(UsageRowIds.REMAINING, type),
        value: formatUsageValue(type, limit - totalUsage),
      },
    ],
    [taskUsage, totalUsage, limit, type]
  );

  return (
    <SFDataTable
      columns={usageColumns}
      data={tableData}
      hideHeader
      hasRowBorder
      variant="rounded"
    />
  );
};

export default SubscriptionUsageTable;
