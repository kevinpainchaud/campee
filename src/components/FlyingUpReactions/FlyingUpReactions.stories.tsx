import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Button } from "../Button/Button";
import { FlyingUpReactions } from "../FlyingUpReactions/FlyingUpReactions";
import type { FlyingUpReaction } from "./types";

const meta = {
  args: {
    flyingUpReactions: [],
  },
  component: FlyingUpReactions,
  decorators: [
    (Story, options) => {
      const [flyingUpReactions, setFlyingUpReactions] = useState<
        FlyingUpReaction[]
      >([]);

      return (
        <div className="flex max-w-52 flex-col gap-2 pt-64">
          <Story args={{ ...options.args, flyingUpReactions }} />
          <Button
            onClick={() =>
              setFlyingUpReactions((prev) => [
                ...prev,
                {
                  fromName: faker.person.firstName(),
                  id: uuidv4(),
                  type: "nudge",
                },
              ])
            }
            tagElement="button"
            variant="primary"
          >
            🫨 Nudge
          </Button>
        </div>
      );
    },
  ],
} satisfies Meta<typeof FlyingUpReactions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
