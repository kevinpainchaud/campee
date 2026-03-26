import { createContext } from "react";

export const FlyingUpEmojiContext = createContext<{
  triggerFlyingUpEmoji: (emoji: string) => void;
}>(null!);
