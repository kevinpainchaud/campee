import type { Meta, StoryObj } from "@storybook/react-vite";

import { Constants } from "../../database.types";
import { BackfaceCard } from "./BackfaceCard";

const meta = {
  args: {
    backfaceCardStyleKey: "cool",
  },
  argTypes: {
    backfaceCardStyleKey: {
      options: Constants.public.Enums.backface_card_style_key,
    },
  },
  component: BackfaceCard,
  render: (args) => (
    <div className="flex w-48 max-w-full">
      <BackfaceCard className="grow" {...args} />
    </div>
  ),
} satisfies Meta<typeof BackfaceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
