import type { Participant } from "../../../types/participant";

export type ParticipantCardProps = {
  participant: Participant;
};

export type useParticipantCardProps = Pick<ParticipantCardProps, "participant">;
