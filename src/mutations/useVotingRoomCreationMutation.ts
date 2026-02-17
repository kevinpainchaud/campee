import { useMutation, useQueryClient } from "@tanstack/react-query";

import { getUserVotingRoomsQueryKey } from "../queries/useUserVotingRoomsQuery/queryKey";
import { createVotingRoom } from "../services/votingRoom";

export const useVotingRoomCreationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createVotingRoom,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: getUserVotingRoomsQueryKey() }),
  });
};
