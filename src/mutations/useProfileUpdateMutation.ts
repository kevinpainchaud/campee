import { useMutation, useQueryClient } from "@tanstack/react-query";

import { getProfilesQueryKey } from "../queries/useProfilesQuery/queryKey";
import { getUserProfileQueryKey } from "../queries/useUserProfileQuery/queryKey";
import { updateProfile } from "../services/profile";
import type { Profile } from "../types/profile";

export const useProfileUpdateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      values,
    }: {
      values: Partial<
        Pick<
          Profile,
          "backface_card_style_key" | "company_name" | "display_name"
        >
      >;
    }) => await updateProfile({ values }),
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData<Profile>(
        getUserProfileQueryKey(),
        () => updatedProfile,
      );
      queryClient.setQueryData<Profile[]>(getProfilesQueryKey(), (profiles) =>
        profiles?.map((profile) =>
          profile.id === updatedProfile.id ? updatedProfile : profile,
        ),
      );
    },
  });
};
