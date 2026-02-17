import type { VotingRoom } from "./votingRoom";

export type VotingRoomFormValues = {
  name: VotingRoom["name"];
  votingSystem: VotingRoom["voting_system"];
};
