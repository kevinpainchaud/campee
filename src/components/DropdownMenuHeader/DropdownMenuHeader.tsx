import classNames from "classnames";

import type { DropdownMenuHeaderProps } from "./types";

export const DropdownMenuHeader = ({
  children,
  noPaddingX,
}: DropdownMenuHeaderProps) => {
  return (
    <div
      className={classNames(
        "line-clamp-1 text-sm text-zinc-600 dark:text-zinc-300",
        {
          "px-3": !noPaddingX,
        },
      )}
    >
      {children}
    </div>
  );
};
