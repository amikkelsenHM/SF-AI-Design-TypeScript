import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RadioButton } from '@spaceflux/ui';

const meta: Meta<typeof RadioButton> = {
  title: 'Components/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

export const Default: Story = {
  args: {
    label: 'Option A',
    name: 'default-radio',
  },
};

export const RadioGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState('opt1');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <RadioButton
          label="Option One"
          name="radio-group"
          value="opt1"
          checked={selected === 'opt1'}
          onChange={() => setSelected('opt1')}
        />
        <RadioButton
          label="Option Two"
          name="radio-group"
          value="opt2"
          checked={selected === 'opt2'}
          onChange={() => setSelected('opt2')}
        />
        <RadioButton
          label="Option Three"
          name="radio-group"
          value="opt3"
          checked={selected === 'opt3'}
          onChange={() => setSelected('opt3')}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <RadioButton label="Disabled unchecked" name="disabled" disabled />
      <RadioButton label="Disabled checked" name="disabled-checked" disabled defaultChecked />
    </div>
  ),
};
