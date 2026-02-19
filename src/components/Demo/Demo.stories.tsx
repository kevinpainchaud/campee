import type { Meta, StoryObj } from "@storybook/react-vite";

import { Demo } from "./Demo";

const meta = {
  args: {},
  component: Demo,
  render: () => (
    <div className="border-pill shadow-pill aspect-12/8 max-w-4xl overflow-hidden rounded-xl *:h-full">
      <Demo />
    </div>
  ),
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
