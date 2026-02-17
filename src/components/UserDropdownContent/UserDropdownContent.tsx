import { useTranslation } from "react-i18next";
import {
  PiClockCounterClockwiseBold,
  PiPencilSimpleBold,
} from "react-icons/pi";

import { useDrawer } from "../../hooks/useDrawer";
import { useTracking } from "../../hooks/useTracking";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import type { UserDropdownContentProps } from "./types";

export const UserDropdownContent = ({
  additionalDropdownMenuItems,
  onDropdownMenuItemClick,
}: UserDropdownContentProps) => {
  const { setUserEditDrawerOpen, setUserVotingRoomsDrawerOpen } = useDrawer();
  const { t } = useTranslation();
  const { track } = useTracking();

  return (
    <DropdownMenu
      dropdownMenuItems={[
        {
          icon: PiPencilSimpleBold,
          label: t(
            "components.user_dropdown_content.user_edit_drawer_toggle_button_label",
          ),
          onClick: () => setUserEditDrawerOpen(true),
          tagElement: "button",
        },
        {
          icon: PiClockCounterClockwiseBold,
          label: t(
            "components.user_dropdown_content.user_voting_rooms_drawer_toggle_button_label",
          ),
          onClick: () => {
            setUserVotingRoomsDrawerOpen(true);
            track("click_user_voting_rooms_drawer_trigger_button");
          },
          tagElement: "button",
        },
        ...(additionalDropdownMenuItems
          ? [...additionalDropdownMenuItems]
          : []),
      ]}
      onDropdownMenuItemClick={onDropdownMenuItemClick}
    />
  );
};
