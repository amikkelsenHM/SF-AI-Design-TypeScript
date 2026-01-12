import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dropdown } from '@spaceflux/ui';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const options = [
  { value: 'opt1', label: 'Option One' },
  { value: 'opt2', label: 'Option Two' },
  { value: 'opt3', label: 'Option Three' },
  { value: 'opt4', label: 'Option Four' },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');
    return (
      <Dropdown
        options={options}
        value={value}
        onChange={setValue}
        placeholder="Select an option..."
      />
    );
  },
};

export const WithPreselected: Story = {
  render: () => {
    const [value, setValue] = useState<string>('opt2');
    return <Dropdown options={options} value={value} onChange={setValue} />;
  },
};

export const ErrorState: Story = {
  render: () => (
    <Dropdown options={options} placeholder="Error state" error />
  ),
};

export const SuccessState: Story = {
  render: () => (
    <Dropdown options={options} value="opt1" success />
  ),
};
