import type { Meta, StoryObj } from '@storybook/react';
import { ScatterChart, type ScatterPoint, type GridLine } from '@spaceflux/ui';

const meta: Meta<typeof ScatterChart> = {
  title: 'Charts/ScatterChart',
  component: ScatterChart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ScatterChart>;

const xAxisDates = ['2 Feb', '3 Feb', '4 Feb', '5 Feb', '6 Feb', '7 Feb', '8 Feb', '9 Feb', '10 Feb', '11 Feb'];

const verticalGridLines: GridLine[] = Array.from({ length: 10 }, (_, i) => ({
  position: (i / 9) * 100,
  style: i === 9 ? 'solid' : 'dotted',
}));

const eventDistributionData: ScatterPoint[] = [
  { x: 0, y: 80, size: 'xs', colorIndex: 1 },
  { x: 2, y: 60, size: 'sm', colorIndex: 1 },
  { x: 5, y: 90, size: 'md', colorIndex: 1 },
  { x: 5, y: 20, size: 'xs', colorIndex: 1 },
  { x: 11, y: 85, size: 'xs', colorIndex: 1 },
  { x: 13, y: 40, size: 'lg', colorIndex: 1 },
  { x: 15, y: 95, size: 'xs', colorIndex: 3 },
  { x: 22, y: 30, size: 'xs', colorIndex: 3 },
  { x: 24, y: 70, size: 'xs', colorIndex: 3 },
  { x: 26, y: 50, size: 'sm', colorIndex: 1 },
  { x: 28, y: 15, size: 'md', colorIndex: 1 },
  { x: 35, y: 80, size: 'xs', colorIndex: 2 },
  { x: 40, y: 85, size: 'lg', colorIndex: 3 },
  { x: 42, y: 40, size: 'xs', colorIndex: 3 },
  { x: 43, y: 25, size: 'sm', colorIndex: 2 },
  { x: 50, y: 80, size: 'md', colorIndex: 2 },
  { x: 50, y: 60, size: 'xs', colorIndex: 2 },
  { x: 50, y: 40, size: 'xs', colorIndex: 2 },
  { x: 50, y: 20, size: 'xs', colorIndex: 2 },
  { x: 60, y: 85, size: 'xs', colorIndex: 1 },
  { x: 60, y: 65, size: 'xs', colorIndex: 1 },
  { x: 60, y: 15, size: 'xs', colorIndex: 1 },
  { x: 70, y: 80, size: 'md', colorIndex: 3 },
  { x: 70, y: 60, size: 'md', colorIndex: 3 },
  { x: 72, y: 45, size: 'xs', colorIndex: 3 },
  { x: 75, y: 25, size: 'md', colorIndex: 1 },
  { x: 80, y: 80, size: 'md', colorIndex: 1 },
  { x: 85, y: 30, size: 'xs', colorIndex: 1 },
  { x: 86, y: 25, size: 'sm', colorIndex: 1 },
  { x: 92, y: 45, size: 'sm', colorIndex: 1 },
  { x: 92, y: 42, size: 'sm', colorIndex: 1 },
  { x: 92, y: 25, size: 'md', colorIndex: 1 },
  { x: 98, y: 20, size: 'md', colorIndex: 1 },
  { x: 98, y: 35, size: 'xs', colorIndex: 1 },
];

const simpleData: ScatterPoint[] = [
  { x: 10, y: 20, size: 'md', colorIndex: 1 },
  { x: 25, y: 45, size: 'lg', colorIndex: 1 },
  { x: 40, y: 30, size: 'sm', colorIndex: 1 },
  { x: 55, y: 70, size: 'md', colorIndex: 1 },
  { x: 70, y: 55, size: 'lg', colorIndex: 1 },
  { x: 85, y: 80, size: 'sm', colorIndex: 1 },
];

export const EventDistribution: Story = {
  args: {
    title: 'Event Distribution',
    points: eventDistributionData,
    xAxisLabel: 'DATE',
    xAxisValues: xAxisDates,
    yAxisLabel: 'INTENSITY',
    yAxisValues: ['High', 'Med', 'Low', 'None'],
    verticalGridLines: verticalGridLines,
  },
};

export const Simple: Story = {
  args: {
    title: 'Simple Scatter Plot',
    points: simpleData,
    xAxisLabel: 'X Value',
    xAxisValues: [0, 25, 50, 75, 100],
    yAxisLabel: 'Y Value',
    yAxisValues: [100, 75, 50, 25, 0],
  },
};

export const MultiColor: Story = {
  args: {
    title: 'Multi-Category Scatter',
    points: eventDistributionData,
    xAxisLabel: 'Time',
    xAxisValues: xAxisDates,
    yAxisLabel: 'Magnitude',
    yAxisValues: ['High', 'Medium', 'Low', 'None'],
    legend: [
      { label: 'Category A', color: 'var(--color-dataviz-1)' },
      { label: 'Category B', color: 'var(--color-dataviz-14)' },
      { label: 'Category C', color: 'var(--color-dataviz-7)' },
    ],
    verticalGridLines: verticalGridLines,
  },
};
