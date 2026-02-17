import type { Meta, StoryObj } from "@storybook/react-vite";

import { NudgeSendingFeatureCard } from "./NudgeSendingFeatureCard";

const meta = {
  args: {},
  component: NudgeSendingFeatureCard,
  render: () => (
    <div className="h-96 max-w-md *:h-full">
      <NudgeSendingFeatureCard />
    </div>
  ),
} satisfies Meta<typeof NudgeSendingFeatureCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
