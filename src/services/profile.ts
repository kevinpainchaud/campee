import { t } from "i18next";

import { supabase } from "../lib/supabaseClient";
import type { Profile } from "../types/profile";
import type { VotingRoom } from "../types/votingRoom";

export const getUserProfile = async () => {
  const { data, error } = await supabase.rpc("get_user_profile").single();

  if (error) {
    throw new Error(t("services.profile.profile_not_found_error_message"));
  }

  return data;
};

export const getProfiles = async ({ ids }: { ids: Profile["id"][] }) => {
  const { data, error } = await supabase.rpc("get_profiles", { ids });

  if (error) {
    throw new Error(t("services.profile.profiles_not_found_error_message"));
  }

  return data;
};

export const getVotingRoomParticipantsProfiles = async ({
  votingRoomId,
}: {
  votingRoomId: VotingRoom["id"];
}) => {
  const { data, error } = await supabase.rpc(
    "get_voting_room_participants_profiles",
    {
      voting_room_id: votingRoomId,
    },
  );

  if (error) {
    throw new Error(t("services.profile.profiles_not_found_error_message"));
  }

  return data;
};

export const updateProfile = async ({
  values,
}: {
  values: Partial<
    Pick<Profile, "backface_card_style_key" | "company_name" | "display_name">
  >;
}) => {
  const { data, error } = await supabase
    .rpc("update_profile", {
      backface_card_style_key: values.backface_card_style_key,
      company_name: values.company_name ?? undefined,
      display_name: values.display_name,
    })
    .single();

  if (error) {
    throw new Error(t("services.profile.profile_update_error_message"));
  }

  return data;
};
