import type { ButtonProps } from "../types";

export type ContentProps = Pick<
  ButtonProps,
  "children" | "leftIcon" | "rightIcon"
>;
