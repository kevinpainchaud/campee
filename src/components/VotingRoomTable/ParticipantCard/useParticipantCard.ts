import { uniqBy } from "lodash";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";

import { VotingRoomContext } from "../../../context/VotingRoomContext";
import { useTracking } from "../../../hooks/useTracking";
import { useNudgeSendingMutation } from "../../../mutations/useNudgeSendingMutation";
import type {
  NudgeSentVotingRoomEventProps,
  ParticipantVoteEditedVotingRoomEventProps,
} from "../../../types/votingRoomEvents";
import type { FlyingUpReaction } from "../../FlyingUpReactions/types";
import type { useParticipantCardProps } from "./types";

export const useParticipantCard = ({
  participant,
}: useParticipantCardProps) => {
  const { emitter, participantsProfiles, userParticipant, votingRoom } =
    useContext(VotingRoomContext);

  const { track } = useTracking();

  const { mutate: sendNudge } = useNudgeSendingMutation();

  const [actionShown, setActionShown] = useState(false);
  const [flyingUpReactions, setFlyingUpReactions] = useState<
    FlyingUpReaction[]
  >([]);

  const [nudged, setNudged] = useState(false);
  const [zooming, setZooming] = useState(false);

  const participantProfile = useMemo(
    () => participantsProfiles?.find(({ id }) => id === participant.user_id),
    [participant.user_id, participantsProfiles],
  );

  const revealed = useMemo(
    () => Boolean(votingRoom?.votes_revealed),
    [votingRoom?.votes_revealed],
  );

  const handleNudgeButtonClick = useCallback(() => {
    sendNudge({
      toParticipantId: participant.user_id,
      votingRoomId: participant.voting_room_id,
    });
    track("send_nudge");
  }, [participant.user_id, participant.voting_room_id, sendNudge, track]);

  const handleNudgeSent = useCallback(
    ({ nudge }: NudgeSentVotingRoomEventProps) => {
      if (nudge.to_participant_id !== participant.user_id) {
        return;
      }

      const fromProfile = participantsProfiles?.find(
        ({ id }) => id === nudge.created_by,
      );

      if (!fromProfile) {
        return;
      }

      setFlyingUpReactions((prev) =>
        uniqBy<FlyingUpReaction>(
          [
            ...prev,
            {
              fromName: fromProfile.display_name,
              id: nudge.id.toString(),
              type: "nudge",
            },
          ],
          "id",
        ),
      );

      setNudged(true);
    },
    [participant.user_id, participantsProfiles],
  );

  const handleParticipantVoteEdited = useCallback(
    ({ by }: ParticipantVoteEditedVotingRoomEventProps) => {
      if (by !== participant.user_id) {
        return;
      }

      setZooming(true);
    },
    [participant.user_id],
  );

  useEffect(() => {
    emitter.on("nudgeSent", handleNudgeSent);
    emitter.on("participantVoteEdited", handleParticipantVoteEdited);

    return () => {
      emitter.off("nudgeSent", handleNudgeSent);
      emitter.off("participantVoteEdited", handleParticipantVoteEdited);
    };
  }, [emitter, handleNudgeSent, handleParticipantVoteEdited]);

  return {
    actionShown,
    flyingUpReactions,
    handleNudgeButtonClick,
    nudged,
    participantProfile,
    revealed,
    setActionShown,
    setFlyingUpReactions,
    setNudged,
    setZooming,
    userParticipant,
    zooming,
  };
};
