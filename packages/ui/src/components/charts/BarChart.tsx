import React from 'react';
import { ChartBase } from './ChartBase';
import { ChartYAxis, ChartXAxis } from './ChartAxis';
import { ChartGrid, GridLine } from './ChartGrid';
import { ChartLegend, LegendItem } from './ChartLegend';

export type BarDirection = 'positive' | 'negative';

export interface BarValue {
  height: number;
  direction?: BarDirection;
  colorIndex?: 1 | 2 | 3;
}

export interface BarGroup {
  values: BarValue[];
  position?: number;
}

export interface BarChartProps {
  title?: string;
  data: BarGroup[];
  xAxisLabel?: string;
  xAxisValues?: (string | number)[];
  yAxisLabel?: string;
  yAxisValues?: (string | number)[];
  legend?: LegendItem[];
  biDirectional?: boolean;
  horizontalGridLines?: GridLine[];
  verticalGridLines?: GridLine[];
  className?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  title,
  data,
  xAxisLabel,
  xAxisValues = [],
  yAxisLabel,
  yAxisValues = [],
  legend,
  biDirectional = false,
  horizontalGridLines,
  verticalGridLines,
  className = '',
}) => {
  const defaultHorizontalLines: GridLine[] = horizontalGridLines || [
    { position: 0, style: 'solid' },
    { position: 25, style: 'dotted' },
    { position: 50, style: 'dotted' },
    { position: 75, style: 'dotted' },
    { position: 100, style: 'solid' },
  ];

  const getBarPosition = (index: number, total: number): number => {
    if (total <= 1) return 0;
    return (index / (total - 1)) * 100;
  };

  return (
    <ChartBase title={title} className={className}>
      <div className="chart-layout">
        <ChartYAxis label={yAxisLabel} values={yAxisValues} />
        <ChartGrid horizontalLines={defaultHorizontalLines} verticalLines={verticalGridLines}>
          <div className={`bar-chart-container ${biDirectional ? 'bi-directional' : ''}`}>
            {data.map((group, groupIndex) => (
              <div
                key={groupIndex}
                className="bar-group"
                style={{ left: `${group.position ?? getBarPosition(groupIndex, data.length)}%` }}
              >
                {group.values.map((bar, barIndex) => (
                  <div
                    key={barIndex}
                    className={`bar-value bar-${bar.colorIndex || barIndex + 1} ${bar.direction || ''}`}
                    style={{ height: `${bar.height}%` }}
                  />
                ))}
              </div>
            ))}
          </div>
        </ChartGrid>
      </div>
      <ChartXAxis label={xAxisLabel} values={xAxisValues} />
      {legend && <ChartLegend items={legend} />}
    </ChartBase>
  );
};

BarChart.displayName = 'BarChart';

export default BarChart;
