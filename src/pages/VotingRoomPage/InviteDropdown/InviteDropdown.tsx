import { QRCodeSVG } from "qrcode.react";
import { useTranslation } from "react-i18next";
import { PiCheckCircleBold, PiCopyBold, PiUserPlusBold } from "react-icons/pi";

import { Button } from "../../../components/Button/Button";
import { Dropdown } from "../../../components/Dropdown/Dropdown";
import { DropdownMenu } from "../../../components/DropdownMenu/DropdownMenu";
import { useTracking } from "../../../hooks/useTracking";
import { useVotingRoomUrlCopy } from "../../../hooks/useVotingRoomUrlCopy";

export const InviteDropdown = () => {
  const { copyVotingRoomUrl, votingRoomUrl, votingRoomUrlCopied } =
    useVotingRoomUrlCopy();
  const { t } = useTranslation();
  const { track } = useTracking();

  return (
    <Dropdown
      renderContent={() =>
        votingRoomUrl ? (
          <div className="flex flex-col gap-1.5">
            <DropdownMenu
              dropdownMenuItems={[
                votingRoomUrlCopied
                  ? {
                      icon: PiCheckCircleBold,
                      label: t(
                        "entities.voting_room.invitation.voting_room_url_copied_message",
                      ),
                      success: true,
                      tagElement: "button",
                    }
                  : {
                      icon: PiCopyBold,
                      label: t(
                        "entities.voting_room.invitation.voting_room_url_copy_button_label",
                      ),
                      onClick: () => {
                        copyVotingRoomUrl();
                        track("click_invitation_link_copy_button");
                      },
                      tagElement: "button",
                    },
              ]}
            />
            <hr />
            <div className="flex gap-4 p-3">
              <QRCodeSVG className="size-16" value={votingRoomUrl} />
              <div className="flex grow items-center">
                {t("entities.voting_room.invitation.qr_code_caption")}
              </div>
            </div>
          </div>
        ) : undefined
      }
      renderTrigger={() => (
        <Button leftIcon={PiUserPlusBold} tagElement="button" variant="outline">
          {t("pages.voting_room_page.invite_dropdown.trigger_button_label")}
        </Button>
      )}
    />
  );
};
