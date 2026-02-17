import { Constants } from "../database.types";

export type SupabaseEnum<EnumName extends keyof typeof Constants.public.Enums> =
  (typeof Constants.public.Enums)[EnumName][number];
