import { FlyingUpReaction } from "./FlyingUpReaction/FlyingUpReaction";
import type { FlyingUpReactionsProps } from "./types";

export const FlyingUpReactions = ({
  flyingUpReactions,
  onFlyingUpReactionAnimationEnd,
}: FlyingUpReactionsProps) => {
  return (
    <div className="relative">
      {flyingUpReactions.map((flyingUpReaction) => (
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          key={flyingUpReaction.id}
        >
          <FlyingUpReaction
            flyingUpReaction={flyingUpReaction}
            onAnimationEnd={() =>
              onFlyingUpReactionAnimationEnd?.(flyingUpReaction.id)
            }
          />
        </div>
      ))}
    </div>
  );
};
