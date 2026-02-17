import type { useVotingRoomQueryProps } from "./types";

export const getVotingRoomQueryKey = ({
  invitationCode,
}: useVotingRoomQueryProps = {}) => [
  "votingRoom",
  ...(invitationCode ? [invitationCode] : []),
];
