import classNames from "classnames";
import { useCallback, useContext, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { PiPencilSimpleBold } from "react-icons/pi";

import { VotingRoomContext } from "../../context/VotingRoomContext";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { useTracking } from "../../hooks/useTracking";
import { useVoteUpdateMutation } from "../../mutations/useVoteUpdateMutation";
import type { Vote } from "../../types/voteValue";
import { getVoteValues } from "../../utils/vote";
import { BackfaceCard } from "../BackfaceCard/BackfaceCard";
import { Button } from "../Button/Button";
import { CardsInHand } from "../CardsInHand/CardsInHand";
import { FrontfaceCard } from "../FrontfaceCard/FrontfaceCard";
import { TreeDimensionCard } from "../TreeDimensionCard/TreeDimensionCard";
import { CardsCarousel } from "./CardCarousel/CardCarousel";

export const UserSeat = () => {
  const { isPending, userParticipant, userParticipantProfile, votingRoom } =
    useContext(VotingRoomContext);

  const { breakpointMinLg } = useBreakpoint();
  const { t } = useTranslation();
  const { track } = useTracking();

  const { mutate: updateVote } = useVoteUpdateMutation();

  const [editionMode, setEditionMode] = useState(false);

  const voteValues = useMemo(() => {
    if (!votingRoom) {
      return [""];
    }

    return getVoteValues(votingRoom.voting_system);
  }, [votingRoom]);

  const showCardsList = useMemo(
    () =>
      !isPending &&
      userParticipant &&
      (!votingRoom?.votes_revealed || editionMode),
    [isPending, votingRoom?.votes_revealed, userParticipant, editionMode],
  );

  const showRevealedCard = useMemo(
    () =>
      !isPending &&
      userParticipant &&
      votingRoom?.votes_revealed &&
      !editionMode,
    [isPending, userParticipant, votingRoom?.votes_revealed, editionMode],
  );

  const handleCardClick = useCallback(
    (voteValue: Vote) => {
      if (!votingRoom || !userParticipant) {
        return;
      }

      const newVote = voteValue === userParticipant?.vote ? null : voteValue;

      if (editionMode && newVote === null) {
        setEditionMode(false);
        return;
      }

      updateVote({
        vote: newVote,
        votingRoomId: votingRoom.id,
      });

      setEditionMode(false);

      if (newVote !== null) {
        track("vote");
      }
    },
    [editionMode, track, updateVote, userParticipant, votingRoom],
  );

  return (
    <div className="relative">
      {userParticipant && (
        <div
          className={classNames(
            "absolute inset-0 flex items-start justify-center py-2 duration-200 lg:py-0",
            {
              "-translate-y-1.5 lg:-translate-y-5": showRevealedCard,
              "translate-y-full opacity-0": !showRevealedCard,
            },
          )}
        >
          <div className="relative h-full">
            <TreeDimensionCard
              backfaceCard={
                <BackfaceCard
                  backfaceCardStyleKey={
                    userParticipantProfile?.backface_card_style_key ?? "cool"
                  }
                />
              }
              className="h-full"
              frontfaceCard={
                <FrontfaceCard voteValue={userParticipant.vote as Vote} />
              }
              revealed={Boolean(votingRoom?.votes_revealed)}
            />
            <Button
              className="absolute top-1/2 -right-6 translate-x-full -translate-y-1/2"
              inert={showCardsList}
              leftIcon={PiPencilSimpleBold}
              onClick={() => setEditionMode(true)}
              size="sm"
              tagElement="button"
              title={t("components.user_seat.vote_edit_button_label")}
              variant="outline"
            />
          </div>
        </div>
      )}
      <div
        className={classNames("duration-200", {
          "translate-y-full opacity-0": !showCardsList,
        })}
        inert={!showCardsList}
      >
        {breakpointMinLg ? (
          <CardsInHand
            activeVoteValue={userParticipant?.vote}
            onCardClick={handleCardClick}
            voteValues={voteValues}
          />
        ) : (
          <CardsCarousel
            activeVoteValue={userParticipant?.vote}
            onCardClick={handleCardClick}
            voteValues={voteValues}
          />
        )}
      </div>
    </div>
  );
};
