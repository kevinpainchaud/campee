import classNames from "classnames";
import { useCallback, useContext, useMemo } from "react";

import { VotingRoomContext } from "../../context/VotingRoomContext";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { useTracking } from "../../hooks/useTracking";
import { useVoteUpdateMutation } from "../../mutations/useVoteUpdateMutation";
import type { Vote } from "../../types/voteValue";
import { getVoteValues } from "../../utils/vote";
import { BackfaceCard } from "../BackfaceCard/BackfaceCard";
import { CardsInHand } from "../CardsInHand/CardsInHand";
import { FrontfaceCard } from "../FrontfaceCard/FrontfaceCard";
import { TreeDimensionCard } from "../TreeDimensionCard/TreeDimensionCard";
import { CardsCarousel } from "./CardCarousel/CardCarousel";

export const UserSeat = () => {
  const { isPending, userParticipant, userParticipantProfile, votingRoom } =
    useContext(VotingRoomContext);

  const { breakpointMinLg } = useBreakpoint();
  const { track } = useTracking();

  const { mutate: updateVote } = useVoteUpdateMutation();

  const voteValues = useMemo(() => {
    if (!votingRoom) {
      return [""];
    }

    return getVoteValues(votingRoom.voting_system);
  }, [votingRoom]);

  const showCardsList = useMemo(
    () => !isPending && !votingRoom?.votes_revealed && userParticipant,
    [isPending, votingRoom?.votes_revealed, userParticipant],
  );

  const showRevealedCard = useMemo(
    () => votingRoom?.votes_revealed && userParticipant,
    [votingRoom?.votes_revealed, userParticipant],
  );

  const handleCardClick = useCallback(
    (voteValue: Vote) => {
      if (!votingRoom || !userParticipant) {
        return;
      }

      const newVote = voteValue === userParticipant?.vote ? null : voteValue;

      updateVote({
        vote: newVote,
        votingRoomId: votingRoom.id,
      });

      if (newVote !== null) {
        track("vote");
      }
    },
    [track, updateVote, userParticipant, votingRoom],
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
