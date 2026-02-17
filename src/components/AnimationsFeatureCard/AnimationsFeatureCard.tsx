import confetti from "canvas-confetti";
import classNames from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { FeatureCard } from "../FeatureCard/FeatureCard";
import { Card } from "./Card/Card";
import type { AnimationsFeatureCardProps } from "./types";

export const AnimationsFeatureCard = ({
  className,
}: AnimationsFeatureCardProps) => {
  const { t } = useTranslation();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [revealed, setRevealed] = useState(false);

  const spreadConfettis = useCallback(async () => {
    if (!canvasRef.current) {
      return;
    }

    const myConfetti = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: true,
    });

    await Promise.all([
      myConfetti({
        angle: 60,
        origin: { x: 0, y: 1 },
        particleCount: 50,
        spread: 55,
        startVelocity: 60,
      }),
      myConfetti({
        angle: 120,
        origin: { x: 1, y: 1 },
        particleCount: 50,
        spread: 55,
        startVelocity: 60,
      }),
    ]);

    myConfetti.reset();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRevealed((prev) => {
        if (!prev) {
          setTimeout(spreadConfettis, 500);
        }

        return !prev;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [spreadConfettis]);

  return (
    <FeatureCard
      className={classNames(className, "relative")}
      title={t("components.animations_feature_card.title")}
    >
      <canvas className="absolute inset-0 size-full" ref={canvasRef}></canvas>
      <div className="flex grow flex-col items-center justify-center gap-8 pb-6">
        <div className="flex gap-6">
          <Card backfaceCardStyleKey="bike" revealed={revealed} />
          <Card backfaceCardStyleKey="cool" revealed={revealed} />
          <Card backfaceCardStyleKey="fantasy" revealed={revealed} />
        </div>
        <Card backfaceCardStyleKey="food" revealed={revealed} />
      </div>
    </FeatureCard>
  );
};
