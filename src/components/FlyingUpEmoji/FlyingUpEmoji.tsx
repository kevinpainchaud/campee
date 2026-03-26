import { random } from "lodash";

import type { FlyingUpEmojiProps } from "./types";

const EMOJIS_COUNT = 8;

export const FlyingUpEmoji = ({
  emoji,
  onAnimationEnd,
}: FlyingUpEmojiProps) => {
  return Array.from({ length: EMOJIS_COUNT }).map((_item, index) => (
    <div
      className="fixed bottom-0 translate-y-full"
      key={index}
      style={{ left: `${random(5, 95)}%` }}
    >
      <div
        className="fill-mode-forwards animate-rising"
        onAnimationEnd={index === EMOJIS_COUNT - 1 ? onAnimationEnd : undefined}
        style={{
          animationDelay: `${index * 200}ms`,
        }}
      >
        <div
          className="animate-swaying text-5xl lg:text-6xl"
          style={
            { "--x-translation": `${random(-8, 8)}rem` } as React.CSSProperties
          }
        >
          {emoji}
        </div>
      </div>
    </div>
  ));
};
