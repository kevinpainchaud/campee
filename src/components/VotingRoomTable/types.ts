export type VotingRoomTableProps = Pick<
  React.HTMLAttributes<HTMLDivElement>,
  "className"
> & {
  floatingLeftContent?: React.ReactNode;
  onSeeQrCodeButtonClick: () => void;
};
