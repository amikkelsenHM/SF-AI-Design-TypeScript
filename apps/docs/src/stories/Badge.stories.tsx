import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@spaceflux/ui';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'warning', 'error', 'processing'],
    },
    showDot: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Active',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Pending',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Failed',
  },
};

export const Processing: Story = {
  args: {
    variant: 'processing',
    children: 'Processing',
  },
};

export const WithoutDot: Story = {
  args: {
    variant: 'success',
    children: 'No Dot',
    showDot: false,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="error">Failed</Badge>
      <Badge variant="processing">Processing</Badge>
    </div>
  ),
};
