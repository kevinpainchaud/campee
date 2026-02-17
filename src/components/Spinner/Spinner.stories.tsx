import type { Meta, StoryObj } from "@storybook/react-vite";

import { Spinner } from "../Spinner/Spinner";

const meta = {
  component: Spinner,
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SizeSm: Story = {
  args: {
    size: "sm",
  },
};
