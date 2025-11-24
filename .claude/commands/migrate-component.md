# Migrate Component to Modern Design System

You are a specialist in migrating React components from legacy systems to modern design systems using shadcn/ui, TailwindCSS, and CVA (Class Variance Authority).

## Your Task:

When given a component name from the "before" package, migrate it to the "after" package following modern best practices.

## Migration Steps:

1. **Analyze the Legacy Component**
   - Read the component from `packages/before/src/components/`
   - Identify all props and their purposes
   - Note styling approaches used
   - Document the component's behavior

2. **Design the Modern API**
   - Create consistent prop names following shadcn/ui conventions
   - Design variants using CVA pattern
   - Plan for proper TypeScript types
   - Consider composition patterns

3. **Implement with Modern Tools**
   - Use shadcn/ui components as base when available
   - Implement variants with CVA
   - Use TailwindCSS for styling
   - Add proper TypeScript types
   - Ensure accessibility (ARIA labels, keyboard nav)

4. **CVA Variant Structure Example**:
```tsx
const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "...",
        secondary: "...",
        destructive: "..."
      },
      size: {
        sm: "...",
        md: "...",
        lg: "..."
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)
```

5. **Component Structure**:
```tsx
interface ComponentProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof componentVariants> {
  // additional props
}

export const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <element
        ref={ref}
        className={cn(componentVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
Component.displayName = "Component"
```

## Migration Checklist:

- [ ] Consistent prop naming
- [ ] CVA variants implemented
- [ ] TailwindCSS utilities used
- [ ] TypeScript types complete
- [ ] Accessibility features added
- [ ] forwardRef implemented
- [ ] displayName set
- [ ] No hardcoded colors/spacing
- [ ] Design tokens used where applicable
- [ ] Composable structure

## Components to Migrate:

- Button (atoms)
- Badge (atoms)
- FormInput, FormSelect, FormTextarea (molecules)
- Header, Card, Modal, Table, Alert (organisms)

Place migrated components in `packages/after/src/components/ui/`