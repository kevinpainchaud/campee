import { createPortal } from "react-dom";

import { useDrawer } from "../../hooks/useDrawer";
import { FeedbackDrawer } from "../FeedbackDrawer/FeedbackDrawer";
import { MainMenuDrawer } from "../MainMenuDrawer/MainMenuDrawer";
import { UserEditDrawer } from "../UserEditDrawer/UserEditDrawer";
import { UserVotingRoomDrawer } from "../UserVotingRoomDrawer/UserVotingRoomDrawer";
import { VotingRoomCreationDrawer } from "../VotingRoomCreationDrawer/VotingRoomCreationDrawer";

export const GlobalDrawers = () => {
  const {
    feedbackDrawerOpen,
    mainMenuDrawerOpen,
    setFeedbackDrawerOpen,
    setMainMenuDrawerOpen,
    setUserEditDrawerOpen,
    setUserVotingRoomsDrawerOpen,
    setVotingRoomCreationDrawerOpen,
    userEditDrawerOpen,
    userVotingRoomsDrawerOpen,
    votingRoomCreationDrawerOpen,
  } = useDrawer();

  return createPortal(
    <>
      <FeedbackDrawer
        open={feedbackDrawerOpen}
        setOpen={setFeedbackDrawerOpen}
      />
      <MainMenuDrawer
        open={mainMenuDrawerOpen}
        setOpen={setMainMenuDrawerOpen}
      />
      <UserEditDrawer
        open={userEditDrawerOpen}
        setOpen={setUserEditDrawerOpen}
      />
      <UserVotingRoomDrawer
        open={userVotingRoomsDrawerOpen}
        setOpen={setUserVotingRoomsDrawerOpen}
      />
      <VotingRoomCreationDrawer
        open={votingRoomCreationDrawerOpen}
        setOpen={setVotingRoomCreationDrawerOpen}
      />
    </>,
    document.body,
  );
};
