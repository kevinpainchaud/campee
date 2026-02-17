export type FeatureCardProps = Pick<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "className"
> & {
  title: string;
};
