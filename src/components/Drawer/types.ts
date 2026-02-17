export type DrawerProps = Pick<
  React.HTMLAttributes<HTMLDialogElement>,
  "children"
> & {
  actionButton?: React.ReactNode;
  backButton?: {
    onClick: () => void;
  };
  isPending?: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
};
