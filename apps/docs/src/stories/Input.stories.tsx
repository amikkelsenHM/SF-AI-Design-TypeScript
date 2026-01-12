import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@spaceflux/ui';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Invalid input',
    error: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px' }}>
      <Input placeholder="Default input" />
      <Input placeholder="Error state" error />
      <Input placeholder="Disabled" disabled />
    </div>
  ),
};
