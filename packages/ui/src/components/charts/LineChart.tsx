import React from 'react';
import { ChartBase } from './ChartBase';
import { ChartYAxis, ChartXAxis } from './ChartAxis';
import { ChartGrid, GridLine } from './ChartGrid';
import { ChartLegend, LegendItem } from './ChartLegend';

export interface LineSeriesPoint {
  x: number;
  y: number;
}

export interface LineSeries {
  points: LineSeriesPoint[];
  colorIndex?: 1 | 2 | 3;
}

export interface LineChartProps {
  title?: string;
  series: LineSeries[];
  xAxisLabel?: string;
  xAxisValues?: (string | number)[];
  yAxisLabel?: string;
  yAxisValues?: (string | number)[];
  legend?: LegendItem[];
  horizontalGridLines?: GridLine[];
  verticalGridLines?: GridLine[];
  viewBox?: { width: number; height: number };
  className?: string;
}

export const LineChart: React.FC<LineChartProps> = ({
  title,
  series,
  xAxisLabel,
  xAxisValues = [],
  yAxisLabel,
  yAxisValues = [],
  legend,
  horizontalGridLines,
  verticalGridLines,
  viewBox = { width: 1000, height: 250 },
  className = '',
}) => {
  const defaultHorizontalLines: GridLine[] = horizontalGridLines || [
    { position: 0, style: 'solid' },
    { position: 16.66, style: 'dotted' },
    { position: 33.33, style: 'dotted' },
    { position: 50, style: 'dotted' },
    { position: 66.66, style: 'dotted' },
    { position: 83.33, style: 'dotted' },
    { position: 100, style: 'solid' },
  ];

  const pointsToPath = (points: LineSeriesPoint[]): string => {
    if (points.length === 0) return '';
    const [first, ...rest] = points;
    const start = `M${first.x},${first.y}`;
    const lines = rest.map((p) => `L${p.x},${p.y}`).join(' ');
    return `${start} ${lines}`;
  };

  return (
    <ChartBase title={title} className={className}>
      <div className="chart-layout">
        <ChartYAxis label={yAxisLabel} values={yAxisValues} />
        <ChartGrid horizontalLines={defaultHorizontalLines} verticalLines={verticalGridLines}>
          <svg
            className="line-chart-svg"
            viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
            preserveAspectRatio="none"
          >
            {series.map((s, index) => (
              <path
                key={index}
                className={`line-path color-${s.colorIndex || index + 1}`}
                d={pointsToPath(s.points)}
              />
            ))}
          </svg>
        </ChartGrid>
      </div>
      <ChartXAxis label={xAxisLabel} values={xAxisValues} />
      {legend && <ChartLegend items={legend} />}
    </ChartBase>
  );
};

LineChart.displayName = 'LineChart';

export default LineChart;
