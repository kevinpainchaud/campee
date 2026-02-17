import type { Vote } from "../../types/voteValue";

export type CardsInHandProps = {
  activeVoteValue?: Vote;
  onCardClick?: (voteValue: Vote) => void;
  voteValues: Vote[];
};
