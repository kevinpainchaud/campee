import { useMediaQuery } from "@uidotdev/usehooks";
import { useCallback } from "react";

export const useBreakpoint = () => {
  const getTailwindBreakpoint = useCallback(
    (name: "lg" | "xl" | "2xl") =>
      getComputedStyle(document.documentElement).getPropertyValue(
        `--breakpoint-${name}`,
      ) || "64rem",
    [],
  );

  const breakpointMinLg = useMediaQuery(
    `only screen and (min-width : ${getTailwindBreakpoint("lg")})`,
  );

  const breakpointMinXl = useMediaQuery(
    `only screen and (min-width : ${getTailwindBreakpoint("xl")})`,
  );

  const breakpointMin2Xl = useMediaQuery(
    `only screen and (min-width : ${getTailwindBreakpoint("2xl")})`,
  );

  return {
    breakpointMin2Xl,
    breakpointMinLg,
    breakpointMinXl,
  };
};
