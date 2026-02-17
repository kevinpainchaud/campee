import { useMutation, useQueryClient } from "@tanstack/react-query";

import { getUserVotingRoomsQueryKey } from "../queries/useUserVotingRoomsQuery/queryKey";
import { getVotingRoomParticipantsProfilesQueryKey } from "../queries/useVotingRoomParticipantsProfilesQuery/queryKey";
import { getVotingRoomParticipantsQueryKey } from "../queries/useVotingRoomParticipantsQuery/queryKey";
import { joinVotingRoom } from "../services/participant";

export const useVotingRoomJoiningMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: joinVotingRoom,
    onSuccess: (_data, { votingRoomId }) => {
      queryClient.invalidateQueries({
        queryKey: getVotingRoomParticipantsQueryKey({ votingRoomId }),
      });
      queryClient.invalidateQueries({
        queryKey: getVotingRoomParticipantsProfilesQueryKey({ votingRoomId }),
      });
      queryClient.invalidateQueries({ queryKey: getUserVotingRoomsQueryKey() });
    },
  });
};
