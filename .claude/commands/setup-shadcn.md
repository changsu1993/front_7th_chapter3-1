# Setup shadcn/ui and Modern Design System

You are a specialist in setting up shadcn/ui, TailwindCSS, and modern design system infrastructure.

## Your Tasks:

1. **Initialize shadcn/ui**
   - Navigate to `packages/after/`
   - Run `npx shadcn-ui@latest init`
   - Configure with appropriate settings:
     - TypeScript: Yes
     - Style: New York (recommended)
     - Base color: Slate
     - CSS variables: Yes

2. **Add Required Components**
   Execute these commands in order:
   ```bash
   npx shadcn-ui@latest add button
   npx shadcn-ui@latest add input
   npx shadcn-ui@latest add select
   npx shadcn-ui@latest add form
   npx shadcn-ui@latest add card
   npx shadcn-ui@latest add table
   npx shadcn-ui@latest add badge
   npx shadcn-ui@latest add alert
   npx shadcn-ui@latest add dialog  # for modal
   npx shadcn-ui@latest add label
   npx shadcn-ui@latest add textarea
   ```

3. **Setup Utility Functions**
   Create `packages/after/src/lib/utils.ts`:
   ```tsx
   import { type ClassValue, clsx } from "clsx"
   import { twMerge } from "tailwind-merge"

   export function cn(...inputs: ClassValue[]) {
     return twMerge(clsx(inputs))
   }
   ```

4. **Install CVA**
   ```bash
   npm install class-variance-authority
   ```

5. **Configure TailwindCSS**
   Ensure `tailwind.config.js` includes:
   - Content paths for all components
   - Dark mode support: `darkMode: ["class"]`
   - Proper theme extensions

6. **Setup Global CSS**
   Update `packages/after/src/index.css` with:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   @layer base {
     :root {
       /* Light mode variables */
       --background: 0 0% 100%;
       --foreground: 222.2 84% 4.9%;
       /* ... other tokens */
     }

     .dark {
       /* Dark mode variables */
       --background: 222.2 84% 4.9%;
       --foreground: 210 40% 98%;
       /* ... other tokens */
     }
   }
   ```

7. **Create Design Tokens Structure**
   Create `packages/after/src/tokens/`:
   - `colors.ts` - Color tokens
   - `spacing.ts` - Spacing scale
   - `typography.ts` - Font sizes, weights
   - `shadows.ts` - Box shadows
   - `radius.ts` - Border radius

8. **Setup Dark Mode Toggle**
   Create a theme provider and toggle component for dark mode support.

## Verification Checklist:

- [ ] shadcn/ui initialized
- [ ] All required components added
- [ ] CVA installed
- [ ] TailwindCSS properly configured
- [ ] Design tokens structure created
- [ ] Dark mode support configured
- [ ] Utils functions available
- [ ] Build runs without errors

## Notes:
- Always work in the `packages/after/` directory
- Ensure all dependencies are installed
- Test each component after adding
- Verify TypeScript types are working