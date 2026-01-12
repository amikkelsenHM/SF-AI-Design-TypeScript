import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DatePicker } from '@spaceflux/ui';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    return <DatePicker value={date} onChange={setDate} />;
  },
};

export const WithPreselectedDate: Story = {
  render: () => {
    const [date, setDate] = useState<Date>(new Date(2024, 5, 15));
    return <DatePicker value={date} onChange={setDate} label="Event Date" />;
  },
};

export const CustomLabel: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    return <DatePicker value={date} onChange={setDate} label="Launch Date" />;
  },
};
