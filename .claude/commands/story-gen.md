# Generate Storybook Stories

You are a specialist in creating comprehensive Storybook stories for React components with a focus on design system documentation.

## Your Task:

Generate Storybook stories for components in the "after" package that showcase all variants, states, and use cases.

## Story Structure:

1. **Basic Story Template**:
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './component-name';

const meta = {
  title: 'UI/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered', // or 'fullscreen', 'padded'
    docs: {
      description: {
        component: 'Component description here'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive'],
      description: 'Visual style variant'
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Component size'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    }
  }
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;
```

2. **Create Comprehensive Stories**:
```tsx
// Default story
export const Default: Story = {
  args: {
    children: 'Default Component'
  }
};

// All variants
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Variant'
  }
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Variant'
  }
};

// All sizes
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Size'
  }
};

// States
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled State'
  }
};

// Playground for testing
export const Playground: Story = {
  args: {
    children: 'Test all props'
  }
};
```

3. **Advanced Patterns**:

**Showcase All Variants**:
```tsx
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Component variant="default">Default</Component>
      <Component variant="secondary">Secondary</Component>
      <Component variant="destructive">Destructive</Component>
    </div>
  )
};
```

**Interactive Examples**:
```tsx
export const Interactive: Story = {
  args: {
    onClick: () => alert('Clicked!')
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button);
  }
};
```

**Dark Mode Support**:
```tsx
export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' }
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    )
  ]
};
```

4. **Form Component Stories**:
```tsx
export const FormExample: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <FormInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type here..."
        helpText="This is help text"
      />
    );
  }
};
```

5. **Accessibility Testing**:
```tsx
export const WithAriaLabel: Story = {
  args: {
    'aria-label': 'Accessible button',
    children: 'Click me'
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true
          }
        ]
      }
    }
  }
};
```

## Story Categories:

Place stories in `packages/after/src/stories/`:
- `Button.stories.tsx`
- `Badge.stories.tsx`
- `FormInput.stories.tsx`
- `FormSelect.stories.tsx`
- `FormTextarea.stories.tsx`
- `Card.stories.tsx`
- `Table.stories.tsx`
- `Modal.stories.tsx`
- `Alert.stories.tsx`

## Best Practices:

1. **Naming Convention**:
   - Use PascalCase for story names
   - Be descriptive (not just "Story1", "Story2")

2. **Organization**:
   - Group related stories
   - Order from simple to complex
   - Include edge cases

3. **Documentation**:
   - Add JSDoc comments
   - Include usage examples
   - Document props thoroughly

4. **Testing Coverage**:
   - All variants
   - All sizes
   - All states (hover, focus, disabled)
   - Edge cases (long text, empty content)
   - Responsive behavior
   - Dark mode

5. **Controls**:
   - Use appropriate control types
   - Add descriptions
   - Set sensible defaults

## Storybook Configuration:

Ensure `.storybook/main.ts` includes:
```ts
const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    '@storybook/addon-themes'
  ]
};
```

Create stories that serve as both documentation and testing ground for the design system.