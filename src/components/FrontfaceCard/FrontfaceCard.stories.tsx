import type { Meta, StoryObj } from "@storybook/react-vite";

import { FrontfaceCard } from "./FrontfaceCard";

const meta = {
  args: {
    voteValue: "3",
  },
  component: FrontfaceCard,
  render: (args) => (
    <div className="flex w-48 max-w-full">
      <FrontfaceCard className="grow" {...args} />
    </div>
  ),
} satisfies Meta<typeof FrontfaceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Active: Story = {
  args: {
    active: true,
  },
};
