# Spaceflux Design System Rules

This document serves as the **primary instruction set** for generating UI code for the Spaceflux project.
**CRITICAL:** You must determine the **Target Mode** (Vanilla or React) before generating any code.

---

## 1. Shared Source of Truth (Tokens)
Regardless of the mode, **ALWAYS** use the following Design Tokens. Never hardcode hex values or fonts.

### Colors
*   **Primary:** `var(--color-brand-medium-orchid)`, `var(--color-brand-deep-purple)`
*   **Surfaces:** `var(--color-surface-dark)`, `var(--color-surface-dark-contrast)`
*   **Text:** `var(--color-on-surface-dark)`, `var(--color-on-surface-light)`
*   **Borders:** `var(--color-border-dark)`, `var(--color-border-focus)`
*   **DataViz:** `var(--color-dataviz-1)` through `var(--color-dataviz-15)`

### Typography
*   **Font Family:** `var(--font-family-ibm-plex-sans)`, `var(--font-family-nb-architekt)`
*   **Weights:** `var(--font-weight-regular)`, `var(--font-weight-medium)`, `var(--font-weight-bold)`

---

## 2. Operating Modes

### MODE A: Vanilla (Prototype)
**Use when:** Creating single-file prototypes, simple HTML/CSS demos, or when the user explicitly requests "plain HTML/CSS".

*   **File Structure:**
    ```html
    <link rel="stylesheet" href="styles/variables.css">
    <link rel="stylesheet" href="styles/typography.css">
    <link rel="stylesheet" href="styles/components.css">
    <link rel="stylesheet" href="styles/charts.css">
    <link rel="stylesheet" href="styles/utilities.css"> <!-- New Layout Utilities -->
    ```
*   **Component Usage:**
    *   **Buttons:** `<button class="btn btn-primary">`
    *   **Inputs:** `<input class="input-field">`
    *   **Tables:** `.table-v2`, `.badge`
    *   **Cards:** Use `div` with `class="bg-surface rounded-lg p-6 border"` (from utilities).
*   **Constraint:** Do NOT use Tailwind classes (e.g., `flex-row`, `p-4`) unless you add the definitions to a `<style>` block. **Exception:** You MAY use classes defined in `styles/utilities.css`.

### MODE B: React (Production/Next-Gen)
**Use when:** Building production features, using TypeScript, or when the user requests "Modern", "React", or "Tailwind".

*   **Reference Path:** `assets/cortex-refs/`
*   **Styling Engine:** Tailwind CSS + Radix UI
*   **Component Usage:**
    *   **Import:** `import { Button } from "@/components/ui/button"`
    *   **Syntax:** `<Button variant="primary" size="lg">Click Me</Button>`
*   **Available Components:**
    *   `Button`, `Input`, `Card`, `Select`, `Table`, `Dialog`, `Sheet`, `Tabs`
    *   Refer to `assets/cortex-refs/component-signatures.ts` for exact prop definitions.
*   **Constraint:** Do NOT use vanilla CSS classes (e.g., `.btn-primary`) inside React components. Use Tailwind utility classes or the component's `variant` prop.

---

## 3. Rules for AI Generation

1.  **Check the Context:** Look at the existing files.
    *   If you see `.html` files or `styles/*.css`, default to **Mode A (Vanilla)**.
    *   If you see `.tsx` files, `package.json`, or `postcss.config.js`, default to **Mode B (React)**.
2.  **Strict Separation:** Never mix the two modes in the same file.
    *   ❌ Don't use `<Button>` components in `index.html`.
    *   ❌ Don't use `class="btn btn-primary"` in a React file.
3.  **Variable Parity:** Both systems now share the exact same CSS variable names in `:root`. You can safely use `var(--color-brand-medium-orchid)` in Tailwind via arbitrary values `bg-[var(--color-brand-medium-orchid)]` or configured theme colors `bg-brand-medium-orchid`.

---

## 4. Component Hierarchy & Patterns

*   **Organisms:** Charts, Data Tables
*   **Complex Molecules:** Date Picker, Dropdowns
*   **Simple Molecules:** Sidenav, Tooltips, Breadcrumbs
*   **Atoms:** Inputs, Checkboxes, Radio Buttons, Buttons

### Key Component Patterns (Vanilla)
*   **Sidenav:** `.sidenav` (Container) > `.sidenav-logo` + `.sidenav-nav` > `.sidenav-item`
*   **Data Tables:** `.table-container` > `.table-v2`
*   **Charts:** `.chart-base` > `.chart-layout`

### Key Component Patterns (React)
*   **Card:**
    ```tsx
    <Card>
      <CardHeader><CardTitle>Title</CardTitle></CardHeader>
      <CardContent>...</CardContent>
    </Card>
    ```
*   **Button:** `<Button variant="primary">Action</Button>`

---
