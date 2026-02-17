import type { CardProps } from "../Card/types";

export type PlaceholderCardProps = Pick<
  CardProps,
  "className" | "inert" | "onClick" | "tagElement"
>;
