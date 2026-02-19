import classNames from "classnames";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { RANDOM_DISPLAY_NAMES } from "../../constants/randomDisplayNames";
import type { Vote } from "../../types/voteValue";
import { getVoteValues } from "../../utils/vote";
import { wait } from "../../utils/wait";
import { BackfaceCard } from "../BackfaceCard/BackfaceCard";
import { Button } from "../Button/Button";
import { CardsInHand } from "../CardsInHand/CardsInHand";
import { FrontfaceCard } from "../FrontfaceCard/FrontfaceCard";
import { TreeDimensionCard } from "../TreeDimensionCard/TreeDimensionCard";
import { ClickPing } from "./ClickPing/ClickPing";
import { PeerParticipantCard } from "./PeerParticipantCard/PeerParticipantCard";

export const Demo = () => {
  const { t } = useTranslation();

  const [activeVoteValue, setActiveVoteValue] = useState<Vote>(null);
  const [peerParticipantsVoteValues, setPeerParticipantsVoteValues] = useState<
    [Vote, Vote, Vote]
  >([null, null, null]);
  const [votesRevealed, setVotesRevealed] = useState(false);
  const [toggleButtonJustClicked, setToggleButtonJustClicked] = useState(false);

  const voteValues = useMemo(() => getVoteValues("scrum"), []);

  const closeVoteValues = useMemo(() => voteValues.slice(2, 5), [voteValues]);

  const getRandomCloseVoteValue = useCallback(
    () => closeVoteValues[Math.floor(Math.random() * closeVoteValues.length)],
    [closeVoteValues],
  );

  const timelineActions = useMemo(
    (): (() => Promise<void> | void)[] => [
      async () => await wait(1500),
      () => setActiveVoteValue(getRandomCloseVoteValue()),
      async () => await wait(1500),
      () => setPeerParticipantsVoteValues(() => ["1", null, null]),
      async () => await wait(1000),
      () => setPeerParticipantsVoteValues(() => ["1", null, "1"]),
      async () => await wait(1000),
      () =>
        setPeerParticipantsVoteValues(() => [
          getRandomCloseVoteValue(),
          getRandomCloseVoteValue(),
          getRandomCloseVoteValue(),
        ]),
      async () => await wait(1000),
      () => setToggleButtonJustClicked(true),
      async () => await wait(200),
      () => setVotesRevealed(true),
      async () => await wait(3000),
      () => setToggleButtonJustClicked(true),
      async () => await wait(200),
      () => {
        setVotesRevealed(false);
        setActiveVoteValue(null);
        setPeerParticipantsVoteValues([null, null, null]);
      },
      async () => await wait(1500),
    ],
    [getRandomCloseVoteValue],
  );

  useEffect(() => {
    let isMounted = true;

    const runTimeline = async () => {
      while (isMounted) {
        for (const action of timelineActions) {
          if (!isMounted) {
            break;
          }

          await action();
        }
      }
    };

    runTimeline();

    return () => {
      isMounted = false;
    };
  }, [timelineActions]);

  return (
    <div className="@container" inert>
      <div className="bg-lemon-100 relative flex aspect-10/8 flex-col gap-6 overflow-clip pt-6 transition-colors select-none @sm:gap-8 @sm:pt-8 @lg:aspect-11/8 @xl:aspect-12/8 dark:bg-zinc-950">
        <div className="relative flex justify-center">
          <Button size="sm" tagElement="button" variant="primary">
            {votesRevealed
              ? t("entities.voting_room.actions.start_new_voting_round")
              : t("entities.voting_room.actions.reveal_votes")}
          </Button>
          {toggleButtonJustClicked && (
            <ClickPing
              onAnimationEnd={() => setToggleButtonJustClicked(false)}
            />
          )}
        </div>
        <div className="flex grow items-center justify-center gap-8 *:w-1/6">
          <PeerParticipantCard
            backfaceCardStyleKey="bike"
            participantDisplayName={RANDOM_DISPLAY_NAMES[0] ?? "-"}
            revealed={votesRevealed}
            voteValue={peerParticipantsVoteValues[0]}
          ></PeerParticipantCard>
          <PeerParticipantCard
            backfaceCardStyleKey="cool"
            participantDisplayName={RANDOM_DISPLAY_NAMES[1] ?? "-"}
            revealed={votesRevealed}
            voteValue={peerParticipantsVoteValues[1]}
          ></PeerParticipantCard>
          <PeerParticipantCard
            backfaceCardStyleKey="food"
            participantDisplayName={RANDOM_DISPLAY_NAMES[2] ?? "-"}
            revealed={votesRevealed}
            voteValue={peerParticipantsVoteValues[2]}
          ></PeerParticipantCard>
        </div>
        <div>
          <div
            className={classNames(
              "absolute flex w-full justify-center transition-all",
              {
                "translate-y-full opacity-0": !votesRevealed,
              },
            )}
          >
            <div className="w-1/12">
              <TreeDimensionCard
                backfaceCard={<BackfaceCard backfaceCardStyleKey="bike" />}
                frontfaceCard={<FrontfaceCard voteValue={activeVoteValue} />}
                revealed={votesRevealed}
              />
            </div>
          </div>
          <div
            className={classNames("transition-all", {
              "translate-y-full opacity-0": votesRevealed,
            })}
          >
            <CardsInHand
              activeVoteValue={activeVoteValue}
              voteValues={voteValues}
            />
          </div>
        </div>
        <div className="absolute inset-0"></div>
      </div>
    </div>
  );
};
