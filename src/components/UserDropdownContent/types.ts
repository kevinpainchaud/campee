import type { DropdownMenuItem } from "../DropdownMenuItem/types";

export type UserDropdownContentProps = {
  additionalDropdownMenuItems?: DropdownMenuItem[];
  onDropdownMenuItemClick?: () => void;
};
