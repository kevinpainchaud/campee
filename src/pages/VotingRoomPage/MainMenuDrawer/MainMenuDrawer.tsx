import { truncate } from "lodash";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import {
  PiChatTeardropTextBold,
  PiCheckCircleBold,
  PiCopyBold,
  PiGearBold,
  PiQrCodeBold,
  PiSignOutBold,
} from "react-icons/pi";

import { AccessibilityControls } from "../../../components/AccessibilityControls/AccessibilityControls";
import { Drawer } from "../../../components/Drawer/Drawer";
import { DropdownMenu } from "../../../components/DropdownMenu/DropdownMenu";
import { DropdownMenuHeader } from "../../../components/DropdownMenuHeader/DropdownMenuHeader";
import type { DropdownMenuItem } from "../../../components/DropdownMenuItem/types";
import { UserDropdownContent } from "../../../components/UserDropdownContent/UserDropdownContent";
import { VotingRoomContext } from "../../../context/VotingRoomContext";
import { useAuth } from "../../../hooks/useAuth";
import { useDrawer } from "../../../hooks/useDrawer";
import { useTracking } from "../../../hooks/useTracking";
import { useVotingRoomLeaving } from "../../../hooks/useVotingRoomLeaving";
import { useVotingRoomUrlCopy } from "../../../hooks/useVotingRoomUrlCopy";
import type { MainMenuDrawerProps } from "./types";

export const MainMenuDrawer = ({
  onSeeQrCodeButtonClick,
  onVotingRoomEditionButtonClick,
  open,
  setOpen,
}: MainMenuDrawerProps) => {
  const { isPending, userParticipant, votingRoom } =
    useContext(VotingRoomContext);

  const { user } = useAuth();
  const { leaveVotingRoom } = useVotingRoomLeaving();
  const { copyVotingRoomUrl, votingRoomUrlCopied } = useVotingRoomUrlCopy();
  const { setFeedbackDrawerOpen } = useDrawer();
  const { t } = useTranslation();
  const { track } = useTracking();

  return (
    <Drawer
      isPending={isPending}
      open={open}
      setOpen={setOpen}
      title={t("common.navigation.main_menu_label")}
    >
      <div className="flex grow flex-col gap-6">
        <div className="flex flex-col gap-2">
          <DropdownMenuHeader noPaddingX>
            {votingRoom
              ? truncate(votingRoom.name, { length: 40 })
              : t("entities.voting_room.label")}
          </DropdownMenuHeader>
          <DropdownMenu
            dropdownMenuItems={[
              ...[
                votingRoomUrlCopied
                  ? ({
                      icon: PiCheckCircleBold,
                      label: t(
                        "entities.voting_room.invitation.voting_room_url_copied_message",
                      ),
                      success: true,
                      tagElement: "button",
                    } as DropdownMenuItem)
                  : ({
                      icon: PiCopyBold,
                      label: t(
                        "entities.voting_room.invitation.voting_room_url_copy_button_label",
                      ),
                      onClick: () => {
                        copyVotingRoomUrl();
                        track("click_invitation_link_copy_button");
                      },
                      tagElement: "button",
                    } as DropdownMenuItem),
              ],
              {
                icon: PiQrCodeBold,
                label: t(
                  "entities.voting_room.invitation.see_qr_code_button_label",
                ),
                onClick: () => {
                  onSeeQrCodeButtonClick();
                  setOpen(false);
                  track("click_qr_code_button");
                },
                tagElement: "button",
              },
              ...(userParticipant
                ? [
                    {
                      icon: PiGearBold,
                      label: t("entities.voting_room.edition.title"),
                      onClick: () => {
                        onVotingRoomEditionButtonClick();
                        setOpen(false);
                      },
                      tagElement: "button",
                    } as DropdownMenuItem,
                    {
                      danger: true,
                      icon: PiSignOutBold,
                      label: t(
                        "entities.voting_room.actions.leave_voting_room",
                      ),
                      onClick: () => {
                        leaveVotingRoom();
                        setOpen(false);
                        track("click_voting_room_leaving_button");
                      },
                      tagElement: "button",
                    } as DropdownMenuItem,
                  ]
                : []),
            ]}
          />
        </div>
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
        <div className="flex flex-col gap-2">
          <DropdownMenuHeader noPaddingX>
            {t("common.navigation.other_menu_label")}
          </DropdownMenuHeader>
          <DropdownMenu
            dropdownMenuItems={[
              {
                icon: PiChatTeardropTextBold,
                label: t("entities.feedback.actions.share_feedback"),
                onClick: () => setFeedbackDrawerOpen(true),
                tagElement: "button",
              },
            ]}
            onDropdownMenuItemClick={() => setOpen(false)}
          />
        </div>
      </div>
      <AccessibilityControls />
    </Drawer>
  );
};
