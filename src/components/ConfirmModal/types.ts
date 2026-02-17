export type ConfirmModalProps = Pick<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> & {
  cancelButtonLabel?: string;
  confirmButtonDanger?: boolean;
  confirmButtonLabel?: string;
  onCancelButtonClick?: () => void;
  onConfirmButtonClick?: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
};
