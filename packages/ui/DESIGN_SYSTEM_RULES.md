# Spaceflux Design System Rules

## 1. Core Principle
This design system is **CSS-only**. You must use standard HTML tags with the provided CSS classes.
**DO NOT** use Tailwind CSS. **DO NOT** use external component libraries like Shadcn, Radix, or Material UI unless explicitly requested.

## 2. Usage Guide

### Layout & Utilities
Use the classes in `styles/utilities.css` for layout.
*   **Flexbox:** `.flex`, `.flex-col`, `.flex-row`, `.items-center`, `.justify-between`
*   **Grid:** `.grid`, `.grid-cols-2`, `.gap-4`
*   **Spacing:** `.p-4` (padding), `.m-2` (margin), `.gap-4`
*   **Sizing:** `.w-full`, `.h-full`
*   **Typography:** `.text-center`, `.font-bold`, `.uppercase`

### Components
Use the classes in `styles/components.css`.
*   **Buttons:** `<button class="btn btn-primary">Label</button>`
*   **Inputs:** `<input class="input-field" placeholder="...">`
*   **Tables:** `.table-v2`, `.badge`
*   **Cards:** 
    ```html
    <div class="bg-surface rounded-lg p-6 border">
      <h3 class="text-heading-medium">Title</h3>
      <p class="text-body-small text-grey-300">Content</p>
    </div>
    ```

### Colors & Variables
Always use CSS variables for colors to ensure theming support. These are defined in `styles/variables.css`.
*   **Background:** `var(--color-surface-dark)`
*   **Primary Brand:** `var(--color-brand-medium-orchid)`
*   **Text:** `var(--color-on-surface-dark)`
*   **Borders:** `var(--color-border-dark)`

### Typography
Use the classes in `styles/typography.css` for consistent font sizing and weights.
*   **Headings:** `.text-display-large`, `.text-heading-medium`
*   **Body:** `.text-body-large`, `.text-body-small`
*   **Labels:** `.text-label`, `.text-label-bold`

## 3. Implementation Instructions for AI
1.  **Copy Styles:** Always include the `styles/` folder in the generated project.
2.  **Link CSS:** Ensure all CSS files (variables, typography, components, utilities) are linked in the main HTML/Layout file.
3.  **No Build Steps:** Do not configure PostCSS, Sass, or Tailwind. Use plain CSS imports.
4.  **Interactivity:** If interactive components (like modals or dropdowns) are needed, write the necessary Vanilla JS or React state logic manually. Do not install heavy dependencies for simple UI interactions.
