/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ArrowSection } from "./ArrowSection";
import { ArrowDirection } from "../../types/ArrowDirection";
import { ArrowType } from "../../types/ArrowType";

export default {
  title: "Molecules/ArrowSection",
  component: ArrowSection,
  argTypes: {
    type: {
      options: {
        Directional: ArrowType.Directional,
        "Bi-directional": ArrowType.BiDirectional,
        "Non-directional": ArrowType.NonDirectional,
      },
      control: { type: "radio" },
    },
  },
  args: {
    cellSize: 30,
    gapSize: 15,
  },
} as ComponentMeta<typeof ArrowSection>;

const Template: ComponentStory<typeof ArrowSection> = args => <ArrowSection {...args} />;

export const RightDirectionalEmptyArrow = Template.bind({});
RightDirectionalEmptyArrow.args = {
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 100,
    y: 0,
  },
  type: ArrowType.Directional,
  direction: ArrowDirection.Right,
};

RightDirectionalEmptyArrow.argTypes = {
  direction: {
    options: {
      Left: ArrowDirection.Left,
      Right: ArrowDirection.Right,
    },
    control: { type: "radio" },
  },
};

export const LeftDirectionalCompletedArrow = Template.bind({});
LeftDirectionalCompletedArrow.args = {
  start: {
    x: 100,
    y: 0,
  },
  end: {
    x: 0,
    y: 0,
  },
  type: ArrowType.Directional,
  direction: ArrowDirection.Left,
};

LeftDirectionalCompletedArrow.argTypes = {
  direction: {
    options: {
      Left: ArrowDirection.Left,
      Right: ArrowDirection.Right,
    },
    control: { type: "radio" },
  },
};

export const BidirectionalHorizontalEmptyArrow = Template.bind({});
BidirectionalHorizontalEmptyArrow.args = {
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 100,
    y: 0,
  },
  type: ArrowType.BiDirectional,
  direction: ArrowDirection.Right,
};

BidirectionalHorizontalEmptyArrow.argTypes = {
  direction: {
    options: {
      Left: ArrowDirection.Left,
      Right: ArrowDirection.Right,
    },
    control: { type: "radio" },
  },
};

export const UpDirectionalEditedArrow = Template.bind({});
UpDirectionalEditedArrow.args = {
  start: {
    x: 0,
    y: 100,
  },
  end: {
    x: 0,
    y: 0,
  },
  type: ArrowType.Directional,
  direction: ArrowDirection.Up,
};

UpDirectionalEditedArrow.argTypes = {
  direction: {
    options: {
      Up: ArrowDirection.Up,
      Down: ArrowDirection.Down,
    },
    control: { type: "radio" },
  },
};

export const NonDirectionalVerticalEmptyArrow = Template.bind({});
NonDirectionalVerticalEmptyArrow.args = {
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 0,
    y: 100,
  },
  type: ArrowType.NonDirectional,
  direction: ArrowDirection.Up,
};

NonDirectionalVerticalEmptyArrow.argTypes = {
  direction: {
    options: {
      Up: ArrowDirection.Up,
      Down: ArrowDirection.Down,
    },
    control: { type: "radio" },
  },
};
