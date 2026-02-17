import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

import { useAuth } from "../../hooks/useAuth";
import { VotingRoomProvider } from "../../providers/VotingRoomProvider";
import { VotingRoomPage } from "./VotingRoomPage";

export const VotingRoomPageContainer = () => {
  const { invitation_code: invitationCode } = useParams<{
    invitation_code: string;
  }>();
  const { t } = useTranslation();
  const { user } = useAuth();

  if (!invitationCode) {
    throw new Error(t("entities.voting_room.invitation.qr_code_required"));
  }

  return (
    <VotingRoomProvider
      invitationCode={invitationCode}
      key={`${invitationCode}-${user?.id ?? "anon"}`}
    >
      <VotingRoomPage />
    </VotingRoomProvider>
  );
};
