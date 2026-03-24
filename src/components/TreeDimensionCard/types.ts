export type TreeDimensionCardProps = Pick<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "onAnimationEnd"
> & {
  backfaceCard: React.ReactNode;
  frontfaceCard: React.ReactNode;
  revealed: boolean;
};
