import { useMeasure } from "@uidotdev/usehooks";
import classNames from "classnames";
import { useContext, useMemo } from "react";

import { VotingRoomContext } from "../../context/VotingRoomContext";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { Spinner } from "../Spinner/Spinner";
import { UserSeat } from "../UserSeat/UserSeat";
import { EmptyVotingRoomState } from "./EmptyVotingRoomState/EmptyVotingRoomState";
import { PeerParticipantsList } from "./PeerParticipantsList/PeerParticipantsList";
import { PeerParticipantsSeats } from "./PeerParticipantsSeats/PeerParticipantsSeats";
import type { VotingRoomTableProps } from "./types";
import { useTablePath } from "./useTablePath";

export const VotingRoomTable = ({
  className,
  floatingLeftContent,
  onSeeQrCodeButtonClick,
}: VotingRoomTableProps) => {
  const { isPending, peerParticipants, votingRoom } =
    useContext(VotingRoomContext);

  const { breakpointMinLg, breakpointMinXl } = useBreakpoint();
  const { tablePath, tableRef } = useTablePath();

  const [stickyBottomContainerRef, { height: stickyBottomContainerHeight }] =
    useMeasure();

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
      {floatingLeftContent && stickyBottomContainerHeight !== null && (
        <div
          className="fixed left-4 z-10 hidden lg:left-6 lg:flex"
          style={{
            top: `${(window.innerHeight - stickyBottomContainerHeight) / 2}px`,
          }}
        >
          {floatingLeftContent}
        </div>
      )}
      <main
        className={classNames(
          className,
          "relative flex items-center justify-center",
        )}
      >
        {isPending ? (
          <Spinner />
        ) : votingRoom ? (
          peerParticipants && peerParticipants.length > 0 ? (
            <>
              {showParticipantsAsSeats ? (
                <div
                  className="absolute inset-0 size-full"
                  style={
                    { "--table-path": `"${tablePath}"` } as React.CSSProperties
                  }
                >
                  <PeerParticipantsSeats />
                </div>
              ) : (
                <div className="p-4">
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
      </main>
      <div
        className="sticky bottom-0 overflow-clip"
        ref={stickyBottomContainerRef}
      >
        <div className="h-4 lg:h-14" ref={tableRef}>
          <svg className="w-full">
            <path
              className="fill-lemon-100 stroke-zinc-950 stroke-2 transition-colors dark:fill-zinc-900 dark:stroke-zinc-600"
              d={tablePath}
            />
          </svg>
        </div>
        <div className="bg-lemon-100 transition-colors dark:bg-zinc-900">
          <UserSeat />
        </div>
      </div>
    </>
  );
};
