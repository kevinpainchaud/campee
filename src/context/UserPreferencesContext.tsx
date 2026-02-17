import { createContext, type Dispatch, type SetStateAction } from "react";

export const UserPreferencesContext = createContext<{
  darkThemeEnabled: boolean;
  setDarkThemeEnabled: Dispatch<SetStateAction<boolean>>;
}>(null!);
