import classNames from "classnames";

import type { CardProps } from "./types";

export const Card = ({
  active,
  children,
  className,
  inert,
  onClick,
  onMouseEnter,
  onMouseLeave,
  saturated,
  tagElement: Tag = "div",
  title,
  type,
}: CardProps) => {
  return (
    <div className={classNames(className, "@container aspect-2/3")}>
      <Tag
        className={classNames(
          "border-pill flex size-full overflow-hidden rounded-xl text-base font-semibold uppercase transition-none select-none *:w-full @min-[4rem]:rounded-2xl @min-[4rem]:text-2xl @min-[6rem]:rounded-3xl @min-[6rem]:text-4xl",
          { "shadow-pill": type !== "placeholder" },
          {
            "bg-lemon-50 dark:text-lemon-50 text-zinc-900 dark:bg-zinc-900":
              type === "frontface" && !active,
            "border-dashed border-zinc-900 text-zinc-900 dark:border-zinc-600":
              type === "placeholder",
            "dark:bg-lemon-50 text-lemon-50 bg-zinc-900 dark:text-zinc-900":
              (type === "frontface" && active) || type === "backface",
            "dark:border-lemon-50/10! dark:shadow-lemon-50/10! border-zinc-900/10! bg-transparent! shadow-zinc-900/10! *:opacity-20 *:saturate-0":
              saturated,
            "flex items-center justify-center":
              type === "frontface" || type === "placeholder",
          },
        )}
        inert={inert}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        title={title}
        type="button"
      >
        {children}
      </Tag>
    </div>
  );
};
