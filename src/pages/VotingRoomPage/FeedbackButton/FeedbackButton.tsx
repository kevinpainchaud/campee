import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { PiChatTeardropTextBold } from "react-icons/pi";

import { useDrawer } from "../../../hooks/useDrawer";
import type { FeedbackButtonProps } from "./types";

export const FeedbackButton = ({ className }: FeedbackButtonProps) => {
  const { setFeedbackDrawerOpen } = useDrawer();
  const { t } = useTranslation();

  return (
    <button
      className={classNames(
        className,
        "border-pill hover:shadow-pill flex -translate-x-4 flex-col items-center gap-1 rounded-xl border-l-0 bg-white p-2 pl-6 hover:-translate-x-3 dark:bg-zinc-900",
      )}
      onClick={() => setFeedbackDrawerOpen(true)}
      title={t("entities.feedback.actions.share_feedback")}
    >
      <PiChatTeardropTextBold className="text-xl" />
      <span className="text-xs">{t("entities.feedback.label")}</span>
    </button>
  );
};
