import type { ConfirmModalProps } from "../components/ConfirmModal/types";

export type ConfirmOptions = Pick<
  ConfirmModalProps,
  | "cancelButtonLabel"
  | "children"
  | "confirmButtonDanger"
  | "confirmButtonLabel"
  | "title"
> & {
  onClose?: () => void;
  onConfirm: () => void;
};
