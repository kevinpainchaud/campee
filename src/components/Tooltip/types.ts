import type { Placement } from "@floating-ui/react";

export type TooltipProps = Pick<
  React.HTMLAttributes<HTMLElement>,
  "children"
> & {
  content: string | React.ReactNode;
  gap?: number;
  placement?: Placement;
};
