import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";

import { getVoteValues } from "../../utils/vote";
import { CardsInHand } from "./CardsInHand";

const meta = {
  args: {
    activeVoteValue: "s",
    onCardClick: action("onCardClick"),
    voteValues: getVoteValues("scrum"),
  },
  component: CardsInHand,
  render: (args) => (
    <div className="border-pill bg-lemon-100 shadow-pill overflow-hidden rounded-xl pt-4 dark:bg-zinc-950">
      <CardsInHand {...args} />
    </div>
  ),
} satisfies Meta<typeof CardsInHand>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
