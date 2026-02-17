export type FlyingUpReaction = {
  fromName: string;
  id: string;
  type: "nudge";
};

export type FlyingUpReactionsProps = {
  flyingUpReactions: FlyingUpReaction[];
  onFlyingUpReactionAnimationEnd?: (
    flyingUpReactionId: FlyingUpReaction["id"],
  ) => void;
};
