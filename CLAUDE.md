# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a design system migration project that transforms a legacy component system into a modern design system. The project demonstrates common issues in legacy codebases (inconsistent APIs, mixed styling approaches, poor type safety) and their modern solutions using shadcn/ui, TailwindCSS, and CVA.

## Project Structure

```
packages/
├── before/   # Legacy system with problematic patterns
│   └── src/
│       ├── components/
│       │   ├── atoms/      # Button, Badge
│       │   ├── molecules/  # FormInput, FormSelect, FormTextarea, FormCheckbox
│       │   └── organisms/  # Header, Card, Modal, Table, Alert
│       └── pages/
│           └── ManagementPage.tsx
└── after/    # Modern design system implementation target
    └── src/
        ├── components/ui/  # shadcn/ui components (to be created)
        ├── tokens/        # Design tokens (to be created)
        ├── hooks/         # Custom hooks
        └── stories/       # Storybook stories (to be created)
```

## Development Commands

### Main Commands
```bash
# Install dependencies
pnpm install

# Development servers
pnpm dev:before     # Run legacy system (port 5173)
pnpm dev:after      # Run modern system (port 5174)

# Build
pnpm build:before   # Build legacy package
pnpm build:after    # Build modern package
pnpm build          # Build all packages

# Testing
pnpm test:before    # Run tests for before package
pnpm test:after     # Run tests for after package
pnpm test:run       # Run all tests without watch mode

# Storybook (after package only)
pnpm storybook      # Run Storybook dev server
pnpm build-storybook # Build Storybook static site

# Linting
pnpm lint           # Lint all packages
```

## Custom Slash Commands

The project includes specialized commands for migration tasks:

- `/analyze-legacy` - Analyzes the before package for problematic patterns
- `/setup-shadcn` - Initializes shadcn/ui and modern tooling in the after package
- `/migrate-component [name]` - Migrates a specific component from before to after
- `/design-tokens` - Sets up comprehensive design token system
- `/story-gen [component]` - Generates Storybook stories for components
- `/check-a11y` - Checks components for accessibility compliance

## Key Migration Goals

### 1. Component API Standardization
Transform inconsistent prop naming (e.g., `helpText` vs `help` vs `description`) to uniform conventions following shadcn/ui patterns.

### 2. Styling Approach
Replace mixed styling methods (inline styles, CSS modules, hardcoded values) with:
- TailwindCSS utility classes
- CVA for variant management
- CSS variables for theming

### 3. Component Structure
Move from rigid Atomic Design folders to flat `components/ui/` structure, focusing on composition over categorization.

### 4. Type Safety
Implement proper TypeScript types with:
- Strict prop interfaces
- VariantProps from CVA
- forwardRef patterns
- Proper event handler types

### 5. Accessibility
Ensure all components include:
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility

## Technology Stack

### Before Package (Legacy)
- React 19
- Mixed styling (inline, CSS modules)
- Manual prop validation
- Inconsistent patterns

### After Package (Modern)
- React 19
- TailwindCSS v4 (alpha)
- shadcn/ui components
- CVA for variants
- Radix UI primitives
- Storybook for documentation

## shadcn/ui Component Implementation

When adding shadcn/ui components to the after package:

```bash
cd packages/after
npx shadcn-ui@latest init
npx shadcn-ui@latest add [component-name]
```

Required components for this project:
- button, input, select, textarea, checkbox
- form, card, table, alert, dialog (for modal)
- label, badge

## CVA Pattern Example

Components should use CVA for variant management:

```typescript
const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: { default: "...", secondary: "..." },
      size: { sm: "...", md: "...", lg: "..." }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)
```

## Design Token Structure

Tokens should be organized in `packages/after/src/tokens/`:
- `colors.ts` - Primitive and semantic colors
- `spacing.ts` - Spacing scale and component spacing
- `typography.ts` - Font sizes, weights, line heights
- `shadows.ts` - Box shadow definitions
- `radius.ts` - Border radius values
- `transitions.ts` - Animation durations and easings

## Testing Approach

- Unit tests with Vitest and React Testing Library
- Accessibility tests with jest-axe
- Storybook for visual testing
- Focus on component behavior and accessibility

## Common Issues in Legacy Code

1. **Inconsistent APIs**: Different prop names for similar functionality
2. **Hardcoded values**: Colors like `#007bff`, spacing like `10px`
3. **Mixed styling**: Combination of inline styles and CSS modules
4. **Poor accessibility**: Missing ARIA attributes, no keyboard support
5. **Weak typing**: Loose TypeScript definitions, manual validation

## Migration Workflow

1. Analyze legacy component with `/analyze-legacy`
2. Set up modern infrastructure with `/setup-shadcn`
3. Create design tokens with `/design-tokens`
4. Migrate component with `/migrate-component [name]`
5. Verify accessibility with `/check-a11y`
6. Document with `/story-gen [component]`

## Important Files

- `packages/before/src/pages/ManagementPage.tsx` - Main page to migrate
- `packages/after/src/components/ui/` - Destination for migrated components
- `packages/after/src/tokens/` - Design token definitions
- `packages/after/src/stories/` - Storybook documentation