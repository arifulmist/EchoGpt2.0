"use client";

import { ChromeIcon as Chrome } from "@/components/shared/ChromeIcon";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  MessageSquare,
  Columns3,
  Settings,
  Sun,
  Moon,
  CornerDownLeft,
  X,
  Plus,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { ModelIcon } from "./ModelIcon";
import { cn } from "@/lib/utils";

export function CommandPalette() {
  const router = useRouter();
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    conversations,
    setActiveConversationId,
    models,
    activeModelId,
    setActiveModelId,
    createNewConversation,
    setIsCompareMode,
    theme,
    setTheme,
  } = useApp();

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  // Filter items based on query
  const q = query.toLowerCase().trim();

  const matchingConversations = conversations
    .filter((c) => c.title.toLowerCase().includes(q) || c.preview.toLowerCase().includes(q))
    .slice(0, 4);

  const matchingModels = models
    .filter((m) => m.name.toLowerCase().includes(q) || m.shortName.toLowerCase().includes(q))
    .slice(0, 4);

  // Actions list
  const actions = [
    {
      id: "action-new-chat",
      label: "Start New Chat",
      icon: <Plus className="h-4 w-4 text-primary" />,
      run: () => {
        createNewConversation();
        router.push("/workspace");
      },
    },
    {
      id: "action-compare",
      label: "Toggle Compare AI Mode (Multi-Model)",
      icon: <Columns3 className="h-4 w-4 text-emerald-400" />,
      run: () => {
        setIsCompareMode(true);
        router.push("/workspace");
      },
    },
    {
      id: "action-extension",
      label: "Open Chrome Extension Simulator",
      icon: <Chrome className="h-4 w-4 text-amber-400" />,
      run: () => {
        router.push("/extension");
      },
    },
    {
      id: "action-settings",
      label: "Open Workspace Settings",
      icon: <Settings className="h-4 w-4 text-blue-400" />,
      run: () => {
        router.push("/settings");
      },
    },
    {
      id: "action-theme",
      label: `Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`,
      icon: theme === "dark" ? <Sun className="h-4 w-4 text-amber-300" /> : <Moon className="h-4 w-4 text-indigo-400" />,
      run: () => {
        setTheme(theme === "dark" ? "light" : "dark");
      },
    },
  ].filter((a) => a.label.toLowerCase().includes(q));

  const totalItems = matchingConversations.length + matchingModels.length + actions.length;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsCommandPaletteOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (totalItems > 0 ? (prev + 1) % totalItems : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (totalItems > 0 ? (prev - 1 + totalItems) % totalItems : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      executeSelected();
    }
  };

  const executeSelected = () => {
    let index = 0;

    // Check actions first
    for (const a of actions) {
      if (index === selectedIndex) {
        a.run();
        setIsCommandPaletteOpen(false);
        return;
      }
      index++;
    }

    // Check conversations
    for (const c of matchingConversations) {
      if (index === selectedIndex) {
        setActiveConversationId(c.id);
        router.push("/workspace");
        setIsCommandPaletteOpen(false);
        return;
      }
      index++;
    }

    // Check models
    for (const m of matchingModels) {
      if (index === selectedIndex) {
        setActiveModelId(m.id);
        setIsCommandPaletteOpen(false);
        return;
      }
      index++;
    }

    setIsCommandPaletteOpen(false);
  };

  let globalCounter = 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 p-4"
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsCommandPaletteOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Palette Container */}
      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl transition-all">
        {/* Search Input Bar */}
        <div className="flex items-center border-b border-border/80 px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command, search chats, or switch models..."
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setIsCommandPaletteOpen(false)}
            className="rounded p-1 text-muted-foreground hover:bg-muted"
            aria-label="Close command palette"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-4">
          {totalItems === 0 && (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No results found for &ldquo;{query}&rdquo;
            </div>
          )}

          {/* Quick Actions Group */}
          {actions.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Quick Actions
              </div>
              <div className="mt-1 space-y-0.5">
                {actions.map((action) => {
                  const isCurrent = globalCounter++ === selectedIndex;
                  return (
                    <button
                      key={action.id}
                      type="button"
                      onClick={() => {
                        action.run();
                        setIsCommandPaletteOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs md:text-sm text-left transition-colors",
                        isCurrent
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        {action.icon}
                        <span>{action.label}</span>
                      </div>
                      <CornerDownLeft className="h-3 w-3 opacity-40" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Conversations Group */}
          {matchingConversations.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Recent Conversations
              </div>
              <div className="mt-1 space-y-0.5">
                {matchingConversations.map((conv) => {
                  const isCurrent = globalCounter++ === selectedIndex;
                  return (
                    <button
                      key={conv.id}
                      type="button"
                      onClick={() => {
                        setActiveConversationId(conv.id);
                        router.push("/workspace");
                        setIsCommandPaletteOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs md:text-sm text-left transition-colors",
                        isCurrent
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <MessageSquare className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="truncate">{conv.title}</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground shrink-0 uppercase">Chat</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* AI Models Group */}
          {matchingModels.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Switch AI Model
              </div>
              <div className="mt-1 space-y-0.5">
                {matchingModels.map((model) => {
                  const isCurrent = globalCounter++ === selectedIndex;
                  const isActive = activeModelId === model.id;
                  return (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => {
                        setActiveModelId(model.id);
                        setIsCommandPaletteOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs md:text-sm text-left transition-colors",
                        isCurrent
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <ModelIcon provider={model.provider} size="sm" />
                        <span>{model.name}</span>
                        {isActive && (
                          <span className="text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                            Active
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-muted-foreground">{model.badge}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="flex items-center justify-between border-t border-border/60 bg-muted/30 px-4 py-2 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] border border-border">↑</kbd>{" "}
              <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] border border-border">↓</kbd> Navigate
            </span>
            <span>
              <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] border border-border">↵</kbd> Select
            </span>
            <span>
              <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] border border-border">ESC</kbd> Close
            </span>
          </div>
          <span className="font-mono text-[10px] text-primary">EchoGPT v1.0.5</span>
        </div>
      </div>
    </div>
  );
}
