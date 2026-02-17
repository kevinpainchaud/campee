import React from "react";

import type { ContentProps } from "./types";

export const Content = ({ children, leftIcon, rightIcon }: ContentProps) => {
  return (
    <>
      {leftIcon && React.createElement(leftIcon)}
      {children && <span>{children}</span>}
      {rightIcon && React.createElement(rightIcon)}
    </>
  );
};
