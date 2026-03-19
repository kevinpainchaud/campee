import { createContext } from "react";

export const EnvContext = createContext<{ debugModeEnabled: boolean }>(null!);
