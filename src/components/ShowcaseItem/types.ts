import type { HTMLAttributes } from "react";

export type ShowcaseItemProps = Pick<
  HTMLAttributes<HTMLDivElement>,
  "children" | "className"
> & {
  illustration: React.ReactNode;
  layout?: "illustrationLeft" | "illustrationRight";
  tagContent: string;
  title: string;
};
