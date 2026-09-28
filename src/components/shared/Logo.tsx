import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showBadge?: boolean;
  badgeText?: string;
  asLink?: boolean;
  className?: string;
}

export function Logo({
  size = "md",
  showBadge = true,
  badgeText = "2.0",
  asLink = true,
  className,
}: LogoProps) {
  const iconSizes = {
    sm: "h-6 w-6 text-xs",
    md: "h-8 w-8 text-sm",
    lg: "h-10 w-10 text-base",
  };

  const textSizes = {
    sm: "text-base tracking-tight",
    md: "text-lg tracking-tight",
    lg: "text-2xl tracking-tight",
  };

  const content = (
    <div className={cn("inline-flex items-center gap-2.5 font-bold select-none group", className)}>
      {/* Dynamic Soundwave / Neural Echo Orb */}
      <div
        className={cn(
          "relative flex items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 text-white shadow-md shadow-emerald-500/20 transition-transform group-hover:scale-105 duration-200",
          iconSizes[size]
        )}
      >
        {/* Concentric radar / echo waves */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4/6 w-4/6"
          aria-hidden="true"
        >
          <path d="M2 10v3" />
          <path d="M6 6v11" />
          <path d="M10 3v18" />
          <path d="M14 8v7" />
          <path d="M18 5v13" />
          <path d="M22 10v4" />
        </svg>

        {/* Ambient subtle glow ring */}
        <div className="absolute inset-0 rounded-xl bg-primary/20 blur-[6px] -z-10 group-hover:blur-[8px] transition-all" />
      </div>

      <div className="flex items-center gap-1.5">
        <span className={cn("font-bold text-foreground font-sans", textSizes[size])}>
          Echo<span className="text-primary">GPT</span>
        </span>
        {showBadge && (
          <span className="rounded-full bg-primary/10 border border-primary/20 px-1.5 py-0.2 text-[10px] font-semibold text-primary uppercase tracking-wider">
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );

  if (asLink) {
    return (
      <Link href="/" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
}
