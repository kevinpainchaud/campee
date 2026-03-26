import confetti from "canvas-confetti";
import { useCallback } from "react";

export const useConfettis = () => {
  const spreadConfettis = useCallback(() => {
    confetti({
      angle: 60,
      origin: { x: 0, y: 0.5 },
      particleCount: 100,
      spread: 55,
      startVelocity: 60,
    });
    confetti({
      angle: 120,
      origin: { x: 1, y: 0.5 },
      particleCount: 100,
      spread: 55,
      startVelocity: 60,
    });
  }, []);

  return {
    spreadConfettis,
  };
};
