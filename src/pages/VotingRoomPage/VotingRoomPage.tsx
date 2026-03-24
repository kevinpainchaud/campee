import { useWindowScroll } from "@uidotdev/usehooks";
import classNames from "classnames";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { PiChatTeardropTextBold } from "react-icons/pi";

import { Button } from "../../components/Button/Button";
import { VotingRoomEditionDrawer } from "../../components/VotingRoomEditionDrawer/VotingRoomEditionDrawer";
import { QrCodeDrawer } from "../../components/VotingRoomTable/EmptyVotingRoomState/QrCodeDrawer/QrCodeDrawer";
import { VotingRoomTable } from "../../components/VotingRoomTable/VotingRoomTable";
import { VotingRoomContext } from "../../context/VotingRoomContext";
import { useDrawer } from "../../hooks/useDrawer";
import { useVotingRoomUrlCopy } from "../../hooks/useVotingRoomUrlCopy";
import { getTitleTagContent } from "../../utils/titleTag";
import { Header } from "./Header/Header";
import { MainActions } from "./MainActions/MainActions";
import { MainMenuDrawer } from "./MainMenuDrawer/MainMenuDrawer";
import { useNudged } from "./useNudged";
import { useVotingRoomConfettis } from "./useVotingRoomConfettis";
import { useVotingRoomJoining } from "./useVotingRoomJoining";
import { useVotingRoomNotifications } from "./useVotingRoomNotifications";

export const VotingRoomPage = () => {
  const {
    participantsError,
    participantsProfilesError,
    votingRoom,
    votingRoomError,
  } = useContext(VotingRoomContext);

  const { votingRoomUrl } = useVotingRoomUrlCopy();
  const {
    joinVotingRoom,
    votingRoomJoiningDrawer,
    votingRoomJoiningIsPending,
  } = useVotingRoomJoining();
  const { nudged, setNudged } = useNudged();
  const { setFeedbackDrawerOpen } = useDrawer();
  const { t } = useTranslation();

  useVotingRoomNotifications();
  useVotingRoomConfettis();

  const [mainMenuDrawer, setMainMenuDrawer] = useState(false);
  const [votingRoomEditionDrawer, setVotingRoomEditionDrawer] = useState(false);
  const [qrCodeDrawerOpen, setQrCodeDrawerOpen] = useState(false);
  const [{ y: windowY }] = useWindowScroll();

  const windowScrolled = windowY && windowY > 100;

  if (votingRoomError) {
    throw votingRoomError;
  }

  if (participantsError) {
    throw participantsError;
  }

  if (participantsProfilesError) {
    throw participantsProfilesError;
  }

  return (
    <>
      {votingRoom && (
        <Helmet>
          <title>{getTitleTagContent(votingRoom.name)}</title>
        </Helmet>
      )}
      <div
        className={classNames("flex min-h-screen flex-col", {
          "animate-wizz": nudged,
        })}
        onAnimationEnd={() => setNudged(false)}
      >
        <div
          className={classNames(
            "sticky top-0 z-10 flex flex-col gap-4 bg-linear-to-b p-4 pb-0 lg:p-6 lg:pb-0",
            {
              "from-lemon-100 dark:from-zinc-900": windowScrolled,
              "from-transparent": !windowScrolled,
            },
          )}
        >
          <Header
            onMainMenuDrawerToggleButtonClick={() => setMainMenuDrawer(true)}
            onVotingRoomEditionButtonClick={() =>
              setVotingRoomEditionDrawer(true)
            }
            onVotingRoomJoiningButtonClick={joinVotingRoom}
            votingRoomJoiningIsPending={votingRoomJoiningIsPending}
          />
          <div className="flex justify-center *:w-full empty:hidden lg:hidden">
            <MainActions
              onVotingRoomJoiningButtonClick={joinVotingRoom}
              votingRoomJoiningIsPending={votingRoomJoiningIsPending}
            />
          </div>
        </div>
        <VotingRoomTable
          className="grow"
          floatingLeftContent={
            <Button
              leftIcon={PiChatTeardropTextBold}
              onClick={() => setFeedbackDrawerOpen(true)}
              tagElement="button"
              title={t("entities.feedback.actions.share_feedback")}
              variant="outline"
            />
          }
          onSeeQrCodeButtonClick={() => setQrCodeDrawerOpen(true)}
        />
      </div>
      <MainMenuDrawer
        onSeeQrCodeButtonClick={() => setQrCodeDrawerOpen(true)}
        onVotingRoomEditionButtonClick={() => setVotingRoomEditionDrawer(true)}
        open={mainMenuDrawer}
        setOpen={setMainMenuDrawer}
      />
      <VotingRoomEditionDrawer
        open={votingRoomEditionDrawer}
        setOpen={setVotingRoomEditionDrawer}
      />
      {votingRoomJoiningDrawer}
      {votingRoomUrl && (
        <QrCodeDrawer
          open={qrCodeDrawerOpen}
          setOpen={setQrCodeDrawerOpen}
          title={t("entities.voting_room.invitation.qr_code")}
          url={votingRoomUrl}
        />
      )}
    </>
  );
};
