import { SupabaseClient } from "@supabase/supabase-js";
import { createContext } from "react";

import type { Database } from "../database.types";

export const SupabaseContext = createContext<SupabaseClient<Database> | null>(
  null
);
