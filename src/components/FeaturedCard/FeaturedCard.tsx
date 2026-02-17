import classNames from "classnames";
import React from "react";

import type { FeaturedCardProps } from "./types";

export const FeaturedCard = ({
  active,
  className,
  description,
  icon,
  title,
}: FeaturedCardProps) => {
  return (
    <div
      className={classNames(
        className,
        "border-pill shadow-pill flex flex-col gap-2 rounded-2xl p-8 md:p-12",
        {
          "bg-white dark:bg-zinc-900": !active,
          "bg-zinc-900 text-white dark:bg-zinc-600": active,
        },
      )}
    >
      {React.createElement(icon, {
        className: "text-2xl md:text-3xl",
      })}
      <h3 className="styled-h3">{title}</h3>
      <div>{description}</div>
    </div>
  );
};
