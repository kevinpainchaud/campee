import { createContext, type Dispatch, type SetStateAction } from "react";

export const DrawerContext = createContext<{
  feedbackDrawerOpen: boolean;
  mainMenuDrawerOpen: boolean;
  setFeedbackDrawerOpen: Dispatch<SetStateAction<boolean>>;
  setMainMenuDrawerOpen: Dispatch<SetStateAction<boolean>>;
  setUserProfileEditDrawerOpen: Dispatch<SetStateAction<boolean>>;
  setUserVotingRoomsDrawerOpen: Dispatch<SetStateAction<boolean>>;
  setVotingRoomCreationDrawerOpen: Dispatch<SetStateAction<boolean>>;
  userProfileEditDrawerOpen: boolean;
  userVotingRoomsDrawerOpen: boolean;
  votingRoomCreationDrawerOpen: boolean;
}>(null!);
