"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { WorkspaceSidebar } from "./WorkspaceSidebar";
import { WorkspaceTopBar } from "./WorkspaceTopBar";
import { ChatMessageItem } from "./ChatMessageItem";
import { CompareResponsesView } from "./CompareResponsesView";
import { PromptComposer } from "./PromptComposer";
import { CommandPalette } from "@/components/shared/CommandPalette";
import { useApp } from "@/context/AppContext";
import { Sparkles, ArrowRight, AlertCircle, X, RotateCcw, Key } from "lucide-react";
import { QUICK_ACTIONS } from "@/data/mockData";
import { Button } from "@/components/ui/button";

export function WorkspaceLayout() {
  const {
    activeConversation,
    isCompareMode,
    isStreaming,
    sendMessage,
    activeModel,
    activePageContext,
    chatError,
    clearChatError,
    regenerateLastResponse,
  } = useApp();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [composerSeed, setComposerSeed] = useState<string>("");

  // Auto scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages, isStreaming]);

  const handleEditPrompt = (content: string) => {
    setComposerSeed(content);
  };

  const handleQuickPromptClick = (template: string) => {
    sendMessage(template);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground font-sans">
      {/* Sidebar Navigation */}
      <WorkspaceSidebar />

      {/* Main Chat Workspace Area */}
      <main id="main-content" className="flex flex-col flex-1 h-full min-w-0 overflow-hidden" role="main">
        <WorkspaceTopBar />

        {/* Global Error Banner (if error triggered or network failure) */}
        {chatError && (
          <div
            role="alert"
            className="border-b border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-xs text-rose-600 dark:text-rose-400 flex items-center justify-between gap-3 shrink-0 animate-in fade-in"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{chatError}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  clearChatError();
                  regenerateLastResponse();
                }}
                className="h-6 text-[11px] gap-1 border-rose-500/40 hover:bg-rose-500/10 text-rose-600 dark:text-rose-400"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Retry</span>
              </Button>
              <Link href="/settings">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-6 text-[11px] gap-1 border-border"
                >
                  <Key className="h-3 w-3" />
                  <span>Configure BYOK</span>
                </Button>
              </Link>
              <button
                type="button"
                onClick={clearChatError}
                className="p-1 rounded hover:bg-rose-500/20 text-rose-500"
                aria-label="Dismiss error"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Workspace Body: Compare Mode vs Standard Chat */}
        {isCompareMode ? (
          <div className="flex-1 overflow-hidden flex flex-col">
            <CompareResponsesView />
            <PromptComposer
              initialPrompt={composerSeed}
              onPromptChange={() => setComposerSeed("")}
            />
          </div>
        ) : (
          <div className="flex-1 overflow-hidden flex flex-col">
            {/* Messages Scroll Area */}
            <div
              className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-4"
              role="log"
              aria-live="polite"
              aria-label="Chat messages history"
            >
              {!activeConversation || activeConversation.messages.length === 0 ? (
                /* Empty Chat State */
                <div className="h-full flex flex-col items-center justify-center text-center max-w-xl mx-auto py-8 sm:py-12 space-y-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-sm">
                    <Sparkles className="h-6 w-6" />
                  </div>

                  <div className="space-y-1.5">
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-sans">
                      Start chatting with {activeModel.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                      Switch models anytime without losing context, attach active webpage knowledge, or enable <strong>Compare Mode</strong> to evaluate frontier models side-by-side.
                    </p>
                  </div>

                  {/* Suggestion Starter Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full text-left pt-2">
                    {QUICK_ACTIONS.slice(0, 4).map((action) => (
                      <button
                        key={action.id}
                        type="button"
                        onClick={() =>
                          handleQuickPromptClick(action.template(activePageContext))
                        }
                        className="rounded-xl border border-border bg-card p-3.5 hover:border-primary/50 hover:bg-muted/40 transition-all space-y-1 text-left group shadow-xs focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <div className="flex items-center justify-between text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                          <span>{action.label}</span>
                          <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-[11px] text-muted-foreground line-clamp-2">
                          {action.description}
                        </p>
                      </button>
                    ))}
                  </div>

                  {/* Keyboard shortcut tip */}
                  <div className="pt-2 text-[11px] text-muted-foreground flex items-center justify-center gap-2 font-mono">
                    <span>Press <kbd className="rounded bg-muted px-1.5 py-0.5 border border-border text-[10px]">Cmd+K</kbd> for command palette</span>
                    <span>·</span>
                    <span><kbd className="rounded bg-muted px-1.5 py-0.5 border border-border text-[10px]">Ctrl+Shift+E</kbd> for side panel</span>
                  </div>
                </div>
              ) : (
                /* Chat Messages List */
                <div className="max-w-4xl mx-auto space-y-2">
                  {activeConversation.messages.map((message) => (
                    <ChatMessageItem
                      key={message.id}
                      message={message}
                      onEditPrompt={handleEditPrompt}
                    />
                  ))}

                  {/* Typing Indicator while waiting for stream start */}
                  {isStreaming && (
                    <div
                      aria-live="polite"
                      className="flex items-center gap-2 text-xs text-muted-foreground py-2 pl-12 animate-pulse"
                    >
                      <div className="h-2 w-2 rounded-full bg-primary animate-ping" />
                      <span>{activeModel.shortName} is generating response...</span>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Bottom Prompt Composer */}
            <PromptComposer
              initialPrompt={composerSeed}
              onPromptChange={() => setComposerSeed("")}
            />
          </div>
        )}
      </main>

      {/* Global Command Palette */}
      <CommandPalette />
    </div>
  );
}
