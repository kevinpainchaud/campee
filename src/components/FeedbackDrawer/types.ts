import type { DrawerProps } from "../Drawer/types";

export type FeedbackDrawerProps = Pick<DrawerProps, "open" | "setOpen">;

export type FeedbackFormValues = {
  from?: string;
  message: string;
};
