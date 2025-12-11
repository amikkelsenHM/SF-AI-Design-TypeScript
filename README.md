# Spaceflux Design System

A comprehensive design system for the Spaceflux project, featuring dark mode aesthetics, standardized typography, color palettes, and reusable UI components.

## Overview

This project serves as the single source of truth for the Spaceflux UI. It provides:
- **CSS Variables:** Centralized definition of colors, typography, and spacing.
- **Typography:** Utility classes for headings, body text, and labels.
- **Components:** Core UI elements like buttons, inputs, date pickers, data tables, and navigation.
- **Navigation:** Collapsible sidenav component with interactive states.

## File Structure

- **`styles/variables.css`**: Defines all design tokens (colors, font families, spacing).
- **`styles/typography.css`**: Defines font faces and typography utility classes.
- **`styles/components.css`**: Contains styling for core components.
- **`styles/charts.css`**: Specialized styling for data visualization components.
- **`styles/utilities.css`**: Utility classes for layout, spacing, and sizing.
- **`index.html`**: Visual showcase and interactive documentation of the system.
- **`navigation-preview.html`**: Full-page demo of the sidenav component with documentation.
- **`DESIGN_SYSTEM_RULES.md`**: Guidelines for generating and extending UI code.

## Usage

To use the design system in your pages, include the CSS files and favicon in the following order:

```html
<!-- Favicon (Standard for all Spaceflux projects) -->
<link rel="icon" type="image/png" sizes="32x32" href="assets/favicon.png">
<link rel="icon" type="image/png" sizes="192x192" href="assets/favicon-192.png">
<link rel="apple-touch-icon" sizes="180x180" href="assets/apple-touch-icon.png">

<!-- Stylesheets -->
<link rel="stylesheet" href="styles/variables.css">
<link rel="stylesheet" href="styles/typography.css">
<link rel="stylesheet" href="styles/components.css">
<link rel="stylesheet" href="styles/charts.css">
<link rel="stylesheet" href="styles/utilities.css">
```

### Favicon

The Spaceflux favicon is the official brand icon and should be included in all projects using this design system. The favicon files are located in the `assets/favicons/` directory:
- `favicon.png` (32x32) - Standard favicon
- `favicon-192.png` (192x192) - High-resolution favicon for modern browsers
- `apple-touch-icon.png` (180x180) - Apple touch icon for iOS devices

## Guidelines

Please refer to `DESIGN_SYSTEM_RULES.md` for detailed instructions on:
- Naming conventions
- Extension rules
- Correct usage of utility classes and variables

## Development

Open `index.html` in a browser to view the visual showcase of the design system, including color palettes, typography examples, and interactive components.

For a full-page demonstration of the sidenav component, open `navigation-preview.html`.

## Component Hierarchy

Components are organized by complexity from most complex (Organisms) to simplest (Atoms):

### Organisms (Most Complex)
- **Charts & Data Visualization** - Multi-part data visualization components
- **Data Tables** - Complex tabular data with sorting, pagination, and badges

### Complex Molecules
- **Date Picker** - Multi-part date selection interface
- **Dropdowns & Selects** - Interactive selection components with states

### Simple Molecules
- **Sidenav** - Collapsible navigation component (252px wide / 72px collapsed)
- **Tooltips** - Contextual information overlays
- **Breadcrumbs** - Navigation path indicators

### Atoms (Simplest)
- **Inputs** - Text input fields
- **Checkboxes & Radio Buttons** - Selection controls
- **Buttons** - Primary, secondary, and tertiary action buttons
ry action buttons
