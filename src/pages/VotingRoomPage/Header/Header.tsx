import classNames from "classnames";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { PiGearBold, PiListBold } from "react-icons/pi";
import { Link } from "react-router";

import { Button } from "../../../components/Button/Button";
import { Logo } from "../../../components/Logo/Logo";
import { ThemeSwitcherButton } from "../../../components/ThemeSwitcherButton/ThemeSwitcherButton";
import { Tooltip } from "../../../components/Tooltip/Tooltip";
import { UserDropdown } from "../../../components/UserDropdown/UserDropdown";
import { VotingRoomContext } from "../../../context/VotingRoomContext";
import { InfoDetails } from "../InfoDetails/InfoDetails";
import { InviteDropdown } from "../InviteDropdown/InviteDropdown";
import { MainActions } from "../MainActions/MainActions";
import type { HeaderProps } from "./types";

export const Header = ({
  className,
  onMainMenuDrawerToggleButtonClick,
  onVotingRoomEditionButtonClick,
  onVotingRoomJoiningButtonClick,
  votingRoomJoiningIsPending,
}: HeaderProps) => {
  const { isPending, userParticipant, votingRoom } =
    useContext(VotingRoomContext);

  const { t } = useTranslation();

  return (
    <header
      className={classNames(
        className,
        "flex items-center justify-between gap-4 lg:gap-6",
      )}
    >
      <Link
        className="default-style-none flex items-center lg:min-h-11"
        title={t("common.navigation.back_to_front_page_button_label")}
        to="/"
      >
        <Logo />
      </Link>
      <Button
        className="lg:hidden"
        leftIcon={PiListBold}
        onClick={onMainMenuDrawerToggleButtonClick}
        tagElement="button"
        title={t("common.navigation.main_menu_trigger_button_label")}
        variant="outline"
      />
      {votingRoom && !isPending && (
        <>
          <div className="relative hidden grow justify-center empty:hidden lg:flex">
            <MainActions
              onVotingRoomJoiningButtonClick={onVotingRoomJoiningButtonClick}
              votingRoomJoiningIsPending={votingRoomJoiningIsPending}
            />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 translate-y-full empty:hidden">
              <InfoDetails />
            </div>
          </div>
          <nav className="hidden lg:flex">
            <ul className="flex items-center gap-6">
              {userParticipant && (
                <li>
                  <Tooltip
                    content={t("entities.voting_room.edition.title")}
                    placement="bottom"
                  >
                    <Button
                      leftIcon={PiGearBold}
                      onClick={onVotingRoomEditionButtonClick}
                      tagElement="button"
                      variant="outline"
                    />
                  </Tooltip>
                </li>
              )}
              <li>
                <InviteDropdown />
              </li>
              <li className="empty:hidden">
                <UserDropdown />
              </li>
              <li>
                <ThemeSwitcherButton
                  tooltipOptions={{ placement: "bottom-end" }}
                />
              </li>
            </ul>
          </nav>
        </>
      )}
    </header>
  );
};
