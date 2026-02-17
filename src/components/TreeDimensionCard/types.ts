export type TreeDimensionCardProps = Pick<
  React.HTMLAttributes<HTMLDivElement>,
  "className"
> & {
  backfaceCard: React.ReactNode;
  frontfaceCard: React.ReactNode;
  revealed: boolean;
};
