export type CardProps = Pick<
  React.HTMLAttributes<HTMLButtonElement | HTMLDivElement>,
  | "children"
  | "className"
  | "inert"
  | "onClick"
  | "onMouseEnter"
  | "onMouseLeave"
  | "title"
> & {
  active?: boolean;
  disabled?: boolean;
  saturated?: boolean;
  tagElement?: "button" | "div";
  type: "backface" | "frontface" | "placeholder";
};
