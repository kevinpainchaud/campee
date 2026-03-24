import { throttle } from "lodash";
import { useSnackbar } from "notistack";
import { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { VotingRoomContext } from "../../context/VotingRoomContext";
import { useAuth } from "../../hooks/useAuth";
import type { NudgeSentVotingRoomEventProps } from "../../types/votingRoomEvents";

export const useNudged = () => {
  const { emitter, participantsProfiles } = useContext(VotingRoomContext);

  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const [nudged, setNudged] = useState(false);

  const handleNudge = useCallback(
    ({ by, nudge }: NudgeSentVotingRoomEventProps) => {
      if (nudge.to_participant_id !== user?.id) {
        return;
      }

      const byUserProfile = participantsProfiles?.find(({ id }) => id === by);

      if (byUserProfile) {
        enqueueSnackbar({
          message: t("pages.voting_room_page.nudge_received_message", {
            user_display_name: byUserProfile.display_name,
          }),
          variant: "info",
        });
      }

      setNudged(true);
    },
    [enqueueSnackbar, participantsProfiles, t, user?.id],
  );

  useEffect(() => {
    const throttledHandleNudge = throttle(handleNudge, 200);

    emitter.on("nudgeSent", throttledHandleNudge);

    return () => {
      emitter.off("nudgeSent", throttledHandleNudge);
    };
  }, [emitter, handleNudge]);

  return {
    nudged,
    setNudged,
  };
};
