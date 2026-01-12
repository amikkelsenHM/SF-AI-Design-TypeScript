# Spaceflux Design System Rules

## 1. Core Principle
This is a **React + TypeScript** component library. Import components from `@spaceflux/ui`.
**DO NOT** use Tailwind CSS. **DO NOT** use external component libraries like Shadcn, Radix, or Material UI unless explicitly requested.

## 2. Installation & Setup

```tsx
// Import styles once in your app entry point
import '@spaceflux/ui/styles.css';

// Import components as needed
import { Button, Input, Table, Sidenav } from '@spaceflux/ui';
```

## 3. Component Reference

### Atoms (Basic Elements)
| Component | Props | Example |
|-----------|-------|---------|
| `Button` | `variant: 'primary' \| 'secondary' \| 'tertiary'`, `size: 'sm' \| 'lg' \| 'icon'` | `<Button variant="primary">Click</Button>` |
| `Input` | `error?: boolean`, `placeholder?: string` | `<Input placeholder="Enter text..." />` |
| `Checkbox` | `label?: string`, `checked?: boolean` | `<Checkbox label="Accept terms" />` |
| `RadioButton` | `label?: string`, `name: string`, `value: string` | `<RadioButton label="Option A" name="opts" value="a" />` |
| `Badge` | `variant: 'success' \| 'warning' \| 'error' \| 'processing'` | `<Badge variant="success">Active</Badge>` |

### Typography
| Component | Props | Example |
|-----------|-------|---------|
| `Heading` | `variant: 'display-large' \| 'heading-large' \| 'heading-medium' \| 'overline-large' \| 'overline-medium'` | `<Heading variant="heading-large">Title</Heading>` |
| `Text` | `variant: 'body-large' \| 'body-small' \| 'cta-large' \| 'link-small' \| 'label'` | `<Text variant="body-small">Content</Text>` |

### Molecules (Interactive)
| Component | Props | Example |
|-----------|-------|---------|
| `Dropdown` | `options: DropdownOption[]`, `value?: string`, `onChange?: (v) => void` | `<Dropdown options={opts} value={val} onChange={setVal} />` |
| `Tooltip` | `content: ReactNode`, `children: ReactNode` | `<Tooltip content="Help text"><Button>?</Button></Tooltip>` |
| `Breadcrumb` | `items: BreadcrumbItem[]` | `<Breadcrumb items={[{label:'Home'},{label:'Page'}]} />` |
| `DatePicker` | `value?: Date`, `onChange?: (d) => void` | `<DatePicker value={date} onChange={setDate} />` |

### Organisms (Complex)
| Component | Props | Example |
|-----------|-------|---------|
| `Table` | `columns: TableColumn[]`, `data: T[]`, `onRowClick?: (row) => void` | `<Table columns={cols} data={rows} />` |
| `Sidenav` | `items: SidenavItem[]`, `activeId?: string`, `collapsed?: boolean` | `<Sidenav items={navItems} activeId="home" />` |
| `Icon` | `name: IconName`, `size?: number`, `color?: string` | `<Icon name="settings" size={24} />` |

## 4. Design Tokens

### Colors (use via CSS variables or tokens import)
```tsx
import { colors } from '@spaceflux/ui';
// colors.brand.mediumOrchid -> '#CF8BFF'
```
- **Background:** `var(--color-surface-dark)` — `#100919`
- **Primary Brand:** `var(--color-brand-medium-orchid)` — `#CF8BFF`
- **Text:** `var(--color-on-surface-dark)` — `#EEEEEE`
- **Borders:** `var(--color-border-on-dark-subtle)` — `#3D3D3D`

### Typography Scale
- **Display Large:** 55px / NB Architekt Bold
- **Heading Large:** 28px / NB Architekt Bold  
- **Heading Medium:** 20px / IBM Plex Sans Bold
- **Body Large:** 16px / IBM Plex Sans Regular
- **Body Small:** 14px / IBM Plex Sans Regular

## 5. Implementation Rules for AI
1. **Import styles:** Always add `import '@spaceflux/ui/styles.css'` in the app entry.
2. **Use typed props:** All components export TypeScript interfaces (e.g., `ButtonProps`).
3. **Prefer composition:** Use `children` prop over custom content props.
4. **No external UI libs:** Build custom layouts using the provided components.
5. **Icons:** Use the built-in `Icon` component with `name` prop (50+ icons available).
