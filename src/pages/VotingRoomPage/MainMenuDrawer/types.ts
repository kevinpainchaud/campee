import type { DrawerProps } from "../../../components/Drawer/types";

export type MainMenuDrawerProps = Pick<DrawerProps, "open" | "setOpen"> & {
  onSeeQrCodeButtonClick: () => void;
  onVotingRoomEditionButtonClick: () => void;
};
