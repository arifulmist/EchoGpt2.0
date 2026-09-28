"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Sparkles,
  Globe,
  Columns3,
  X,
  FileText,
  ChevronDown,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { ModelIcon } from "@/components/shared/ModelIcon";
import { QUICK_ACTIONS } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PromptComposerProps {
  initialPrompt?: string;
  onPromptChange?: (val: string) => void;
}

export function PromptComposer({ initialPrompt = "", onPromptChange }: PromptComposerProps) {
  const {
    sendMessage,
    isStreaming,
    models,
    activeModelId,
    setActiveModelId,
    isCompareMode,
    setIsCompareMode,
    runCompare,
    activePageContext,
    togglePageContextEnabled,
  } = useApp();

  const [prompt, setPrompt] = useState<string>(initialPrompt);
  const [modelDropdownOpen, setModelDropdownOpen] = useState<boolean>(false);
  const [webSearchEnabled, setWebSearchEnabled] = useState<boolean>(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
      }
    }
  }, [initialPrompt]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
    onPromptChange?.(e.target.value);

    // Auto-grow textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!prompt.trim() || isStreaming) return;
    const textToSend = prompt.trim();
    setPrompt("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    if (isCompareMode) {
      await runCompare(textToSend);
    } else {
      await sendMessage(textToSend);
    }
  };

  const handleQuickAction = (templateStr: string) => {
    setPrompt(templateStr);
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = "auto";
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
        }
      }, 20);
    }
  };

  const activeModel = models.find((m) => m.id === activeModelId) || models[0];

  return (
    <div className="w-full border-t border-border/80 bg-card p-3 md:p-4 space-y-3">
      {/* Quick Action Chips Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
        <span className="text-muted-foreground text-[11px] font-medium shrink-0 flex items-center gap-1 mr-1">
          <Sparkles className="h-3 w-3 text-primary" />
          <span>Quick:</span>
        </span>
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={() => handleQuickAction(action.template(activePageContext))}
            className="rounded-full border border-border/70 bg-background/80 px-2.5 py-1 text-[11px] text-muted-foreground hover:border-primary/40 hover:text-foreground hover:bg-muted/50 transition-colors shrink-0 flex items-center gap-1 font-medium"
          >
            <span>{action.label}</span>
          </button>
        ))}
      </div>

      {/* Main Composer Box */}
      <div className="relative rounded-2xl border border-border bg-background shadow-xs focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary transition-all">
        {/* Attached Page Context Pill (if enabled) */}
        {activePageContext.enabled && (
          <div className="flex items-center justify-between border-b border-border/50 bg-muted/30 px-3 py-1.5 text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <FileText className="h-3.5 w-3.5 text-primary shrink-0" />
              <span className="text-muted-foreground text-[11px]">Context Active:</span>
              <span className="font-medium text-foreground truncate max-w-[280px] sm:max-w-md text-[11px]">
                {activePageContext.title} ({activePageContext.domain})
              </span>
            </div>
            <button
              type="button"
              onClick={togglePageContextEnabled}
              className="text-muted-foreground hover:text-foreground p-0.5 rounded"
              aria-label="Remove page context"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* Text Input Area */}
        <textarea
          ref={textareaRef}
          rows={1}
          value={prompt}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={
            isCompareMode
              ? "Ask a question to compare parallel responses from GPT-4o, Claude 3.5, and Gemini 1.5..."
              : `Ask ${activeModel.shortName} anything, or use webpage context... (Shift+Enter for new line)`
          }
          className="w-full resize-none bg-transparent px-4 py-3 text-xs md:text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none min-h-[44px] max-h-[180px] leading-relaxed"
        />

        {/* Bottom Bar: Model Selector, Web Search, Attach, Send */}
        <div className="flex items-center justify-between px-3 py-2 border-t border-border/40 text-xs">
          {/* Left Controls */}
          <div className="flex items-center gap-2">
            {/* Model Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
                className="flex items-center gap-1.5 rounded-lg border border-border/70 bg-card px-2.5 py-1 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
                aria-label="Select AI model"
              >
                <ModelIcon provider={activeModel.provider} size="sm" />
                <span className="hidden sm:inline">{activeModel.name}</span>
                <span className="sm:hidden">{activeModel.shortName}</span>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </button>

              {/* Model Menu Dropdown */}
              {modelDropdownOpen && (
                <div className="absolute bottom-full left-0 mb-2 w-64 rounded-xl border border-border bg-card p-1.5 shadow-xl z-30 animate-in fade-in slide-in-from-bottom-2">
                  <div className="px-2 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Select AI Model
                  </div>
                  <div className="space-y-0.5 mt-1 max-h-56 overflow-y-auto">
                    {models.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          setActiveModelId(m.id);
                          setModelDropdownOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center justify-between rounded-lg px-2 py-1.5 text-xs text-left transition-colors",
                          activeModelId === m.id
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
                </div>
              )}
            </div>

            {/* Compare Mode Toggle */}
            <button
              type="button"
              onClick={() => setIsCompareMode(!isCompareMode)}
              className={cn(
                "hidden sm:flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs transition-colors",
                isCompareMode
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-500 font-semibold"
                  : "border-border/70 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Columns3 className="h-3.5 w-3.5" />
              <span>Compare</span>
            </button>

            {/* Web Search Toggle */}
            <button
              type="button"
              onClick={() => setWebSearchEnabled(!webSearchEnabled)}
              title={webSearchEnabled ? "Live web ground enabled" : "Web ground disabled"}
              className={cn(
                "flex items-center gap-1 rounded-lg p-1.5 transition-colors",
                webSearchEnabled
                  ? "text-blue-500 bg-blue-500/10"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              <Globe className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Right Controls: Send Button */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-muted-foreground hidden md:inline font-mono">
              ↵ Enter
            </span>
            <Button
              size="sm"
              disabled={!prompt.trim() || isStreaming}
              onClick={handleSubmit}
              className="gap-1.5 text-xs font-semibold px-3"
            >
              <span>{isCompareMode ? "Compare" : "Send"}</span>
              <Send className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
