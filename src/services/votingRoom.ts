import { t } from "i18next";

import { supabase } from "../lib/supabaseClient";
import type { Nudge } from "../types/nudge";
import type { Participant } from "../types/participant";
import type { Profile } from "../types/profile";
import type { VotingRoom } from "../types/votingRoom";

export const getVotingRoom = async ({
  invitationCode,
}: {
  invitationCode: VotingRoom["invitation_code"];
}) => {
  const { data, error } = await supabase
    .rpc("get_voting_room", {
      invitation_code: invitationCode,
    })
    .single();

  if (error) {
    throw new Error(
      t("services.voting_room.voting_room_not_found_error_message"),
    );
  }

  return data;
};

export const createVotingRoom = async ({
  name,
  votingSystem,
}: {
  name: VotingRoom["name"];
  votingSystem: VotingRoom["voting_system"];
}) => {
  const { data, error } = await supabase
    .rpc("create_voting_room", {
      name,
      voting_system: votingSystem,
    })
    .single();

  if (error) {
    throw new Error(
      t("services.voting_room.voting_room_creation_error_message"),
    );
  }

  return data;
};

export const updateVotingRoom = async ({
  id,
  values,
}: {
  id: VotingRoom["id"];
  values: Partial<Pick<VotingRoom, "name" | "voting_system">>;
}) => {
  const { data, error } = await supabase
    .rpc("update_voting_room", {
      id,
      name: values.name,
      voting_system: values.voting_system,
    })
    .single();

  if (error) {
    throw new Error(t("services.voting_room.voting_room_update_error_message"));
  }

  return data;
};

export const getUserVotingRooms = async () => {
  const { data: userVotingRooms, error } = await supabase
    .rpc("get_user_voting_rooms")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(
      t("services.voting_room.voting_rooms_not_found_error_message"),
    );
  }

  return userVotingRooms;
};

export const revealVotes = async ({
  votingRoomId,
}: {
  votingRoomId: VotingRoom["id"];
}) => {
  const { error } = await supabase.rpc("reveal_votes", {
    voting_room_id: votingRoomId,
  });

  if (error) {
    throw new Error(t("services.voting_room.votes_reveal_error_message"));
  }
};

export const startNewVotingRound = async ({
  votingRoomId,
}: {
  votingRoomId: VotingRoom["id"];
}) => {
  const { error } = await supabase.rpc("start_new_voting_round", {
    voting_room_id: votingRoomId,
  });

  if (error) {
    throw new Error(
      t("services.voting_room.new_voting_round_start_error_message"),
    );
  }
};

export const subscribeVotingRoomChanges = ({
  onNudgeInsert,
  onParticipantDelete,
  onParticipantInsert,
  onParticipantUpdate,
  onProfileDelete,
  onProfileInsert,
  onProfileUpdate,
  onVotingRoomDelete,
  onVotingRoomUpdate,
  votingRoomId,
}: {
  onNudgeInsert: (newNudge: Nudge) => void;
  onParticipantDelete: (oldParticipantId: Participant["id"]) => void;
  onParticipantInsert: (newParticipant: Participant) => void;
  onParticipantUpdate: (
    newParticipant: Participant,
    oldParticipant: Participant,
  ) => void;
  onProfileDelete: (oldProfileId: Profile["id"]) => void;
  onProfileInsert: (newProfile: Profile) => void;
  onProfileUpdate: (newProfile: Profile, oldProfile: Profile) => void;
  onVotingRoomDelete: (
    oldVotingRoomInvitationCode: VotingRoom["invitation_code"],
  ) => void;
  onVotingRoomUpdate: (
    newVotingRoom: VotingRoom,
    oldVotingRoom: VotingRoom,
  ) => void;
  votingRoomId: VotingRoom["id"];
}) => {
  const channel = supabase.channel(`voting_room:${votingRoomId}`, {
    config: {
      private: true,
    },
  });

  channel
    .on("broadcast", { event: "DELETE" }, ({ payload }) => {
      switch (payload.table) {
        case "participants":
          onParticipantDelete(payload.old_record.id);
          break;
        case "profiles":
          onProfileDelete(payload.old_record.id);
          break;
        case "voting_rooms":
          onVotingRoomDelete(payload.old_record.invitation_code);
          break;
      }
    })
    .on("broadcast", { event: "INSERT" }, ({ payload }) => {
      switch (payload.table) {
        case "nudges":
          onNudgeInsert(payload.record);
          break;
        case "participants":
          onParticipantInsert(payload.record);
          break;
        case "profiles":
          onProfileInsert(payload.record);
          break;
      }
    })
    .on("broadcast", { event: "UPDATE" }, ({ payload }) => {
      switch (payload.table) {
        case "participants":
          onParticipantUpdate(payload.record, payload.old_record);
          break;
        case "profiles":
          onProfileUpdate(payload.record, payload.old_record);
          break;
        case "voting_rooms":
          onVotingRoomUpdate(payload.record, payload.old_record);
          break;
      }
    })
    .subscribe();

  return () => supabase.removeChannel(channel);
};
