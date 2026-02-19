import { useTranslation } from "react-i18next";

import { Button } from "../../../components/Button/Button";
import { useDrawer } from "../../../hooks/useDrawer";
import { useTracking } from "../../../hooks/useTracking";

export const CtaSection = () => {
  const { setVotingRoomCreationDrawerOpen } = useDrawer();
  const { t } = useTranslation();
  const { track } = useTracking();

  return (
    <div className="flex flex-col items-center gap-6 md:gap-8">
      <h2 className="styled-h2">{t("pages.front_page.cta_section.title")}</h2>
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
  );
};
