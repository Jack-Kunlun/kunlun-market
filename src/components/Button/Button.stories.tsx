import type { ComponentStory, ComponentMeta } from "@storybook/react";
import Button from ".";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}></Button>;

export const MiddleButton = Template.bind({});
MiddleButton.args = { size: "md", shape: "default", type: "default" };
