import type { Participant } from "../../../types/participant";

export type ParticipantCardProps = {
  online: boolean;
  participant: Participant;
};

export type useParticipantCardProps = Pick<ParticipantCardProps, "participant">;
