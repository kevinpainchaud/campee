import { useCallback } from "react";

import type { TrackingEventName } from "../types/trackingEventName";

// Exclude my own visits
if (import.meta.env.MODE === "development") {
  localStorage.setItem("umami.disabled", "1");
}

export const useTracking = () => {
  const identify = useCallback(
    (uniqueId: string) => window.umami?.identify(uniqueId),
    [],
  );

  const track = useCallback(
    (eventName: TrackingEventName) => window.umami?.track(eventName),
    [],
  );

  return {
    identify,
    track,
  };
};
