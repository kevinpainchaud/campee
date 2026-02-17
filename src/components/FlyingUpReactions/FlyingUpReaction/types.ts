import type { HTMLAttributes } from "react";

import type { FlyingUpReaction } from "../types";

export type FlyingUpReactionProps = Pick<
  HTMLAttributes<HTMLDivElement>,
  "onAnimationEnd"
> & {
  flyingUpReaction: FlyingUpReaction;
};
