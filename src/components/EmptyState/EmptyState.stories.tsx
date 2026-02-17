import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../Button/Button";
import { EmptyState } from "./EmptyState";

const meta = {
  args: {
    button: (
      <Button tagElement="button" variant="primary">
        Adipisicing tempor
      </Button>
    ),
    description:
      "Dolore aliquip officia ut nulla nisi irure aliquip consequat.",
    title: "Ex aliqua exercitation",
  },
  component: EmptyState,
  render: (args) => (
    <div className="max-w-96">
      <EmptyState {...args} />
    </div>
  ),
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
