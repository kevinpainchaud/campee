import { BackfaceCard } from "../../BackfaceCard/BackfaceCard";
import { FrontfaceCard } from "../../FrontfaceCard/FrontfaceCard";
import { PlaceholderCard } from "../../PlaceholderCard/PlaceholderCard";
import { TreeDimensionCard } from "../../TreeDimensionCard/TreeDimensionCard";
import type { PeerParticipantCardProps } from "./types";

export const PeerParticipantCard = ({
  backfaceCardStyleKey,
  participantDisplayName,
  revealed,
  voteValue,
}: PeerParticipantCardProps) => {
  return (
    <div className="flex flex-col gap-2">
      <TreeDimensionCard
        backfaceCard={
          voteValue === null ? (
            <PlaceholderCard />
          ) : (
            <BackfaceCard backfaceCardStyleKey={backfaceCardStyleKey} />
          )
        }
        frontfaceCard={<FrontfaceCard voteValue={voteValue} />}
        revealed={revealed}
      />
      <div className="text-center text-sm">{participantDisplayName}</div>
    </div>
  );
};
