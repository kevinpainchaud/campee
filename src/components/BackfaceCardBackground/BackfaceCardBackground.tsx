import classNames from "classnames";
import { random, shuffle } from "lodash";
import { useMemo } from "react";

import AppLogo from "../../assets/images/app-logo.svg?react";
import { BACKFACE_CARD_STYLES } from "../../constants/backfaceCardStyles";
import type { BackfaceCardBackgroundProps } from "./types";

export const BackfaceCardBackground = ({
  backfaceCardStyleKey,
}: BackfaceCardBackgroundProps) => {
  const iconsByColumnCount = 3;
  const iconsByRowCount = 4;

  const backfaceCardStyle = useMemo(
    () => BACKFACE_CARD_STYLES[backfaceCardStyleKey],
    [backfaceCardStyleKey],
  );

  const icons = useMemo(
    () =>
      backfaceCardStyle.icons.length > 0
        ? shuffle(
            Array.from({
              length: Math.ceil(
                (iconsByRowCount * iconsByColumnCount) /
                  backfaceCardStyle.icons.length,
              ),
            })
              .flatMap(() => backfaceCardStyle.icons)
              .splice(0, iconsByRowCount * iconsByColumnCount),
          )
        : [],
    [backfaceCardStyle.icons],
  );

  const logoRandomIndex = useMemo(
    () => random(0, icons.length),
    [icons.length],
  );

  const colorClassName = useMemo((): string => {
    switch (backfaceCardStyle.color) {
      case "cyan": {
        return classNames(
          "bg-cyan-100 fill-cyan-400 text-cyan-400",
          "dark:bg-cyan-400 dark:fill-cyan-100 dark:text-cyan-100",
        );
      }
      case "fuchsia": {
        return classNames(
          "bg-fuchsia-100 fill-fuchsia-400 text-fuchsia-400",
          "dark:bg-fuchsia-400 dark:fill-fuchsia-100 dark:text-fuchsia-100",
        );
      }
      case "lime": {
        return classNames(
          "bg-lime-100 fill-lime-400 text-lime-400",
          "dark:bg-lime-400 dark:fill-lime-100 dark:text-lime-100",
        );
      }
      case "pink": {
        return classNames(
          "bg-pink-100 fill-pink-400 text-pink-400",
          "dark:bg-pink-400 dark:fill-pink-100 dark:text-pink-100",
        );
      }
      case "purple": {
        return classNames(
          "bg-purple-100 fill-purple-400 text-purple-400",
          "dark:bg-purple-400 dark:fill-purple-100 dark:text-purple-100",
        );
      }
      case "red": {
        return classNames(
          "bg-red-100 fill-red-400 text-red-400",
          "dark:bg-red-400 dark:fill-red-100 dark:text-red-100",
        );
      }
      case "teal": {
        return classNames(
          "bg-teal-100 fill-teal-400 text-teal-400",
          "dark:bg-teal-400 dark:fill-teal-100 dark:text-teal-100",
        );
      }
      case "yellow": {
        return classNames(
          "bg-yellow-100 fill-yellow-400 text-yellow-400",
          "dark:bg-yellow-400 dark:fill-yellow-100 dark:text-yellow-100",
        );
      }
    }
  }, [backfaceCardStyle.color]);

  return (
    <div
      className={classNames(
        "overflow-hidden transition-colors",
        colorClassName,
      )}
    >
      <div
        className="grid w-[112%] -translate-x-[6%] -rotate-12 gap-2.5"
        style={{
          gridTemplateColumns: `repeat(${iconsByColumnCount}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${iconsByRowCount}, minmax(0, 1fr))`,
        }}
      >
        {icons.map((Icon, index) =>
          index === logoRandomIndex ? (
            <div key={index}>
              <AppLogo />
            </div>
          ) : (
            <Icon key={index} size="100%" />
          ),
        )}
      </div>
    </div>
  );
};
