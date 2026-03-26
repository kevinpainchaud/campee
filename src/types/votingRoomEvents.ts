import type { User } from "@supabase/supabase-js";

import type { Nudge } from "./nudge";
import type { Participant } from "./participant";
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

export type ParticipantVoteChangedVotingRoomEventProps =
  CommonVotingRoomEventProps & {
    newVote: Participant["vote"];
    oldVote: Participant["vote"];
  };

export type VotesRevealedVotingRoomEventProps = CommonVotingRoomEventProps;

export type VotingSystemChangedVotingRoomEventProps =
  CommonVotingRoomEventProps & {
    newVotingSystem: VotingRoom["voting_system"];
  };

export type VotingRoomEvents = {
  nameChanged: NameChangedVotingRoomEventProps;
  newVotingRoundStarted: NewVotingRoundStartedVotingRoomEventProps;
  nudgeSent: NudgeSentVotingRoomEventProps;
  participantVoteChanged: ParticipantVoteChangedVotingRoomEventProps;
  votesRevealed: VotesRevealedVotingRoomEventProps;
  votingSystemChanged: VotingSystemChangedVotingRoomEventProps;
};
