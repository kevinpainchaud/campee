import { BackfaceCard } from "../../BackfaceCard/BackfaceCard";
import { FrontfaceCard } from "../../FrontfaceCard/FrontfaceCard";
import { TreeDimensionCard } from "../../TreeDimensionCard/TreeDimensionCard";
import type { CardProps } from "./types";

export const Card = ({ backfaceCardStyleKey, revealed }: CardProps) => {
  return (
    <TreeDimensionCard
      backfaceCard={
        <BackfaceCard backfaceCardStyleKey={backfaceCardStyleKey} />
      }
      className="w-14"
      frontfaceCard={<FrontfaceCard voteValue="3" />}
      revealed={revealed}
    />
  );
};
