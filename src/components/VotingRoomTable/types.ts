export type VotingRoomTableProps = Pick<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "style"
> & {
  onSeeQrCodeButtonClick: () => void;
};
