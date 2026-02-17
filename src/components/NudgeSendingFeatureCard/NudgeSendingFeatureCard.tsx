import { sample } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";

import { RANDOM_DISPLAY_NAMES } from "../../constants/randomDisplayNames";
import { FeatureCard } from "../FeatureCard/FeatureCard";
import { FlyingUpReactions } from "../FlyingUpReactions/FlyingUpReactions";
import type { FlyingUpReaction } from "../FlyingUpReactions/types";
import type { NudgeSendingFeatureCardProps } from "./types";

export const NudgeSendingFeatureCard = ({
  className,
}: NudgeSendingFeatureCardProps) => {
  const { t } = useTranslation();

  const [flyingUpReactions, setFlyingUpReactions] = useState<
    FlyingUpReaction[]
  >([
    {
      fromName: sample(RANDOM_DISPLAY_NAMES) ?? "",
      id: uuidv4(),
      type: "nudge",
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomDisplayName = sample(RANDOM_DISPLAY_NAMES);

      if (Math.random() < 0.65 && randomDisplayName) {
        setFlyingUpReactions((prev) => [
          ...prev,
          {
            fromName: randomDisplayName,
            id: uuidv4(),
            type: "nudge",
          },
        ]);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <FeatureCard
      className={className}
      title={t("components.nudge_sending_feature_card.title")}
    >
      <div className="flex h-36 grow items-end justify-center">
        <FlyingUpReactions
          flyingUpReactions={flyingUpReactions}
          onFlyingUpReactionAnimationEnd={(flyingUpReactionId) =>
            setFlyingUpReactions((prev) =>
              prev.filter(({ id }) => id !== flyingUpReactionId),
            )
          }
        />
      </div>
      <div className="flex justify-center">
        <div className="border-pill h-10 w-48 rounded-t-3xl border-b-0 border-dashed"></div>
      </div>
    </FeatureCard>
  );
};
