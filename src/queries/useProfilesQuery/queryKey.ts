import type { useProfilesQueryProps } from "./types";

export const getProfilesQueryKey = ({ ids }: useProfilesQueryProps = {}) => [
  "profiles",
  ...(ids ? [ids] : []),
];
