import type { Meta, StoryObj } from "@storybook/react-vite";

import { Avatar } from "./Avatar";

const meta = {
  args: {
    initials: "K",
  },
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SizeXs: Story = {
  args: {
    size: "xs",
  },
};

export const SizeSm: Story = {
  args: {
    size: "sm",
  },
};
