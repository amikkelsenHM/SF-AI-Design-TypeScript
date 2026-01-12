import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from '@spaceflux/ui';

const meta: Meta<typeof Heading> = {
  title: 'Components/Heading',
  component: Heading,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['display-large', 'heading-large', 'heading-medium', 'overline-large', 'overline-medium'],
    },
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'div'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const DisplayLarge: Story = {
  args: {
    variant: 'display-large',
    children: 'Display Large',
  },
};

export const HeadingLarge: Story = {
  args: {
    variant: 'heading-large',
    children: 'Heading Large',
  },
};

export const HeadingMedium: Story = {
  args: {
    variant: 'heading-medium',
    children: 'Heading Medium',
  },
};

export const OverlineLarge: Story = {
  args: {
    variant: 'overline-large',
    children: 'Overline Large',
  },
};

export const OverlineMedium: Story = {
  args: {
    variant: 'overline-medium',
    children: 'Overline Medium',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Heading variant="display-large">Display Large</Heading>
      <Heading variant="heading-large">Heading Large</Heading>
      <Heading variant="heading-medium">Heading Medium</Heading>
      <Heading variant="overline-large">Overline Large</Heading>
      <Heading variant="overline-medium">Overline Medium</Heading>
    </div>
  ),
};
