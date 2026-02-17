import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

import { VotingRoomJoiningDrawer } from "../../components/VotingRoomJoiningDrawer/VotingRoomJoiningDrawer";
import { VotingRoomContext } from "../../context/VotingRoomContext";
import { useAuth } from "../../hooks/useAuth";
import { useConfirm } from "../../hooks/useConfirm";
import { useTracking } from "../../hooks/useTracking";
import { useVotingRoomJoiningMutation } from "../../mutations/useVotingRoomJoiningMutation";

export const useVotingRoomJoining = () => {
  const { isPending, userParticipant, votingRoom } =
    useContext(VotingRoomContext);

  const { user } = useAuth();
  const { confirm } = useConfirm();
  const { t } = useTranslation();
  const { track } = useTracking();

  const { isPending: votingRoomJoiningIsPending, mutate } =
    useVotingRoomJoiningMutation();

  const votingRoomJoiningHasBeenRequestedRef = useRef(false);
  const [votingRoomJoiningDrawerOpen, setVotingRoomJoiningDrawerOpen] =
    useState(false);

  const votingRoomJoiningDrawer = useMemo(
    () => (
      <VotingRoomJoiningDrawer
        open={votingRoomJoiningDrawerOpen}
        setOpen={setVotingRoomJoiningDrawerOpen}
      />
    ),
    [votingRoomJoiningDrawerOpen],
  );

  const joinVotingRoom = useCallback(() => {
    if (!votingRoom) {
      return;
    }

    if (user) {
      mutate({ votingRoomId: votingRoom.id });
    } else {
      setVotingRoomJoiningDrawerOpen(true);
    }
  }, [mutate, votingRoom, user]);

  useEffect(() => {
    if (
      !votingRoom ||
      votingRoomJoiningHasBeenRequestedRef.current ||
      isPending ||
      userParticipant
    ) {
      return;
    }

    votingRoomJoiningHasBeenRequestedRef.current = true;

    confirm({
      cancelButtonLabel: t(
        "pages.voting_room_page.voting_room_joining_confirm_modal.cancel_button_label",
      ),
      children: t(
        "pages.voting_room_page.voting_room_joining_confirm_modal.description",
      ),
      confirmButtonLabel: t(
        "pages.voting_room_page.voting_room_joining_confirm_modal.confirm_button_label",
      ),
      onConfirm: () => {
        joinVotingRoom();
        track("click_voting_room_joining_button");
      },
      title: t(
        "pages.voting_room_page.voting_room_joining_confirm_modal.title",
      ),
    });
  }, [
    confirm,
    joinVotingRoom,
    votingRoom,
    isPending,
    track,
    userParticipant,
    t,
  ]);

  return {
    joinVotingRoom,
    votingRoomJoiningDrawer,
    votingRoomJoiningIsPending,
  };
};
