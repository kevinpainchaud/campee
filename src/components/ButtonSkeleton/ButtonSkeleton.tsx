import classNames from "classnames";

import type { ButtonSkeletonProps } from "./types";

export const ButtonSkeleton = ({ size = "base" }: ButtonSkeletonProps) => {
  return (
    <div
      className={classNames("skeleton w-36 rounded-full", {
        "h-8": size === "sm",
        "h-11": size === "base",
        "h-14": size === "lg",
      })}
    ></div>
  );
};
