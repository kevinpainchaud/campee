import type { Meta, StoryObj } from "@storybook/react-vite";
import { type CustomContentProps, useSnackbar } from "notistack";

import { Button } from "../Button/Button";

const meta = {
  args: {
    message: "Et consectetur officia",
  },
  decorators: [
    (_Story, options) => {
      const { enqueueSnackbar } = useSnackbar();

      return (
        <Button
          onClick={() => enqueueSnackbar(options.args)}
          tagElement="button"
          variant="primary"
        >
          Open snackbar
        </Button>
      );
    },
  ],
} satisfies Meta<CustomContentProps>;

export default meta;
type Story = StoryObj<CustomContentProps>;

export const Default: Story = {};

export const VariantInfo: Story = {
  args: {
    variant: "info",
  },
};

export const VariantSuccess: Story = {
  args: {
    variant: "success",
  },
};
