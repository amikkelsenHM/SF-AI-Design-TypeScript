import { createServer } from 'http';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const UI_PACKAGE_PATH = join(__dirname, '../../..', 'packages/ui');

// Load design system rules
function loadDesignRules(): string {
  try {
    return readFileSync(join(UI_PACKAGE_PATH, 'DESIGN_SYSTEM_RULES.md'), 'utf-8');
  } catch {
    return 'Design rules file not found.';
  }
}

// Tokens (same as in index.ts)
const tokens = {
  colors: {
    primary: { 100: '#e9e0fb', 200: '#c9b1f4', 300: '#ac80ed', 400: '#924ae4', 500: '#6b29ae', 600: '#41166d', 700: '#1a0531' },
    secondary: { 100: '#ffecf2', 200: '#ffbed6', 300: '#ff7eb6', 400: '#fb0098', 500: '#ba0070', 600: '#7d0049', 700: '#450026' },
    grey: { 100: '#e5e4e6', 200: '#bdbcc0', 300: '#97959c', 400: '#737079', 500: '#504e55', 600: '#2f2e33', 700: '#111113', 900: '#120B0D' },
    surface: { dark: '#100919', darkContrast: '#292134', darkProgress: '#312A39', light: '#FFFFFF' },
    brand: { mediumOrchid: '#CF8BFF', deepPurple: '#6B29AE', chinaPink: '#D8749D', greyPurple: '#674A86', hanBlue: '#5865C6', brightBlue: '#1686E8' },
    border: { dark: '#1A1520', onDark: '#EEEEEE', focus: '#1686E8', disabled: '#e6e6e6' },
  },
  typography: {
    fontFamily: { ibmPlexSans: '"IBM Plex Sans", sans-serif', nbArchitekt: '"NB Architekt Std", sans-serif' },
    fontWeight: { regular: 400, medium: 500, bold: 700 },
    fontSize: { 8: '8px', 10: '10px', 12: '12px', 14: '14px', 16: '16px', 18: '18px', 28: '28px', 35: '35px', 55: '55px' },
  },
};

// Component schemas
const componentSchemas: Record<string, object> = {
  Button: {
    name: 'Button',
    props: { variant: "'primary' | 'secondary' | 'tertiary'", size: "'sm' | 'lg' | 'icon' | 'icon-sm'", disabled: 'boolean', children: 'React.ReactNode' },
    example: `<Button variant="primary" size="sm">Click me</Button>`,
  },
  Input: {
    name: 'Input',
    props: { error: 'boolean', placeholder: 'string', disabled: 'boolean' },
    example: `<Input placeholder="Enter text..." />`,
  },
  Text: {
    name: 'Text',
    props: { variant: "'body-large' | 'body-small' | 'label' | ...", as: "'span' | 'p' | 'div'" },
    example: `<Text variant="body-large">Hello</Text>`,
  },
  Heading: {
    name: 'Heading',
    props: { variant: "'display-large' | 'heading-large' | 'heading-medium' | 'overline-large' | 'overline-medium'", as: "'h1' | 'h2' | ..." },
    example: `<Heading variant="heading-large">Title</Heading>`,
  },
  Checkbox: {
    name: 'Checkbox',
    props: { label: 'string', checked: 'boolean', disabled: 'boolean' },
    example: `<Checkbox label="Accept terms" />`,
  },
  Badge: {
    name: 'Badge',
    props: { variant: "'success' | 'warning' | 'error' | 'processing'", showDot: 'boolean' },
    example: `<Badge variant="success">Active</Badge>`,
  },
};

const PORT = 3456;

const server = createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url || '/', `http://localhost:${PORT}`);
  const path = url.pathname;

  // Routes
  if (path === '/' || path === '/health') {
    res.writeHead(200);
    res.end(JSON.stringify({ status: 'ok', server: 'spaceflux-mcp', version: '0.1.0' }));
    return;
  }

  if (path === '/resources') {
    res.writeHead(200);
    res.end(JSON.stringify({
      resources: [
        { uri: 'spaceflux://rules', name: 'Design System Rules' },
        { uri: 'spaceflux://tokens', name: 'Design Tokens' },
      ],
    }));
    return;
  }

  if (path === '/resources/rules') {
    res.writeHead(200);
    res.end(JSON.stringify({ content: loadDesignRules() }));
    return;
  }

  if (path === '/resources/tokens') {
    res.writeHead(200);
    res.end(JSON.stringify(tokens));
    return;
  }

  if (path === '/tools') {
    res.writeHead(200);
    res.end(JSON.stringify({
      tools: [
        { name: 'get_component_schema', description: 'Get component props and example' },
        { name: 'list_components', description: 'List all components' },
        { name: 'validate_code_snippet', description: 'Validate code against design system' },
      ],
    }));
    return;
  }

  if (path === '/tools/list_components') {
    res.writeHead(200);
    res.end(JSON.stringify({ components: Object.keys(componentSchemas) }));
    return;
  }

  if (path.startsWith('/tools/get_component_schema/')) {
    const componentName = path.split('/').pop();
    const schema = componentSchemas[componentName || ''];
    if (schema) {
      res.writeHead(200);
      res.end(JSON.stringify(schema));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: `Component not found. Available: ${Object.keys(componentSchemas).join(', ')}` }));
    }
    return;
  }

  // 404
  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Not found', availableEndpoints: ['/', '/resources', '/resources/rules', '/resources/tokens', '/tools', '/tools/list_components', '/tools/get_component_schema/:name'] }));
});

server.listen(PORT, () => {
  console.log(`
┌─────────────────────────────────────────────────────────┐
│  Spaceflux MCP Server (HTTP Test Interface)             │
│  Running at: http://localhost:${PORT}                      │
├─────────────────────────────────────────────────────────┤
│  Endpoints:                                             │
│    GET /                     - Health check             │
│    GET /resources            - List resources           │
│    GET /resources/rules      - Design system rules      │
│    GET /resources/tokens     - Design tokens JSON       │
│    GET /tools                - List available tools     │
│    GET /tools/list_components - List all components     │
│    GET /tools/get_component_schema/:name - Get schema   │
└─────────────────────────────────────────────────────────┘
  `);
});
