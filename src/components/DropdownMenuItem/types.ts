import type { LinkProps } from "react-router";

import type { ButtonProps } from "../Button/types";

type AnchorTagProps = Pick<LinkProps, "to"> & { tagElement: "anchor" };

type ButtonTagProps = { tagElement: "button" };

export type DropdownMenuItem = Pick<
  ButtonProps,
  "danger" | "onClick" | "success"
> & {
  active?: boolean;
  icon?: ButtonProps["leftIcon"];
  label: string;
} & (AnchorTagProps | ButtonTagProps);

export type DropdownMenuItemProps = {
  dropdownMenuItem: DropdownMenuItem;
};
