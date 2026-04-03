import {
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  useTransitionStatus,
} from "@floating-ui/react";
import React, { isValidElement, useCallback, useRef, useState } from "react";

import type { TooltipProps } from "./types";

const ARROW_HEIGHT = 6;
const ARROW_WIDTH = 10;

export const Tooltip = ({
  children,
  content,
  gap = 8,
  placement,
}: TooltipProps) => {
  const [open, setOpen] = useState(false);

  const arrowRef = useRef(null);

  const { context, floatingStyles, refs } = useFloating({
    middleware: [
      // eslint-disable-next-line react-hooks/refs
      arrow({ element: arrowRef }),
      offset(ARROW_HEIGHT + gap),
      flip(),
      shift(),
    ],
    onOpenChange: setOpen,
    open,
    placement,
    whileElementsMounted: autoUpdate,
  });

  const { getFloatingProps, getReferenceProps } = useInteractions([
    useHover(context, {
      mouseOnly: true,
    }),
    useFocus(context),
    useDismiss(context),
    useRole(context, { role: "tooltip" }),
  ]);

  const { isMounted, status } = useTransitionStatus(context);

  const renderReference = useCallback(() => {
    if (isValidElement(children)) {
      return React.cloneElement(
        children,
        getReferenceProps({
          ref: refs.setReference,
        }),
      );
    }

    return (
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>
    );
  }, [children, getReferenceProps, refs.setReference]);

  return (
    <>
      {renderReference()}
      {isMounted && (
        <FloatingPortal>
          <div
            className="z-60"
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            <div
              className="scale-95 opacity-0 transition-all ease-in-out data-[status=open]:scale-100 data-[status=open]:opacity-100"
              data-status={status}
            >
              <FloatingArrow
                className="fill-zinc-950 dark:fill-zinc-600"
                context={context}
                height={ARROW_HEIGHT}
                ref={arrowRef}
                width={ARROW_WIDTH}
              />
              <div className="border-pill bg-lemon-50 pointer-events-none rounded-lg px-3 py-1 text-sm dark:bg-zinc-900">
                {content}
              </div>
            </div>
          </div>
        </FloatingPortal>
      )}
    </>
  );
};
