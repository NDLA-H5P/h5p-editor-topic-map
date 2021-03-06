/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ThemePicker } from "./ThemePicker";
import { ColorTheme } from "../../types/ColorTheme";

export default {
  title: "Atoms/ThemePicker",
  component: ThemePicker,
  args: {
    setTheme: (theme: ColorTheme) =>
      console.info(
        `Set theme to ${
          Object.entries(ColorTheme).find(([, value]) => theme === value)?.[0]
        }`,
      ),
    activeTheme: ColorTheme.Red,
  },
} as ComponentMeta<typeof ThemePicker>;

const Template: ComponentStory<typeof ThemePicker> = args => (
  <ThemePicker {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
