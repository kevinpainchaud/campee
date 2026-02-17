import { FrontfaceCard } from "../../FrontfaceCard/FrontfaceCard";
import type { CardsCarouselProps } from "./types";

export const CardsCarousel = ({
  activeVoteValue,
  onCardClick,
  voteValues,
}: CardsCarouselProps) => {
  return (
    <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto p-2">
      {voteValues.map((voteValue, index) => (
        <div className="w-14 min-w-14 snap-center" key={index}>
          <FrontfaceCard
            active={voteValue === activeVoteValue}
            onClick={() => onCardClick?.(voteValue)}
            tagElement="button"
            voteValue={voteValue}
          />
        </div>
      ))}
    </div>
  );
};
