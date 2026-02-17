import { t } from "i18next";

import { supabase } from "../lib/supabaseClient";
import type { Vote } from "../types/voteValue";
import type { VotingRoom } from "../types/votingRoom";

export const getVotingRoomParticipants = async ({
  votingRoomId,
}: {
  votingRoomId: VotingRoom["id"];
}) => {
  const { data, error } = await supabase
    .rpc("get_voting_room_participants", {
      voting_room_id: votingRoomId,
    })
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(
      t("services.participant.participants_not_found_error_message"),
    );
  }

  return data;
};

export const joinVotingRoom = async ({
  votingRoomId,
}: {
  votingRoomId: VotingRoom["id"];
}) => {
  const { error } = await supabase.rpc("join_voting_room", {
    voting_room_id: votingRoomId,
  });

  if (error) {
    throw new Error(
      t("services.participant.voting_room_joining_error_message"),
    );
  }
};

export const leaveVotingRoom = async ({
  votingRoomId,
}: {
  votingRoomId: VotingRoom["id"];
}) => {
  const { error } = await supabase.rpc("leave_voting_room", {
    voting_room_id: votingRoomId,
  });

  if (error) {
    throw new Error(
      t("services.participant.voting_room_leaving_error_message"),
    );
  }
};

export const vote = async ({
  vote,
  votingRoomId,
}: {
  vote: Vote;
  votingRoomId: VotingRoom["id"];
}) => {
  const { data, error } = await supabase.rpc("vote", {
    vote: vote ?? undefined,
    voting_room_id: votingRoomId,
  });

  if (error) {
    throw new Error(t("services.participant.vote_update_error_message"));
  }

  return data;
};
