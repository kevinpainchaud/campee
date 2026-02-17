import { useQuery } from "@tanstack/react-query";

import { useAuth } from "../../hooks/useAuth";
import { getUserProfile } from "../../services/profile";
import { getUserProfileQueryKey } from "./queryKey";

export const useUserProfileQuery = () => {
  const { user } = useAuth();

  return useQuery({
    enabled: Boolean(user),
    queryFn: async () => await getUserProfile(),
    queryKey: getUserProfileQueryKey(),
  });
};
