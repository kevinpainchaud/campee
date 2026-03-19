import type { CardProps } from "../Card/types";

export type PlaceholderCardProps = Pick<
  CardProps,
  | "className"
  | "cursorDefault"
  | "data-testid"
  | "inert"
  | "onClick"
  | "tagElement"
>;
