import { useMutation } from "@tanstack/react-query";

import { updateVotingRoom } from "../services/votingRoom";
import { useNewVotingRoundStartMutation } from "./useNewVotingRoundStartMutation";

export const useVotingRoomUpdateMutation = () => {
  const { mutate: startNewVotingRound } = useNewVotingRoundStartMutation();

  return useMutation({
    mutationFn: updateVotingRoom,
    onSuccess: (votingRoom) => startNewVotingRound(votingRoom),
  });
};
