import classNames from "classnames";

import type { TagProps } from "./types";

export const Tag = ({ children, className }: TagProps) => {
  return (
    <div
      className={classNames(
        className,
        "border-pill shadow-pill bg-lemon-50 -rotate-2 rounded-full px-6 py-1 text-sm text-nowrap md:text-base dark:bg-zinc-900",
      )}
    >
      {children}
    </div>
  );
};
