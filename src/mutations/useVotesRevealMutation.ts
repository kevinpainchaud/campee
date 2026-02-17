import { useMutation, useQueryClient } from "@tanstack/react-query";

import { getVotingRoomQueryKey } from "../queries/useVotingRoomQuery/queryKey";
import { revealVotes } from "../services/votingRoom";
import type { VotingRoom } from "../types/votingRoom";

export const useVotesRevealMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (votingRoom: VotingRoom) =>
      await revealVotes({ votingRoomId: votingRoom.id }),
    // [Optimistic UI] Update voting room to revealed before server response
    onMutate: (votingRoom) => {
      queryClient.setQueryData<VotingRoom>(
        getVotingRoomQueryKey({
          invitationCode: votingRoom.invitation_code,
        }),
        (prev) => (prev ? { ...prev, votes_revealed: true } : undefined),
      );
    },
    // eslint-disable-next-line sort-keys
    onError: (_error, votingRoom) => {
      queryClient.setQueryData<VotingRoom>(
        getVotingRoomQueryKey({
          invitationCode: votingRoom.invitation_code,
        }),
        (prev) => (prev ? { ...prev, votes_revealed: false } : undefined),
      );
    },
  });
};
