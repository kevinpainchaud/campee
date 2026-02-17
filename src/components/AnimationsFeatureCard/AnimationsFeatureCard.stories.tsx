import type { Meta, StoryObj } from "@storybook/react-vite";

import { AnimationsFeatureCard } from "./AnimationsFeatureCard";

const meta = {
  args: {},
  component: AnimationsFeatureCard,
  render: () => (
    <div className="h-96 max-w-md *:h-full">
      <AnimationsFeatureCard />
    </div>
  ),
} satisfies Meta<typeof AnimationsFeatureCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
