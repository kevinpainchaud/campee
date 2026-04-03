import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../Button/Button";
import { Tooltip } from "./Tooltip";

const meta = {
  args: {
    children: (
      <Button tagElement="button" variant="primary">
        Hover me
      </Button>
    ),
    content: "Cillum sunt velit",
  },
  component: Tooltip,
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomPlacement: Story = {
  args: {
    placement: "right",
  },
};
