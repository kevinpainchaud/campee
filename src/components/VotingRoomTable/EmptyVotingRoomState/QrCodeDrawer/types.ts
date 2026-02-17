import type { ModalProps } from "../../../Modal/types";

export type QrCodeModalProps = Pick<
  ModalProps,
  "open" | "setOpen" | "title"
> & {
  url: string;
};
