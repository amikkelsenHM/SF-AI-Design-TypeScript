import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ChartBase, ChartYAxis, ChartXAxis, ChartGrid, ChartLegend, type GridLine } from '@spaceflux/ui';

const meta: Meta<typeof ChartBase> = {
  title: 'Charts/ChartBase',
  component: ChartBase,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ChartBase>;

const horizontalLines: GridLine[] = [
  { position: 0, style: 'solid' },
  { position: 20, style: 'dashed' },
  { position: 40, style: 'dashed' },
  { position: 60, style: 'dashed' },
  { position: 80, style: 'dashed' },
  { position: 100, style: 'solid' },
];

const verticalLines: GridLine[] = [
  { position: 0, style: 'dotted' },
  { position: 16.66, style: 'dotted' },
  { position: 33.33, style: 'dotted' },
  { position: 50, style: 'dotted' },
  { position: 66.66, style: 'dotted' },
  { position: 83.33, style: 'dotted' },
  { position: 100, style: 'solid' },
];

export const Foundation: Story = {
  render: () => (
    <ChartBase title="Data Overview">
      <div className="chart-layout">
        <ChartYAxis label="VALUE" values={[100, 80, 60, 40, 20, 0]} />
        <ChartGrid horizontalLines={horizontalLines} verticalLines={verticalLines} />
      </div>
      <ChartXAxis label="TIME" values={['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']} />
    </ChartBase>
  ),
};

export const WithLegend: Story = {
  render: () => (
    <ChartBase title="Chart with Legend">
      <div className="chart-layout">
        <ChartYAxis label="VALUE" values={[100, 50, 0]} />
        <ChartGrid horizontalLines={horizontalLines.filter((_, i) => i % 2 === 0)} verticalLines={verticalLines} />
      </div>
      <ChartXAxis label="CATEGORY" values={['A', 'B', 'C', 'D', 'E', 'F', 'G']} />
      <ChartLegend
        items={[
          { label: 'Series 1', color: 'var(--color-dataviz-1)' },
          { label: 'Series 2', color: 'var(--color-dataviz-9)' },
          { label: 'Series 3', color: 'var(--color-dataviz-5)' },
        ]}
      />
    </ChartBase>
  ),
};

export const Minimal: Story = {
  render: () => (
    <ChartBase title="Minimal Chart">
      <div className="chart-layout">
        <ChartYAxis values={[100, 0]} />
        <ChartGrid />
      </div>
      <ChartXAxis values={['Start', 'End']} />
    </ChartBase>
  ),
};
