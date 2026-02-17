import classNames from "classnames";
import { truncate } from "lodash";

import { getInitials } from "../../utils/initials";
import { Avatar } from "../Avatar/Avatar";
import type { UserDisplayProps } from "./types";

export const UserDisplay = ({ profile, size = "base" }: UserDisplayProps) => {
  return (
    <div className="flex items-center gap-1.5">
      <Avatar
        initials={
          getInitials({
            displayName: profile.display_name,
          }) ?? ""
        }
        size={size === "sm" ? "xs" : "sm"}
      />
      <span
        className={classNames({ "text-sm": size === "sm" })}
        title={profile.display_name}
      >
        {truncate(profile.display_name, { length: 16 })}
      </span>
    </div>
  );
};
