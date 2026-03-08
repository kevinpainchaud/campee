export type VotingRoomTableProps = Pick<
  React.HTMLAttributes<HTMLDivElement>,
  "className"
> & {
  onSeeQrCodeButtonClick: () => void;
};
