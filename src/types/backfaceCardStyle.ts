import type { IconType } from "react-icons";

import type { BackfaceCardStyleColor } from "./backfaceCardStyleColor";
import type { BackfaceCardStyleKey } from "./backfaceCardStyleKey";

export type BackfaceCardStyle = {
  color: BackfaceCardStyleColor;
  icons: IconType[];
  key: BackfaceCardStyleKey;
};
