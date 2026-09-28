"use client";

import React, { useRef, useEffect, useState } from "react";
import { WorkspaceSidebar } from "./WorkspaceSidebar";
import { WorkspaceTopBar } from "./WorkspaceTopBar";
import { ChatMessageItem } from "./ChatMessageItem";
import { CompareResponsesView } from "./CompareResponsesView";
import { PromptComposer } from "./PromptComposer";
import { CommandPalette } from "@/components/shared/CommandPalette";
import { useApp } from "@/context/AppContext";
import { Sparkles, ArrowRight } from "lucide-react";
import { QUICK_ACTIONS } from "@/data/mockData";

export function WorkspaceLayout() {
  const {
    activeConversation,
    isCompareMode,
    isStreaming,
    sendMessage,
    activeModel,
    activePageContext,
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
      <div className="flex flex-col flex-1 h-full min-w-0 overflow-hidden">
        <WorkspaceTopBar />

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
            <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-4">
              {!activeConversation || activeConversation.messages.length === 0 ? (
                /* Empty Chat State */
                <div className="h-full flex flex-col items-center justify-center text-center max-w-xl mx-auto py-12 space-y-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 text-primary border border-primary/30 shadow-lg">
                    <Sparkles className="h-7 w-7" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                      How can EchoGPT help your workflow?
                    </h2>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                      You are chatting with <strong>{activeModel.name}</strong>. Switch models anytime,
                      inject active webpage context, or toggle <strong>Compare Mode</strong> to evaluate answers in parallel.
                    </p>
                  </div>

                  {/* Suggestion Starter Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full text-left">
                    {QUICK_ACTIONS.slice(0, 4).map((action) => (
                      <div
                        key={action.id}
                        onClick={() =>
                          handleQuickPromptClick(action.template(activePageContext))
                        }
                        className="cursor-pointer rounded-xl border border-border/80 bg-card p-3.5 hover:border-primary/50 hover:bg-muted/40 transition-all space-y-1 shadow-xs group"
                      >
                        <div className="flex items-center justify-between text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                          <span>{action.label}</span>
                          <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-[11px] text-muted-foreground line-clamp-2">
                          {action.description}
                        </p>
                      </div>
                    ))}
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
                    <div className="flex items-center gap-2 text-xs text-muted-foreground py-2 pl-12 animate-pulse">
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
      </div>

      {/* Global Command Palette */}
      <CommandPalette />
    </div>
  );
}
