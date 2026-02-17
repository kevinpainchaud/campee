import classNames from "classnames";

import { Demo } from "../../../../components/Demo/Demo";
import type { DemoPlayerProps } from "./types";

export const DemoPlayer = ({ className }: DemoPlayerProps) => {
  return (
    <div
      className={classNames(
        className,
        "border-pill shadow-pill relative flex flex-col overflow-hidden rounded-3xl transition-discrete",
      )}
    >
      <div className="flex h-8 w-full items-center gap-2.5 bg-zinc-900 pl-4 dark:bg-zinc-600">
        {Array.from({ length: 3 }).map((_item, index) => (
          <div className="size-3 rounded-full bg-white" key={index}></div>
        ))}
      </div>
      <Demo />
    </div>
  );
};
