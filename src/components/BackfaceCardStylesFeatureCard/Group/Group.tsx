import { BACKFACE_CARD_STYLES } from "../../../constants/backfaceCardStyles";
import type { BackfaceCardStyle } from "../../../types/backfaceCardStyle";
import { BackfaceCard } from "../../BackfaceCard/BackfaceCard";

export const Group = () => {
  return (
    <div className="animate-scrolling flex items-center justify-center gap-4 pr-4">
      {Object.keys(BACKFACE_CARD_STYLES).map((backfaceCardStyleKey) => (
        <div className="w-28 shrink-0 lg:w-36" key={backfaceCardStyleKey}>
          <BackfaceCard
            backfaceCardStyleKey={
              backfaceCardStyleKey as BackfaceCardStyle["key"]
            }
          />
        </div>
      ))}
    </div>
  );
};
