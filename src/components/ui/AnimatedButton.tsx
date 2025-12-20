"use client";

import React, { forwardRef, type ReactNode } from "react";
import Link from "next/link";
import { motion, type MotionProps } from "framer-motion";

/* ------------------------------------------------
   Public props
------------------------------------------------- */
interface BaseButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  title?: string;
}

interface ButtonAsButton extends BaseButtonProps {
  as?: "button";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
}

interface ButtonAsLink extends BaseButtonProps {
  as: "link";
  href: string;
  external?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

type AnimatedButtonProps = ButtonAsButton | ButtonAsLink;

/* ------------------------------------------------
   Style maps
------------------------------------------------- */
const baseClasses =
  "inline-flex items-center justify-center font-bold transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black";

const variants: Record<NonNullable<BaseButtonProps["variant"]>, string> = {
  primary:
    "bg-[var(--gold)] text-black hover:bg-[var(--gold-light)] focus:ring-[var(--gold)]/50 disabled:opacity-50 disabled:cursor-not-allowed",
  outline:
    "border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 focus:ring-white/50 disabled:opacity-50",
  ghost: "text-white hover:bg-white/10 focus:ring-white/50 disabled:opacity-50",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/50 disabled:opacity-50",
};

const sizes: Record<NonNullable<BaseButtonProps["size"]>, string> = {
  sm: "px-3 py-1.5 text-sm rounded-lg min-h-[32px]",
  md: "px-6 py-3 text-base rounded-xl min-h-[48px]",
  lg: "px-8 py-4 text-lg rounded-2xl min-h-[56px]",
};

/* ------------------------------------------------
   Motion behavior
------------------------------------------------- */
function getMotionBehavior(disabledOrLoading: boolean, isPrimary: boolean): MotionProps {
  return {
    whileHover: disabledOrLoading
      ? undefined
      : {
          scale: 1.02,
          boxShadow: isPrimary
            ? "0 8px 25px rgba(212,175,55,0.4)"
            : "0 8px 25px rgba(255,255,255,0.1)",
        },
    whileTap: disabledOrLoading ? undefined : { scale: 0.98 },
    transition: { type: "spring", stiffness: 400, damping: 25 },
  };
}

/* ------------------------------------------------
   Component
------------------------------------------------- */
const AnimatedButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, AnimatedButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      loading = false,
      disabled = false,
      className = "",
      title,
      ...props
    },
    ref
  ) => {
    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
    const motionBehavior = getMotionBehavior(disabled || loading, variant === "primary");

    const content = (
      <>
        {loading && (
          <motion.div
            className="mr-2 h-4 w-4 rounded-full border-2 border-current border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}
        {children}
      </>
    );

    // Link mode
    if ((props as ButtonAsLink).as === "link") {
      const { href, external, onClick } = props as ButtonAsLink;

      if (external) {
        // External anchor - only pass motion props and specific HTML props we need
        return (
          <motion.a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClick}
            className={classes}
            title={title}
            aria-disabled={disabled || loading}
            {...motionBehavior}
          >
            {content}
          </motion.a>
        );
      }

      // Internal link
      return (
        <Link href={href} className="inline-block">
          <motion.button
            ref={ref as React.Ref<HTMLButtonElement>}
            type="button"
            className={classes}
            title={title}
            aria-disabled={disabled || loading}
            {...motionBehavior}
          >
            {content}
          </motion.button>
        </Link>
      );
    }

    // Button mode
    const { onClick, type = "button" } = props as ButtonAsButton;

    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        className={classes}
        title={title}
        {...motionBehavior}
      >
        {content}
      </motion.button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

export { AnimatedButton };
export type { AnimatedButtonProps };
