import { Trans, useTranslation } from "react-i18next";

import { useAuth } from "../../hooks/useAuth";
import { useDrawer } from "../../hooks/useDrawer";
import { useTracking } from "../../hooks/useTracking";
import { useProfilesQuery } from "../../queries/useProfilesQuery/useProfilesQuery";
import { useUserVotingRoomsQuery } from "../../queries/useUserVotingRoomsQuery/useUserVotingRoomsQuery";
import { Button } from "../Button/Button";
import { Drawer } from "../Drawer/Drawer";
import { EmptyState } from "../EmptyState/EmptyState";
import { VotingRoomCard } from "../VotingRoomCard/VotingRoomCard";
import type { UserVotingRoomDrawerProps } from "./types";

export const UserVotingRoomDrawer = ({
  open,
  setOpen,
}: UserVotingRoomDrawerProps) => {
  const { user } = useAuth();
  const { setVotingRoomCreationDrawerOpen } = useDrawer();
  const { t } = useTranslation();
  const { track } = useTracking();

  const { data: userVotingRooms, isFetching: userVotingRoomsIsFetching } =
    useUserVotingRoomsQuery({
      enabled: Boolean(user) && open,
    });
  const { data: profiles, isPending: profilesIsPending } = useProfilesQuery(
    {
      ids: userVotingRooms?.map(({ created_by }) => created_by),
    },
    {
      enabled: Boolean(user) && open,
    },
  );

  return (
    <Drawer
      isPending={userVotingRoomsIsFetching || profilesIsPending}
      open={open}
      setOpen={setOpen}
      title={t("components.user_voting_room_drawer.title")}
    >
      {userVotingRooms && userVotingRooms.length > 0 ? (
        <>
          <ul className="flex flex-col gap-4 py-1">
            {userVotingRooms?.map((userVotingRoom) => {
              const creatorProfile = profiles?.find(
                (profile) => profile.id === userVotingRoom.created_by,
              );

              if (!creatorProfile) {
                return null;
              }

              return (
                <li key={userVotingRoom.id}>
                  <VotingRoomCard
                    adminUserProfile={creatorProfile}
                    createdByUser={userVotingRoom.created_by === user?.id}
                    onClick={() => setOpen(false)}
                    votingRoom={userVotingRoom}
                  />
                </li>
              );
            })}
          </ul>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            {t("components.user_voting_room_drawer.expiration_message")}
          </p>
        </>
      ) : (
        <div className="flex grow items-center justify-center">
          <EmptyState
            button={
              <Button
                onClick={() => {
                  setOpen(false);
                  setVotingRoomCreationDrawerOpen(true);
                  track("click_voting_room_creation_button");
                }}
                tagElement="button"
                variant="primary"
              >
                {t("entities.voting_room.actions.create_a_voting_room")}
              </Button>
            }
            description={
              <Trans i18nKey="components.user_voting_room_drawer.empty_state_description" />
            }
            title={t("components.user_voting_room_drawer.empty_state_title")}
          />
        </div>
      )}
    </Drawer>
  );
};
