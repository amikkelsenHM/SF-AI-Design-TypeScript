import React from 'react';
import { ChartBase } from './ChartBase';
import { ChartYAxis, ChartXAxis } from './ChartAxis';
import { ChartGrid, GridLine } from './ChartGrid';
import { ChartLegend, LegendItem } from './ChartLegend';

export type ScatterPointSize = 'xs' | 'sm' | 'md' | 'lg';
export type ScatterPointColor = 1 | 2 | 3;

export interface ScatterPoint {
  x: number;
  y: number;
  size?: ScatterPointSize;
  colorIndex?: ScatterPointColor;
}

export interface ScatterChartProps {
  title?: string;
  points: ScatterPoint[];
  xAxisLabel?: string;
  xAxisValues?: (string | number)[];
  yAxisLabel?: string;
  yAxisValues?: (string | number)[];
  legend?: LegendItem[];
  horizontalGridLines?: GridLine[];
  verticalGridLines?: GridLine[];
  className?: string;
}

export const ScatterChart: React.FC<ScatterChartProps> = ({
  title,
  points,
  xAxisLabel,
  xAxisValues = [],
  yAxisLabel,
  yAxisValues = [],
  legend,
  horizontalGridLines,
  verticalGridLines,
  className = '',
}) => {
  const defaultHorizontalLines: GridLine[] = horizontalGridLines || [
    { position: 0, style: 'solid' },
    { position: 25, style: 'dashed' },
    { position: 50, style: 'dashed' },
    { position: 75, style: 'dashed' },
    { position: 100, style: 'solid' },
  ];

  return (
    <ChartBase title={title} className={className}>
      <div className="chart-layout">
        <ChartYAxis label={yAxisLabel} values={yAxisValues} />
        <ChartGrid horizontalLines={defaultHorizontalLines} verticalLines={verticalGridLines}>
          {points.map((point, index) => (
            <div
              key={index}
              className={`scatter-point size-${point.size || 'sm'} color-${point.colorIndex || 1}`}
              style={{
                left: `${point.x}%`,
                bottom: `${point.y}%`,
              }}
            />
          ))}
        </ChartGrid>
      </div>
      <ChartXAxis label={xAxisLabel} values={xAxisValues} />
      {legend && <ChartLegend items={legend} />}
    </ChartBase>
  );
};

ScatterChart.displayName = 'ScatterChart';

export default ScatterChart;
