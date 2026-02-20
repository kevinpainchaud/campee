import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router";

import { useDrawer } from "../../hooks/useDrawer";
import { FeedbackDrawer } from "../FeedbackDrawer/FeedbackDrawer";
import { MainMenuDrawer } from "../MainMenuDrawer/MainMenuDrawer";
import { UserProfileEditDrawer } from "../UserProfileEditDrawer/UserProfileEditDrawer";
import { UserVotingRoomDrawer } from "../UserVotingRoomDrawer/UserVotingRoomDrawer";
import { VotingRoomCreationDrawer } from "../VotingRoomCreationDrawer/VotingRoomCreationDrawer";

export const GlobalDrawers = () => {
  const {
    feedbackDrawerOpen,
    mainMenuDrawerOpen,
    setFeedbackDrawerOpen,
    setMainMenuDrawerOpen,
    setUserProfileEditDrawerOpen,
    setUserVotingRoomsDrawerOpen,
    setVotingRoomCreationDrawerOpen,
    userProfileEditDrawerOpen,
    userVotingRoomsDrawerOpen,
    votingRoomCreationDrawerOpen,
  } = useDrawer();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname) {
      setFeedbackDrawerOpen(false);
      setMainMenuDrawerOpen(false);
      setUserProfileEditDrawerOpen(false);
      setUserVotingRoomsDrawerOpen(false);
      setVotingRoomCreationDrawerOpen(false);
    }
  }, [
    pathname,
    setFeedbackDrawerOpen,
    setMainMenuDrawerOpen,
    setUserProfileEditDrawerOpen,
    setUserVotingRoomsDrawerOpen,
    setVotingRoomCreationDrawerOpen,
  ]);

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
      <UserProfileEditDrawer
        open={userProfileEditDrawerOpen}
        setOpen={setUserProfileEditDrawerOpen}
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
