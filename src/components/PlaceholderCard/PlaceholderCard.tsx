import { Card } from "../Card/Card";
import type { PlaceholderCardProps } from "./types";

export const PlaceholderCard = ({
  className,
  inert,
  onClick,
  tagElement,
}: PlaceholderCardProps) => {
  return (
    <Card
      className={className}
      inert={inert}
      onClick={onClick}
      tagElement={tagElement}
      type="placeholder"
    >
      🤔
    </Card>
  );
};
