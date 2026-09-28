"use client";

import React from "react";
import { Sun, Moon, Laptop } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  variant?: "icon-only" | "segmented";
}

export function ThemeToggle({ className, variant = "icon-only" }: ThemeToggleProps) {
  const { theme, setTheme } = useApp();

  if (variant === "segmented") {
    return (
      <div
        role="group"
        aria-label="Theme selector"
        className={cn(
          "inline-flex items-center rounded-lg border border-border bg-muted p-1 text-xs",
          className
        )}
      >
        <button
          type="button"
          onClick={() => setTheme("light")}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-all",
            theme === "light"
              ? "bg-card text-foreground font-semibold shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-label="Light mode"
        >
          <Sun className="h-3.5 w-3.5" />
          <span>Light</span>
        </button>
        <button
          type="button"
          onClick={() => setTheme("dark")}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-all",
            theme === "dark"
              ? "bg-card text-foreground font-semibold shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-label="Dark mode"
        >
          <Moon className="h-3.5 w-3.5" />
          <span>Dark</span>
        </button>
        <button
          type="button"
          onClick={() => setTheme("system")}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-all",
            theme === "system"
              ? "bg-card text-foreground font-semibold shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-label="System theme"
        >
          <Laptop className="h-3.5 w-3.5" />
          <span>System</span>
        </button>
      </div>
    );
  }

  const toggleTheme = () => {
    if (theme === "dark") setTheme("light");
    else setTheme("dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={cn(
        "relative flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 bg-card text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        className
      )}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-amber-400 transition-transform duration-200 rotate-0" />
      ) : (
        <Moon className="h-4 w-4 text-slate-700 transition-transform duration-200 rotate-0" />
      )}
    </button>
  );
}
