import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '@spaceflux/ui';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'body-large', 'body-small', 'body-bold-large', 'body-bold-small',
        'cta-large', 'cta-small', 'link-large', 'link-small',
        'footnote', 'helper', 'label', 'label-bold',
      ],
    },
    as: {
      control: 'select',
      options: ['span', 'p', 'div', 'label'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const BodyLarge: Story = {
  args: {
    variant: 'body-large',
    children: 'Body Large Text',
  },
};

export const BodySmall: Story = {
  args: {
    variant: 'body-small',
    children: 'Body Small Text',
  },
};

export const Label: Story = {
  args: {
    variant: 'label',
    children: 'Label Text',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Text variant="body-large">Body Large</Text>
      <Text variant="body-small">Body Small</Text>
      <Text variant="body-bold-large">Body Bold Large</Text>
      <Text variant="body-bold-small">Body Bold Small</Text>
      <Text variant="cta-large">CTA Large</Text>
      <Text variant="cta-small">CTA Small</Text>
      <Text variant="link-large">Link Large</Text>
      <Text variant="link-small">Link Small</Text>
      <Text variant="footnote">Footnote</Text>
      <Text variant="helper">Helper</Text>
      <Text variant="label">Label</Text>
      <Text variant="label-bold">Label Bold</Text>
    </div>
  ),
};
