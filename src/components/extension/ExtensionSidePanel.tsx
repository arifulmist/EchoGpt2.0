"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Send,
  Sparkles,
  Highlighter,
  FileText,
  History,
  Settings,
  Plus,
  ChevronDown,
  Globe,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Logo } from "@/components/shared/Logo";
import { ModelIcon } from "@/components/shared/ModelIcon";
import { MarkdownRenderer } from "@/components/shared/MarkdownRenderer";
import { Button } from "@/components/ui/button";
import { ExtensionSettingsDrawer } from "./ExtensionSettingsDrawer";
import { ExtensionHistoryDrawer } from "./ExtensionHistoryDrawer";
import { ExtensionAuthModal } from "./ExtensionAuthModal";
import { cn } from "@/lib/utils";

interface ExtensionSidePanelProps {
  className?: string;
}

export function ExtensionSidePanel({ className }: ExtensionSidePanelProps) {
  const {
    activeConversation,
    activeModel,
    models,
    setActiveModelId,
    sendMessage,
    isStreaming,
    activePageContext,
    togglePageContextEnabled,
    createNewConversation,
  } = useApp();

  const [prompt, setPrompt] = useState<string>("");
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages, isStreaming]);

  // Close dropdown on outside click or Escape
  const closeDropdown = useCallback(() => {
    setIsModelDropdownOpen(false);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDropdown();
    };

    if (isModelDropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isModelDropdownOpen, closeDropdown]);

  const handleSend = () => {
    if (!prompt.trim() || isStreaming) return;
    const text = prompt.trim();
    setPrompt("");
    sendMessage(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSummarizePage = () => {
    sendMessage(
      `Summarize the key findings and conclusions of the active webpage "${activePageContext.title}" (${activePageContext.domain}) in 3 punchy points.`
    );
  };

  const handleExplainSelection = () => {
    if (activePageContext.selectedText) {
      sendMessage(
        `Explain the following highlighted passage from "${activePageContext.title}":\n\n"${activePageContext.selectedText}"\n\nProvide the core intuition and practical significance.`
      );
    } else {
      sendMessage("Explain the primary technical concept discussed on this webpage in clear, accessible terms.");
    }
  };

  return (
    <div
      className={cn(
        "relative flex flex-col h-full w-full max-w-[420px] bg-card border border-border shadow-2xl overflow-hidden font-sans",
        className
      )}
      role="region"
      aria-label="EchoGPT Chrome Side Panel"
    >
      {/* 1. Header Toolbar */}
      <header className="flex items-center justify-between border-b border-border px-3 py-2 bg-muted/40 shrink-0">
        <div className="flex items-center gap-2">
          <Logo size="sm" asLink={false} badgeText="v1.0.5" />
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1">
          {/* New Chat */}
          <button
            type="button"
            onClick={() => createNewConversation()}
            className="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus-visible:ring-1 focus-visible:ring-primary"
            title="Start New Thread"
            aria-label="New Thread"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>

          {/* History */}
          <button
            type="button"
            onClick={() => setIsHistoryOpen(true)}
            className="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus-visible:ring-1 focus-visible:ring-primary"
            title="Session History"
            aria-label="History"
          >
            <History className="h-3.5 w-3.5" />
          </button>

          {/* Settings */}
          <button
            type="button"
            onClick={() => setIsSettingsOpen(true)}
            className="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus-visible:ring-1 focus-visible:ring-primary"
            title="Side Panel Settings"
            aria-label="Settings"
          >
            <Settings className="h-3.5 w-3.5" />
          </button>

          {/* User Account / Auth */}
          <button
            type="button"
            onClick={() => setIsAuthOpen(true)}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500 font-bold text-[10px] border border-emerald-500/30 hover:scale-105 transition-transform ml-1 focus-visible:ring-1 focus-visible:ring-primary"
            title="Account Session"
            aria-label="Account"
          >
            EG
          </button>
        </div>
      </header>

      {/* 2. Model Switcher & Webpage Context Bar */}
      <div className="border-b border-border bg-background/80 px-3 py-2 space-y-1.5 shrink-0">
        {/* Model Selector Bar */}
        <div className="flex items-center justify-between">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
              aria-expanded={isModelDropdownOpen}
              aria-haspopup="listbox"
              className="flex items-center gap-1.5 rounded-md border border-border bg-card px-2 py-1 text-[11px] font-semibold text-foreground hover:bg-muted focus-visible:ring-1 focus-visible:ring-primary"
            >
              <ModelIcon provider={activeModel.provider} size="sm" />
              <span>{activeModel.shortName}</span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </button>

            {isModelDropdownOpen && (
              <div
                role="listbox"
                aria-label="Side panel model selector"
                className="absolute top-full left-0 mt-1 w-52 rounded-xl border border-border bg-card p-1 shadow-xl z-20 animate-in fade-in"
              >
                {models.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    role="option"
                    aria-selected={activeModel.id === m.id}
                    onClick={() => {
                      setActiveModelId(m.id);
                      setIsModelDropdownOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center justify-between rounded-lg px-2 py-1.5 text-xs text-left",
                      activeModel.id === m.id
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <ModelIcon provider={m.provider} size="sm" />
                      <span>{m.shortName}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">{m.speed}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono">
            <kbd className="rounded bg-muted px-1.5 py-0.5 border border-border font-bold">
              Ctrl+Shift+E
            </kbd>
          </div>
        </div>

        {/* Page Context Capsule */}
        <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-2.5 py-1 text-xs">
          <div className="flex items-center gap-1.5 min-w-0">
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full shrink-0",
                activePageContext.enabled ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground"
              )}
            />
            <Globe className="h-3 w-3 text-emerald-500 shrink-0" />
            <span className="font-semibold text-foreground truncate text-[11px]">
              {activePageContext.domain}
            </span>
          </div>

          <button
            type="button"
            onClick={togglePageContextEnabled}
            className="text-[10px] text-primary hover:underline shrink-0 ml-2 font-medium"
          >
            {activePageContext.enabled ? "Context Active" : "Enable"}
          </button>
        </div>
      </div>

      {/* 3. Quick Action Chips Toolbar */}
      <div
        className="flex items-center gap-1.5 overflow-x-auto px-3 py-1.5 border-b border-border bg-card text-xs no-scrollbar shrink-0"
        role="toolbar"
        aria-label="Side panel actions"
      >
        <button
          type="button"
          onClick={handleSummarizePage}
          disabled={isStreaming}
          className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[10px] text-foreground hover:border-primary/50 hover:bg-muted transition-colors shrink-0 flex items-center gap-1 font-medium focus-visible:ring-1 focus-visible:ring-primary"
        >
          <FileText className="h-2.5 w-2.5 text-emerald-500" />
          <span>Summarize Page</span>
        </button>

        <button
          type="button"
          onClick={handleExplainSelection}
          disabled={isStreaming}
          className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[10px] text-foreground hover:border-primary/50 hover:bg-muted transition-colors shrink-0 flex items-center gap-1 font-medium focus-visible:ring-1 focus-visible:ring-primary"
        >
          <Highlighter className="h-2.5 w-2.5 text-amber-500" />
          <span>Explain Selected</span>
        </button>

        <button
          type="button"
          onClick={() =>
            sendMessage(
              `Rewrite this passage with maximum clarity and professional conciseness: "${activePageContext.selectedText || activePageContext.excerpt}"`
            )
          }
          disabled={isStreaming}
          className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[10px] text-foreground hover:border-primary/50 hover:bg-muted transition-colors shrink-0 flex items-center gap-1 font-medium focus-visible:ring-1 focus-visible:ring-primary"
        >
          <Sparkles className="h-2.5 w-2.5 text-blue-500" />
          <span>Rewrite</span>
        </button>
      </div>

      {/* 4. Chat Messages Scroll Area */}
      <div
        className="flex-1 overflow-y-auto p-3 space-y-3"
        role="log"
        aria-live="polite"
        aria-label="Extension conversation"
      >
        {!activeConversation || activeConversation.messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center py-8 px-3 space-y-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-foreground">
                EchoGPT Side Panel Ready
              </h3>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Click <strong>&ldquo;Summarize Page&rdquo;</strong> to ingest the active tab or highlight text on the webpage to explain it.
              </p>
            </div>

            <div className="w-full space-y-1.5 pt-1">
              <button
                type="button"
                onClick={handleSummarizePage}
                className="w-full text-left rounded-lg border border-border bg-card p-2 text-[11px] text-foreground hover:border-primary/40 hover:bg-muted transition-all flex items-center justify-between"
              >
                <span>⚡ Summarize {activePageContext.domain}</span>
                <span className="text-[10px] text-primary font-medium">Run</span>
              </button>
              <button
                type="button"
                onClick={handleExplainSelection}
                className="w-full text-left rounded-lg border border-border bg-card p-2 text-[11px] text-foreground hover:border-primary/40 hover:bg-muted transition-all flex items-center justify-between"
              >
                <span>🔍 Explain Highlighted Section</span>
                <span className="text-[10px] text-primary font-medium">Run</span>
              </button>
            </div>
          </div>
        ) : (
          activeConversation.messages.map((msg) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={msg.id}
                className={cn(
                  "flex flex-col space-y-1 text-xs",
                  isUser ? "items-end" : "items-start"
                )}
              >
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground px-1">
                  {!isUser && (
                    <span className="font-semibold text-foreground">
                      {activeModel.shortName}
                    </span>
                  )}
                  {msg.metrics && (
                    <span className="font-mono text-[9px] text-emerald-500">
                      {msg.metrics.latencyMs}ms
                    </span>
                  )}
                </div>

                <div
                  className={cn(
                    "rounded-xl p-3 text-xs leading-relaxed max-w-[92%]",
                    isUser
                      ? "bg-primary text-primary-foreground rounded-tr-xs"
                      : "bg-muted/60 text-foreground border border-border rounded-tl-xs"
                  )}
                >
                  <MarkdownRenderer content={msg.content} />
                  {msg.isStreaming && (
                    <span className="inline-block h-3 w-1 bg-primary ml-1 animate-pulse align-middle" />
                  )}
                </div>
              </div>
            );
          })
        )}

        {isStreaming && (
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground pl-2 animate-pulse">
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
            <span>Streaming synthesis...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 5. Compact Bottom Composer */}
      <footer className="border-t border-border bg-card p-2.5 shrink-0 space-y-2">
        <div className="relative rounded-xl border border-border bg-background shadow-xs focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all">
          <label htmlFor="side-panel-input" className="sr-only">
            Ask about this page
          </label>
          <textarea
            id="side-panel-input"
            rows={1}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about this page or type prompt..."
            className="w-full resize-none bg-transparent px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none min-h-[36px] max-h-[100px]"
          />

          <div className="flex items-center justify-between px-2.5 py-1 border-t border-border/40">
            <span className="text-[10px] text-muted-foreground font-mono">
              ↵ Enter
            </span>
            <Button
              size="icon-sm"
              disabled={!prompt.trim() || isStreaming}
              onClick={handleSend}
              className="h-6 w-6"
              aria-label="Send query"
            >
              <Send className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </footer>

      {/* Overlays / Drawers */}
      <ExtensionSettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
      <ExtensionHistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />
      <ExtensionAuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        isLoggedIn={isLoggedIn}
        onLoginSuccess={() => setIsLoggedIn(true)}
        onLogout={() => setIsLoggedIn(false)}
      />
    </div>
  );
}
