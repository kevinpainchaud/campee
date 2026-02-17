import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { getUserVotingRooms } from "../../services/votingRoom";
import type { VotingRoom } from "../../types/votingRoom";
import { getUserVotingRoomsQueryKey } from "./queryKey";

export const useUserVotingRoomsQuery = (
  options?: Pick<UseQueryOptions<VotingRoom[]>, "enabled">,
) =>
  useQuery({
    queryFn: getUserVotingRooms,
    queryKey: getUserVotingRoomsQueryKey(),
    ...options,
  });
