import { PiCircleNotchBold } from "react-icons/pi";

import type { SpinnerProps } from "./types";

export const Spinner = ({ size = "base" }: SpinnerProps) => {
  return (
    <PiCircleNotchBold
      className="animate-spin"
      size={size === "sm" ? 18 : 36}
    />
  );
};
