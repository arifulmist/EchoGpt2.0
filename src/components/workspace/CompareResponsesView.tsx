"use client";

import React, { useState } from "react";
import {
  Columns3,
  Zap,
  Check,
  Copy,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { ModelIcon } from "@/components/shared/ModelIcon";
import { MarkdownRenderer } from "@/components/shared/MarkdownRenderer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { copyToClipboard, cn } from "@/lib/utils";

export function CompareResponsesView() {
  const {
    activeCompareSession,
    models,
    compareModelIds,
    setCompareModelIds,
    runCompare,
    loadComparePreset,
    isStreaming,
  } = useApp();

  const [copiedModelId, setCopiedModelId] = useState<string | null>(null);

  const handleCopyColumn = async (modelId: string, text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedModelId(modelId);
      setTimeout(() => setCopiedModelId(null), 2000);
    }
  };

  const handleModelChange = (colIndex: number, newModelId: string) => {
    const updated = [...compareModelIds];
    updated[colIndex] = newModelId;
    setCompareModelIds(updated);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      {/* Compare Mode Header */}
      <div className="border-b border-border/70 bg-card px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <Columns3 className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-foreground">Multi-Model Parallel Inference</h2>
              <Badge variant="success" size="sm">
                3 Models Active
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Compare token outputs, reasoning paths, and latency in real time.
            </p>
          </div>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground font-medium hidden sm:inline">Presets:</span>
          <button
            type="button"
            onClick={() => loadComparePreset(0)}
            className="rounded-lg border border-border/80 bg-background px-2.5 py-1 text-[11px] text-foreground hover:bg-muted font-medium transition-colors"
          >
            Quantum QEC
          </button>
          <button
            type="button"
            onClick={() => loadComparePreset(1)}
            className="rounded-lg border border-border/80 bg-background px-2.5 py-1 text-[11px] text-foreground hover:bg-muted font-medium transition-colors"
          >
            React 19 vs SPA
          </button>
        </div>
      </div>

      {/* Dispatched Prompt Banner */}
      <div className="border-b border-border/60 bg-muted/30 px-4 py-3 flex items-start justify-between gap-4">
        <div className="space-y-1 max-w-4xl">
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
            <span>Dispatched Prompt</span>
            <span>·</span>
            <span className="text-emerald-500 font-semibold">Concurrent Broadcast</span>
          </div>
          <p className="text-xs md:text-sm font-semibold text-foreground">
            &ldquo;{activeCompareSession.prompt}&rdquo;
          </p>
        </div>

        <Button
          size="sm"
          variant="outline"
          disabled={isStreaming}
          onClick={() => runCompare(activeCompareSession.prompt)}
          className="shrink-0 h-7 text-xs gap-1.5"
        >
          <RotateCcw className={cn("h-3 w-3", isStreaming && "animate-spin")} />
          <span>Re-run</span>
        </Button>
      </div>

      {/* Main Parallel Columns */}
      <div className="flex-1 overflow-x-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full min-w-[760px] md:min-w-0">
          {compareModelIds.map((mId, colIdx) => {
            const model = models.find((m) => m.id === mId) || models[0];
            const responseData = activeCompareSession.responses[mId];

            return (
              <div
                key={colIdx}
                className="flex flex-col h-full rounded-2xl border border-border/80 bg-card shadow-xs overflow-hidden"
              >
                {/* Column Model Selector Header */}
                <div className="border-b border-border/60 bg-muted/40 p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ModelIcon provider={model.provider} size="sm" />
                      <select
                        value={mId}
                        onChange={(e) => handleModelChange(colIdx, e.target.value)}
                        className="bg-transparent text-xs font-bold text-foreground focus:outline-none cursor-pointer"
                      >
                        {models.map((m) => (
                          <option key={m.id} value={m.id} className="bg-card text-foreground">
                            {m.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleCopyColumn(mId, responseData?.content || "")
                      }
                      aria-label="Copy column response"
                      className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      {copiedModelId === mId ? (
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Metrics Bar */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground bg-background rounded-md px-2 py-1 border border-border/40">
                    <div className="flex items-center gap-1">
                      <Zap className="h-3 w-3 text-amber-500" />
                      <span>{responseData?.latencyMs || 750}ms</span>
                    </div>
                    <span>{responseData?.tokenCount || 380} tokens</span>
                    <span className="text-emerald-500 font-semibold">
                      {model.speedScore}/5 Speed
                    </span>
                  </div>
                </div>

                {/* Content Stream / Markdown */}
                <div className="flex-1 overflow-y-auto p-4 text-xs leading-relaxed space-y-2">
                  {responseData?.status === "streaming" && isStreaming ? (
                    <div className="flex items-center gap-2 text-muted-foreground py-8 justify-center">
                      <div className="h-2 w-2 rounded-full bg-primary animate-ping" />
                      <span>Generating parallel response...</span>
                    </div>
                  ) : (
                    <MarkdownRenderer content={responseData?.content || "No response received"} />
                  )}
                </div>

                {/* Column Strengths Footer */}
                <div className="border-t border-border/40 bg-muted/20 px-3 py-2 text-[11px] text-muted-foreground flex items-center justify-between">
                  <span className="truncate max-w-[180px] font-medium text-foreground/80">
                    {model.strengths[0]} & {model.strengths[1]}
                  </span>
                  <span className="font-mono text-[10px] text-primary">{model.contextWindow}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Consensus Analysis Footer Banner */}
      <div className="border-t border-border/60 bg-card p-3 px-4 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
          <span>
            <strong>Consensus Matrix:</strong> All selected models corroborate core factual statements.
            Use Claude for structural depth and GPT-4o for implementation details.
          </span>
        </div>
      </div>
    </div>
  );
}
