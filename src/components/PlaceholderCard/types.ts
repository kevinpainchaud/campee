import type { CardProps } from "../Card/types";

export type PlaceholderCardProps = Pick<
  CardProps,
  "className" | "data-testid" | "inert" | "onClick" | "tagElement"
>;
