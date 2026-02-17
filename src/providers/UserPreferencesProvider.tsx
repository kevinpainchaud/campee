import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect } from "react";

import { UserPreferencesContext } from "../context/UserPreferencesContext";
import { getPrefixedLocalStorageKey } from "../utils/localStorage";

export const UserPreferencesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [darkThemeEnabled, setDarkThemeEnabled] = useLocalStorage(
    getPrefixedLocalStorageKey("darkThemeEnabled"),
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  // Apply dark theme class to document root
  useEffect(() => {
    const root = window.document.documentElement;

    if (darkThemeEnabled) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkThemeEnabled]);

  // Sync with system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = () =>
      setDarkThemeEnabled(
        window.matchMedia("(prefers-color-scheme: dark)").matches,
      );

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () =>
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, [setDarkThemeEnabled]);

  return (
    <UserPreferencesContext.Provider
      value={{
        darkThemeEnabled,
        setDarkThemeEnabled,
      }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
};
