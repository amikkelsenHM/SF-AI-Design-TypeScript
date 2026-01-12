# Spaceflux Design System

A React + TypeScript component library featuring dark mode aesthetics, design tokens, and reusable UI components with MCP server integration for AI coding assistants.

## Prerequisites

- **Node.js** 18.0.0 or higher
- **pnpm** 8.0.0 or higher (`npm install -g pnpm`)

## Quick Start

### 1. Clone and Build

```bash
git clone <repository-url> spaceflux-design-system
cd spaceflux-design-system
pnpm install
pnpm build
```

### 2. Explore Components

```bash
pnpm storybook
```

Open http://localhost:6006 to browse all components.

### 3. Use in Your Project

**Option A: Link locally**
```bash
# In spaceflux directory
cd packages/ui && pnpm link --global

# In your project
pnpm link --global @spaceflux/ui
```

**Option B: Install from path**
```json
{
  "dependencies": {
    "@spaceflux/ui": "file:../path-to-spaceflux/packages/ui"
  }
}
```

### 4. Import and Use

```tsx
// Import styles once in your app entry
import '@spaceflux/ui/styles.css';

// Import and use components
import { Button, Input, Sidenav, Icon } from '@spaceflux/ui';

function App() {
  return <Button variant="primary">Click me</Button>;
}
```

---

## Monorepo Structure

```
├── packages/ui/          # @spaceflux/ui component library
├── apps/docs/            # Storybook documentation
├── apps/mcp-server/      # MCP server for AI integration
├── assets/               # Fonts, logos, icons
└── _legacy/              # Original HTML/CSS reference
```

## Development Commands

| Command | Description |
|---------|-------------|
| `pnpm install` | Install dependencies |
| `pnpm build` | Build all packages |
| `pnpm storybook` | Start Storybook (port 6006) |
| `pnpm mcp:http` | Start MCP HTTP server (port 3456) |

---

## Components

### Atoms
| Component | Props | Example |
|-----------|-------|-------|
| `Button` | `variant: 'primary' \| 'secondary' \| 'tertiary'` | `<Button variant="primary">Click</Button>` |
| `Input` | `error?: boolean`, `placeholder?: string` | `<Input placeholder="Enter text..." />` |
| `Checkbox` | `label?: string`, `checked?: boolean` | `<Checkbox label="Accept terms" />` |
| `RadioButton` | `label?: string`, `name: string` | `<RadioButton label="Option A" name="opts" />` |
| `Badge` | `variant: 'success' \| 'warning' \| 'error'` | `<Badge variant="success">Active</Badge>` |
| `Icon` | `name: IconName`, `size?: number` | `<Icon name="settings" size={24} />` |

### Typography
| Component | Props | Example |
|-----------|-------|-------|
| `Heading` | `variant: 'display-large' \| 'heading-large' \| 'heading-medium'` | `<Heading variant="heading-large">Title</Heading>` |
| `Text` | `variant: 'body-large' \| 'body-small' \| 'label'` | `<Text variant="body-small">Content</Text>` |

### Molecules
| Component | Props | Example |
|-----------|-------|-------|
| `Dropdown` | `options: DropdownOption[]`, `value?: string` | `<Dropdown options={opts} onChange={setVal} />` |
| `Tooltip` | `content: ReactNode` | `<Tooltip content="Help"><Button>?</Button></Tooltip>` |
| `Breadcrumb` | `items: BreadcrumbItem[]` | `<Breadcrumb items={[{label:'Home'}]} />` |
| `DatePicker` | `value?: Date`, `onChange?: (d) => void` | `<DatePicker value={date} onChange={setDate} />` |

### Organisms
| Component | Props | Example |
|-----------|-------|-------|
| `Table` | `columns: TableColumn[]`, `data: T[]` | `<Table columns={cols} data={rows} />` |
| `Sidenav` | `items: SidenavItem[]`, `activeId?: string` | `<Sidenav items={navItems} activeId="home" />` |

---

## Design Tokens

### CSS Variables
| Token | Variable | Value |
|-------|----------|-------|
| Background | `--color-surface-dark` | #100919 |
| Brand Primary | `--color-brand-medium-orchid` | #CF8BFF |
| Text | `--color-on-surface-dark` | #EEEEEE |
| Border | `--color-border-on-dark-subtle` | #3D3D3D |

### TypeScript Access
```tsx
import { colors, typography, tokens } from '@spaceflux/ui';

colors.brand.mediumOrchid  // '#CF8BFF'
colors.surface.dark        // '#100919'
```

---

## MCP Server

The MCP server enables AI coding assistants to query the design system.

### Test the Server

```bash
# Start HTTP server
pnpm mcp:http

# Test endpoints
curl http://localhost:3456/tools/list_components
curl "http://localhost:3456/tools/get_component_schema?name=Button"
```

### Resources & Tools

| Resource/Tool | Description |
|---------------|-------------|
| `spaceflux://rules` | Design system rules |
| `spaceflux://tokens` | Design tokens JSON |
| `list_components` | List all available components |
| `get_component_schema` | Get component props and examples |
| `validate_code_snippet` | Validate code against rules |

For AI IDE integration (Windsurf/Cursor), see **[IDE_SETUP.md](./IDE_SETUP.md)**.

---

## Example: New Project

```bash
pnpm create vite my-app --template react-ts
cd my-app
pnpm add @spaceflux/ui@file:../path-to-spaceflux/packages/ui
```

```tsx
// src/main.tsx
import '@spaceflux/ui/styles.css';
import App from './App';
// ...

// src/App.tsx
import { Sidenav, Icon, Heading, Button, Input } from '@spaceflux/ui';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <Icon name="grid_on" /> },
  { id: 'settings', label: 'Settings', icon: <Icon name="settings" /> },
];

function App() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#100919' }}>
      <Sidenav items={navItems} activeId="dashboard" />
      <main style={{ marginLeft: 252, padding: 32 }}>
        <Heading variant="heading-large">Welcome</Heading>
        <Input placeholder="Search..." />
        <Button variant="primary">Submit</Button>
      </main>
    </div>
  );
}
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Styles not loading | Add `import '@spaceflux/ui/styles.css'` to app entry |
| Components not found | Rebuild: `pnpm --filter @spaceflux/ui build` |
| MCP not connecting | Check server: `curl http://localhost:3456/health` |

---

## Documentation

- **[Storybook](http://localhost:6006)** — Interactive component docs
- **[DESIGN_SYSTEM_RULES.md](./DESIGN_SYSTEM_RULES.md)** — AI implementation guidelines
- **[IDE_SETUP.md](./IDE_SETUP.md)** — Windsurf/Cursor MCP configuration
