import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from '@spaceflux/ui';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Dashboard', href: '#' },
      { label: 'Settings' },
    ],
  },
};

export const LongPath: Story = {
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Objects', href: '#' },
      { label: 'Satellites', href: '#' },
      { label: 'Active', href: '#' },
      { label: 'Details' },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ label: 'Dashboard' }],
  },
};

export const WithClickHandler: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: 'Home', onClick: () => alert('Home clicked') },
        { label: 'Projects', onClick: () => alert('Projects clicked') },
        { label: 'Current Project' },
      ]}
    />
  ),
};
