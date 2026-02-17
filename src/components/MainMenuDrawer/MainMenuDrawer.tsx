import { useTranslation } from "react-i18next";

import { useAuth } from "../../hooks/useAuth";
import { useDrawer } from "../../hooks/useDrawer";
import { AccessibilityControls } from "../AccessibilityControls/AccessibilityControls";
import { Button } from "../Button/Button";
import { Drawer } from "../Drawer/Drawer";
import { DropdownMenuHeader } from "../DropdownMenuHeader/DropdownMenuHeader";
import { UserDropdownContent } from "../UserDropdownContent/UserDropdownContent";
import type { MainMenuDrawerProps } from "./types";

export const MainMenuDrawer = ({ open, setOpen }: MainMenuDrawerProps) => {
  const { user } = useAuth();
  const { setVotingRoomCreationDrawerOpen } = useDrawer();
  const { t } = useTranslation();

  return (
    <Drawer
      open={open}
      setOpen={setOpen}
      title={t("common.navigation.main_menu_label")}
    >
      <div className="flex grow flex-col gap-6">
        <Button
          onClick={() => {
            setVotingRoomCreationDrawerOpen(true);
            setOpen(false);
          }}
          tagElement="button"
          variant="primary"
        >
          {t("entities.voting_room.actions.create_a_voting_room")}
        </Button>
        {user && (
          <div className="flex flex-col gap-2">
            <DropdownMenuHeader noPaddingX>
              {t("common.navigation.user_menu_label")}
            </DropdownMenuHeader>
            <UserDropdownContent
              onDropdownMenuItemClick={() => setOpen(false)}
            />
          </div>
        )}
      </div>
      <AccessibilityControls />
    </Drawer>
  );
};
