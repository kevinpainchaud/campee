import { DropdownMenuItem } from "../DropdownMenuItem/DropdownMenuItem";
import type { DropdownMenuProps } from "./types";

export const DropdownMenu = ({
  dropdownMenuItems,
  onDropdownMenuItemClick,
}: DropdownMenuProps) => {
  return (
    <ul className="flex flex-col">
      {dropdownMenuItems.map((dropdownMenuItem, index) => (
        <li className="*:w-full" key={index}>
          <DropdownMenuItem
            dropdownMenuItem={{
              ...dropdownMenuItem,
              onClick: (event) => {
                dropdownMenuItem.onClick?.(event);
                onDropdownMenuItemClick?.();
              },
            }}
          />
        </li>
      ))}
    </ul>
  );
};
