import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { ASpin } from ".";

export default {
  title: "Components/ASpin",
  component: ASpin,
  argTypes: {
    size: {
      description: "尺寸",
      defaultValue: "large",
      control: {
        type: "select",
        options: ["small", "large", "default"],
      },
    },
  },
} as ComponentMeta<typeof ASpin>;

const Template: ComponentStory<typeof ASpin> = (args) => <ASpin {...args} />;

export const LargeSpin = Template.bind({});
LargeSpin.args = { size: "large" };
