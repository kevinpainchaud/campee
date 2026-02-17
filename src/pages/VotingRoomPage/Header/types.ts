export type HeaderProps = Pick<
  React.HTMLAttributes<HTMLDivElement>,
  "className"
> & {
  onMainMenuDrawerToggleButtonClick: () => void;
  onVotingRoomEditionButtonClick: () => void;
  onVotingRoomJoiningButtonClick: () => void;
  votingRoomJoiningIsPending: boolean;
};
