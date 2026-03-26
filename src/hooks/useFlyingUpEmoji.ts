import { useContext } from "react";

import { FlyingUpEmojiContext } from "../context/FlyingUpEmoji";

export const useFlyingUpEmoji = () => {
  const flyingUpEmojiContext = useContext(FlyingUpEmojiContext);

  return flyingUpEmojiContext;
};
