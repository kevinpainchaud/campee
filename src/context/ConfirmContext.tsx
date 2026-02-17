import { createContext } from "react";

import type { ConfirmOptions } from "../types/confirmOptions";

export const ConfirmContext = createContext<{
  confirm: (confirmOptions: ConfirmOptions) => void;
} | null>(null);
