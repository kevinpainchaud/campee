import { useQuery } from "@tanstack/react-query";

import { getVotingRoomParticipantsProfiles } from "../../services/profile";
import { getVotingRoomParticipantsProfilesQueryKey } from "./queryKey";
import type { useVotingRoomParticipantsProfilesQueryProps } from "./types";

export const useVotingRoomParticipantsProfilesQuery = ({
  votingRoomId,
}: useVotingRoomParticipantsProfilesQueryProps) => {
  return useQuery({
    enabled: Boolean(votingRoomId),
    queryFn: async () => {
      if (!votingRoomId) {
        return;
      }

      return await getVotingRoomParticipantsProfiles({ votingRoomId });
    },
    queryKey: getVotingRoomParticipantsProfilesQueryKey({ votingRoomId }),
  });
};
