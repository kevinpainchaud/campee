import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { PiLinkBold } from "react-icons/pi";
import { generatePath, Link } from "react-router";

import { VOTING_ROOM_ROUTE_PATH } from "../../constants/routes";
import type { VotingRoomCardProps } from "./types";

export const VotingRoomCard = ({
  adminUserProfile,
  createdByUser,
  onClick,
  votingRoom,
}: VotingRoomCardProps) => {
  const { t } = useTranslation();

  return (
    <Link
      className="border-pill hover:shadow-pill default-style-none bg-lemon-50 flex items-center gap-2 rounded-xl p-4 dark:bg-zinc-950"
      onClick={onClick}
      to={generatePath(VOTING_ROOM_ROUTE_PATH, {
        invitation_code: votingRoom.invitation_code,
      })}
    >
      <div>
        <div className="dark:bg-lemon-50 text-lemon-50 flex size-10 items-center justify-center rounded-full bg-zinc-950 dark:text-zinc-950">
          <PiLinkBold size={20} />
        </div>
      </div>
      <div>
        <div>{votingRoom.name}</div>
        <div className="text-sm">
          {t("components.voting_room_card.created_by")}{" "}
          <strong>
            {createdByUser
              ? t("components.voting_room_card.me")
              : adminUserProfile.display_name}
          </strong>{" "}
          {dayjs(votingRoom.created_at).fromNow()}
        </div>
      </div>
    </Link>
  );
};
