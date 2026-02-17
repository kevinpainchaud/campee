import { useCopyToClipboard } from "@uidotdev/usehooks";
import { useCallback, useContext, useMemo, useState } from "react";
import { generatePath } from "react-router";

import { VOTING_ROOM_ROUTE_PATH } from "../constants/routes";
import { VotingRoomContext } from "../context/VotingRoomContext";

export const useVotingRoomUrlCopy = () => {
  const { votingRoom } = useContext(VotingRoomContext);

  const [, copyToClipboard] = useCopyToClipboard();
  const [votingRoomUrlCopied, setVotingRoomUrlCopied] = useState(false);

  const votingRoomUrl = useMemo(() => {
    if (!votingRoom) {
      return;
    }

    return `${window.location.origin}${generatePath(VOTING_ROOM_ROUTE_PATH, { invitation_code: votingRoom.invitation_code })}`;
  }, [votingRoom]);

  const copyVotingRoomUrl = useCallback(() => {
    if (!votingRoomUrl) {
      return;
    }

    copyToClipboard(votingRoomUrl);
    setVotingRoomUrlCopied(true);
    setTimeout(() => setVotingRoomUrlCopied(false), 5000);
  }, [copyToClipboard, votingRoomUrl]);

  return {
    copyVotingRoomUrl,
    votingRoomUrl,
    votingRoomUrlCopied,
  };
};
