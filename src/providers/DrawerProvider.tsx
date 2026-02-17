import { useState } from "react";

import { DrawerContext } from "../context/DrawerContext";

export const DrawerProvider = ({ children }: { children: React.ReactNode }) => {
  const [feedbackDrawerOpen, setFeedbackDrawerOpen] = useState(false);
  const [mainMenuDrawerOpen, setMainMenuDrawerOpen] = useState(false);
  const [votingRoomCreationDrawerOpen, setVotingRoomCreationDrawerOpen] =
    useState(false);
  const [userEditDrawerOpen, setUserEditDrawerOpen] = useState(false);
  const [userVotingRoomsDrawerOpen, setUserVotingRoomsDrawerOpen] =
    useState(false);

  return (
    <DrawerContext.Provider
      value={{
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
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};
