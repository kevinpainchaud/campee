import { useLocalStorage } from "@uidotdev/usehooks";

import { EnvContext } from "../context/EnvContext";
import { getPrefixedLocalStorageKey } from "../utils/localStorage";

export const EnvProvider = ({ children }: { children: React.ReactNode }) => {
  const [debugModeEnabled] = useLocalStorage(
    getPrefixedLocalStorageKey("debugModeEnabled"),
    false,
  );

  return (
    <EnvContext.Provider value={{ debugModeEnabled }}>
      {children}
    </EnvContext.Provider>
  );
};
