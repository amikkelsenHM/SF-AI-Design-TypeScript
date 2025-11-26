# Design System Rules

This document serves as the instruction set for generating UI code for the Spaceflux project. All future AI sessions must adhere to these rules to ensure consistency.

## 1. Source of Truth
*   **Styles:** The design system is implemented in standard CSS variables and utility classes.
    *   `styles/variables.css`: Defines all colors, typography, and primitive tokens.
    *   `styles/typography.css`: Defines font faces and typography utility classes.
    *   `styles/components.css`: Defines the styling for core components (buttons, inputs, tables, pickers).
*   **Reference:** The file `reference_components.html` contains the canonical HTML markup for all supported components.
    *   **RULE:** Always check `reference_components.html` for the correct DOM structure and class names before generating new UI components.

## 2. Import Structure
When creating new HTML pages or components, always include the CSS files in the following order:

```html
<link rel="stylesheet" href="styles/variables.css">
<link rel="stylesheet" href="styles/typography.css">
<link rel="stylesheet" href="styles/components.css">
```

## 3. Naming Conventions & Usage

### Typography
Use the utility classes defined in `styles/typography.css` instead of raw font properties.
*   **Headings:** `.text-display-large`, `.text-heading-large`, `.text-heading-medium`
*   **Body:** `.text-body-large`, `.text-body-small`
*   **Labels/Overlines:** `.text-overline-large`, `.text-label`
*   **Links:** `.text-link-large`, `.text-link-small`

### Colors
Use CSS variables for all colors. Do not hardcode hex values.
*   **Surfaces:** `var(--color-surface-dark)`, `var(--color-surface-dark-progress)`
*   **Text:** `var(--color-on-surface-dark)`, `var(--color-on-surface-light)`
*   **Primary Brand:** `var(--color-primary-500)`
*   **Borders:** `var(--color-border-dark)`, `var(--color-border-focus)`

### Components
*   **Buttons:** Use `.btn` combined with `.btn-primary`, `.btn-secondary`, or `.btn-ghost`.
*   **Inputs:** Use `.input-field` for text inputs. Wrap date picker inputs in `.date-picker-input-wrapper`.
*   **Data Tables:**
    *   Container: `.data-table`
    *   Header Row: `.data-table-header` containing `.data-table-title`
    *   Rows: `.data-table-row`
    *   Cells: `.data-table-cell` (add `.alt` for alternating/secondary styling)
*   **Date Picker:** Follow the structure: `.date-picker` > `.date-picker-header` > `.date-picker-inputs` > `.date-picker-controls` > `.date-picker-grid`.

## 4. Extension Rules
*   If a new component is needed that does not exist in `reference_components.html`, try to compose it using existing primitives (CSS variables).
*   Do not introduce new hex values. Use the provided color palette variables.
*   Maintain the "Dark Mode" aesthetic as the default.

