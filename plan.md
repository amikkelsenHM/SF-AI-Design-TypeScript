# Implementation Plan: Spaceflux Design System & MCP

**Objective:** Refactor the existing vanilla HTML/CSS design system into a modern TypeScript/React library and establish a local Model Context Protocol (MCP) server to act as a design intelligence source for AI coding assistants.

---

## Phase 1: Infrastructure & Monorepo Setup
**Goal:** Establish a scalable development environment supporting both the UI library and the MCP server.

1.  **Initialize Workspace**
    * Create a monorepo structure (using pnpm workspaces or turborepo) to separate the UI logic from the server logic.
    * **Target Structure:**
        * packages/ui: The React component library.
        * apps/mcp-server: The local AI integration server.
        * apps/docs: Storybook documentation.

2.  **Configure UI Package (packages/ui)**
    * Initialize a React + TypeScript project in "Library Mode".
    * Configure the bundler (Vite or tsup) to output ESM and CJS formats.
    * Set up linting (ESLint) and formatting (Prettier) rules to enforce code quality.
    * Install necessary dev dependencies (React, ReactDOM, Types/Node).

3.  **Configure Documentation (apps/docs)**
    * Initialize Storybook.
    * Configure Storybook to reference stories inside packages/ui.

---

## Phase 2: Design Token & Asset Migration
**Goal:** Transform CSS variables into a typed system that acts as the "Single Source of Truth" for both the browser and the AI.

1.  **Migrate CSS Variables**
    * Move variables.css into the UI package.
    * Create a TypeScript mapping file (tokens.ts) that mirrors the CSS variables.
    * *Why:* This allows the MCP server to programmatically tell the AI what specific colors, spacings, and fonts are available as valid tokens.

2.  **Migrate Global Styles**
    * Port typography.css and utilities.css.
    * Ensure font assets and icons are correctly placed in the public/assets folder or imported via a standard CSS import strategy.

3.  **Documentation Integration**
    * Move DESIGN_SYSTEM_RULES.md into the root of the UI package.
    * Update the rules to reflect React best practices (e.g., "Use Props instead of Classes").

---

## Phase 3: Component Porting (Vanilla to React)
**Goal:** Convert HTML snippets and vanilla JS scripts into reusable, strongly-typed React components.

1.  **Port Atoms (Basic Elements)**
    * **Buttons:** Convert button classes to a <Button /> component with variant and size props.
    * **Inputs:** Create <Input />, <Select />, and <Checkbox /> components wrapping the native HTML elements with standard styling.
    * **Typography:** Create <Heading /> and <Text /> components to enforce the design system's typography scale.

2.  **Port Molecules (Interactive Elements)**
    * **Sidenav:**
        * Convert navigation-preview.html structure to a <Sidenav /> component.
        * Replace the vanilla JS toggle logic in scripts/ with React useState and context.
        * Define TypeScript interfaces for navigation items (icon, label, route).
    * **Breadcrumbs:** Create a dynamic component that accepts a path array.
    * **Tooltips:** Wrap the CSS tooltip logic into a React component for easier usage.

3.  **Port Organisms (Complex Layouts)**
    * **Data Tables:** Create a <Table /> component that accepts data arrays.
    * **Cards/Containers:** Create generic layout wrappers using the system's spacing tokens.

4.  **Type Definitions**
    * Ensure every component exports a standard Interface (e.g., export interface ButtonProps ...).
    * Strictly type all event handlers (e.g., onClick, onChange).

---

## Phase 4: Local MCP Server Development
**Goal:** Create an AI-accessible backend that serves the design system's schema and rules to tools like Windsurf.

1.  **Server Initialization**
    * Initialize a TypeScript project in apps/mcp-server.
    * Install the @modelcontextprotocol/sdk.

2.  **Implement Resources (Read-Only Data)**
    * **Resource: spaceflux://rules**
        * *Action:* Read and return the content of DESIGN_SYSTEM_RULES.md.
    * **Resource: spaceflux://tokens**
        * *Action:* Return the JSON object of all design tokens (colors, spacing, fonts) derived from tokens.ts.

3.  **Implement Tools (Executable Actions)**
    * **Tool: get_component_schema**
        * *Function:* Accepts a component name (e.g., "Button") and returns its TypeScript interface, Prop definitions, and a basic usage example.
    * **Tool: validate_code_snippet (QA)**
        * *Function:* Accepts a React code snippet. Checks if the snippet uses valid tokens and components. Returns "Pass" or "Fail" with suggestions.
    * **Tool: list_components**
        * *Function:* Returns a list of all available components in the system to help the AI discover what exists.

---

## Phase 5: Verification & QA
**Goal:** Ensure the new system matches the old visual design and functions correctly.

1.  **Visual Regression (Storybook)**
    * Create a Story for every ported component.
    * Compare the Storybook rendering side-by-side with the original index.html to ensure pixel perfection.

2.  **AI Workflow Test**
    * Connect the local MCP server.
    * **Test Prompt:** "Create a new settings page layout using the Spaceflux design system."
    * **Success Criteria:** The AI should automatically query the MCP server for the Sidenav and Form components and generate code that imports them from @spaceflux/ui with correct props.

---

## Execution Checklist

- [x] Repository initialized (Monorepo)
- [x] CSS Variables migrated to TypeScript tokens.ts 
- [x] All Atoms ported to React
- [x] Sidenav & Navigation logic ported to React
- [x] Storybook running and documenting components
- [x] MCP Server running locally
- [x] MCP Tool get_component_schema operational
- [x] Codebase cleanup & optimization complete
- [ ] Final Design QA complete