import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";

import { VotingRoomContext } from "../context/VotingRoomContext";
import { getVotingRoomParticipantsQueryKey } from "../queries/useVotingRoomParticipantsQuery/queryKey";
import { getVotingRoomQueryKey } from "../queries/useVotingRoomQuery/queryKey";
import { startNewVotingRound } from "../services/votingRoom";
import type { Participant } from "../types/participant";
import type { VotingRoom } from "../types/votingRoom";

export const useNewVotingRoundStartMutation = () => {
  const { participants } = useContext(VotingRoomContext);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (votingRoom: VotingRoom) => {
      await startNewVotingRound({ votingRoomId: votingRoom.id });
    },
    // [Optimistic UI] Update voting room and participants votes before server response
    onMutate: (votingRoom) => {
      queryClient.setQueryData<VotingRoom>(
        getVotingRoomQueryKey({
          invitationCode: votingRoom.invitation_code,
        }),
        (prev) => (prev ? { ...prev, votes_revealed: false } : undefined),
      );

      const previousParticipantsVotes = participants?.map(({ id, vote }) => ({
        id,
        vote,
      }));

      queryClient.setQueryData<Participant[]>(
        getVotingRoomParticipantsQueryKey({
          votingRoomId: votingRoom.id,
        }),
        (prev) => prev?.map((participant) => ({ ...participant, vote: null })),
      );

      return {
        previousParticipantsVotes,
      };
    },
    // eslint-disable-next-line sort-keys
    onError: (_error, votingRoom, onMutateResult) => {
      queryClient.setQueryData<VotingRoom>(
        getVotingRoomQueryKey({
          invitationCode: votingRoom.invitation_code,
        }),
        (prev) => (prev ? { ...prev, votes_revealed: true } : undefined),
      );

      queryClient.setQueryData<Participant[]>(
        getVotingRoomParticipantsQueryKey({
          votingRoomId: votingRoom.id,
        }),
        (prev) =>
          prev?.map((participant) => {
            const previousVote =
              onMutateResult?.previousParticipantsVotes?.find(
                ({ id }) => id === participant.id,
              );

            return previousVote
              ? { ...participant, vote: previousVote.vote }
              : participant;
          }),
      );
    },
  });
};
