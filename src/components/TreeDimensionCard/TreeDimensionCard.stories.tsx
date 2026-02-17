import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { BackfaceCard } from "../BackfaceCard/BackfaceCard";
import { Button } from "../Button/Button";
import { FrontfaceCard } from "../FrontfaceCard/FrontfaceCard";
import { TreeDimensionCard } from "./TreeDimensionCard";

const meta = {
  args: {
    backfaceCard: <BackfaceCard backfaceCardStyleKey="cool" />,
    frontfaceCard: <FrontfaceCard voteValue="3" />,
    revealed: false,
  },
  component: TreeDimensionCard,
  decorators: [
    (Story, options) => {
      const [revealed, setRevealed] = useState(options.args.revealed);

      return (
        <div className="flex flex-col gap-6">
          <div className="w-48">
            <Story args={{ ...options.args, revealed }} />
          </div>
          <div>
            <Button
              onClick={() => setRevealed((revealed) => !revealed)}
              tagElement="button"
            >
              Flip the card
            </Button>
          </div>
        </div>
      );
    },
  ],
} satisfies Meta<typeof TreeDimensionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
