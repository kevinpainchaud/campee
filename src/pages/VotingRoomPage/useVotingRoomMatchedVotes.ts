import { useCallback, useContext, useEffect, useMemo } from "react";

import { VotingRoomContext } from "../../context/VotingRoomContext";
import { useConfettis } from "../../hooks/useConfettis";
import { useFlyingUpEmoji } from "../../hooks/useFlyingUpEmoji";
import { allEqual } from "../../utils/array";

export const useVotingRoomMatchedVotes = () => {
  const { emitter, peerParticipants, userParticipant, votingRoom } =
    useContext(VotingRoomContext);

  const { spreadConfettis } = useConfettis();
  const { triggerFlyingUpEmoji } = useFlyingUpEmoji();

  const matchedVotes = useMemo(() => {
    if (!userParticipant) {
      return false;
    }

    const votes = [
      userParticipant.vote,
      ...(peerParticipants ? peerParticipants.map(({ vote }) => vote) : []),
    ];

    if (votes.some((vote) => vote === null)) {
      return false;
    }

    console.log("votes", votes, allEqual(votes));

    return allEqual(votes);
  }, [peerParticipants, userParticipant]);

  const handleVotesRevealed = useCallback(() => {
    if (matchedVotes) {
      spreadConfettis();
    }
  }, [matchedVotes, spreadConfettis]);

  const handleParticipantVoteChange = useCallback(() => {
    if (votingRoom?.votes_revealed && matchedVotes) {
      triggerFlyingUpEmoji("🤝");
    }
  }, [matchedVotes, triggerFlyingUpEmoji, votingRoom?.votes_revealed]);

  useEffect(() => {
    emitter.on("votesRevealed", handleVotesRevealed);
    emitter.on("participantVoteChanged", handleParticipantVoteChange);

    return () => {
      emitter.off("votesRevealed", handleVotesRevealed);
      emitter.off("participantVoteChanged", handleParticipantVoteChange);
    };
  }, [emitter, handleParticipantVoteChange, handleVotesRevealed]);
};
