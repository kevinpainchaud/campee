import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { action } from "storybook/actions";

import { Button } from "../Button/Button";
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";

const meta = {
  args: {
    onCancelButtonClick: action("onCancelButtonClick"),
    onConfirmButtonClick: action("onConfirmButtonClick"),
    open: false,
    setOpen: () => {},
  },
  component: ConfirmModal,
  decorators: [
    (Story, options) => {
      const [open, setOpen] = useState(false);

      return (
        <div className="flex flex-col gap-4">
          <div>
            <Button onClick={() => setOpen(true)} tagElement="button">
              Open confirm modal
            </Button>
          </div>
          <Story args={{ ...options.args, open, setOpen }} />
        </div>
      );
    },
  ],
} satisfies Meta<typeof ConfirmModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Children: Story = {
  args: {
    children:
      "Cupidatat labore duis incididunt adipisicing veniam ipsum sunt culpa minim sit do veniam.",
  },
};

export const CustomWording: Story = {
  args: {
    cancelButtonLabel: "In velit aute",
    confirmButtonLabel: "Nisi commodo",
    title: "Laborum culpa ea ex",
  },
};

export const ConfirmButtonDanger: Story = {
  args: {
    confirmButtonDanger: true,
  },
};
