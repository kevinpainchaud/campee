import classNames from "classnames";
import React, { forwardRef } from "react";
import { Link } from "react-router";

import { Spinner } from "../Spinner/Spinner";
import { Content } from "./Content/Content";
import type { ButtonProps } from "./types";

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      active,
      children,
      className,
      danger,
      leftIcon,
      onClick,
      reversed,
      rightIcon,
      size = "base",
      success,
      title,
      variant = "default",
      ...props
    },
    ref,
  ) => {
    const hoverAllowed = props.tagElement !== "button" || onClick;

    const commonProps: React.HTMLAttributes<HTMLElement> = {
      className: classNames(
        className,
        "border-pill default-style-none inline-flex items-center",
        "disabled:cursor-not-allowed disabled:border-gray-600 disabled:bg-gray-300 disabled:text-gray-600 disabled:hover:shadow-none",
        {
          "cursor-pointer": hoverAllowed,
          "hover:shadow-pill":
            hoverAllowed && (variant === "outline" || variant === "primary"),
        },
        {
          "justify-center": variant !== "dropdownMenuItem",
        },
        {
          "bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white":
            variant === "outline" && !reversed && !danger && !success,
          "bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-900 dark:hover:shadow-white":
            variant === "primary" && !reversed && !danger && !success,
          "border-transparent":
            variant === "transparent" && !reversed && !danger && !success,
          "border-transparent bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white":
            variant === "default" && !reversed && !danger && !success,
          "border-transparent hover:bg-zinc-900/10 dark:hover:bg-white/10":
            variant === "dropdownMenuItem" &&
            !reversed &&
            !danger &&
            !success &&
            !active,
        },
        {
          "border-transparent bg-zinc-900 text-white":
            variant === "default" && reversed && !danger && !success,
          "border-transparent hover:bg-zinc-100":
            variant === "dropdownMenuItem" &&
            reversed &&
            !danger &&
            !success &&
            !active,
          "border-white bg-white text-zinc-900 hover:shadow-white dark:border-zinc-600 dark:bg-zinc-600 dark:text-white dark:hover:shadow-zinc-600":
            variant === "primary" && reversed && !danger && !success,
          "border-white bg-zinc-900 hover:shadow-white dark:border-zinc-600 dark:bg-white dark:text-zinc-600 dark:hover:shadow-zinc-600":
            variant === "outline" && reversed && !danger && !success,
        },
        {
          "border-red-600 bg-red-600 text-white hover:shadow-red-600":
            variant === "primary" && danger,
          "border-red-600 bg-white text-red-600 hover:shadow-red-600 dark:bg-zinc-900":
            variant === "outline" && danger,
          "border-transparent bg-white text-red-600":
            variant === "default" && danger,
          "border-transparent text-red-600":
            variant === "transparent" && danger,
          "border-transparent text-red-600 hover:bg-red-100 dark:hover:bg-red-950":
            variant === "dropdownMenuItem" && danger,
        },
        {
          "border-green-600 bg-green-600 text-white hover:shadow-green-600":
            variant === "primary" && success,
          "border-green-600 bg-white text-green-600 hover:shadow-green-600 dark:bg-zinc-900":
            variant === "outline" && success,
          "border-transparent bg-white text-green-600":
            variant === "default" && success,
          "border-transparent text-green-600 hover:bg-green-100 dark:hover:bg-green-950":
            variant === "dropdownMenuItem" && success,
        },
        {
          "border-transparent bg-zinc-900 text-white dark:bg-white dark:text-zinc-900":
            variant === "dropdownMenuItem" && active,
        },
        {
          "rounded-2xl": size === "lg",
          "rounded-lg": size === "sm",
          "rounded-xl": size === "base",
        },
        {
          "gap-1 px-3 py-1 text-sm": size === "sm" && children,
          "gap-2 px-3 py-2": size === "base" && children,
          "gap-4 px-6 py-3 text-lg": size === "lg" && children,
        },
        {
          "size-8 text-base": size === "sm" && !children,
          "size-11 text-xl": size === "base" && !children,
          "size-14 text-2xl": size === "lg" && !children,
        },
      ),
      onClick,
      title,
    };

    if (props.tagElement === "anchor") {
      const { target, to } = props;

      return (
        <Link
          {...commonProps}
          ref={ref as React.Ref<HTMLAnchorElement>}
          target={target}
          to={to}
        >
          <Content leftIcon={leftIcon} rightIcon={rightIcon}>
            {children}
          </Content>
        </Link>
      );
    }

    if (props.tagElement === "button") {
      const { disabled, loading, onMouseEnter, onPointerEnter, type } = props;

      return (
        <button
          {...commonProps}
          disabled={disabled || loading}
          onMouseEnter={onMouseEnter}
          onPointerEnter={onPointerEnter}
          ref={ref as React.Ref<HTMLButtonElement>}
          type={type}
        >
          {loading ? (
            <div
              className={classNames("flex items-center", {
                "h-6": size === "base",
                "h-7": size === "lg",
              })}
            >
              <Spinner size="sm" />
            </div>
          ) : (
            <Content leftIcon={leftIcon} rightIcon={rightIcon}>
              {children}
            </Content>
          )}
        </button>
      );
    }
  },
);
