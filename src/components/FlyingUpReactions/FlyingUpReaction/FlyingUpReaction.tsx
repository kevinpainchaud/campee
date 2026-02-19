import { random } from "lodash";
import { useMemo } from "react";

import type { FlyingUpReactionProps } from "./types";

export const FlyingUpReaction = ({
  flyingUpReaction,
  onAnimationEnd,
}: FlyingUpReactionProps) => {
  const emoji: string = useMemo(() => {
    switch (flyingUpReaction.type) {
      case "nudge":
        return "🫨";
    }
  }, [flyingUpReaction.type]);

  const xTranslation = useMemo(() => random(-2, 2), []);

  return (
    <div
      className="animate-flying-up fill-mode-forwards"
      onAnimationEnd={onAnimationEnd}
      style={
        {
          "--x-translation": `${xTranslation}rem`,
        } as React.CSSProperties
      }
    >
      <div className="flex flex-col items-center">
        <div className="text-3xl">{emoji}</div>
        <div className="dark:bg-lemon-50 text-lemon-50 line-clamp-1 rounded-full bg-zinc-950 px-1 text-xs dark:text-zinc-950">
          {flyingUpReaction.fromName}
        </div>
      </div>
    </div>
  );
};
