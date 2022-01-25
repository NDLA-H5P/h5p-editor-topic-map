/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ToolbarButtonType } from "../Toolbar/Toolbar";

import { ToolbarButton } from "./ToolbarButton";

export default {
  title: "Atoms/ToolbarButton",
  component: ToolbarButton,
  args: {
    icon: ToolbarButtonType.MapColor,
    onClick: () => console.info("Toolbar button clicked"),
    labelKey: "toolbar-button-type_map-color",
    showActive: false,
    active: false,
  },
} as ComponentMeta<typeof ToolbarButton>;

const Template: ComponentStory<typeof ToolbarButton> = args => (
  <ToolbarButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};

const TemplateActive: ComponentStory<typeof ToolbarButton> = args => (
  <ToolbarButton {...args} />
);

export const Active = TemplateActive.bind({});
Active.args = {
  showActive: true,
  active: true,
};
