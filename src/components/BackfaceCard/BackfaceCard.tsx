import { BackfaceCardBackground } from "../BackfaceCardBackground/BackfaceCardBackground";
import { Card } from "../Card/Card";
import type { BackfaceCardProps } from "./types";

export const BackfaceCard = ({
  backfaceCardStyleKey,
  className,
  "data-testid": dataTestId,
  "data-testvalue-key": dataTestValueKey,
  inert,
  onClick,
  saturated,
  tagElement,
  title,
}: BackfaceCardProps) => {
  return (
    <Card
      className={className}
      data-testid={dataTestId}
      data-testvalue-key={dataTestValueKey}
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
