import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content with some text explaining what this card is about.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create Project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Your new project will be created with default settings. You can customize it later.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  ),
};

export const PostCard: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Getting Started with React</CardTitle>
          <Badge variant="success">Published</Badge>
        </div>
        <CardDescription>A comprehensive guide to React fundamentals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Category: Development</p>
          <p>Views: 1,234</p>
          <p>Created: 2024-01-15</p>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button size="sm">Edit</Button>
        <Button size="sm" variant="outline">View</Button>
        <Button size="sm" variant="secondary">Archive</Button>
      </CardFooter>
    </Card>
  ),
};

export const UserCard: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-semibold">
            JD
          </div>
          <div>
            <CardTitle>John Doe</CardTitle>
            <CardDescription>john@example.com</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <Badge variant="default">Admin</Badge>
          <Badge variant="success">Active</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">View Profile</Button>
      </CardFooter>
    </Card>
  ),
};

export const SimpleCard: Story = {
  render: () => (
    <Card className="w-[300px] p-6">
      <p className="text-center">Simple card with just content padding</p>
    </Card>
  ),
};
