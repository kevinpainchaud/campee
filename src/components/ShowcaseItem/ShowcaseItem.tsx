import classNames from "classnames";

import { Tag } from "../Tag/Tag";
import type { ShowcaseItemProps } from "./types";

export const ShowcaseItem = ({
  children,
  illustration,
  layout = "illustrationRight",
  tagContent,
  title,
}: ShowcaseItemProps) => {
  return (
    <div className="shadow-pill border-pill bg-lemon-50 flex flex-col overflow-hidden rounded-2xl md:min-h-[620px] md:flex-row dark:bg-zinc-900">
      <div
        className={classNames(
          "flex flex-col items-start justify-center gap-4 md:w-1/2 md:gap-6",
          {
            "px-6 pt-6 md:order-2 md:pr-16 md:pl-4":
              layout === "illustrationLeft",
            "px-6 pt-6 md:pt-0 md:pr-4 md:pl-16":
              layout === "illustrationRight",
          },
        )}
      >
        <Tag className="mx-auto mb-2 md:mx-0">{tagContent}</Tag>
        <h2 className="styled-h2 w-full text-center md:text-left">{title}</h2>
        <div>{children}</div>
      </div>
      <div
        className={classNames(
          "mx-auto flex w-2/3 translate-y-0.5 *:size-full *:object-contain *:object-bottom-right md:w-1/2",
          {
            "max-md:self-end": layout === "illustrationRight",
          },
        )}
      >
        {illustration}
      </div>
    </div>
  );
};
