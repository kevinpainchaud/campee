import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { PiArrowsClockwiseBold, PiEyeBold, PiSignInBold } from "react-icons/pi";

import { Button } from "../../../components/Button/Button";
import { VotingRoomContext } from "../../../context/VotingRoomContext";
import { useTracking } from "../../../hooks/useTracking";
import { useNewVotingRoundStartMutation } from "../../../mutations/useNewVotingRoundStartMutation";
import { useVotesRevealMutation } from "../../../mutations/useVotesRevealMutation";
import type { MainActionsProps } from "./types";

export const MainActions = ({
  onVotingRoomJoiningButtonClick,
  votingRoomJoiningIsPending,
}: MainActionsProps) => {
  const { isPending, peerParticipants, userParticipant, votingRoom } =
    useContext(VotingRoomContext);

  const { t } = useTranslation();
  const { track } = useTracking();

  const { mutate: revealVotes } = useVotesRevealMutation();
  const { mutate: startNewVotingRound } = useNewVotingRoundStartMutation();

  if (!votingRoom || isPending) {
    return null;
  }

  if (!userParticipant) {
    return (
      <Button
        leftIcon={PiSignInBold}
        loading={votingRoomJoiningIsPending}
        onClick={() => {
          onVotingRoomJoiningButtonClick?.();
          track("click_voting_room_joining_button");
        }}
        tagElement="button"
        variant="primary"
      >
        {t("entities.voting_room.actions.join_voting_room")}
      </Button>
    );
  }

  if (peerParticipants?.length === 0) {
    return null;
  }

  if (votingRoom.votes_revealed) {
    return (
      <Button
        leftIcon={PiArrowsClockwiseBold}
        onClick={() => {
          startNewVotingRound(votingRoom);
          track("start_new_voting_round");
        }}
        tagElement="button"
        variant="primary"
      >
        {t("entities.voting_room.actions.start_new_voting_round")}
      </Button>
    );
  } else {
    return (
      <Button
        leftIcon={PiEyeBold}
        onClick={() => {
          revealVotes(votingRoom);
          track("reveal_votes");
        }}
        tagElement="button"
        variant="primary"
      >
        {t("entities.voting_room.actions.reveal_votes")}
      </Button>
    );
  }
};
