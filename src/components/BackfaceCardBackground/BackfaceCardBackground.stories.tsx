import type { Meta, StoryObj } from "@storybook/react-vite";

import { BackfaceCardBackground } from "../BackfaceCardBackground/BackfaceCardBackground";

const meta = {
  args: {
    backfaceCardStyleKey: "bike",
  },
  component: BackfaceCardBackground,
  render: (args) => (
    <div className="flex aspect-2/3 w-40 *:size-full">
      <BackfaceCardBackground {...args} />
    </div>
  ),
} satisfies Meta<typeof BackfaceCardBackground>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
