export type AvatarProps = Pick<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "onMouseEnter" | "onPointerEnter"
> & {
  initials: string;
  light?: boolean;
  size?: "xs" | "sm" | "base";
};
