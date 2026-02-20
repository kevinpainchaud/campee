import type { User } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import { uniqBy } from "lodash";
import mitt from "mitt";
import { useEffect, useMemo, useState } from "react";

import { VotingRoomContext } from "../context/VotingRoomContext";
import { useAuth } from "../hooks/useAuth";
import { getUserVotingRoomsQueryKey } from "../queries/useUserVotingRoomsQuery/queryKey";
import { getVotingRoomParticipantsProfilesQueryKey } from "../queries/useVotingRoomParticipantsProfilesQuery/queryKey";
import { useVotingRoomParticipantsProfilesQuery } from "../queries/useVotingRoomParticipantsProfilesQuery/useVotingRoomParticipantsProfilesQuery";
import { getVotingRoomParticipantsQueryKey } from "../queries/useVotingRoomParticipantsQuery/queryKey";
import { useVotingRoomParticipantsQuery } from "../queries/useVotingRoomParticipantsQuery/useVotingRoomParticipantsQuery";
import { getVotingRoomQueryKey } from "../queries/useVotingRoomQuery/queryKey";
import { useVotingRoomQuery } from "../queries/useVotingRoomQuery/useVotingRoomQuery";
import { subscribeVotingRoomOnlineUsers } from "../services/onlineUser";
import { subscribeVotingRoomChanges } from "../services/votingRoom";
import type { Participant } from "../types/participant";
import type { Profile } from "../types/profile";
import type { VotingRoom } from "../types/votingRoom";
import type { VotingRoomEvents } from "../types/votingRoomEvents";

