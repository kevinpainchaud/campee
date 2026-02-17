import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "../hooks/useAuth";
import { getUserVotingRoomsQueryKey } from "../queries/useUserVotingRoomsQuery/queryKey";
import { getVotingRoomParticipantsQueryKey } from "../queries/useVotingRoomParticipantsQuery/queryKey";
import { leaveVotingRoom } from "../services/participant";
import type { Participant } from "../types/participant";
import type { VotingRoom } from "../types/votingRoom";

export const useVotingRoomLeaveMutation = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leaveVotingRoom,
    onSuccess: (_data, { votingRoomId }) => {
      queryClient.setQueryData<Participant[]>(
        getVotingRoomParticipantsQueryKey({ votingRoomId }),
        (prev) => prev?.filter(({ user_id }) => user_id !== user?.id),
      );
      queryClient.setQueryData<VotingRoom[]>(
        getUserVotingRoomsQueryKey(),
        (prev) => prev?.filter(({ id }) => id !== votingRoomId),
      );
    },
  });
};
