import type { Profile } from "../../types/profile";

export type UserDisplayProps = {
  online?: boolean;
  profile: Profile;
  size?: "sm" | "base";
};
