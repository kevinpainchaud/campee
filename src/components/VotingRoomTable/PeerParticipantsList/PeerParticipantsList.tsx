import { useContext } from "react";

import { VotingRoomContext } from "../../../context/VotingRoomContext";
import { ParticipantCard } from "../ParticipantCard/ParticipantCard";

export const PeerParticipantsList = () => {
  const { peerParticipants } = useContext(VotingRoomContext);

  if (!peerParticipants) {
    return;
  }

  return (
    <div className="m-auto flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-4 lg:max-w-8/12">
      {peerParticipants.map((peerParticipant) => (
        <ParticipantCard
          key={peerParticipant.id}
          participant={peerParticipant}
        />
      ))}
    </div>
  );
};
