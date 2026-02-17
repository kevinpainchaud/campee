import { useQuery } from "@tanstack/react-query";

import { getVotingRoom } from "../../services/votingRoom";
import { getVotingRoomQueryKey } from "./queryKey";
import type { useVotingRoomQueryProps } from "./types";

export const useVotingRoomQuery = ({
  invitationCode,
}: useVotingRoomQueryProps) => {
  return useQuery({
    enabled: Boolean(invitationCode),
    queryFn: async () => {
      if (!invitationCode) {
        return;
      }

      return await getVotingRoom({ invitationCode });
    },
    queryKey: getVotingRoomQueryKey({ invitationCode }),
  });
};
