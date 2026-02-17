import type { Database } from "../database.types";

export type SupabaseTable<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
