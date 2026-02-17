import type { CaptchaFormValues } from "../../types/captchaFormValues";
import type { UserFormValues } from "../../types/userFormValues";
import type { VotingRoomFormValues } from "../../types/votingRoomFormValues";
import type { DrawerProps } from "../Drawer/types";

export type VotingRoomCreationDrawerProps = Pick<
  DrawerProps,
  "open" | "setOpen"
>;

export type VotingRoomCreationFormValues = UserFormValues &
  CaptchaFormValues &
  VotingRoomFormValues;
