import { Button } from "../Button/Button";
import type { ButtonProps } from "../Button/types";
import type { DropdownMenuItemProps } from "./types";

export const DropdownMenuItem = ({
  dropdownMenuItem,
}: DropdownMenuItemProps) => {
  const commonProps: Omit<ButtonProps, "tagElement"> = {
    active: dropdownMenuItem.active,
    danger: dropdownMenuItem.danger,
    leftIcon: dropdownMenuItem.icon,
    onClick: dropdownMenuItem.onClick,
    success: dropdownMenuItem.success,
    variant: "dropdownMenuItem",
  };

  if (dropdownMenuItem.tagElement === "anchor") {
    const { to } = dropdownMenuItem;

    return (
      <Button {...commonProps} tagElement="anchor" to={to}>
        {dropdownMenuItem.label}
      </Button>
    );
  }

  if (dropdownMenuItem.tagElement === "button") {
    return (
      <Button {...commonProps} tagElement="button">
        {dropdownMenuItem.label}
      </Button>
    );
  }
};
