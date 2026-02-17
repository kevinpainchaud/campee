import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

import type { VotingRoom } from "../types/votingRoom";

export const getVotingRoomMock = ({
  created_at = dayjs().subtract(2, "days").format(),
  created_by = uuidv4(),
  id = uuidv4(),
  invitation_code = "ABCDEF",
  name = "Pariatur exercitation voluptate",
  updated_at = dayjs().subtract(1, "day").format(),
  updated_by = uuidv4(),
  votes_revealed = false,
  voting_system = "scrum",
}: Partial<VotingRoom> = {}): VotingRoom => ({
  created_at,
  created_by,
  id,
  invitation_code,
  name,
  updated_at,
  updated_by,
  votes_revealed,
  voting_system,
});
