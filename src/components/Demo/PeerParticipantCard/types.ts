import type { BackfaceCardStyleKey } from "../../../types/backfaceCardStyleKey";
import type { Vote } from "../../../types/voteValue";

export type PeerParticipantCardProps = {
  backfaceCardStyleKey: BackfaceCardStyleKey;
  participantDisplayName: string;
  revealed: boolean;
  voteValue: Vote;
};
