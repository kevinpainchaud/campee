import type { Meta, StoryObj } from "@storybook/react-vite";

import { getProfileMock } from "../../mocks/profile";
import { getVotingRoomMock } from "../../mocks/votingRoom";
import { VotingRoomCard } from "./VotingRoomCard";

const meta = {
  args: {
    adminUserProfile: getProfileMock(),
    createdByUser: false,
    votingRoom: getVotingRoomMock(),
  },
  component: VotingRoomCard,
  render: (args) => (
    <div className="flex">
      <VotingRoomCard {...args} />
    </div>
  ),
} satisfies Meta<typeof VotingRoomCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
