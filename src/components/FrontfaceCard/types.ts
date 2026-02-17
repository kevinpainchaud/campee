import type { Vote } from "../../types/voteValue";
import type { CardProps } from "../Card/types";

export type FrontfaceCardProps = Pick<
  CardProps,
  | "active"
  | "className"
  | "inert"
  | "onClick"
  | "onMouseEnter"
  | "onMouseLeave"
  | "tagElement"
> & {
  voteValue: Vote;
};
