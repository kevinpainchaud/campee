import { useTranslation } from "react-i18next";
import {
  PiCheckCircleBold,
  PiCopyBold,
  PiQrCodeBold,
  PiUserPlusBold,
} from "react-icons/pi";

import { useTracking } from "../../../hooks/useTracking";
import { useVotingRoomUrlCopy } from "../../../hooks/useVotingRoomUrlCopy";
import { Button } from "../../Button/Button";
import { Spinner } from "../../Spinner/Spinner";
import type { EmptyVotingRoomStateProps } from "./types";

export const EmptyVotingRoomState = ({
  onSeeQrCodeButtonClick,
}: EmptyVotingRoomStateProps) => {
  const { copyVotingRoomUrl, votingRoomUrlCopied } = useVotingRoomUrlCopy();
  const { t } = useTranslation();
  const { track } = useTracking();

  return (
    <>
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <PiUserPlusBold className="text-4xl" />
          <h2 className="styled-h2 text-center">
            {t("components.voting_room_table.empty_voting_room_state.title")}
          </h2>
        </div>
        <div className="flex w-full flex-col items-stretch gap-4 lg:w-auto lg:flex-row">
          <Button
            leftIcon={PiQrCodeBold}
            onClick={() => {
              onSeeQrCodeButtonClick();
              track("click_qr_code_button");
            }}
            tagElement="button"
            variant="outline"
          >
            {t("entities.voting_room.invitation.see_qr_code_button_label")}
          </Button>
          {votingRoomUrlCopied ? (
            <Button
              leftIcon={PiCheckCircleBold}
              success
              tagElement="button"
              variant="primary"
            >
              {t(
                "entities.voting_room.invitation.voting_room_url_copied_message",
              )}
            </Button>
          ) : (
            <Button
              data-testid="empty-voting-room-state-url-copy-button"
              leftIcon={PiCopyBold}
              onClick={() => {
                copyVotingRoomUrl();
                track("click_invitation_link_copy_button");
              }}
              tagElement="button"
              variant="primary"
            >
              {t(
                "entities.voting_room.invitation.voting_room_url_copy_button_label",
              )}
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Spinner size="sm" />
          <p>
            {t(
              "components.voting_room_table.empty_voting_room_state.description",
            )}
          </p>
        </div>
      </div>
    </>
  );
};
