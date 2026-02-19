import {
  autoPlacement,
  FloatingFocusManager,
  safePolygon,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
} from "@floating-ui/react";
import { useState } from "react";
import React from "react";
import { createPortal } from "react-dom";

import type { DropdownProps } from "./types";

export const Dropdown = ({ renderContent, renderTrigger }: DropdownProps) => {
  const [open, setOpen] = useState(false);

  const { context, floatingStyles, refs } = useFloating({
    middleware: [
      autoPlacement({
        allowedPlacements: ["bottom-start", "bottom-end", "top"],
        padding: 150,
      }),
    ],
    onOpenChange: setOpen,
    open,
  });

  const { getFloatingProps, getReferenceProps } = useInteractions([
    useHover(context, {
      delay: {
        close: 200,
        open: 100,
      },
      handleClose: safePolygon(),
    }),
    useClick(context),
    useDismiss(context),
  ]);

  const Trigger = renderTrigger({ active: open });

  return (
    <>
      {React.isValidElement(Trigger) &&
        React.cloneElement(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          Trigger as any,
          getReferenceProps({
            ref: refs.setReference,
          }),
        )}
      {open &&
        createPortal(
          <FloatingFocusManager
            context={context}
            initialFocus={
              refs.setFloating as unknown as React.RefObject<HTMLElement>
            }
          >
            <div
              className="z-50 outline-none"
              {...getFloatingProps({
                ref: refs.setFloating,
                style: floatingStyles,
              })}
            >
              <div className="border-pill shadow-pill bg-lemon-50 mt-2 max-w-64 rounded-2xl p-1.5 dark:bg-zinc-950">
                {renderContent({ close: () => setOpen(false) })}
              </div>
            </div>
          </FloatingFocusManager>,
          document.body,
        )}
    </>
  );
};
