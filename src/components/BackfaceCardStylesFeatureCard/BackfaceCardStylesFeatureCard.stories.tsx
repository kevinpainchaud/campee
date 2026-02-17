import type { Meta, StoryObj } from "@storybook/react-vite";

import { BackfaceCardStylesFeatureCard } from "./BackfaceCardStylesFeatureCard";

const meta = {
  args: {},
  component: BackfaceCardStylesFeatureCard,
  render: () => (
    <div className="max-w-xl">
      <BackfaceCardStylesFeatureCard />
    </div>
  ),
} satisfies Meta<typeof BackfaceCardStylesFeatureCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
