import { useQuery } from "@tanstack/react-query";

import { getVotingRoomParticipants } from "../../services/participant";
import { getVotingRoomParticipantsQueryKey } from "./queryKey";
import type { useVotingRoomParticipantsQueryProps } from "./types";

export const useVotingRoomParticipantsQuery = ({
  votingRoomId,
}: useVotingRoomParticipantsQueryProps) => {
  return useQuery({
    enabled: Boolean(votingRoomId),
    queryFn: async () => {
      if (!votingRoomId) {
        return;
      }

      return await getVotingRoomParticipants({ votingRoomId });
    },
    queryKey: getVotingRoomParticipantsQueryKey({ votingRoomId }),
  });
};
