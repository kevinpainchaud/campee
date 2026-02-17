import type { User } from "@supabase/supabase-js";
import { createContext } from "react";

import type { BackfaceCardStyle } from "../types/backfaceCardStyle";

export const AuthContext = createContext<
  | {
      signUp: (props: {
        backfaceCardStyleKey: BackfaceCardStyle["key"];
        companyName: string | null;
        displayName: string;
        options: { captchaToken: string };
      }) => Promise<User>;
      user: User | null;
    }
  | undefined
>(undefined);
