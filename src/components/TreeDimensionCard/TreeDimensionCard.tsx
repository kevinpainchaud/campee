import classNames from "classnames";

import type { TreeDimensionCardProps } from "./types.ts";

export const TreeDimensionCard = ({
  backfaceCard,
  className,
  frontfaceCard,
  revealed,
}: TreeDimensionCardProps) => {
  return (
    <div className={classNames(className, "relative perspective-distant")}>
      <div
        className={classNames("size-full duration-1000 transform-3d", {
          "rotate-y-180": revealed,
        })}
      >
        <div className="size-full backface-hidden *:size-full">
          {backfaceCard}
        </div>
        <div className="absolute inset-0 rotate-y-180 backface-hidden">
          {frontfaceCard}
        </div>
      </div>
    </div>
  );
};
