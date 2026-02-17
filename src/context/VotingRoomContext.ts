import type { Emitter } from "mitt";
import mitt from "mitt";
import { createContext } from "react";

import type { Participant } from "../types/participant";
import type { Profile } from "../types/profile";
import type { VotingRoom } from "../types/votingRoom";
import type { VotingRoomEvents } from "../types/votingRoomEvents";

export const VotingRoomContext = createContext<{
  emitter: Emitter<VotingRoomEvents>;
  isPending: boolean;
  participants?: Participant[];
  participantsError: Error | null;
  participantsIsPending: boolean;
  participantsProfiles?: Profile[];
  participantsProfilesError: Error | null;
  peerParticipants?: Participant[];
  userParticipant?: Participant;
  userParticipantProfile?: Profile;
  votingRoom?: VotingRoom;
  votingRoomError: Error | null;
}>({
  emitter: mitt(),
  isPending: true,
  participantsError: null,
  participantsIsPending: true,
  participantsProfilesError: null,
  votingRoomError: null,
});
