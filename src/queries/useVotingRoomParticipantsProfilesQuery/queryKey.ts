import type { useVotingRoomParticipantsProfilesQueryProps } from "./types";

export const getVotingRoomParticipantsProfilesQueryKey = ({
  votingRoomId,
}: useVotingRoomParticipantsProfilesQueryProps = {}) => [
  "votingRoomParticipantsProfiles",
  ...(votingRoomId ? [votingRoomId] : []),
];
