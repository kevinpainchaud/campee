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
  "data-testid"?: string;
  "data-testvalue-key"?: string;
  disabled?: boolean;
  saturated?: boolean;
  tagElement?: "button" | "div";
  type: "backface" | "frontface" | "placeholder";
};
