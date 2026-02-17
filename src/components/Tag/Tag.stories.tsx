import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tag } from "../Tag/Tag";

const meta = {
  args: {
    children: "Magna mollit",
  },
  component: Tag,
  render: (args) => (
    <div className="flex">
      <Tag {...args} />
    </div>
  ),
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
