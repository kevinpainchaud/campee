import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { getProfiles } from "../../services/profile";
import type { Profile } from "../../types/profile";
import { getProfilesQueryKey } from "./queryKey";
import type { useProfilesQueryProps } from "./types";

export const useProfilesQuery = (
  { ids }: useProfilesQueryProps,
  options?: Pick<UseQueryOptions<Profile[] | null>, "enabled">,
) =>
  useQuery({
    enabled: Boolean(ids),
    queryFn: async () => {
      if (!ids) {
        return null;
      }

      return await getProfiles({ ids });
    },
    queryKey: getProfilesQueryKey({ ids }),
    ...options,
  });
