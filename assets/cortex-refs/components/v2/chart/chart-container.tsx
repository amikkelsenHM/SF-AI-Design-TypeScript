'use client';

import { memo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Customized,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { COLORS } from '../../../styles/colors';
import { ChartTooltip } from './chart-tooltip';
import {
  RechartsFunctionProps,
  renderExtendedXAxisLine,
} from './extended-x-axis-line';
import { ThresholdConfig } from './types';

const FILL_STYLE = { fill: 'currentColor' };
const LABEL_CLASSNAME = 'typography-label text-foreground';

interface SFChartContainerProps {
  customData: any[]; //TODO: Define a proper type when the data is known
  barKeys: string[];
  barGap: number;
  barCategoryGap: number;
  chartMargins: {
    top: number;
    right: number;
    left: number;
    bottom: number;
  };
  height?: number;
  width?: string | number;
  axisHeight: number;
  barSize: number;
  thresholds: ThresholdConfig[];
  isXs: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  showTooltip?: boolean;
}

const SFChartContainer: React.FC<SFChartContainerProps> = ({
  customData,
  barKeys,
  barGap,
  barCategoryGap,
  chartMargins,
  axisHeight,
  barSize,
  thresholds,
  isXs,
  height = 300,
  width = '100%',
  xAxisLabel,
  yAxisLabel,
  showTooltip = false,
}) => {
  return (
    <ResponsiveContainer width={width} height={height}>
      <BarChart
        data={customData}
        margin={chartMargins}
        barCategoryGap={barCategoryGap}
        barGap={barGap}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={COLORS.BACKGROUND_PROGRESS}
          horizontal={true}
          vertical={true}
        />
        <XAxis
          dataKey="date"
          tick={FILL_STYLE}
          tickLine={false}
          axisLine={false}
          height={axisHeight}
          interval={isXs ? 'preserveStart' : 0}
          label={{
            value: xAxisLabel,
            angle: 0,
            position: 'insideBottom',
            style: FILL_STYLE,
          }}
          className={LABEL_CLASSNAME}
        />
        <Customized
          component={(props) =>
            renderExtendedXAxisLine(props as RechartsFunctionProps)
          }
        />
        <YAxis
          tick={FILL_STYLE}
          tickLine={false}
          axisLine={{ stroke: COLORS.BACKGROUND_PROGRESS }}
          domain={[0, 'auto']}
          label={{
            value: yAxisLabel,
            angle: -90,
            position: 'insideLeft',
            style: FILL_STYLE,
            offset: -20,
          }}
          className={LABEL_CLASSNAME}
        />

        {showTooltip && (
          <Tooltip
            content={<ChartTooltip />}
            cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
            shared={false}
            trigger="hover"
            allowEscapeViewBox={{ x: true, y: true }}
            position={{ x: undefined, y: undefined }}
            wrapperStyle={{ pointerEvents: 'none' }}
          />
        )}

        {barKeys.map((key) => (
          <Bar
            dataKey={key}
            fill={COLORS.MEDIUM_ORCHID}
            barSize={barSize}
            isAnimationActive={true}
            name={`Bar-${key}`}
            style={{ cursor: 'pointer' }}
          />
        ))}

        {thresholds.map((threshold, index) => (
          <ReferenceLine
            key={`threshold-${index}`}
            y={threshold.value}
            stroke={threshold.color}
            strokeDasharray="3 3"
            strokeWidth={1}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default memo(SFChartContainer);
