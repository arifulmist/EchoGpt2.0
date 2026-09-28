"use client";

import React, { useState } from "react";
import {
  Copy,
  Check,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  Columns3,
  User,
  Zap,
  Edit3,
} from "lucide-react";
import { ChatMessage, AIModel } from "@/types";
import { ModelIcon } from "@/components/shared/ModelIcon";
import { MarkdownRenderer } from "@/components/shared/MarkdownRenderer";
import { copyToClipboard, formatTime, cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";

interface ChatMessageItemProps {
  message: ChatMessage;
  onEditPrompt?: (content: string) => void;
}

export function ChatMessageItem({ message, onEditPrompt }: ChatMessageItemProps) {
  const {
    models,
    regenerateLastResponse,
    setMessageReaction,
    setIsCompareMode,
    runCompare,
  } = useApp();

  const [copied, setCopied] = useState<boolean>(false);

  const model: AIModel | undefined = models.find((m) => m.id === message.modelId);
  const isUser = message.role === "user";

  const handleCopy = async () => {
    const success = await copyToClipboard(message.content);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCompareClick = () => {
    setIsCompareMode(true);
    runCompare(message.content);
  };

  return (
    <div
      className={cn(
        "group relative flex w-full gap-3 py-4 transition-colors",
        isUser ? "justify-end" : "justify-start border-b border-border/40"
      )}
    >
      {/* Assistant Avatar */}
      {!isUser && (
        <div className="shrink-0 mt-0.5">
          <ModelIcon provider={model?.provider} modelId={message.modelId} size="md" />
        </div>
      )}

      {/* Message Content Container */}
      <div
        className={cn(
          "flex flex-col space-y-2 max-w-[88%] md:max-w-[82%]",
          isUser && "items-end"
        )}
      >
        {/* Header Metadata */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {isUser ? (
            <>
              {message.pageContextSnippet && (
                <span className="rounded bg-primary/10 border border-primary/20 px-2 py-0.5 text-[10px] text-primary font-medium">
                  Context: {message.pageContextSnippet}
                </span>
              )}
              <span className="font-medium text-foreground">You</span>
              <span>·</span>
              <span className="text-[11px] font-mono">{formatTime(message.timestamp)}</span>
            </>
          ) : (
            <>
              <span className="font-semibold text-foreground">
                {model?.name || "EchoGPT Assistant"}
              </span>
              <span>·</span>
              <span className="text-[11px] font-mono">{formatTime(message.timestamp)}</span>

              {/* Performance Metrics */}
              {message.metrics && !message.isStreaming && (
                <div className="hidden sm:flex items-center gap-1.5 rounded-md bg-muted px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
                  <Zap className="h-2.5 w-2.5 text-amber-500" />
                  <span>{message.metrics.latencyMs}ms</span>
                  <span>·</span>
                  <span>{message.metrics.tokenCount} tok</span>
                  <span>·</span>
                  <span>{message.metrics.tokensPerSec} tok/s</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Message Bubble Body */}
        <div
          className={cn(
            "rounded-2xl text-xs md:text-sm leading-relaxed transition-all",
            isUser
              ? "bg-primary text-primary-foreground p-3.5 shadow-sm rounded-tr-xs"
              : "bg-card text-card-foreground p-4 border border-border/70 rounded-tl-xs shadow-xs"
          )}
        >
          {isUser ? (
            <div className="whitespace-pre-wrap">{message.content}</div>
          ) : (
            <div>
              <MarkdownRenderer content={message.content} />
              {message.isStreaming && (
                <span className="inline-block h-3.5 w-1.5 bg-primary ml-1 animate-pulse align-middle" />
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div
          className={cn(
            "flex items-center gap-1 text-muted-foreground text-xs opacity-0 group-hover:opacity-100 transition-opacity",
            isUser ? "justify-end" : "justify-start"
          )}
        >
          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy message text"
            className="flex items-center gap-1 rounded-md p-1 hover:bg-muted hover:text-foreground transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-[11px] text-emerald-500">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span className="text-[11px]">Copy</span>
              </>
            )}
          </button>

          {/* User Message Edit Option */}
          {isUser && onEditPrompt && (
            <button
              type="button"
              onClick={() => onEditPrompt(message.content)}
              aria-label="Edit prompt"
              className="flex items-center gap-1 rounded-md p-1 hover:bg-muted hover:text-foreground transition-colors"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span className="text-[11px]">Edit</span>
            </button>
          )}

          {/* Assistant Specific Actions */}
          {!isUser && !message.isStreaming && (
            <>
              {/* Regenerate */}
              <button
                type="button"
                onClick={regenerateLastResponse}
                aria-label="Regenerate response"
                className="flex items-center gap-1 rounded-md p-1 hover:bg-muted hover:text-foreground transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span className="text-[11px]">Regenerate</span>
              </button>

              {/* Compare Mode Shortcut */}
              <button
                type="button"
                onClick={handleCompareClick}
                aria-label="Compare with other models"
                className="flex items-center gap-1 rounded-md p-1 hover:bg-muted hover:text-foreground transition-colors"
              >
                <Columns3 className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-[11px]">Compare</span>
              </button>

              {/* Feedback Up/Down */}
              <div className="flex items-center ml-2 border-l border-border/80 pl-2 gap-1">
                <button
                  type="button"
                  onClick={() =>
                    setMessageReaction(
                      message.id,
                      message.reaction === "up" ? null : "up"
                    )
                  }
                  aria-label="Good response"
                  className={cn(
                    "rounded p-1 hover:bg-muted hover:text-foreground",
                    message.reaction === "up" && "text-emerald-500"
                  )}
                >
                  <ThumbsUp className="h-3 w-3" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setMessageReaction(
                      message.id,
                      message.reaction === "down" ? null : "down"
                    )
                  }
                  aria-label="Poor response"
                  className={cn(
                    "rounded p-1 hover:bg-muted hover:text-foreground",
                    message.reaction === "down" && "text-rose-500"
                  )}
                >
                  <ThumbsDown className="h-3 w-3" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="shrink-0 mt-0.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary border border-primary/30">
            <User className="h-4 w-4" />
          </div>
        </div>
      )}
    </div>
  );
}
