import type { Meta, StoryObj } from "@storybook/react-vite";
import { PiCampfireBold, PiUserCircleBold } from "react-icons/pi";
import { action } from "storybook/actions";

import { Button } from "../Button/Button";

const meta = {
  args: {
    children: "Ex commodo",
    disabled: false,
    onClick: action("onClick"),
    tagElement: "button",
  },
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Danger: Story = {
  args: {
    danger: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const LeftIcon: Story = {
  args: {
    leftIcon: PiCampfireBold,
  },
};

export const Reversed: Story = {
  args: {
    reversed: true,
  },
};

export const RightIcon: Story = {
  args: {
    rightIcon: PiUserCircleBold,
  },
};

export const SizeSm: Story = {
  args: {
    size: "sm",
  },
};

export const SizeLg: Story = {
  args: {
    size: "lg",
  },
};

export const Success: Story = {
  args: {
    success: true,
  },
};

export const TagElementAnchor: Story = {
  args: {
    tagElement: "anchor",
  },
};

export const VariantOutline: Story = {
  args: {
    variant: "outline",
  },
};

export const VariantPrimary: Story = {
  args: {
    variant: "primary",
  },
};

export const VariantTransparent: Story = {
  args: {
    variant: "transparent",
  },
};
