import type { ClickPingProps } from "./types";

export const ClickPing = ({ onAnimationEnd }: ClickPingProps) => (
  <div
    className="animate-click-ping fill-mode-forwards bg-lemon-50/80 absolute top-1/2 left-1/2 size-16 -translate-1/2 rounded-full lg:size-24"
    onAnimationEnd={onAnimationEnd}
  ></div>
);
