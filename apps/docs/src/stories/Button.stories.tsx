import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@spaceflux/ui';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
    },
    size: {
      control: 'select',
      options: ['sm', 'lg', 'icon', 'icon-sm'],
    },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'sm',
    children: 'Secondary Button',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    size: 'sm',
    children: 'Tertiary Button',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    children: 'Large Button',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    children: 'Disabled',
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="primary" size="lg">Large</Button>
      <Button variant="primary" disabled>Disabled</Button>
    </div>
  ),
};
