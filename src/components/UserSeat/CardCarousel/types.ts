import type { Vote } from "../../../types/voteValue";

export type CardsCarouselProps = {
  activeVoteValue?: Vote;
  onCardClick?: (voteValue: Vote) => void;
  voteValues: Vote[];
};
