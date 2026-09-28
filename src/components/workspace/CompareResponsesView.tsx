"use client";

import React, { useState } from "react";
import {
  Columns3,
  Zap,
  Check,
  Copy,
  RotateCcw,
  CheckCircle2,
  GitBranch,
  Sparkles,
  Layers,
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
    branchFromCompare,
    isStreaming,
  } = useApp();

  const [copiedModelId, setCopiedModelId] = useState<string | null>(null);
  const [mobileActiveCol, setMobileActiveCol] = useState<number>(0);
  const [showConsensusDetail, setShowConsensusDetail] = useState<boolean>(false);

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
      <div className="border-b border-border bg-card px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <Columns3 className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-foreground">Multi-Model Parallel Inference</h2>
              <Badge variant="success" size="sm">
                3 Models Concurrent
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground hidden sm:block">
              Side-by-side token streaming, comparative reasoning depth, and latency benchmarks.
            </p>
          </div>
        </div>

        {/* Preset Selector & Action Buttons */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground font-medium hidden sm:inline">Presets:</span>
          <button
            type="button"
            onClick={() => loadComparePreset(0)}
            className="rounded-lg border border-border bg-background px-2.5 py-1 text-[11px] text-foreground hover:bg-muted font-medium transition-colors"
          >
            Quantum QEC
          </button>
          <button
            type="button"
            onClick={() => loadComparePreset(1)}
            className="rounded-lg border border-border bg-background px-2.5 py-1 text-[11px] text-foreground hover:bg-muted font-medium transition-colors"
          >
            React 19 vs SPA
          </button>
        </div>
      </div>

      {/* Dispatched Prompt Banner */}
      <div className="border-b border-border bg-muted/30 px-4 py-2.5 flex items-start justify-between gap-4 shrink-0">
        <div className="space-y-0.5 max-w-4xl">
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
            <span>Dispatched Prompt</span>
            <span>·</span>
            <span className="text-emerald-500 font-semibold">1 Query → 3 Parallel Endpoints</span>
          </div>
          <p className="text-xs md:text-sm font-semibold text-foreground line-clamp-2">
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
          <span>Re-run Parallel</span>
        </Button>
      </div>

      {/* Mobile Column Switcher (for small screens < 768px) */}
      <div className="md:hidden border-b border-border bg-card px-3 py-1.5 flex items-center justify-between text-xs">
        <span className="text-[11px] text-muted-foreground font-medium">Select Model View:</span>
        <div className="flex items-center gap-1">
          {compareModelIds.map((mId, idx) => {
            const m = models.find((mod) => mod.id === mId);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setMobileActiveCol(idx)}
                className={cn(
                  "px-2 py-0.5 rounded text-[11px] font-medium transition-colors",
                  mobileActiveCol === idx
                    ? "bg-primary text-primary-foreground font-bold"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {m?.shortName || `Col ${idx + 1}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Parallel Columns */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 h-full">
          {compareModelIds.map((mId, colIdx) => {
            const model = models.find((m) => m.id === mId) || models[0];
            const responseData = activeCompareSession.responses[mId];

            return (
              <div
                key={colIdx}
                className={cn(
                  "flex flex-col h-full rounded-2xl border border-border bg-card shadow-xs overflow-hidden transition-all",
                  // Mobile view collapse
                  colIdx !== mobileActiveCol && "hidden md:flex"
                )}
              >
                {/* Column Model Selector Header */}
                <div className="border-b border-border bg-muted/40 p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ModelIcon provider={model.provider} size="sm" />
                      <label htmlFor={`col-select-${colIdx}`} className="sr-only">
                        Select model for column {colIdx + 1}
                      </label>
                      <select
                        id={`col-select-${colIdx}`}
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

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyColumn(mId, responseData?.content || "")
                        }
                        aria-label={`Copy ${model.name} response`}
                        className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                      >
                        {copiedModelId === mId ? (
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Metrics Bar */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground bg-background rounded-md px-2 py-1 border border-border/50">
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
                <div className="flex-1 overflow-y-auto p-4 text-xs leading-relaxed space-y-2 min-h-[220px]">
                  {responseData?.status === "streaming" && isStreaming ? (
                    <div className="flex flex-col items-center justify-center text-muted-foreground py-12 space-y-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-primary animate-ping" />
                      <span className="text-xs">Generating parallel response...</span>
                    </div>
                  ) : (
                    <MarkdownRenderer content={responseData?.content || "No response received"} />
                  )}
                </div>

                {/* Column Action Footer: Branch to chat & Model capability */}
                <div className="border-t border-border bg-muted/20 p-2.5 flex items-center justify-between gap-2">
                  <span className="truncate text-[11px] text-muted-foreground font-medium">
                    {model.strengths[0]}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => branchFromCompare(mId)}
                    className="h-6 text-[11px] gap-1 px-2 text-primary border-primary/30 hover:bg-primary/10 shrink-0 font-medium"
                    title={`Continue chat with ${model.shortName}'s response`}
                  >
                    <GitBranch className="h-3 w-3" />
                    <span>Continue Chat</span>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Consensus Analysis Footer Banner */}
      <div className="border-t border-border bg-card px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-muted-foreground gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
          <span>
            <strong>Consensus Matrix:</strong> All 3 models corroborate core factual architecture.
            Claude 3.5 provides greatest formal depth; GPT-4o delivers concise implementation.
          </span>
        </div>

        <button
          type="button"
          onClick={() => setShowConsensusDetail(!showConsensusDetail)}
          className="text-primary hover:underline text-[11px] shrink-0 font-medium flex items-center gap-1 self-start sm:self-auto"
        >
          <Sparkles className="h-3 w-3" />
          <span>{showConsensusDetail ? "Hide Details" : "View Discrepancy Matrix"}</span>
        </button>
      </div>

      {/* Expanded Discrepancy Breakdown Drawer (if toggled) */}
      {showConsensusDetail && (
        <div className="border-t border-border bg-muted/30 px-4 py-3 text-xs space-y-2 shrink-0 animate-in fade-in">
          <div className="font-semibold text-foreground flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-primary" />
            <span>Nuance & Divergence Breakdown</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
            <div className="rounded-lg border border-border bg-card p-2">
              <span className="font-bold text-foreground block mb-0.5">GPT-4o:</span>
              <span className="text-muted-foreground">Focuses on rapid execution, concise trade-offs, and practical operational steps.</span>
            </div>
            <div className="rounded-lg border border-border bg-card p-2">
              <span className="font-bold text-foreground block mb-0.5">Claude 3.5 Sonnet:</span>
              <span className="text-muted-foreground">Focuses on deep formalisms, edge cases, invariants, and architectural proofs.</span>
            </div>
            <div className="rounded-lg border border-border bg-card p-2">
              <span className="font-bold text-foreground block mb-0.5">Gemini 1.5 Pro:</span>
              <span className="text-muted-foreground">Focuses on document ingestion, ecosystem context, and long-range system scaling.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
