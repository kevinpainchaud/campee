import type { BackfaceCardStyle } from "../../types/backfaceCardStyle";
import type { CardProps } from "../Card/types";

export type BackfaceCardProps = Pick<
  CardProps,
  "className" | "inert" | "onClick" | "saturated" | "tagElement" | "title"
> & {
  backfaceCardStyleKey: BackfaceCardStyle["key"];
};
