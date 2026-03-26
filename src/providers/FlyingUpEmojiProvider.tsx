import { useState } from "react";

import { FlyingUpEmoji } from "../components/FlyingUpEmoji/FlyingUpEmoji";
import { FlyingUpEmojiContext } from "../context/FlyingUpEmoji";

export const FlyingUpEmojiProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [flyingUpEmoji, setFlyingUpEmoji] = useState<string>();

  return (
    <FlyingUpEmojiContext.Provider
      value={{ triggerFlyingUpEmoji: setFlyingUpEmoji }}
    >
      {children}
      {flyingUpEmoji && (
        <FlyingUpEmoji
          emoji={flyingUpEmoji}
          onAnimationEnd={() => setFlyingUpEmoji(undefined)}
        />
      )}
    </FlyingUpEmojiContext.Provider>
  );
};
