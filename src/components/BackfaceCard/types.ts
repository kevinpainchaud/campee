import type { BackfaceCardStyle } from "../../types/backfaceCardStyle";
import type { CardProps } from "../Card/types";

export type BackfaceCardProps = Pick<
  CardProps,
  | "className"
  | "data-testid"
  | "data-testvalue-key"
  | "inert"
  | "onClick"
  | "saturated"
  | "tagElement"
  | "title"
> & {
  backfaceCardStyleKey: BackfaceCardStyle["key"];
};
