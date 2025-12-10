'use client';

import { memo } from 'react';
import SBBarChart from '../chart';
import { GenericChartProps } from './types/chart-config';

const GenericChart: React.FC<GenericChartProps> = ({ config, data }) => {
  const {
    title,
    seriesLabels,
    height = 400,
    minValue,
    maxValue,
    customBarSize,
    thresholds,
    legendItems,
    xAxisLabel,
    yAxisLabel,
    showTooltip = false,
    containerStyle = {
      width: '100%',
    },
  } = config;

  return (
    <div className="rounded-md" style={containerStyle}>
      <SBBarChart
        title={title}
        customData={data}
        seriesLabels={seriesLabels}
        height={height}
        minValue={minValue}
        maxValue={maxValue}
        customBarSize={customBarSize}
        thresholds={thresholds}
        legendItems={legendItems}
        xAxisLabel={xAxisLabel}
        yAxisLabel={yAxisLabel}
        showTooltip={showTooltip}
      />
    </div>
  );
};

export default memo(GenericChart);
