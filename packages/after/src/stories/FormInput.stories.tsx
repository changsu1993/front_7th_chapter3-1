import type { Meta, StoryObj } from "@storybook/react";
import { FormInput } from "@/components/ui/form-input";

const meta = {
  title: "UI/Form/FormInput",
  component: FormInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "url"],
      description: "Input type",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    required: {
      control: "boolean",
      description: "Required field",
    },
  },
} satisfies Meta<typeof FormInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "username",
    label: "Username",
    placeholder: "Enter your username",
  },
};

export const WithHelperText: Story = {
  args: {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
    helperText: "We'll never share your email with anyone else.",
  },
};

export const WithError: Story = {
  args: {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    error: "Password must be at least 8 characters long.",
  },
};

export const Required: Story = {
  args: {
    name: "fullname",
    label: "Full Name",
    placeholder: "John Doe",
    required: true,
    helperText: "Enter your legal full name.",
  },
};

export const Disabled: Story = {
  args: {
    name: "readonly",
    label: "Read Only Field",
    value: "This field is disabled",
    disabled: true,
  },
};

export const EmailInput: Story = {
  args: {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "you@example.com",
    required: true,
  },
};

export const PasswordInput: Story = {
  args: {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    required: true,
    helperText: "Must be at least 8 characters.",
  },
};

export const NumberInput: Story = {
  args: {
    name: "age",
    label: "Age",
    type: "number",
    placeholder: "25",
    min: 0,
    max: 150,
  },
};

export const AllStates: Story = {
  args: {
    name: "demo",
  },
  render: () => (
    <div className="flex flex-col gap-6 w-[350px]">
      <FormInput
        name="default"
        label="Default Input"
        placeholder="Enter text..."
      />
      <FormInput
        name="helper"
        label="With Helper Text"
        placeholder="Enter text..."
        helperText="This is helper text"
      />
      <FormInput
        name="required"
        label="Required Field"
        placeholder="Enter text..."
        required
      />
      <FormInput
        name="error"
        label="With Error"
        placeholder="Enter text..."
        error="This field has an error"
      />
      <FormInput
        name="disabled"
        label="Disabled"
        placeholder="Cannot edit"
        disabled
      />
    </div>
  ),
};
