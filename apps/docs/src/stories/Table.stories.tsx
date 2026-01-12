import type { Meta, StoryObj } from '@storybook/react';
import { Table, Badge } from '@spaceflux/ui';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

interface SampleRow {
  id: number;
  name: string;
  status: 'success' | 'warning' | 'error' | 'processing';
  date: string;
  value: number;
}

const sampleData: SampleRow[] = [
  { id: 1, name: 'Object Alpha', status: 'success', date: '2024-01-15', value: 1250 },
  { id: 2, name: 'Object Beta', status: 'warning', date: '2024-01-14', value: 890 },
  { id: 3, name: 'Object Gamma', status: 'error', date: '2024-01-13', value: 2100 },
  { id: 4, name: 'Object Delta', status: 'processing', date: '2024-01-12', value: 450 },
  { id: 5, name: 'Object Epsilon', status: 'success', date: '2024-01-11', value: 3200 },
];

export const Default: Story = {
  render: () => (
    <Table
      columns={[
        { key: 'id', header: 'ID', width: '60px' },
        { key: 'name', header: 'Name' },
        { key: 'status', header: 'Status', render: (value) => <Badge variant={value}>{value}</Badge> },
        { key: 'date', header: 'Date' },
        { key: 'value', header: 'Value', render: (value) => `$${value.toLocaleString()}` },
      ]}
      data={sampleData}
    />
  ),
};

export const WithRowClick: Story = {
  render: () => (
    <Table
      columns={[
        { key: 'id', header: 'ID' },
        { key: 'name', header: 'Name' },
        { key: 'status', header: 'Status' },
      ]}
      data={sampleData}
      onRowClick={(row) => alert(`Clicked: ${row.name}`)}
    />
  ),
};
