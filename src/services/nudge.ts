import type { User } from "@supabase/supabase-js";
import { t } from "i18next";

import { supabase } from "../lib/supabaseClient";
import type { VotingRoom } from "../types/votingRoom";

export const sendNudge = async ({
  toParticipantId,
  votingRoomId,
}: {
  toParticipantId: User["id"];
  votingRoomId: VotingRoom["id"];
}) => {
  const { error } = await supabase.rpc("send_nudge", {
    to_participant_id: toParticipantId,
    voting_room_id: votingRoomId,
  });

  if (error) {
    throw new Error(t("services.nudge.nudge_sent_error_message"));
  }
};
