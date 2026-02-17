import type { Meta, StoryObj } from "@storybook/react-vite";

import { Logo } from "./Logo";

const meta = {
  component: Logo,
  render: (args) => (
    <div className="flex">
      <Logo {...args} />
    </div>
  ),
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const IconOnly: Story = {
  args: {
    iconOnly: true,
  },
};

export const ShowBeta: Story = {
  args: {
    showBeta: true,
  },
};

export const Reversed: Story = {
  args: {
    reversed: true,
  },
};
