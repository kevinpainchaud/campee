import type { DropdownMenuItem } from "../DropdownMenuItem/types";

export type DropdownMenuProps = {
  dropdownMenuItems: DropdownMenuItem[];
  onDropdownMenuItemClick?: () => void;
};
