import { useMemo } from "react";
import { PiCoffeeBold } from "react-icons/pi";

import { getVoteLabel } from "../../utils/vote";
import { Card } from "../Card/Card";
import type { FrontfaceCardProps } from "./types";

export const FrontfaceCard = ({
  active,
  className,
  inert,
  onClick,
  onMouseEnter,
  onMouseLeave,
  tagElement,
  voteValue,
}: FrontfaceCardProps) => {
  const voteLabel = useMemo(() => getVoteLabel({ voteValue }), [voteValue]);

  return (
    <Card
      active={active}
      className={className}
      inert={inert}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      tagElement={tagElement}
      type="frontface"
    >
      {voteLabel === "☕" ? <PiCoffeeBold /> : voteLabel}
    </Card>
  );
};
