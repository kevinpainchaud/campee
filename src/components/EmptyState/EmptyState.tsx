import { PiMagnifyingGlassBold } from "react-icons/pi";

import type { EmptyStateProps } from "./types";

export const EmptyState = ({ button, description, title }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <PiMagnifyingGlassBold className="text-3xl" />
      <h3 className="styled-h3">{title}</h3>
      <div>{description}</div>
      {button}
    </div>
  );
};
