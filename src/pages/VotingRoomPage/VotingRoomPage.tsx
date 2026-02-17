import classNames from "classnames";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import { VotingRoomEditionDrawer } from "../../components/VotingRoomEditionDrawer/VotingRoomEditionDrawer";
import { QrCodeDrawer } from "../../components/VotingRoomTable/EmptyVotingRoomState/QrCodeDrawer/QrCodeDrawer";
import { VotingRoomTable } from "../../components/VotingRoomTable/VotingRoomTable";
import { VotingRoomContext } from "../../context/VotingRoomContext";
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
  const { nudged } = useNudged();
  const { t } = useTranslation();

  useVotingRoomNotifications();
  useVotingRoomConfettis();

  const [mainMenuDrawer, setMainMenuDrawer] = useState(false);
  const [votingRoomEditionDrawer, setVotingRoomEditionDrawer] = useState(false);
  const [qrCodeDrawerOpen, setQrCodeDrawerOpen] = useState(false);

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
      <div className="h-full overflow-clip">
        <div
          className={classNames("flex h-full flex-col", {
            "animate-wizz repeat-infinite": nudged,
          })}
        >
          <div className="flex flex-col gap-4 p-4 lg:p-6">
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
            onSeeQrCodeButtonClick={() => setQrCodeDrawerOpen(true)}
          />
        </div>
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
