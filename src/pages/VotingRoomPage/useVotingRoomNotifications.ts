import type { User } from "@supabase/supabase-js";
import { useSnackbar } from "notistack";
import { useCallback, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { VotingRoomContext } from "../../context/VotingRoomContext";
import { useAuth } from "../../hooks/useAuth";
import type {
  NameChangedVotingRoomEventProps,
  NewVotingRoundStartedVotingRoomEventProps,
  VotesRevealedVotingRoomEventProps,
  VotingSystemChanged,
} from "../../types/votingRoomEvents";
import { getVotingSystemLabel } from "../../utils/vote";

export const useVotingRoomNotifications = () => {
  const { emitter, participantsProfiles } = useContext(VotingRoomContext);

  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const handleNotification = useCallback(
    ({
      by,
      getMessage,
    }: {
      by: User["id"] | null;
      getMessage: (props: { byUserDisplayName: string }) => string;
    }) => {
      // Dont show notifications for own actions
      if (!user || by === user.id) {
        return;
      }

      const byUserProfile = participantsProfiles?.find(({ id }) => id === by);

      if (!byUserProfile) {
        return;
      }

      enqueueSnackbar({
        message: getMessage({ byUserDisplayName: byUserProfile.display_name }),
        variant: "info",
      });
    },
    [enqueueSnackbar, user, participantsProfiles],
  );

  const handleVotesRevealed = useCallback(
    ({ by }: VotesRevealedVotingRoomEventProps) => {
      handleNotification({
        by,
        getMessage: ({ byUserDisplayName }) =>
          t("pages.voting_room_page.notifications.votes_revealed_message", {
            user_display_name: byUserDisplayName,
          }),
      });
    },
    [handleNotification, t],
  );

  const handleNewVotingRoundStarted = useCallback(
    ({ by }: NewVotingRoundStartedVotingRoomEventProps) => {
      handleNotification({
        by,
        getMessage: ({ byUserDisplayName }) =>
          t(
            "pages.voting_room_page.notifications.new_voting_round_started_message",
            {
              user_display_name: byUserDisplayName,
            },
          ),
      });
    },
    [handleNotification, t],
  );

  const handleNameChanged = useCallback(
    ({ by, newName }: NameChangedVotingRoomEventProps) => {
      handleNotification({
        by,
        getMessage: ({ byUserDisplayName }) =>
          t("pages.voting_room_page.notifications.name_changed_message", {
            new_name: newName,
            user_display_name: byUserDisplayName,
          }),
      });
    },
    [handleNotification, t],
  );

  const handleVotingSystemChanged = useCallback(
    ({ by, newVotingSystem }: VotingSystemChanged) => {
      handleNotification({
        by,
        getMessage: ({ byUserDisplayName }) =>
          t(
            "pages.voting_room_page.notifications.voting_system_changed_message",
            {
              user_display_name: byUserDisplayName,
              voting_system_label: getVotingSystemLabel(newVotingSystem),
            },
          ),
      });
    },
    [handleNotification, t],
  );

  useEffect(() => {
    emitter.on("votesRevealed", handleVotesRevealed);
    emitter.on("newVotingRoundStarted", handleNewVotingRoundStarted);
    emitter.on("nameChanged", handleNameChanged);
    emitter.on("votingSystemChanged", handleVotingSystemChanged);

    return () => {
      emitter.off("votesRevealed", handleVotesRevealed);
      emitter.off("newVotingRoundStarted", handleNewVotingRoundStarted);
      emitter.off("nameChanged", handleNameChanged);
      emitter.off("votingSystemChanged", handleVotingSystemChanged);
    };
  }, [
    emitter,
    handleNameChanged,
    handleNewVotingRoundStarted,
    handleVotesRevealed,
    handleVotingSystemChanged,
  ]);
};
