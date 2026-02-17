export type ModalProps = Pick<
  React.HTMLAttributes<HTMLDialogElement>,
  "children"
> & {
  footer?: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
};
