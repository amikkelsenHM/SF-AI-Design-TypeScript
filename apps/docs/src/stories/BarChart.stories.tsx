import type { Meta, StoryObj } from '@storybook/react';
import { BarChart, type BarGroup, type LegendItem, type GridLine } from '@spaceflux/ui';

const meta: Meta<typeof BarChart> = {
  title: 'Charts/BarChart',
  component: BarChart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BarChart>;

const xAxisDates = ['2 Feb', '3 Feb', '4 Feb', '5 Feb', '6 Feb', '7 Feb', '8 Feb'];

const verticalGridLines: GridLine[] = Array.from({ length: 7 }, (_, i) => ({
  position: (i / 6) * 100,
  style: i === 6 ? 'solid' : 'dotted',
}));

const biDirectionalData: BarGroup[] = [
  { values: [{ height: 30, direction: 'negative', colorIndex: 1 }, { height: 15, direction: 'negative', colorIndex: 2 }, { height: 10, direction: 'negative', colorIndex: 3 }], position: 0 },
  { values: [{ height: 25, direction: 'negative', colorIndex: 1 }, { height: 20, direction: 'negative', colorIndex: 2 }, { height: 15, direction: 'negative', colorIndex: 3 }], position: 16.66 },
  { values: [{ height: 20, direction: 'negative', colorIndex: 1 }, { height: 10, direction: 'negative', colorIndex: 2 }, { height: 5, direction: 'positive', colorIndex: 3 }], position: 33.33 },
  { values: [{ height: 35, direction: 'positive', colorIndex: 1 }, { height: 15, direction: 'positive', colorIndex: 2 }, { height: 20, direction: 'negative', colorIndex: 3 }], position: 50 },
  { values: [{ height: 25, direction: 'positive', colorIndex: 1 }, { height: 10, direction: 'positive', colorIndex: 2 }, { height: 25, direction: 'negative', colorIndex: 3 }], position: 66.66 },
  { values: [{ height: 10, direction: 'positive', colorIndex: 1 }, { height: 30, direction: 'positive', colorIndex: 2 }, { height: 15, direction: 'negative', colorIndex: 3 }], position: 83.33 },
  { values: [{ height: 20, direction: 'positive', colorIndex: 1 }, { height: 15, direction: 'negative', colorIndex: 2 }, { height: 25, direction: 'positive', colorIndex: 3 }], position: 100 },
];

const standardData: BarGroup[] = [
  { values: [{ height: 60, colorIndex: 1 }, { height: 40, colorIndex: 2 }, { height: 80, colorIndex: 3 }], position: 0 },
  { values: [{ height: 45, colorIndex: 1 }, { height: 70, colorIndex: 2 }, { height: 55, colorIndex: 3 }], position: 16.66 },
  { values: [{ height: 80, colorIndex: 1 }, { height: 50, colorIndex: 2 }, { height: 65, colorIndex: 3 }], position: 33.33 },
  { values: [{ height: 55, colorIndex: 1 }, { height: 85, colorIndex: 2 }, { height: 40, colorIndex: 3 }], position: 50 },
  { values: [{ height: 70, colorIndex: 1 }, { height: 60, colorIndex: 2 }, { height: 75, colorIndex: 3 }], position: 66.66 },
  { values: [{ height: 50, colorIndex: 1 }, { height: 45, colorIndex: 2 }, { height: 90, colorIndex: 3 }], position: 83.33 },
  { values: [{ height: 65, colorIndex: 1 }, { height: 55, colorIndex: 2 }, { height: 70, colorIndex: 3 }], position: 100 },
];

const legend: LegendItem[] = [
  { label: 'Series A', color: 'var(--color-dataviz-5)' },
  { label: 'Series B', color: 'var(--color-dataviz-9)' },
  { label: 'Series C', color: 'var(--color-dataviz-1)' },
];

export const BiDirectional: Story = {
  args: {
    title: 'Bi-Directional Bar Chart',
    data: biDirectionalData,
    xAxisLabel: 'Date',
    xAxisValues: xAxisDates,
    yAxisLabel: 'Value',
    yAxisValues: [2, 1, 0, -1, -2],
    legend: legend,
    biDirectional: true,
    verticalGridLines: verticalGridLines,
  },
};

export const Standard: Story = {
  args: {
    title: 'Standard Bar Chart',
    data: standardData,
    xAxisLabel: 'Date',
    xAxisValues: xAxisDates,
    yAxisLabel: 'Value',
    yAxisValues: [100, 80, 60, 40, 20, 0],
    legend: legend,
    biDirectional: false,
    verticalGridLines: verticalGridLines,
  },
};

export const Minimal: Story = {
  args: {
    title: 'Minimal Bar Chart',
    data: standardData.slice(0, 4),
    xAxisValues: xAxisDates.slice(0, 4),
    yAxisValues: [100, 50, 0],
  },
};
