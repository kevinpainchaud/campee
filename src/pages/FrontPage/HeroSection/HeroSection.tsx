import classNames from "classnames";
import { Trans, useTranslation } from "react-i18next";

import { Button } from "../../../components/Button/Button";
import { useDrawer } from "../../../hooks/useDrawer";
import { useTracking } from "../../../hooks/useTracking";
import { DemoPlayer } from "./DemoPlayer/DemoPlayer";
import type { HeroSectionProps } from "./types";

export const HeroSection = ({ className }: HeroSectionProps) => {
  const { setVotingRoomCreationDrawerOpen } = useDrawer();
  const { t } = useTranslation();
  const { track } = useTracking();

  return (
    <div
      className={classNames(
        className,
        "flex flex-col gap-12 md:flex-row md:gap-8",
      )}
    >
      <div className="flex flex-col justify-center gap-6 text-center md:w-[55%] md:gap-6 md:text-left">
        <div className="flex flex-col gap-2 md:gap-4">
          <h1 className="font-space-grotesk text-5xl font-bold md:text-6xl lg:text-7xl">
            <Trans i18nKey="pages.front_page.hero_section.title" />
          </h1>
          <h2 className="text-lg md:text-xl">{t("common.app_description")}</h2>
        </div>
        <div>
          <Button
            onClick={() => {
              setVotingRoomCreationDrawerOpen(true);
              track("click_voting_room_creation_button");
            }}
            size="lg"
            tagElement="button"
            variant="primary"
          >
            {t("entities.voting_room.actions.create_a_voting_room")}
          </Button>
        </div>
      </div>
      <div className="md:w-[45%]">
        <DemoPlayer className="-rotate-3 md:-translate-y-3" />
      </div>
    </div>
  );
};
