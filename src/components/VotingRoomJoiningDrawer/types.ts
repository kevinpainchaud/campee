import type { CaptchaFormValues } from "../../types/captchaFormValues";
import type { UserFormValues } from "../../types/userFormValues";

export type VotingRoomJoiningDrawerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export type VotingRoomCreationFormValues = UserFormValues & CaptchaFormValues;
