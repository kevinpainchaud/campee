import classNames from "classnames";
import { useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { PiChatTeardropTextBold } from "react-icons/pi";

import { VotingRoomContext } from "../../context/VotingRoomContext";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { useDrawer } from "../../hooks/useDrawer";
import { Button } from "../Button/Button";
import { Spinner } from "../Spinner/Spinner";
import { UserSeat } from "../UserSeat/UserSeat";
import { EmptyVotingRoomState } from "./EmptyVotingRoomState/EmptyVotingRoomState";
import { PeerParticipantsList } from "./PeerParticipantsList/PeerParticipantsList";
import { PeerParticipantsSeats } from "./PeerParticipantsSeats/PeerParticipantsSeats";
import type { VotingRoomTableProps } from "./types";
import { useTablePath } from "./useTablePath";

export const VotingRoomTable = ({
  className,
  onSeeQrCodeButtonClick,
  style,
}: VotingRoomTableProps) => {
  const { isPending, peerParticipants, votingRoom } =
    useContext(VotingRoomContext);

  const { breakpointMinLg, breakpointMinXl } = useBreakpoint();
  const { tablePath, tableRef } = useTablePath();
  const { setFeedbackDrawerOpen } = useDrawer();
  const { t } = useTranslation();

  const showParticipantsAsSeats = useMemo(() => {
    if (!peerParticipants) {
      return false;
    }

    return (
      (breakpointMinLg && peerParticipants.length <= 6) ||
      (breakpointMinXl && peerParticipants.length <= 7)
    );
  }, [breakpointMinLg, breakpointMinXl, peerParticipants]);

  return (
    <>
      <main
        className={classNames(
          className,
          "relative flex items-center justify-center",
          {
            "overflow-y-auto": !showParticipantsAsSeats,
          },
        )}
        style={style}
      >
        {isPending ? (
          <div className="m-auto flex w-full justify-center">
            <Spinner />
          </div>
        ) : votingRoom ? (
          peerParticipants && peerParticipants.length > 0 ? (
            <>
              {showParticipantsAsSeats ? (
                <div
                  className="relative h-full w-full"
                  style={
                    { "--table-path": `"${tablePath}"` } as React.CSSProperties
                  }
                >
                  <PeerParticipantsSeats />
                </div>
              ) : (
                <div className="m-auto p-4">
                  <PeerParticipantsList />
                </div>
              )}
            </>
          ) : (
            <div className="m-auto p-4 pt-0 lg:p-0">
              <EmptyVotingRoomState
                onSeeQrCodeButtonClick={onSeeQrCodeButtonClick}
              />
            </div>
          )
        ) : undefined}
        <div className="absolute top-1/2 left-4 hidden -translate-y-1/2 lg:left-6 lg:flex">
          <Button
            leftIcon={PiChatTeardropTextBold}
            onClick={() => setFeedbackDrawerOpen(true)}
            tagElement="button"
            title={t("entities.feedback.actions.share_feedback")}
            variant="outline"
          ></Button>
        </div>
      </main>
      <div className="sticky bottom-0">
        <div className="h-4 lg:h-14" ref={tableRef}>
          <svg className="w-full">
            <path
              className="fill-lemon-100 stroke-zinc-950 stroke-2 transition-colors dark:fill-zinc-950 dark:stroke-zinc-600"
              d={tablePath}
            />
          </svg>
        </div>
        <div className="bg-lemon-100 transition-colors dark:bg-zinc-950">
          <UserSeat />
        </div>
      </div>
    </>
  );
};
