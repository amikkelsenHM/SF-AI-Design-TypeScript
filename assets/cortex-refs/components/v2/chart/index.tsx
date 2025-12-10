'use client';

import { Typography } from '@/components/components/ui/typography';
import useChartDimensions from 'hooks/useChartDimensions';
import { memo } from 'react';
import SFChartContainer from './chart-container';
import SFChartLegend from './chart-legend';
import { LegendItem, ThresholdConfig } from './types';

interface SFBarChartProps {
  title?: string;
  seriesLabels?: string[];
  thresholds?: ThresholdConfig[];
  customData?: any[];
  height?: number;
  minValue?: number;
  maxValue?: number;
  theme?: {
    backgroundColor?: string;
    barColor?: string | string[];
    textColor?: string;
    gridColor?: string;
  };
  legendItems?: LegendItem[];
  legendConfig?: {
    marginTop?: number;
    paddingLeft?: number;
    fontSize?: number;
  };
  customBarSize?: number;
  xAxisLabel?: string;
  yAxisLabel?: string;
  showTooltip?: boolean;
}

export const SFBarChart: React.FC<SFBarChartProps> = ({
  title = 'Bar Chart',
  thresholds = [],
  customData = [],
  height = 300,
  legendItems,
  customBarSize,
  xAxisLabel,
  yAxisLabel,
  showTooltip = false,
}) => {
  const {
    barGap,
    barCategoryGap,
    axisHeight,
    chartMargins,
    barSize,
    isXs,
    getBarKeys,
  } = useChartDimensions(customData);

  const barKeys = getBarKeys();
  const barWidth = customBarSize !== undefined ? customBarSize : barSize;

  return (
    <div>
      {title && (
        <Typography variant="label" className="text-foreground">
          {title}
        </Typography>
      )}
      <SFChartContainer
        customData={customData}
        barKeys={barKeys}
        barGap={barGap}
        barCategoryGap={barCategoryGap}
        chartMargins={chartMargins}
        axisHeight={axisHeight}
        barSize={barWidth}
        thresholds={thresholds}
        isXs={isXs}
        height={height}
        xAxisLabel={xAxisLabel}
        yAxisLabel={yAxisLabel}
        showTooltip={showTooltip}
      />
      {(legendItems?.length ?? 0) > 0 && (
        <SFChartLegend items={legendItems || []} />
      )}
    </div>
  );
};

export default memo(SFBarChart);
