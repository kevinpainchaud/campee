import { BackfaceCardBackground } from "../BackfaceCardBackground/BackfaceCardBackground";
import { Card } from "../Card/Card";
import type { BackfaceCardProps } from "./types";

export const BackfaceCard = ({
  backfaceCardStyleKey,
  className,
  inert,
  onClick,
  saturated,
  tagElement,
  title,
}: BackfaceCardProps) => {
  return (
    <Card
      className={className}
      inert={inert}
      onClick={onClick}
      saturated={saturated}
      tagElement={tagElement}
      title={title}
      type="backface"
    >
      <BackfaceCardBackground backfaceCardStyleKey={backfaceCardStyleKey} />
    </Card>
  );
};
