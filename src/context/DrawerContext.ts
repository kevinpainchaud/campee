import { createContext, type Dispatch, type SetStateAction } from "react";

export const DrawerContext = createContext<{
  feedbackDrawerOpen: boolean;
  mainMenuDrawerOpen: boolean;
  setFeedbackDrawerOpen: Dispatch<SetStateAction<boolean>>;
  setMainMenuDrawerOpen: Dispatch<SetStateAction<boolean>>;
  setUserEditDrawerOpen: Dispatch<SetStateAction<boolean>>;
  setUserVotingRoomsDrawerOpen: Dispatch<SetStateAction<boolean>>;
  setVotingRoomCreationDrawerOpen: Dispatch<SetStateAction<boolean>>;
  userEditDrawerOpen: boolean;
  userVotingRoomsDrawerOpen: boolean;
  votingRoomCreationDrawerOpen: boolean;
}>(null!);
