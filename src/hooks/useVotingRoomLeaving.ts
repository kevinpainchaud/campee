import { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { VotingRoomContext } from "../context/VotingRoomContext";
import { useVotingRoomLeaveMutation } from "../mutations/useVotingRoomLeaveMutation";
import { useConfirm } from "./useConfirm";

export const useVotingRoomLeaving = () => {
  const { votingRoom } = useContext(VotingRoomContext);

  const { confirm } = useConfirm();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { mutate: votingRoomLeavingMutate } = useVotingRoomLeaveMutation();

  const leaveVotingRoom = useCallback(async () => {
    if (!votingRoom) {
      return;
    }

    confirm({
      children: t("hooks.use_voting_room_leaving.confirm_modal.description"),
      confirmButtonDanger: true,
      confirmButtonLabel: t("entities.voting_room.actions.leave_voting_room"),
      onConfirm: () => {
        votingRoomLeavingMutate({ votingRoomId: votingRoom.id });
        navigate("/");
      },
      title: t("hooks.use_voting_room_leaving.confirm_modal.title"),
    });
  }, [votingRoom, confirm, t, votingRoomLeavingMutate, navigate]);

  return {
    leaveVotingRoom,
  };
};
