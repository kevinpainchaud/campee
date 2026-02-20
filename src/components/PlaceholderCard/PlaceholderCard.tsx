import { Card } from "../Card/Card";
import type { PlaceholderCardProps } from "./types";

export const PlaceholderCard = ({
  className,
  "data-testid": dataTestId,
  inert,
  onClick,
  tagElement,
}: PlaceholderCardProps) => {
  return (
    <Card
      className={className}
      data-testid={dataTestId}
      inert={inert}
      onClick={onClick}
      tagElement={tagElement}
      type="placeholder"
    >
      🤔
    </Card>
  );
};
