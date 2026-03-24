import type { User } from "@supabase/supabase-js";

import type { Nudge } from "./nudge";
import type { VotingRoom } from "./votingRoom";

type CommonVotingRoomEventProps = {
  by: User["id"] | null;
};

export type NameChangedVotingRoomEventProps = CommonVotingRoomEventProps & {
  newName: VotingRoom["name"];
};

export type NewVotingRoundStartedVotingRoomEventProps =
  CommonVotingRoomEventProps;

export type NudgeSentVotingRoomEventProps = CommonVotingRoomEventProps & {
  nudge: Nudge;
};

export type ParticipantVoteEditedVotingRoomEventProps =
  CommonVotingRoomEventProps;

export type VotesRevealedVotingRoomEventProps = CommonVotingRoomEventProps;

export type VotingSystemChangedVotingRoomEventProps =
  CommonVotingRoomEventProps & {
    newVotingSystem: VotingRoom["voting_system"];
  };

export type VotingRoomEvents = {
  nameChanged: NameChangedVotingRoomEventProps;
  newVotingRoundStarted: NewVotingRoundStartedVotingRoomEventProps;
  nudgeSent: NudgeSentVotingRoomEventProps;
  participantVoteEdited: ParticipantVoteEditedVotingRoomEventProps;
  votesRevealed: VotesRevealedVotingRoomEventProps;
  votingSystemChanged: VotingSystemChangedVotingRoomEventProps;
};
