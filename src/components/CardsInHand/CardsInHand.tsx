import "./index.css";

import { useMeasure } from "@uidotdev/usehooks";
import classNames from "classnames";
import { useState } from "react";

import { FrontfaceCard } from "../FrontfaceCard/FrontfaceCard";
import type { CardsInHandProps } from "./types";

export const CardsInHand = ({
  activeVoteValue,
  onCardClick,
  voteValues,
}: CardsInHandProps) => {
  const [firstCardRef, { height: firstCardHeight }] = useMeasure();

  const [hoveredCardIndex, setHoveredCardIndex] = useState<number>();

  return (
    <div
      className="@container relative flex justify-center gap-0"
      style={{
        height: `${firstCardHeight}px`,
        minHeight: `${firstCardHeight}px`,
      }}
    >
      {voteValues.map((voteValue, index) => (
        <div
          className={classNames(
            "card-wrapper",
            "absolute bottom-0 duration-100",
            "@8xl:w-36 w-12 @lg:w-16 @2xl:w-18 @4xl:w-22 @6xl:w-28",
            {
              "card-wrapper--active": voteValue === activeVoteValue,
              "card-wrapper--hovered": hoveredCardIndex === index,
            },
          )}
          key={index}
          ref={index === 0 ? firstCardRef : undefined}
          style={
            {
              "--index": -Math.floor(voteValues.length / 2) + index,
            } as React.CSSProperties
          }
        >
          <FrontfaceCard
            active={voteValue === activeVoteValue}
            onClick={() => onCardClick?.(voteValue)}
            onMouseEnter={() => setHoveredCardIndex(index)}
            onMouseLeave={() => setHoveredCardIndex(undefined)}
            tagElement="button"
            voteValue={voteValue}
          />
        </div>
      ))}
    </div>
  );
};
