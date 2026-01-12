import type { Meta, StoryObj } from '@storybook/react';
import { Icon, IconName } from '@spaceflux/ui';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: [
        'add', 'add_circle', 'arrow_back', 'arrow_forward', 'calendar_month',
        'check', 'check_circle', 'chevron_down', 'chevron_up', 'close',
        'copy', 'delete', 'download', 'edit', 'filter_list', 'globe',
        'help', 'info', 'menu', 'more_vert', 'refresh', 'search',
        'settings', 'star', 'star_filled', 'warning_circle',
      ],
    },
    size: { control: 'number' },
    color: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: 'settings',
    size: 24,
  },
};

export const LargeIcon: Story = {
  args: {
    name: 'globe',
    size: 48,
    color: 'var(--color-brand-medium-orchid)',
  },
};

export const AllIcons: Story = {
  render: () => {
    const icons: IconName[] = [
      'add', 'add_circle', 'arrow_back', 'arrow_down', 'arrow_forward', 'arrow_up',
      'calendar_month', 'cancel', 'check', 'check_circle', 'chevron_down', 'chevron_left',
      'chevron_right', 'chevron_up', 'close', 'copy', 'delete', 'download', 'edit',
      'filter_list', 'globe', 'grid_off', 'grid_on', 'help', 'info', 'logout', 'map',
      'menu', 'more_vert', 'open_in_full', 'open_in_new', 'pause', 'play_arrow', 'print',
      'refresh', 'remove', 'satellite', 'search', 'settings', 'sort', 'star', 'star_filled',
      'swap_horiz', 'sync', 'warning_circle', 'warning_tri', 'freeview',
    ];
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '16px' }}>
        {icons.map((name) => (
          <div
            key={name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '16px',
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '8px',
              gap: '8px',
            }}
          >
            <Icon name={name} size={24} color="var(--color-on-surface-dark)" />
            <span style={{ fontSize: '10px', color: 'var(--color-grey-400)', textAlign: 'center' }}>
              {name}
            </span>
          </div>
        ))}
      </div>
    );
  },
};
