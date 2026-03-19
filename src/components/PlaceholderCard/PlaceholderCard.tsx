import { Card } from "../Card/Card";
import type { PlaceholderCardProps } from "./types";

export const PlaceholderCard = ({
  className,
  cursorDefault,
  "data-testid": dataTestId,
  inert,
  onClick,
  tagElement,
}: PlaceholderCardProps) => {
  return (
    <Card
      className={className}
      cursorDefault={cursorDefault}
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
