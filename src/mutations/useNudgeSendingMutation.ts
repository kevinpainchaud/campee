import type { User } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import { VotingRoomContext } from "../context/VotingRoomContext";
import { useAuth } from "../hooks/useAuth";
import { sendNudge } from "../services/nudge";
import type { VotingRoom } from "../types/votingRoom";

export const useNudgeSendingMutation = () => {
  const { emitter } = useContext(VotingRoomContext);

  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({
      toParticipantId,
      votingRoomId,
    }: {
      toParticipantId: User["id"];
      votingRoomId: VotingRoom["id"];
    }) => {
      // [Optimistic UI] Dont wait the response from the server to emit the event
      if (user) {
        emitter.emit("nudgeSent", {
          by: user.id,
          nudge: {
            created_at: dayjs().format(),
            created_by: user.id,
            id: uuidv4(),
            to_participant_id: toParticipantId,
            voting_room_id: votingRoomId,
          },
        });
      }

      return await sendNudge({
        toParticipantId,
        votingRoomId,
      });
    },
  });
};
