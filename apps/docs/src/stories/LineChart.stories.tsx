import type { Meta, StoryObj } from '@storybook/react';
import { LineChart, type LineSeries, type LegendItem, type GridLine } from '@spaceflux/ui';

const meta: Meta<typeof LineChart> = {
  title: 'Charts/LineChart',
  component: LineChart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LineChart>;

const xAxisDates = ['2 Feb', '3 Feb', '4 Feb', '5 Feb', '6 Feb', '7 Feb', '8 Feb', '9 Feb', '10 Feb', '11 Feb', '12 Feb', '13 Feb', '14 Feb'];

const verticalGridLines: GridLine[] = Array.from({ length: 13 }, (_, i) => ({
  position: (i / 12) * 100,
  style: i === 12 ? 'solid' : 'dotted',
}));

const multiSeriesData: LineSeries[] = [
  { 
    points: [
      { x: 0, y: 40 }, { x: 83, y: 180 }, { x: 166, y: 40 }, { x: 250, y: 150 }, 
      { x: 333, y: 140 }, { x: 416, y: 180 }, { x: 500, y: 100 }, { x: 583, y: 40 }, 
      { x: 666, y: 200 }, { x: 750, y: 140 }, { x: 833, y: 60 }, { x: 916, y: 120 }, { x: 1000, y: 80 }
    ], 
    colorIndex: 1 
  },
  { 
    points: [
      { x: 0, y: 125 }, { x: 83, y: 210 }, { x: 166, y: 80 }, { x: 250, y: 230 }, 
      { x: 333, y: 100 }, { x: 416, y: 130 }, { x: 500, y: 200 }, { x: 583, y: 110 }, 
      { x: 666, y: 80 }, { x: 750, y: 130 }, { x: 833, y: 200 }, { x: 916, y: 140 }, { x: 1000, y: 40 }
    ], 
    colorIndex: 2 
  },
  { 
    points: [
      { x: 0, y: 125 }, { x: 83, y: 40 }, { x: 166, y: 160 }, { x: 250, y: 30 }, 
      { x: 333, y: 170 }, { x: 416, y: 60 }, { x: 500, y: 60 }, { x: 583, y: 210 }, 
      { x: 666, y: 40 }, { x: 750, y: 160 }, { x: 833, y: 120 }, { x: 916, y: 80 }, { x: 1000, y: 140 }
    ], 
    colorIndex: 3 
  },
];

const singleSeriesData: LineSeries[] = [
  { 
    points: [
      { x: 0, y: 200 }, { x: 166, y: 80 }, { x: 333, y: 150 }, { x: 500, y: 50 }, 
      { x: 666, y: 180 }, { x: 833, y: 100 }, { x: 1000, y: 120 }
    ], 
    colorIndex: 1 
  },
];

const legend: LegendItem[] = [
  { label: 'Right Ascension', color: 'var(--color-dataviz-1)' },
  { label: 'Declination', color: 'var(--color-dataviz-11)' },
  { label: 'Bias', color: 'var(--color-dataviz-8)' },
];

export const MultiSeries: Story = {
  args: {
    title: 'Right Ascension & Declination Bias',
    series: multiSeriesData,
    xAxisLabel: 'Date',
    xAxisValues: xAxisDates,
    yAxisLabel: 'Value',
    yAxisValues: [2, 0, -2],
    legend: legend,
    verticalGridLines: verticalGridLines,
  },
};

export const SingleSeries: Story = {
  args: {
    title: 'Trend Analysis',
    series: singleSeriesData,
    xAxisLabel: 'Date',
    xAxisValues: xAxisDates.filter((_, i) => i % 2 === 0),
    yAxisLabel: 'Value',
    yAxisValues: [200, 150, 100, 50, 0],
    verticalGridLines: verticalGridLines.filter((_, i) => i % 2 === 0),
  },
};

export const Minimal: Story = {
  args: {
    title: 'Simple Line Chart',
    series: singleSeriesData,
    xAxisValues: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    yAxisValues: [200, 100, 0],
  },
};
