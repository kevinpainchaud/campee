import { Trans, useTranslation } from "react-i18next";

import { Button } from "../../../components/Button/Button";
import { useDrawer } from "../../../hooks/useDrawer";
import { useTracking } from "../../../hooks/useTracking";

export const HeroSection = () => {
  const { setVotingRoomCreationDrawerOpen } = useDrawer();
  const { t } = useTranslation();
  const { track } = useTracking();

  return (
    <div className="flex flex-col items-center gap-6 text-center md:gap-6">
      <div className="flex flex-col gap-2 text-center md:gap-4">
        <h1 className="font-space-grotesk text-5xl font-bold md:text-6xl lg:text-7xl">
          <Trans i18nKey="pages.front_page.hero_section.title" />
        </h1>
        <h2 className="text-lg md:text-xl">{t("common.app_description")}</h2>
      </div>
      <div>
        <Button
          data-testid="hero-section-voting-room-creation-button"
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
  );
};
