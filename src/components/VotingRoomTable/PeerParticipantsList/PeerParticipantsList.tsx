import { useContext } from "react";

import { VotingRoomContext } from "../../../context/VotingRoomContext";
import { ParticipantCard } from "../ParticipantCard/ParticipantCard";

export const PeerParticipantsList = () => {
  const { onlineUsersIds, peerParticipants } = useContext(VotingRoomContext);

  if (!peerParticipants) {
    return;
  }

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-4 lg:px-20">
      {peerParticipants.map((peerParticipant) => (
        <ParticipantCard
          key={peerParticipant.id}
          online={onlineUsersIds.includes(peerParticipant.user_id)}
          participant={peerParticipant}
        />
      ))}
    </div>
  );
};
