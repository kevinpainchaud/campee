import classNames from "classnames";

import type { AvatarProps } from "./types";

export const Avatar = ({
  className,
  initials,
  onMouseEnter,
  onPointerEnter,
  size = "base",
}: AvatarProps) => {
  return (
    <div
      className={classNames(
        className,
        "flex items-center justify-center rounded-full leading-0 font-semibold uppercase",
        "dark:bg-lemon-50 text-lemon-50 bg-zinc-950 dark:text-zinc-950",
        {
          "size-4 text-[10px]": size === "xs",
          "size-6 text-xs": size === "sm",
          "size-10 text-xl": size === "base",
        },
      )}
      onMouseEnter={onMouseEnter}
      onPointerEnter={onPointerEnter}
    >
      {initials}
    </div>
  );
};