export const VotingRoomProvider = ({
  children,
  invitationCode,
}: {
  children: React.ReactNode;
  invitationCode: VotingRoom["invitation_code"];
}) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: votingRoom,
    error: votingRoomError,
    isPending: votingRoomIsPending,
  } = useVotingRoomQuery({ invitationCode });

  const votingRoomId = useMemo(() => votingRoom?.id, [votingRoom?.id]);

  const {
    data: participants,
    error: participantsError,
    isPending: participantsIsPending,
  } = useVotingRoomParticipantsQuery({ votingRoomId });

  const {
    data: participantsProfiles,
    error: participantsProfilesError,
    refetch: refetchParticipantsProfiles,
  } = useVotingRoomParticipantsProfilesQuery({ votingRoomId });

  const [onlineUsersIds, setOnlineUsersIds] = useState<User["id"][]>([]);
  const [onlineUsersIdsIsPending, setOnlineUsersIdsIsPending] = useState(true);

  const userParticipant = useMemo(
    () => participants?.find(({ user_id }) => user_id === user?.id),
    [participants, user?.id],
  );

  const peerParticipants = useMemo(
    () =>
      uniqBy<Participant>(
        participants
          ?.filter(({ user_id }) => user_id !== user?.id)
          .filter(({ user_id }) => onlineUsersIds.includes(user_id)),
        "user_id",
      ),
    [onlineUsersIds, participants, user?.id],
  );

  const userParticipantProfile = useMemo(
    () => participantsProfiles?.find(({ id }) => id === user?.id),
    [participantsProfiles, user?.id],
  );

  const isPending = useMemo(
    () =>
      votingRoomIsPending || participantsIsPending || onlineUsersIdsIsPending,
    [onlineUsersIdsIsPending, votingRoomIsPending, participantsIsPending],
  );

  const emitter = useMemo(() => mitt<VotingRoomEvents>(), []);

  useEffect(() => {
    if (!votingRoomId) {
      return;
    }

    let unsubscribe = () => {};

    // Wait a bit to ensure the user presence is correctly unsubscribed
    // before subscribing again (in case of user id change for example)
    const timeout = setTimeout(() => {
      unsubscribe = subscribeVotingRoomChanges({
        onNudgeInsert: (newNudge) => {
          if (newNudge.created_by === user?.id) {
            return;
          }

          emitter.emit("nudgeSent", {
            by: newNudge.created_by,
            nudge: newNudge,
          });
        },
        onParticipantDelete: (oldParticipantId) =>
          queryClient.setQueryData<Participant[]>(
            getVotingRoomParticipantsQueryKey({
              votingRoomId,
            }),
            (prev) => prev?.filter(({ id }) => id !== oldParticipantId),
          ),
        onParticipantInsert: (newParticipant) => {
          queryClient.setQueryData<Participant[]>(
            getVotingRoomParticipantsQueryKey({
              votingRoomId,
            }),
            (prev) => [...(prev ?? []), newParticipant],
          );
          refetchParticipantsProfiles();
        },
        onParticipantUpdate: (newParticipant) =>
          queryClient.setQueryData<Participant[]>(
            getVotingRoomParticipantsQueryKey({
              votingRoomId,
            }),
            (prev) =>
              prev?.map((participant) =>
                participant.id === newParticipant.id
                  ? newParticipant
                  : participant,
              ),
          ),
        onProfileDelete: (oldProfileId) =>
          queryClient.setQueryData<Profile[]>(
            getVotingRoomParticipantsProfilesQueryKey({
              votingRoomId,
            }),
            (prev) => prev?.filter(({ id }) => id !== oldProfileId),
          ),
        onProfileInsert: (newProfile) =>
          queryClient.setQueryData<Profile[]>(
            getVotingRoomParticipantsProfilesQueryKey({
              votingRoomId,
            }),
            (prev) => [...(prev ?? []), newProfile],
          ),
        onProfileUpdate: (newProfile) =>
          queryClient.setQueryData<Profile[]>(
            getVotingRoomParticipantsProfilesQueryKey({
              votingRoomId,
            }),
            (prev) =>
              prev?.map((profile) =>
                profile.id === newProfile.id ? newProfile : profile,
              ),
          ),
        onVotingRoomDelete: (oldVotingRoomInvitationCode) => {
          queryClient.removeQueries({
            queryKey: getVotingRoomQueryKey({
              invitationCode: oldVotingRoomInvitationCode,
            }),
          });
          queryClient.invalidateQueries({
            queryKey: getUserVotingRoomsQueryKey(),
          });
        },
        onVotingRoomUpdate: (newVotingRoom, oldVotingRoom) => {
          queryClient.setQueryData<VotingRoom>(
            getVotingRoomQueryKey({
              invitationCode: newVotingRoom.invitation_code,
            }),
            () => newVotingRoom,
          );

          // Emit event on voting related changes
          if (
            oldVotingRoom.votes_revealed === false &&
            newVotingRoom.votes_revealed === true
          ) {
            emitter.emit("votesRevealed", { by: newVotingRoom.updated_by });
          } else if (
            oldVotingRoom.votes_revealed === true &&
            newVotingRoom.votes_revealed === false
          ) {
            emitter.emit("newVotingRoundStarted", {
              by: newVotingRoom.updated_by,
            });
          }

          // Emit event on name change
          if (oldVotingRoom.name !== newVotingRoom.name) {
            emitter.emit("nameChanged", {
              by: newVotingRoom.updated_by,
              newName: newVotingRoom.name,
            });
          }

          // Emit event on voting system change
          if (oldVotingRoom.voting_system !== newVotingRoom.voting_system) {
            emitter.emit("votingSystemChanged", {
              by: newVotingRoom.updated_by,
              newVotingSystem: newVotingRoom.voting_system,
            });
          }
        },
        votingRoomId,
      });
    }, 500);

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, [
    emitter,
    queryClient,
    refetchParticipantsProfiles,
    user?.id,
    votingRoomId,
  ]);

  useEffect(() => {
    if (!votingRoomId) {
      return;
    }

    let unsubscribe = () => {};

    // Wait a bit to ensure the user presence is correctly unsubscribed
    // before subscribing again (in case of user id change for example)
    const timeout = setTimeout(() => {
      unsubscribe = subscribeVotingRoomOnlineUsers({
        onChange: (onlineUsersIds) => {
          setOnlineUsersIds(onlineUsersIds);
          setOnlineUsersIdsIsPending(false);
        },
        onSubscribed: () => setOnlineUsersIdsIsPending(false),
        userId: user?.id,
        votingRoomId,
      });
    }, 500);

    return () => {
      setOnlineUsersIds([]);
      setOnlineUsersIdsIsPending(true);
      unsubscribe();
      clearTimeout(timeout);
    };
  }, [user?.id, votingRoomId]);

  return (
    <VotingRoomContext.Provider
      value={{
        emitter,
        isPending,
        participants,
        participantsError,
        participantsIsPending,
        participantsProfiles,
        participantsProfilesError,
        peerParticipants,
        userParticipant,
        userParticipantProfile,
        votingRoom,
        votingRoomError,
      }}
    >
      {children}
    </VotingRoomContext.Provider>
  );
};
