import type { Meta, StoryObj } from "@storybook/react-vite";

import { useFlyingUpEmoji } from "../../hooks/useFlyingUpEmoji";
import { Button } from "../Button/Button";

const meta = {
  decorators: [
    () => {
      const { triggerFlyingUpEmoji } = useFlyingUpEmoji();

      return (
        <Button
          onClick={() => triggerFlyingUpEmoji("🤝")}
          tagElement="button"
          variant="primary"
        >
          Trigger
        </Button>
      );
    },
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
