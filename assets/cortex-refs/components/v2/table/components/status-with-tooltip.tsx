import { ReactNode } from 'react';
import SfTooltip from '../../tooltip/sf-tooltip';

interface TooltipConfig {
  header: string;
  text: string;
  icon: ReactNode;
  triggerAriaLabel: string;
}

interface MetricSpecificTooltipMap<TStatus extends string | number> {
  [metricName: string]: Partial<Record<TStatus, TooltipConfig>>;
}

interface StatusWithTooltipProps<TStatus extends string | number> {
  value: string | number;
  status: TStatus | null;
  tooltipMap?: Partial<Record<TStatus, TooltipConfig>>;
  metricSpecificTooltipMap?: MetricSpecificTooltipMap<TStatus>;
  metricName?: string;
  excludeStatuses?: TStatus[];
}

export const StatusWithTooltip = <TStatus extends string | number>({
  value,
  status,
  tooltipMap,
  metricSpecificTooltipMap,
  metricName,
  excludeStatuses = [],
}: StatusWithTooltipProps<TStatus>) => {
  const getTooltipConfig = (): TooltipConfig | null => {
    if (!status) return null;

    if (metricSpecificTooltipMap && metricName) {
      const metricTooltips = metricSpecificTooltipMap[metricName];
      if (metricTooltips && metricTooltips[status]) {
        return metricTooltips[status] as TooltipConfig;
      }
    }

    if (tooltipMap && tooltipMap[status]) {
      return tooltipMap[status] as TooltipConfig;
    }

    return null;
  };

  const tooltipConfig = getTooltipConfig();
  const shouldShowTooltip =
    tooltipConfig && status !== null && !excludeStatuses.includes(status);

  return (
    <div className="flex items-center justify-between">
      {value}
      {shouldShowTooltip && <SfTooltip {...tooltipConfig} />}
    </div>
  );
};

export default StatusWithTooltip;
