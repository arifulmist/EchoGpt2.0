"use client";

import { ChromeIcon as Chrome } from "@/components/shared/ChromeIcon";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  Columns3,
  Globe,
  Star,
  Check,
  Command,
  Edit2,
  ChevronDown,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { ModelIcon } from "@/components/shared/ModelIcon";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageContextModal } from "./PageContextModal";
import { cn } from "@/lib/utils";

export function WorkspaceTopBar() {
  const {
    activeConversation,
    activeModel,
    models,
    setActiveModelId,
    isCompareMode,
    setIsCompareMode,
    activePageContext,
    isSidebarOpen,
    setIsSidebarOpen,
    setIsCommandPaletteOpen,
    toggleFavorite,
    renameConversation,
  } = useApp();

  const [isContextModalOpen, setIsContextModalOpen] = useState(false);
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(activeConversation?.title || "");
  const modelMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modelMenuRef.current && !modelMenuRef.current.contains(e.target as Node)) {
        setIsModelMenuOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModelMenuOpen(false);
        setIsEditingTitle(false);
      }
    };
    if (isModelMenuOpen || isEditingTitle) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isModelMenuOpen, isEditingTitle]);

  const handleTitleSave = () => {
    if (activeConversation && titleDraft.trim()) {
      renameConversation(activeConversation.id, titleDraft.trim());
    }
    setIsEditingTitle(false);
  };

  return (
    <>
      <header className="h-14 border-b border-border/70 bg-card px-4 flex items-center justify-between gap-3 shrink-0">
        {/* Left Section: Sidebar Toggle & Conversation Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground md:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Active Conversation Title */}
          {activeConversation && (
            <div className="flex items-center gap-2 min-w-0">
              {isEditingTitle ? (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={titleDraft}
                    onChange={(e) => setTitleDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleTitleSave();
                      if (e.key === "Escape") setIsEditingTitle(false);
                    }}
                    className="bg-background border border-primary rounded px-2 py-0.5 text-xs font-semibold text-foreground focus:outline-none"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={handleTitleSave}
                    className="p-1 text-emerald-500 hover:bg-muted rounded"
                  >
                    <Check className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => {
                    setTitleDraft(activeConversation.title);
                    setIsEditingTitle(true);
                  }}
                  className="group flex items-center gap-1.5 cursor-pointer min-w-0"
                  title="Click to rename"
                >
                  <h1 className="text-xs md:text-sm font-bold text-foreground truncate max-w-[200px] sm:max-w-xs md:max-w-sm">
                    {activeConversation.title}
                  </h1>
                  <Edit2 className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              )}

              <button
                type="button"
                onClick={() => toggleFavorite(activeConversation.id)}
                className="text-muted-foreground hover:text-amber-500 p-0.5 rounded"
                aria-label="Star conversation"
              >
                <Star
                  className={cn(
                    "h-3.5 w-3.5",
                    activeConversation.isFavorite && "fill-amber-500 text-amber-500"
                  )}
                />
              </button>
            </div>
          )}
        </div>

        {/* Center / Right Section: Context Badge, Compare Toggle, Model Picker, Tools */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Active Webpage Context Badge Button */}
          <button
            type="button"
            onClick={() => setIsContextModalOpen(true)}
            className="flex items-center gap-1.5 rounded-lg border border-border/80 bg-background/80 px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                activePageContext.enabled ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground"
              )}
            />
            <Globe className="h-3 w-3 text-emerald-500" />
            <span className="hidden sm:inline font-medium">{activePageContext.domain}</span>
            <span className="text-[10px] text-primary underline ml-0.5 hidden md:inline">Inspect</span>
          </button>

          {/* Compare AI Mode Switcher */}
          <button
            type="button"
            onClick={() => setIsCompareMode(!isCompareMode)}
            className={cn(
              "flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs transition-colors font-medium",
              isCompareMode
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-500 font-semibold"
                : "border-border/80 bg-background text-muted-foreground hover:text-foreground"
            )}
          >
            <Columns3 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Compare</span>
            <Badge variant={isCompareMode ? "success" : "outline"} size="sm" className="hidden sm:inline-flex">
              {isCompareMode ? "ON" : "OFF"}
            </Badge>
          </button>

          {/* Model Selector Trigger */}
          <div className="relative" ref={modelMenuRef}>
            <button
              type="button"
              onClick={() => setIsModelMenuOpen(!isModelMenuOpen)}
              aria-expanded={isModelMenuOpen}
              aria-haspopup="listbox"
              className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground hover:bg-muted transition-colors focus-visible:ring-1 focus-visible:ring-primary"
              aria-label="Select AI model"
            >
              <ModelIcon provider={activeModel.provider} size="sm" />
              <span className="hidden md:inline">{activeModel.shortName}</span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </button>

            {isModelMenuOpen && (
              <div
                role="listbox"
                aria-label="Select active model"
                className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-border bg-card p-1.5 shadow-xl z-50 animate-in fade-in slide-in-from-top-2"
              >
                <div className="px-2 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Active Model
                </div>
                <div className="space-y-0.5 mt-1 max-h-60 overflow-y-auto">
                  {models.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        setActiveModelId(m.id);
                        setIsModelMenuOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between rounded-lg px-2 py-1.5 text-xs text-left transition-colors",
                        activeModel.id === m.id
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <ModelIcon provider={m.provider} size="sm" />
                        <div>
                          <div className="font-medium">{m.name}</div>
                          <div className="text-[10px] text-muted-foreground">{m.badge}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Global Command Palette trigger */}
          <button
            type="button"
            onClick={() => setIsCommandPaletteOpen(true)}
            className="hidden sm:flex items-center gap-1 rounded-lg border border-border/70 bg-card px-2 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
            title="Open Command Palette (Cmd+K)"
          >
            <Command className="h-3 w-3" />
            <span className="font-mono text-[10px]">K</span>
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Link to Chrome Extension Simulator */}
          <Link href="/extension">
            <Button variant="outline" size="sm" className="hidden lg:flex gap-1.5 text-xs">
              <Chrome className="h-3.5 w-3.5 text-amber-500" />
              <span>Side Panel</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Page Context Inspection Modal */}
      <PageContextModal
        isOpen={isContextModalOpen}
        onClose={() => setIsContextModalOpen(false)}
      />
    </>
  );
}
