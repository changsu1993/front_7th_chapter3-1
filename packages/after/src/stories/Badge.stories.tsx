import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@/components/ui/badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline", "success", "warning", "info"],
      description: "Badge visual style variant",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Badge",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Success",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Warning",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    children: "Info",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <h4 className="mb-2 text-sm font-medium">Post Status</h4>
        <div className="flex gap-2">
          <Badge variant="success">Published</Badge>
          <Badge variant="warning">Draft</Badge>
          <Badge variant="secondary">Archived</Badge>
          <Badge variant="info">Pending</Badge>
          <Badge variant="destructive">Rejected</Badge>
        </div>
      </div>
      <div>
        <h4 className="mb-2 text-sm font-medium">User Role</h4>
        <div className="flex gap-2">
          <Badge variant="default">Admin</Badge>
          <Badge variant="info">Moderator</Badge>
          <Badge variant="secondary">User</Badge>
          <Badge variant="outline">Guest</Badge>
        </div>
      </div>
      <div>
        <h4 className="mb-2 text-sm font-medium">Priority</h4>
        <div className="flex gap-2">
          <Badge variant="destructive">High</Badge>
          <Badge variant="warning">Medium</Badge>
          <Badge variant="success">Low</Badge>
        </div>
      </div>
    </div>
  ),
};
