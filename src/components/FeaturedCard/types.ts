import type { IconType } from "react-icons";

export type FeaturedCardProps = Pick<
  React.HTMLAttributes<HTMLDivElement>,
  "className"
> & {
  active?: boolean;
  description: string;
  icon: IconType;
  title: string;
};
