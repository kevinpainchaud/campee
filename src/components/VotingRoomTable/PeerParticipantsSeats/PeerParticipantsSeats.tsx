import { useContext } from "react";

import { VotingRoomContext } from "../../../context/VotingRoomContext";
import { ParticipantCard } from "../ParticipantCard/ParticipantCard";

export const PeerParticipantsSeats = () => {
  const { peerParticipants } = useContext(VotingRoomContext);

  return peerParticipants?.map((peerParticipant, index) => {
    const gap =
      peerParticipants.length < 4 ? (4 - peerParticipants.length) * 10 : 5;
    const offsetDistance =
      (2 * index + 1) * ((100 - gap * 2) / (peerParticipants.length * 2)) + gap;

    return (
      <div
        className="slide-in-from-top-30 animate-in fade-in absolute bottom-12 left-0 duration-500"
        key={peerParticipant.id}
        style={{
          offsetAnchor: "center top",
          offsetDistance: `${offsetDistance}%`,
          offsetPath: "path(var(--table-path))",
        }}
      >
        <ParticipantCard participant={peerParticipant} />
      </div>
    );
  });
};
