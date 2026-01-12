# IDE Setup for Spaceflux MCP

This guide explains how to connect the Spaceflux MCP server to AI-powered code editors like Windsurf and Cursor.

## Prerequisites

1. Clone and build the Spaceflux design system (see [README.md](./README.md))
2. Ensure the MCP server is built: `pnpm build`

---

## Windsurf Configuration

Edit `~/.windsurf/mcp.json`:

```json
{
  "mcpServers": {
    "spaceflux": {
      "command": "node",
      "args": ["/absolute/path/to/spaceflux/apps/mcp-server/dist/index.js"],
      "env": {}
    }
  }
}
```

> **Important:** Replace `/absolute/path/to/spaceflux` with the actual path to your cloned repository.

### Example (macOS)

```json
{
  "mcpServers": {
    "spaceflux": {
      "command": "node",
      "args": ["/Users/yourname/projects/spaceflux/apps/mcp-server/dist/index.js"],
      "env": {}
    }
  }
}
```

---

## Cursor Configuration

Edit `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "spaceflux": {
      "command": "node",
      "args": ["/absolute/path/to/spaceflux/apps/mcp-server/dist/index.js"]
    }
  }
}
```

---

## Verify Connection

After saving the configuration:

1. **Restart your editor** completely (quit and reopen)
2. The MCP server should start automatically when the editor launches
3. Test by asking the AI:

> "List the available Spaceflux components"

The AI should query `list_components` and return the component list.

---

## Available MCP Resources

| Resource URI | Description |
|--------------|-------------|
| `spaceflux://rules` | Design system rules and guidelines |
| `spaceflux://tokens` | Design tokens (colors, typography, spacing) |

## Available MCP Tools

| Tool | Parameters | Description |
|------|------------|-------------|
| `list_components` | — | List all available components |
| `get_component_schema` | `name: string` | Get props, types, and examples for a component |
| `validate_code_snippet` | `code: string` | Validate code against design system rules |

---

## Test Prompts

Try these prompts to verify the integration is working:

### Component Query
> "What props does the Button component accept?"

Expected: AI queries `get_component_schema` with `name: "Button"` and returns variant, size, and other props.

### Code Generation
> "Create a settings page using the Spaceflux design system with a Sidenav, form inputs, and a submit button."

Expected: AI generates code that:
- Imports `@spaceflux/ui/styles.css`
- Imports components from `@spaceflux/ui`
- Uses correct props and variants

### Validation
> "Is this code following Spaceflux guidelines: `<button className='btn'>Click</button>`"

Expected: AI uses `validate_code_snippet` and reports that raw HTML should use `<Button>` from `@spaceflux/ui`.

---

## Troubleshooting

### MCP not loading

1. Check the path is absolute and correct
2. Verify the build exists: `ls /path/to/spaceflux/apps/mcp-server/dist/index.js`
3. Test manually: `node /path/to/spaceflux/apps/mcp-server/dist/index.js`

### Server not responding

1. Check Node.js version: `node --version` (must be 18+)
2. Rebuild: `pnpm --filter @spaceflux/mcp-server build`

### HTTP Testing Mode

For debugging, you can run the server in HTTP mode:

```bash
cd /path/to/spaceflux
pnpm mcp:http
```

Then test endpoints directly:

```bash
curl http://localhost:3456/health
curl http://localhost:3456/tools/list_components
curl "http://localhost:3456/tools/get_component_schema?name=Sidenav"
```

---

## Multiple Projects

If you work on multiple projects that use Spaceflux, the same MCP configuration works globally. The AI will use the design system context whenever you're working in a project that imports `@spaceflux/ui`.
