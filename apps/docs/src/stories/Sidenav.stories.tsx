import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Sidenav, Icon } from '@spaceflux/ui';

const meta: Meta<typeof Sidenav> = {
  title: 'Components/Sidenav',
  component: Sidenav,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Sidenav>;

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <Icon name="grid_on" size={24} /> },
  { id: 'tracking', label: 'Object Tracking', icon: <Icon name="satellite" size={24} /> },
  { id: 'network', label: 'Sensor Network', icon: <Icon name="globe" size={24} /> },
  { id: 'analytics', label: 'Analytics', icon: <Icon name="sort" size={24} /> },
  { id: 'settings', label: 'Settings', icon: <Icon name="settings" size={24} /> },
];

export const Expanded: Story = {
  render: () => {
    const [activeId, setActiveId] = useState('dashboard');
    return (
      <div style={{ height: '500px', display: 'flex' }}>
        <Sidenav
          items={navItems}
          activeId={activeId}
          onItemClick={(item) => setActiveId(item.id)}
          collapsed={false}
        />
      </div>
    );
  },
};

export const Collapsed: Story = {
  render: () => {
    const [activeId, setActiveId] = useState('tracking');
    return (
      <div style={{ height: '500px', display: 'flex' }}>
        <Sidenav
          items={navItems}
          activeId={activeId}
          onItemClick={(item) => setActiveId(item.id)}
          collapsed={true}
        />
      </div>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const [activeId, setActiveId] = useState('dashboard');
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div style={{ height: '500px', display: 'flex' }}>
        <Sidenav
          items={navItems}
          activeId={activeId}
          onItemClick={(item) => setActiveId(item.id)}
          collapsed={collapsed}
          onToggle={setCollapsed}
        />
        <div style={{ flex: 1, padding: '24px', color: 'var(--color-on-surface-dark)' }}>
          <h2>Active: {activeId}</h2>
          <p>Click the toggle button to collapse/expand the navigation.</p>
        </div>
      </div>
    );
  },
};
