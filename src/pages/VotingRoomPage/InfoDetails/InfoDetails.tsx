import { round } from "lodash";
import { useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { VotingRoomContext } from "../../../context/VotingRoomContext";
import { average } from "../../../utils/array";

export const InfoDetails = () => {
  const { peerParticipants, userParticipant, votingRoom } =
    useContext(VotingRoomContext);

  const { t } = useTranslation();

  const votesAverage = useMemo(() => {
    const votes = [
      ...(userParticipant ? [userParticipant.vote] : []),
      ...(peerParticipants ? peerParticipants.map(({ vote }) => vote) : []),
    ]
      .filter(
        (vote): vote is string => vote !== null && !isNaN(parseFloat(vote)),
      )
      .map(parseFloat);

    if (votes.length === 0) {
      return undefined;
    }

    return round(average(votes), 1);
  }, [peerParticipants, userParticipant]);

  if (!votingRoom?.votes_revealed || votesAverage === undefined) {
    return null;
  }

  return (
    <div className="text-center text-xs lg:text-sm">
      {t("pages.voting_room_page.info_details.votes_average", {
        votesAverage,
      })}
    </div>
  );
};
