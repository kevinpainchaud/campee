import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { PiChatTeardropTextBold } from "react-icons/pi";

import { Button } from "../../../components/Button/Button";
import { useDrawer } from "../../../hooks/useDrawer";
import type { FeedbackButtonProps } from "./types";

export const FeedbackButton = ({ className }: FeedbackButtonProps) => {
  const { setFeedbackDrawerOpen } = useDrawer();
  const { t } = useTranslation();

  return (
    <Button
      className={className}
      leftIcon={PiChatTeardropTextBold}
      onClick={() => setFeedbackDrawerOpen(true)}
      tagElement="button"
      title={t("entities.feedback.actions.share_feedback")}
      variant="outline"
    >
      {/* {t("entities.feedback.label")} */}
    </Button>
  );

  return (
    <button
      className={classNames(
        className,
        "border-pill hover:shadow-pill bg-lemon-50 flex items-center gap-1 rounded-full p-2 dark:bg-zinc-900",
      )}
      onClick={() => setFeedbackDrawerOpen(true)}
      title={t("entities.feedback.actions.share_feedback")}
    >
      <PiChatTeardropTextBold className="text-xl" />
      <span className="text-xs">{t("entities.feedback.label")}</span>
    </button>
  );
};
