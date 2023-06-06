import type { Meta, StoryObj } from "@storybook/react";
import { ASpin } from ".";

const meta: Meta<typeof ASpin> = {
  title: "Components/ASpin",
  component: ASpin,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ASpin>;

export const LargeSpin: Story = {
  args: {
    size: "large",
  },
};
