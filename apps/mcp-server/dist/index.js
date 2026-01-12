import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListResourcesRequestSchema, ListToolsRequestSchema, ReadResourceRequestSchema, } from '@modelcontextprotocol/sdk/types.js';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const UI_PACKAGE_PATH = join(__dirname, '../../..', 'packages/ui');
// Load design system rules
function loadDesignRules() {
    try {
        return readFileSync(join(UI_PACKAGE_PATH, 'DESIGN_SYSTEM_RULES.md'), 'utf-8');
    }
    catch {
        return 'Design rules file not found.';
    }
}
// Load tokens from the built package
function loadTokens() {
    const tokens = {
        colors: {
            primary: { 100: '#e9e0fb', 200: '#c9b1f4', 300: '#ac80ed', 400: '#924ae4', 500: '#6b29ae', 600: '#41166d', 700: '#1a0531' },
            secondary: { 100: '#ffecf2', 200: '#ffbed6', 300: '#ff7eb6', 400: '#fb0098', 500: '#ba0070', 600: '#7d0049', 700: '#450026' },
            grey: { 100: '#e5e4e6', 200: '#bdbcc0', 300: '#97959c', 400: '#737079', 500: '#504e55', 600: '#2f2e33', 700: '#111113', 900: '#120B0D' },
            surface: { dark: '#100919', darkContrast: '#292134', darkProgress: '#312A39', light: '#FFFFFF' },
            brand: { mediumOrchid: '#CF8BFF', deepPurple: '#6B29AE', chinaPink: '#D8749D', greyPurple: '#674A86', hanBlue: '#5865C6', brightBlue: '#1686E8' },
            border: { dark: '#1A1520', onDark: '#EEEEEE', focus: '#1686E8', disabled: '#e6e6e6' },
            semantic: {
                error: { surface: '#CF0019', border: '#7F000F', onSurface: '#FF8594' },
                warning: { surface: '#DCAA00', border: '#654E00', onSurface: '#FFDB62' },
                success: { surface: '#00B55F', border: '#057023', onSurface: '#B0FFB8' },
            },
        },
        typography: {
            fontFamily: { ibmPlexSans: '"IBM Plex Sans", sans-serif', nbArchitekt: '"NB Architekt Std", sans-serif', helvetica: '"Helvetica", sans-serif' },
            fontWeight: { regular: 400, medium: 500, bold: 700 },
            fontSize: { 8: '8px', 10: '10px', 12: '12px', 14: '14px', 16: '16px', 18: '18px', 28: '28px', 35: '35px', 36: '36px', 55: '55px' },
        },
    };
    return tokens;
}
// Component schemas for the get_component_schema tool
const componentSchemas = {
    Button: {
        name: 'Button',
        description: 'A button component with multiple variants and sizes',
        props: {
            variant: { type: "'primary' | 'secondary' | 'tertiary'", default: "'primary'", description: 'Visual style variant' },
            size: { type: "'sm' | 'lg' | 'icon' | 'icon-sm'", default: "'sm'", description: 'Button size' },
            disabled: { type: 'boolean', default: 'false', description: 'Disable the button' },
            children: { type: 'React.ReactNode', required: true, description: 'Button content' },
        },
        example: `import { Button } from '@spaceflux/ui';

<Button variant="primary" size="sm">
  Click me
</Button>`,
    },
    Input: {
        name: 'Input',
        description: 'A text input field with error state support',
        props: {
            error: { type: 'boolean', default: 'false', description: 'Show error border state' },
            placeholder: { type: 'string', description: 'Placeholder text' },
            disabled: { type: 'boolean', default: 'false', description: 'Disable the input' },
        },
        example: `import { Input } from '@spaceflux/ui';

<Input placeholder="Enter text..." error={false} />`,
    },
    Text: {
        name: 'Text',
        description: 'Typography component for body text and labels',
        props: {
            variant: { type: "'body-large' | 'body-small' | 'body-bold-large' | 'body-bold-small' | 'cta-large' | 'cta-small' | 'link-large' | 'link-small' | 'footnote' | 'helper' | 'label' | 'label-bold'", default: "'body-small'" },
            as: { type: "'span' | 'p' | 'div' | 'label'", default: "'span'", description: 'HTML element to render' },
            children: { type: 'React.ReactNode', required: true },
        },
        example: `import { Text } from '@spaceflux/ui';

<Text variant="body-large">Hello world</Text>`,
    },
    Heading: {
        name: 'Heading',
        description: 'Typography component for headings and display text',
        props: {
            variant: { type: "'display-large' | 'heading-large' | 'heading-medium' | 'overline-large' | 'overline-medium'", default: "'heading-medium'" },
            as: { type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div'", description: 'HTML element (auto-selected based on variant)' },
            children: { type: 'React.ReactNode', required: true },
        },
        example: `import { Heading } from '@spaceflux/ui';

<Heading variant="heading-large">Page Title</Heading>`,
    },
    Checkbox: {
        name: 'Checkbox',
        description: 'A checkbox input with optional label',
        props: {
            label: { type: 'string', description: 'Label text displayed next to checkbox' },
            checked: { type: 'boolean', description: 'Controlled checked state' },
            disabled: { type: 'boolean', default: 'false' },
            onChange: { type: '(e: ChangeEvent) => void', description: 'Change handler' },
        },
        example: `import { Checkbox } from '@spaceflux/ui';

<Checkbox label="Accept terms" onChange={(e) => console.log(e.target.checked)} />`,
    },
    Badge: {
        name: 'Badge',
        description: 'Status badge with semantic color variants',
        props: {
            variant: { type: "'success' | 'warning' | 'error' | 'processing'", default: "'processing'" },
            showDot: { type: 'boolean', default: 'true', description: 'Show status indicator dot' },
            children: { type: 'React.ReactNode', required: true },
        },
        example: `import { Badge } from '@spaceflux/ui';

<Badge variant="success">Active</Badge>`,
    },
    Table: {
        name: 'Table',
        description: 'Data table component with customizable columns and row click handling',
        props: {
            columns: { type: 'TableColumn<T>[]', required: true, description: 'Column definitions with key, header, and optional render function' },
            data: { type: 'T[]', required: true, description: 'Array of data objects to display' },
            onRowClick: { type: '(row: T, index: number) => void', description: 'Callback when a row is clicked' },
        },
        example: `import { Table, Badge } from '@spaceflux/ui';

<Table
  columns={[
    { key: 'name', header: 'Name' },
    { key: 'status', header: 'Status', render: (v) => <Badge variant={v}>{v}</Badge> },
  ]}
  data={[{ name: 'Item 1', status: 'success' }]}
/>`,
    },
    Dropdown: {
        name: 'Dropdown',
        description: 'Select dropdown with options, error/success states',
        props: {
            options: { type: 'DropdownOption[]', required: true, description: 'Array of { value, label } options' },
            value: { type: 'string', description: 'Currently selected value' },
            placeholder: { type: 'string', default: "'Select...'" },
            onChange: { type: '(value: string) => void', description: 'Selection change handler' },
            error: { type: 'boolean', default: 'false' },
            success: { type: 'boolean', default: 'false' },
        },
        example: `import { Dropdown } from '@spaceflux/ui';

<Dropdown
  options={[{ value: 'a', label: 'Option A' }, { value: 'b', label: 'Option B' }]}
  value={selected}
  onChange={setSelected}
/>`,
    },
    Tooltip: {
        name: 'Tooltip',
        description: 'Hover tooltip that displays additional content',
        props: {
            content: { type: 'React.ReactNode', required: true, description: 'Tooltip content to display' },
            children: { type: 'React.ReactNode', required: true, description: 'Element that triggers the tooltip' },
        },
        example: `import { Tooltip, Button } from '@spaceflux/ui';

<Tooltip content="Helpful information">
  <Button>Hover me</Button>
</Tooltip>`,
    },
    Breadcrumb: {
        name: 'Breadcrumb',
        description: 'Navigation breadcrumb trail',
        props: {
            items: { type: 'BreadcrumbItem[]', required: true, description: 'Array of { label, href?, onClick? } items' },
        },
        example: `import { Breadcrumb } from '@spaceflux/ui';

<Breadcrumb items={[
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Settings' }
]} />`,
    },
    DatePicker: {
        name: 'DatePicker',
        description: 'Calendar date picker component',
        props: {
            value: { type: 'Date', description: 'Selected date' },
            onChange: { type: '(date: Date) => void', description: 'Date selection handler' },
            label: { type: 'string', default: "'Select Date'" },
        },
        example: `import { DatePicker } from '@spaceflux/ui';

<DatePicker value={date} onChange={setDate} label="Event Date" />`,
    },
    Sidenav: {
        name: 'Sidenav',
        description: 'Collapsible side navigation component',
        props: {
            items: { type: 'SidenavItem[]', required: true, description: 'Navigation items with id, label, icon' },
            activeId: { type: 'string', description: 'ID of the currently active item' },
            collapsed: { type: 'boolean', description: 'Whether the nav is collapsed' },
            onToggle: { type: '(collapsed: boolean) => void', description: 'Toggle callback' },
            onItemClick: { type: '(item: SidenavItem) => void', description: 'Item click handler' },
            logo: { type: 'React.ReactNode', description: 'Logo for expanded state' },
            logoCollapsed: { type: 'React.ReactNode', description: 'Logo for collapsed state' },
        },
        example: `import { Sidenav, Icon } from '@spaceflux/ui';

<Sidenav
  items={[
    { id: 'home', label: 'Home', icon: <Icon name="grid_on" /> },
    { id: 'settings', label: 'Settings', icon: <Icon name="settings" /> },
  ]}
  activeId="home"
  onItemClick={(item) => navigate(item.id)}
/>`,
    },
    Icon: {
        name: 'Icon',
        description: 'SVG icon component with 50+ built-in icons',
        props: {
            name: { type: 'IconName', required: true, description: 'Icon name (e.g., "settings", "search", "globe")' },
            size: { type: 'number | string', default: '24', description: 'Icon size in pixels' },
            color: { type: 'string', default: "'currentColor'", description: 'Icon fill color' },
        },
        example: `import { Icon } from '@spaceflux/ui';

<Icon name="settings" size={24} color="var(--color-brand-medium-orchid)" />`,
    },
    RadioButton: {
        name: 'RadioButton',
        description: 'Radio button input with optional label',
        props: {
            label: { type: 'string', description: 'Label text' },
            name: { type: 'string', description: 'Radio group name' },
            value: { type: 'string', description: 'Radio value' },
            checked: { type: 'boolean', description: 'Controlled checked state' },
            disabled: { type: 'boolean', default: 'false' },
            onChange: { type: '(e: ChangeEvent) => void', description: 'Change handler' },
        },
        example: `import { RadioButton } from '@spaceflux/ui';

<RadioButton label="Option A" name="options" value="a" checked={selected === 'a'} onChange={() => setSelected('a')} />`,
    },
};
// Create the MCP server
const server = new Server({ name: 'spaceflux-design-system', version: '0.1.0' }, { capabilities: { resources: {}, tools: {} } });
// List available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => ({
    resources: [
        {
            uri: 'spaceflux://rules',
            name: 'Design System Rules',
            description: 'Guidelines and rules for using the Spaceflux design system',
            mimeType: 'text/markdown',
        },
        {
            uri: 'spaceflux://tokens',
            name: 'Design Tokens',
            description: 'Color, typography, and spacing tokens as JSON',
            mimeType: 'application/json',
        },
    ],
}));
// Read resource content
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const { uri } = request.params;
    if (uri === 'spaceflux://rules') {
        return {
            contents: [{ uri, mimeType: 'text/markdown', text: loadDesignRules() }],
        };
    }
    if (uri === 'spaceflux://tokens') {
        return {
            contents: [{ uri, mimeType: 'application/json', text: JSON.stringify(loadTokens(), null, 2) }],
        };
    }
    throw new Error(`Unknown resource: ${uri}`);
});
// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
        {
            name: 'get_component_schema',
            description: 'Get the TypeScript interface, props, and usage example for a Spaceflux UI component',
            inputSchema: {
                type: 'object',
                properties: {
                    componentName: {
                        type: 'string',
                        description: 'Name of the component (e.g., "Button", "Input", "Text")',
                    },
                },
                required: ['componentName'],
            },
        },
        {
            name: 'list_components',
            description: 'List all available components in the Spaceflux UI library',
            inputSchema: { type: 'object', properties: {} },
        },
        {
            name: 'validate_code_snippet',
            description: 'Validate if a code snippet follows Spaceflux design system guidelines',
            inputSchema: {
                type: 'object',
                properties: {
                    code: { type: 'string', description: 'React/JSX code snippet to validate' },
                },
                required: ['code'],
            },
        },
    ],
}));
// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    if (name === 'get_component_schema') {
        const componentName = args.componentName;
        const schema = componentSchemas[componentName];
        if (!schema) {
            const available = Object.keys(componentSchemas).join(', ');
            return {
                content: [{ type: 'text', text: `Component "${componentName}" not found. Available: ${available}` }],
            };
        }
        return {
            content: [{ type: 'text', text: JSON.stringify(schema, null, 2) }],
        };
    }
    if (name === 'list_components') {
        const components = Object.keys(componentSchemas).map((name) => ({
            name,
            description: componentSchemas[name].description,
        }));
        return {
            content: [{ type: 'text', text: JSON.stringify(components, null, 2) }],
        };
    }
    if (name === 'validate_code_snippet') {
        const code = args.code;
        const issues = [];
        const suggestions = [];
        // Check for Tailwind usage (should use design tokens instead)
        if (/className=["'][^"']*(?:bg-|text-|border-|p-|m-|flex|grid)[^"']*["']/.test(code) && !code.includes('var(--')) {
            issues.push('Code appears to use Tailwind classes without CSS variables');
            suggestions.push('Use CSS variables from @spaceflux/ui tokens for colors and spacing');
        }
        // Check for valid component imports
        const validComponents = Object.keys(componentSchemas);
        const importMatch = code.match(/import\s*{([^}]+)}\s*from\s*['"]@spaceflux\/ui['"]/);
        if (importMatch) {
            const imported = importMatch[1].split(',').map((s) => s.trim());
            const invalid = imported.filter((c) => !validComponents.includes(c));
            if (invalid.length > 0) {
                issues.push(`Unknown components imported: ${invalid.join(', ')}`);
                suggestions.push(`Valid components: ${validComponents.join(', ')}`);
            }
        }
        // Check for hardcoded colors
        if (/#[0-9a-fA-F]{3,8}/.test(code) && !code.includes('tokens')) {
            issues.push('Hardcoded color values detected');
            suggestions.push('Import and use design tokens from @spaceflux/ui for consistent theming');
        }
        const status = issues.length === 0 ? 'PASS' : 'FAIL';
        const result = {
            status,
            issues,
            suggestions,
            summary: issues.length === 0
                ? 'Code follows Spaceflux design system guidelines'
                : `Found ${issues.length} issue(s) that should be addressed`,
        };
        return {
            content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
    }
    throw new Error(`Unknown tool: ${name}`);
});
// Start the server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('Spaceflux MCP Server running on stdio');
}
main().catch(console.error);
