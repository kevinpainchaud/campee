import confetti from "canvas-confetti";
import { useCallback, useContext, useEffect } from "react";

import { VotingRoomContext } from "../../context/VotingRoomContext";
import { allEqual } from "../../utils/array";

export const useVotingRoomConfettis = () => {
  const { emitter, peerParticipants, userParticipant } =
    useContext(VotingRoomContext);

  const spreadConfettis = useCallback(() => {
    confetti({
      angle: 60,
      origin: { x: 0, y: 0.5 },
      particleCount: 100,
      spread: 55,
      startVelocity: 60,
    });
    confetti({
      angle: 120,
      origin: { x: 1, y: 0.5 },
      particleCount: 100,
      spread: 55,
      startVelocity: 60,
    });
  }, []);

  const handleVotesRevealed = useCallback(() => {
    if (!userParticipant) {
      return;
    }

    const votes = [
      userParticipant.vote,
      ...(peerParticipants ? peerParticipants.map(({ vote }) => vote) : []),
    ];

    if (votes.some((vote) => vote === null)) {
      return;
    }

    if (allEqual(votes)) {
      spreadConfettis();
    }
  }, [peerParticipants, spreadConfettis, userParticipant]);

  useEffect(() => {
    emitter.on("votesRevealed", handleVotesRevealed);

    return () => {
      emitter.off("votesRevealed", handleVotesRevealed);
    };
  }, [emitter, handleVotesRevealed]);
};
