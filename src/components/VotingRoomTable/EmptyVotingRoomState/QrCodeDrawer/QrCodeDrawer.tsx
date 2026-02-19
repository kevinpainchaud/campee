import { QRCodeSVG } from "qrcode.react";
import { useTranslation } from "react-i18next";

import appLogo from "../../../../assets/images/app-logo.svg";
import { Drawer } from "../../../Drawer/Drawer";
import type { QrCodeModalProps } from "./types";

export const QrCodeDrawer = ({
  open,
  setOpen,
  title,
  url,
}: QrCodeModalProps) => {
  const { t } = useTranslation();

  return (
    <Drawer open={open} setOpen={setOpen} title={title}>
      <div className="flex flex-col items-center gap-4 pt-12">
        <QRCodeSVG
          bgColor="#fcfcf5"
          className="size-56"
          imageSettings={{
            excavate: true,
            height: 20,
            src: appLogo,
            width: 20,
          }}
          value={url}
        />
        <p>
          <i>{t("entities.voting_room.invitation.qr_code_caption")}</i>
        </p>
      </div>
    </Drawer>
  );
};
