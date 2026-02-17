import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { PiCaretDownBold, PiCaretUpBold, PiSignOutBold } from "react-icons/pi";

import { VotingRoomContext } from "../../context/VotingRoomContext";
import { useAuth } from "../../hooks/useAuth";
import { useTracking } from "../../hooks/useTracking";
import { useVotingRoomLeaving } from "../../hooks/useVotingRoomLeaving";
import { useUserProfileQuery } from "../../queries/useUserProfileQuery/useUserProfileQuery";
import { Button } from "../Button/Button";
import { ButtonSkeleton } from "../ButtonSkeleton/ButtonSkeleton";
import { Dropdown } from "../Dropdown/Dropdown";
import { UserDisplay } from "../UserDisplay/UserDisplay";
import { UserDropdownContent } from "../UserDropdownContent/UserDropdownContent";

export const UserDropdown = () => {
  const { userParticipant } = useContext(VotingRoomContext);

  const { user } = useAuth();
  const { leaveVotingRoom } = useVotingRoomLeaving();
  const { t } = useTranslation();
  const { track } = useTracking();

  const {
    data: userProfile,
    error: userProfileError,
    isPending: userProfileIsPending,
  } = useUserProfileQuery();

  if (userProfileError) {
    return null;
  }

  if (user && userProfileIsPending) {
    return <ButtonSkeleton />;
  }

  if (!userProfile) {
    return null;
  }

  return (
    <Dropdown
      renderContent={({ close }) => (
        <UserDropdownContent
          additionalDropdownMenuItems={
            userParticipant
              ? [
                  {
                    danger: true,
                    icon: PiSignOutBold,
                    label: t("entities.voting_room.actions.leave_voting_room"),
                    onClick: () => {
                      leaveVotingRoom();
                      track("click_voting_room_leaving_button");
                    },
                    tagElement: "button",
                  },
                ]
              : undefined
          }
          onDropdownMenuItemClick={close}
        />
      )}
      renderTrigger={({ active }) => (
        <Button
          rightIcon={active ? PiCaretUpBold : PiCaretDownBold}
          tagElement="button"
          variant="outline"
        >
          <UserDisplay profile={userProfile} />
        </Button>
      )}
    />
  );
};
