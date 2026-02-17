import type { useVotingRoomParticipantsQueryProps } from "./types";

export const getVotingRoomParticipantsQueryKey = ({
  votingRoomId,
}: useVotingRoomParticipantsQueryProps = {}) => [
  "votingRoomParticipants",
  ...(votingRoomId ? [votingRoomId] : []),
];
