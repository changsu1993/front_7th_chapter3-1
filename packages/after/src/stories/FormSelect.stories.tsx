import type { Meta, StoryObj } from "@storybook/react";
import { FormSelect } from "@/components/ui/form-select";

const meta = {
  title: "UI/Form/FormSelect",
  component: FormSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    required: {
      control: "boolean",
      description: "Required field",
    },
  },
} satisfies Meta<typeof FormSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "role",
    label: "Role",
  },
  render: (args) => (
    <FormSelect {...args}>
      <option value="user">User</option>
      <option value="moderator">Moderator</option>
      <option value="admin">Admin</option>
    </FormSelect>
  ),
};

export const WithPlaceholder: Story = {
  args: {
    name: "category",
    label: "Category",
    placeholder: "Select a category",
  },
  render: (args) => (
    <FormSelect {...args}>
      <option value="development">Development</option>
      <option value="design">Design</option>
      <option value="marketing">Marketing</option>
    </FormSelect>
  ),
};

export const WithHelperText: Story = {
  args: {
    name: "status",
    label: "Status",
    helperText: "Select the current status of the item.",
  },
  render: (args) => (
    <FormSelect {...args}>
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
      <option value="pending">Pending</option>
    </FormSelect>
  ),
};

export const WithError: Story = {
  args: {
    name: "priority",
    label: "Priority",
    error: "Please select a priority level.",
  },
  render: (args) => (
    <FormSelect {...args}>
      <option value="">Select priority</option>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </FormSelect>
  ),
};

export const Required: Story = {
  args: {
    name: "department",
    label: "Department",
    required: true,
  },
  render: (args) => (
    <FormSelect {...args}>
      <option value="engineering">Engineering</option>
      <option value="design">Design</option>
      <option value="product">Product</option>
    </FormSelect>
  ),
};

export const Disabled: Story = {
  args: {
    name: "readonly",
    label: "Read Only Field",
    disabled: true,
    defaultValue: "selected",
  },
  render: (args) => (
    <FormSelect {...args}>
      <option value="selected">This option is selected</option>
      <option value="other">Other option</option>
    </FormSelect>
  ),
};

export const AllStates: Story = {
  args: {
    name: "demo",
  },
  render: () => (
    <div className="flex flex-col gap-6 w-[350px]">
      <FormSelect name="default" label="Default Select">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </FormSelect>

      <FormSelect
        name="placeholder"
        label="With Placeholder"
        placeholder="Select an option"
      >
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </FormSelect>

      <FormSelect
        name="helper"
        label="With Helper Text"
        helperText="This is helper text"
      >
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </FormSelect>

      <FormSelect name="required" label="Required Field" required>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </FormSelect>

      <FormSelect
        name="error"
        label="With Error"
        error="This field has an error"
      >
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </FormSelect>

      <FormSelect name="disabled" label="Disabled" disabled>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </FormSelect>
    </div>
  ),
};
