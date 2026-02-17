import type { Meta, StoryObj } from "@storybook/react-vite";

import { PlaceholderCard } from "./PlaceholderCard";

const meta = {
  component: PlaceholderCard,
  render: (args) => (
    <div className="flex w-48 max-w-full">
      <PlaceholderCard className="grow" {...args} />
    </div>
  ),
} satisfies Meta<typeof PlaceholderCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
