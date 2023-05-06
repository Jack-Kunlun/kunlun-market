import type { Meta, StoryObj } from "@storybook/react";
import { Button } from ".";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Button>;

export const MiddleButton: Story = {
  args: {
    size: "md",
    shape: "default",
    type: "default",
    children: "测试",
  },
};
