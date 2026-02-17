import type { IconType } from "react-icons";
import {
  PiAvocadoBold,
  PiBaseballHelmetBold,
  PiBowlFoodBold,
  PiButterflyBold,
  PiCampfireBold,
  PiCastleTurretBold,
  PiCatBold,
  PiCheeseBold,
  PiCowBold,
  PiCrownBold,
  PiDogBold,
  PiFishBold,
  PiGameControllerBold,
  PiGuitarBold,
  PiHamburgerBold,
  PiHeadsetBold,
  PiJoystickBold,
  PiMicrophoneStageBold,
  PiMountainsBold,
  PiMusicNoteBold,
  PiOrangeSliceBold,
  PiPersonSimpleBikeBold,
  PiPianoKeysBold,
  PiPingPongBold,
  PiPizzaBold,
  PiRabbitBold,
  PiShieldBold,
  PiShootingStarBold,
  PiSneakerMoveBold,
  PiSoccerBallBold,
  PiSunglassesBold,
  PiSwordBold,
  PiTennisBallBold,
  PiTipiBold,
  PiTwitchLogoBold,
} from "react-icons/pi";

import type { BackfaceCardStyleColor } from "../types/backfaceCardStyleColor";
import type { BackfaceCardStyleKey } from "../types/backfaceCardStyleKey";

export const BACKFACE_CARD_STYLES: Record<
  BackfaceCardStyleKey,
  {
    color: BackfaceCardStyleColor;
    icons: IconType[];
  }
> = {
  animal: {
    color: "cyan",
    icons: [
      PiDogBold,
      PiCatBold,
      PiRabbitBold,
      PiCowBold,
      PiButterflyBold,
      PiFishBold,
    ],
  },
  bike: {
    color: "teal",
    icons: [
      PiPersonSimpleBikeBold,
      PiCampfireBold,
      PiTipiBold,
      PiMountainsBold,
    ],
  },
  cool: {
    color: "pink",
    icons: [PiCatBold, PiShootingStarBold, PiSunglassesBold, PiOrangeSliceBold],
  },
  fantasy: {
    color: "purple",
    icons: [PiCastleTurretBold, PiShieldBold, PiSwordBold, PiCrownBold],
  },
  food: {
    color: "yellow",
    icons: [
      PiHamburgerBold,
      PiPizzaBold,
      PiBowlFoodBold,
      PiCheeseBold,
      PiAvocadoBold,
    ],
  },
  gaming: {
    color: "fuchsia",
    icons: [
      PiTwitchLogoBold,
      PiGameControllerBold,
      PiHeadsetBold,
      PiJoystickBold,
    ],
  },
  music: {
    color: "red",
    icons: [
      PiGuitarBold,
      PiPianoKeysBold,
      PiMusicNoteBold,
      PiMicrophoneStageBold,
    ],
  },
  sport: {
    color: "lime",
    icons: [
      PiSneakerMoveBold,
      PiSoccerBallBold,
      PiBaseballHelmetBold,
      PiPingPongBold,
      PiTennisBallBold,
    ],
  },
};
