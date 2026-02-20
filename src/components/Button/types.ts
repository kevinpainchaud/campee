import type { IconType } from "react-icons";
import type { LinkProps } from "react-router";

type AnchorTagProps = Pick<LinkProps, "target" | "to"> & {
  tagElement: "anchor";
};

type ButtonTagProps = Pick<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  "disabled" | "type"
> & {
  loading?: boolean;
  tagElement: "button";
};

export type ButtonProps = Pick<
  React.HTMLAttributes<HTMLElement>,
  | "children"
  | "className"
  | "onClick"
  | "onMouseEnter"
  | "onPointerEnter"
  | "title"
> & {
  active?: boolean;
  danger?: boolean;
  "data-testid"?: string;
  leftIcon?: IconType;
  reversed?: boolean;
  rightIcon?: IconType;
  size?: "sm" | "base" | "lg";
  success?: boolean;
  variant?:
    | "default"
    | "dropdownMenuItem"
    | "outline"
    | "primary"
    | "transparent";
} & (AnchorTagProps | ButtonTagProps);
