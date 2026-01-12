import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, Button } from '@spaceflux/ui';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: '60px' }}>
      <Tooltip content="This is a helpful tooltip message">
        <Button variant="primary">Hover me</Button>
      </Tooltip>
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <div style={{ padding: '80px' }}>
      <Tooltip content="This is a longer tooltip message that provides more detailed information about the element you're hovering over.">
        <Button variant="secondary">Info</Button>
      </Tooltip>
    </div>
  ),
};

export const OnText: Story = {
  render: () => (
    <div style={{ padding: '60px' }}>
      <Tooltip content="Additional context for this term">
        <span style={{ textDecoration: 'underline dotted', cursor: 'help', color: 'var(--color-on-surface-dark)' }}>
          Technical term
        </span>
      </Tooltip>
    </div>
  ),
};
