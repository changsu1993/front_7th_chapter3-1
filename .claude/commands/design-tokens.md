# Design Tokens Management

You are a specialist in creating and managing design tokens for consistent design systems.

## Your Task:

Create a comprehensive design token system that replaces hardcoded values with semantic, reusable tokens.

## Token Structure:

Create token files in `packages/after/src/tokens/`:

### 1. **Colors** (`colors.ts`)
```tsx
export const colors = {
  // Primitive colors (base palette)
  primitive: {
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    blue: {
      50: '#eff6ff',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
    },
    red: {
      50: '#fef2f2',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
    },
    green: {
      50: '#f0fdf4',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
    }
  },

  // Semantic colors (purpose-based)
  semantic: {
    background: {
      primary: 'var(--background)',
      secondary: 'var(--background-secondary)',
      muted: 'var(--muted)',
    },
    foreground: {
      primary: 'var(--foreground)',
      secondary: 'var(--foreground-secondary)',
      muted: 'var(--muted-foreground)',
    },
    brand: {
      primary: 'var(--primary)',
      secondary: 'var(--secondary)',
      accent: 'var(--accent)',
    },
    feedback: {
      error: 'var(--destructive)',
      warning: 'var(--warning)',
      success: 'var(--success)',
      info: 'var(--info)',
    },
    border: {
      default: 'var(--border)',
      input: 'var(--input)',
      ring: 'var(--ring)',
    }
  }
};
```

### 2. **Spacing** (`spacing.ts`)
```tsx
export const spacing = {
  // Base unit: 4px
  px: '1px',
  0: '0',
  0.5: '0.125rem', // 2px
  1: '0.25rem',    // 4px
  2: '0.5rem',     // 8px
  3: '0.75rem',    // 12px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  8: '2rem',       // 32px
  10: '2.5rem',    // 40px
  12: '3rem',      // 48px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
  32: '8rem',      // 128px
  40: '10rem',     // 160px
  48: '12rem',     // 192px
  56: '14rem',     // 224px
  64: '16rem',     // 256px
};

// Component-specific spacing
export const componentSpacing = {
  button: {
    paddingX: {
      sm: spacing[3],
      md: spacing[4],
      lg: spacing[8],
    },
    paddingY: {
      sm: spacing[1],
      md: spacing[2],
      lg: spacing[3],
    }
  },
  input: {
    paddingX: spacing[3],
    paddingY: spacing[2],
  },
  card: {
    padding: spacing[6],
    gap: spacing[4],
  }
};
```

### 3. **Typography** (`typography.ts`)
```tsx
export const typography = {
  fonts: {
    sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
  },

  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],      // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
    base: ['1rem', { lineHeight: '1.5rem' }],     // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],  // 36px
    '5xl': ['3rem', { lineHeight: '1' }],         // 48px
  },

  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
  },

  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  }
};
```

### 4. **Shadows** (`shadows.ts`)
```tsx
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',

  // Component-specific
  button: {
    hover: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    active: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  },
  card: {
    default: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
    hover: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  },
  modal: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
};
```

### 5. **Border Radius** (`radius.ts`)
```tsx
export const radius = {
  none: '0px',
  sm: '0.125rem',    // 2px
  base: '0.25rem',   // 4px
  md: '0.375rem',    // 6px
  lg: '0.5rem',      // 8px
  xl: '0.75rem',     // 12px
  '2xl': '1rem',     // 16px
  '3xl': '1.5rem',   // 24px
  full: '9999px',

  // Component-specific
  button: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.5rem',
  },
  input: '0.375rem',
  card: '0.75rem',
  modal: '0.75rem',
  badge: '9999px',
};
```

### 6. **Z-Index** (`z-index.ts`)
```tsx
export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
  notification: 80,
  topmost: 90,
};
```

### 7. **Transitions** (`transitions.ts`)
```tsx
export const transitions = {
  duration: {
    instant: '0ms',
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
    slower: '500ms',
  },

  timing: {
    linear: 'linear',
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  property: {
    none: 'none',
    all: 'all',
    default: 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
    colors: 'color, background-color, border-color, text-decoration-color, fill, stroke',
    opacity: 'opacity',
    shadow: 'box-shadow',
    transform: 'transform',
  }
};
```

### 8. **Breakpoints** (`breakpoints.ts`)
```tsx
export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const mediaQueries = {
  xs: `@media (min-width: ${breakpoints.xs})`,
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,
};
```

## CSS Variables Setup:

Create/update `packages/after/src/styles/tokens.css`:
```css
@layer base {
  :root {
    /* Colors */
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
  }
}
```

## Usage in Components:

```tsx
// Import tokens
import { colors, spacing, typography } from '@/tokens';

// Use in TailwindCSS config
module.exports = {
  theme: {
    extend: {
      colors: colors.primitive,
      spacing: spacing,
      fontSize: typography.fontSize,
      // ...
    }
  }
};

// Use in components with CVA
const buttonVariants = cva(
  "transition-colors duration-200", // using tokens
  {
    variants: {
      size: {
        sm: "h-9 px-3 text-sm", // maps to token values
        md: "h-10 px-4 text-base",
        lg: "h-11 px-8 text-lg",
      }
    }
  }
);
```

## Migration Strategy:

1. **Identify hardcoded values** in legacy code
2. **Map to semantic tokens** (not just color names)
3. **Replace systematically** throughout components
4. **Test in light/dark modes**
5. **Document token usage** for team

This token system ensures consistency, maintainability, and scalability of the design system.