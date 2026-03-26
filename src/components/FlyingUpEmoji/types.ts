export type FlyingUpEmojiProps = Pick<
  React.HTMLAttributes<HTMLDivElement>,
  "onAnimationEnd"
> & {
  emoji: string;
};
