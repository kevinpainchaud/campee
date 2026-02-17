import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";

import { VotingRoomContext } from "../context/VotingRoomContext";
import { useAuth } from "../hooks/useAuth";
import { getVotingRoomParticipantsQueryKey } from "../queries/useVotingRoomParticipantsQuery/queryKey";
import { vote } from "../services/participant";
import type { Participant } from "../types/participant";
import type { Vote } from "../types/voteValue";
import type { VotingRoom } from "../types/votingRoom";

export const useVoteUpdateMutation = () => {
  const { participants } = useContext(VotingRoomContext);

  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      vote: voteValue,
      votingRoomId,
    }: {
      vote: Vote;
      votingRoomId: VotingRoom["id"];
    }) => await vote({ vote: voteValue, votingRoomId }),
    // [Optimistic UI] Update participant before server response
    onMutate: async ({ vote, votingRoomId }) => {
      const previousParticipant = participants?.find(
        (participant) => participant.user_id === user?.id,
      );

      queryClient.setQueryData<Participant[]>(
        getVotingRoomParticipantsQueryKey({
          votingRoomId,
        }),
        (prev) =>
          prev?.map((participant) =>
            participant.user_id === user?.id
              ? { ...participant, vote }
              : participant,
          ),
      );

      return {
        previousParticipant,
      };
    },
    // eslint-disable-next-line sort-keys
    onError: (_error, { votingRoomId }, onMutateResult) => {
      if (!onMutateResult?.previousParticipant) {
        return;
      }

      queryClient.setQueryData<Participant[]>(
        getVotingRoomParticipantsQueryKey({
          votingRoomId,
        }),
        (prev) =>
          prev?.map((participant) =>
            participant.id === user?.id
              ? onMutateResult.previousParticipant!
              : participant,
          ),
      );
    },
  });
};
