import classNames from "classnames";

import type { FeatureCardProps } from "./types";

export const FeatureCard = ({
  children,
  className,
  title,
}: FeatureCardProps) => {
  return (
    <div
      className={classNames(
        className,
        "border-pill shadow-pill bg-lemon-50 flex flex-col gap-4 rounded-2xl transition-colors dark:bg-zinc-900",
      )}
    >
      <h3 className="styled-h3 p-6 pb-0">{title}</h3>
      {children}
    </div>
  );
};
