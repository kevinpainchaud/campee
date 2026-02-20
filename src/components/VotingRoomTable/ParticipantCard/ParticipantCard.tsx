import { useMeasure } from "@uidotdev/usehooks";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import type { Vote } from "../../../types/voteValue";
import { BackfaceCard } from "../../BackfaceCard/BackfaceCard";
import { FlyingUpReactions } from "../../FlyingUpReactions/FlyingUpReactions";
import { FrontfaceCard } from "../../FrontfaceCard/FrontfaceCard";
import { PlaceholderCard } from "../../PlaceholderCard/PlaceholderCard";
import { TreeDimensionCard } from "../../TreeDimensionCard/TreeDimensionCard";
import { UserDisplay } from "../../UserDisplay/UserDisplay";
import type { ParticipantCardProps } from "./types";
import { useParticipantCard } from "./useParticipantCard";

export const ParticipantCard = ({ participant }: ParticipantCardProps) => {
  const {
    actionShown,
    flyingUpReactions,
    handleNudgeButtonClick,
    nudged,
    participantProfile,
    revealed,
    setActionShown,
    setFlyingUpReactions,
    userParticipant,
  } = useParticipantCard({ participant });
  const [containerRef, { width: containerWidth }] = useMeasure();
  const { t } = useTranslation();

  if (!participantProfile) {
    return null;
  }

  return (
    <div data-testid="participant-card" ref={containerRef}>
      <div className="fixed" style={{ width: containerWidth ?? undefined }}>
        <FlyingUpReactions
          flyingUpReactions={flyingUpReactions}
          onFlyingUpReactionAnimationEnd={(flyingUpReactionId) =>
            setFlyingUpReactions((prev) =>
              prev.filter(({ id }) => id !== flyingUpReactionId),
            )
          }
        />
      </div>
      <div className="flex flex-col items-center gap-2 lg:gap-4">
        <div
          className="group/card-wrapper not-pointer-coarse:p-4 not-pointer-coarse:pb-0"
          onMouseEnter={() => setActionShown(true)}
          onMouseLeave={() => setActionShown(false)}
        >
          <div className="relative">
            <TreeDimensionCard
              backfaceCard={
                participant.vote ? (
                  <BackfaceCard
                    backfaceCardStyleKey={
                      participantProfile.backface_card_style_key
                    }
                    inert={revealed}
                    onClick={() =>
                      setActionShown((actionShown) => !actionShown)
                    }
                    tagElement="button"
                  />
                ) : (
                  <PlaceholderCard
                    inert={revealed}
                    onClick={() =>
                      setActionShown((actionShown) => !actionShown)
                    }
                    tagElement="button"
                  />
                )
              }
              className={classNames("w-24 lg:w-28 xl:w-36", {
                "animate-shake repeat-infinite": nudged,
              })}
              frontfaceCard={
                <FrontfaceCard
                  inert={!revealed}
                  onClick={() => setActionShown((actionShown) => !actionShown)}
                  tagElement="button"
                  voteValue={participant.vote as Vote}
                />
              }
              revealed={revealed}
            />
            {userParticipant && (
              <div
                className={classNames(
                  "absolute top-0 right-0 translate-x-1/4 -translate-y-1/4",
                  "transition-discrete duration-200",
                  {
                    "animate-in fade-in slide-in-from-top-5 slide-in-from-right-5 flex":
                      actionShown,
                    "animate-out fade-out slide-out-to-top-5 slide-out-to-right-5 hidden origin-bottom-left":
                      !actionShown,
                  },
                )}
              >
                <button
                  className="border-pill hover:shadow-pill bg-lemon-50 size-14 cursor-pointer rounded-full text-2xl dark:bg-zinc-900"
                  data-testid="participant-card-nudge-button"
                  onClick={handleNudgeButtonClick}
                  title={t("entities.nudge.actions.send_nudge")}
                >
                  🫨
                </button>
              </div>
            )}
          </div>
        </div>
        <UserDisplay profile={participantProfile} />
      </div>
    </div>
  );
};
