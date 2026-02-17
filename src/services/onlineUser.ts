import type { User } from "@supabase/supabase-js";

import { supabase } from "../lib/supabaseClient";
import type { VotingRoom } from "../types/votingRoom";

export const subscribeVotingRoomOnlineUsers = ({
  onChange,
  onSubscribed,
  userId,
  votingRoomId,
}: {
  onChange: (onlineUsersIds: User["id"][]) => void;
  onSubscribed: () => void;
  userId?: User["id"];
  votingRoomId: VotingRoom["id"];
}) => {
  const channel = supabase.channel(
    `voting_room_online_users:${votingRoomId}`,
    userId
      ? {
          config: {
            presence: {
              key: `userId-${userId}`,
            },
          },
        }
      : undefined,
  );

  channel
    .on("presence", { event: "sync" }, () => {
      const presenceState = channel.presenceState<{ userId: User["id"] }>();
      const onlineUsersIds = Object.values(presenceState)
        .flat()
        .map(({ userId }) => userId);

      onChange(onlineUsersIds);
    })
    .subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        onSubscribed();

        if (userId) {
          await channel.track({ userId });
        }
      }
    });

  return async () => {
    await channel.untrack();
    return supabase.removeChannel(channel);
  };
};
