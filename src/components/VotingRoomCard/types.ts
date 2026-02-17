import type { LinkProps } from "react-router";

import type { Profile } from "../../types/profile";
import type { VotingRoom } from "../../types/votingRoom";

export type VotingRoomCardProps = Pick<LinkProps, "onClick"> & {
  adminUserProfile: Profile;
  createdByUser: boolean;
  votingRoom: VotingRoom;
};
