"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Columns3,
  Sparkles,
  ArrowRight,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { ModelIcon } from "@/components/shared/ModelIcon";
import { MarkdownRenderer } from "@/components/shared/MarkdownRenderer";
import { COMPARE_PRESETS } from "@/data/mockData";
import { cn } from "@/lib/utils";

export function CompareShowcase() {
  const [activePresetIndex, setActivePresetIndex] = useState<number>(0);
  const [customPrompt, setCustomPrompt] = useState<string>("");

  const preset = COMPARE_PRESETS[activePresetIndex] || COMPARE_PRESETS[0];

  return (
    <section id="compare" className="py-20 md:py-28 border-t border-border/60 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500 border border-emerald-500/20">
            <Columns3 className="h-3.5 w-3.5" />
            <span>The Multi-Model Advantage</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground font-sans">
            Compare AI models in parallel.
            <br />
            <span className="text-muted-foreground font-normal text-2xl sm:text-3xl">
              Never rely on a single model&apos;s blind spots.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Different models excel at different things. GPT-4o provides rapid code generation,
            Claude 3.5 provides deep architectural nuance, and Gemini 1.5 offers massive context synthesis.
            EchoGPT lets you prompt them once and evaluate answers side-by-side.
          </p>
        </div>

        {/* Interactive Query Sandbox */}
        <div className="mx-auto max-w-5xl rounded-2xl border border-border/80 bg-card p-4 sm:p-6 shadow-xl space-y-6">
          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/60">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-muted-foreground font-medium">Sample Queries:</span>
              <button
                type="button"
                onClick={() => {
                  setActivePresetIndex(0);
                  setCustomPrompt("");
                }}
                className={cn(
                  "rounded-lg px-3 py-1 font-medium transition-colors",
                  activePresetIndex === 0 && !customPrompt
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                Quantum Error Correction
              </button>
              <button
                type="button"
                onClick={() => {
                  setActivePresetIndex(1);
                  setCustomPrompt("");
                }}
                className={cn(
                  "rounded-lg px-3 py-1 font-medium transition-colors",
                  activePresetIndex === 1 && !customPrompt
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                React 19 RSC vs Server Actions
              </button>
            </div>

            <Link href="/workspace">
              <span className="text-xs font-medium text-primary hover:underline flex items-center gap-1">
                <span>Compare all 8 models in Workspace</span>
                <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          </div>

          {/* Active Prompt Box */}
          <div className="relative rounded-xl border border-border bg-background p-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span className="font-semibold text-foreground uppercase tracking-wider text-[11px]">
                Dispatched Prompt
              </span>
              <span className="text-[11px] font-mono text-emerald-500">
                1 Query → 3 Concurrent LLM Streams
              </span>
            </div>
            <p className="text-sm font-medium text-foreground">
              {customPrompt || preset.prompt}
            </p>
          </div>

          {/* Parallel 3-Model Comparison Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {preset.selectedModelIds.map((modelId) => {
              const res = preset.responses[modelId];
              if (!res) return null;

              return (
                <div
                  key={modelId}
                  className="flex flex-col rounded-xl border border-border/80 bg-background/50 p-4 shadow-sm transition-all hover:border-primary/40 group"
                >
                  {/* Model Header */}
                  <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <ModelIcon modelId={modelId} size="md" />
                      <div>
                        <h3 className="text-xs font-bold text-foreground">
                          {modelId === "gpt-4o"
                            ? "OpenAI GPT-4o"
                            : modelId === "claude-3-5-sonnet"
                            ? "Claude 3.5 Sonnet"
                            : modelId === "gemini-1-5-pro"
                            ? "Gemini 1.5 Pro"
                            : "DeepSeek V2.5"}
                        </h3>
                        <p className="text-[10px] text-muted-foreground">
                          {res.strengthsHighlight}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Latency and Metrics Bar */}
                  <div className="flex items-center justify-between rounded-lg bg-muted/60 px-2.5 py-1 text-[11px] font-mono text-muted-foreground mb-3">
                    <div className="flex items-center gap-1.5">
                      <Zap className="h-3 w-3 text-amber-500" />
                      <span>{res.latencyMs}ms</span>
                    </div>
                    <span>{res.tokenCount} tokens</span>
                    <span className="text-emerald-500 font-semibold">Done</span>
                  </div>

                  {/* Rendered Response Content */}
                  <div className="flex-1 text-xs text-foreground/90 overflow-y-auto max-h-[340px] pr-1">
                    <MarkdownRenderer content={res.content} />
                  </div>

                  {/* Model Strengths Tag */}
                  <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1 text-primary font-medium">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Verified Synthesis</span>
                    </span>
                    <Link
                      href="/workspace"
                      className="text-muted-foreground hover:text-foreground underline text-[10px]"
                    >
                      Branch Chat →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cross-Model Consensus Analysis Card */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs text-muted-foreground space-y-2">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>EchoGPT Cross-Model Consensus Matrix</span>
            </div>
            <p className="leading-relaxed">
              <strong>Consensus:</strong> All three models agree on the core mechanics and trade-offs.{" "}
              <strong>Nuance divergence:</strong> Claude 3.5 Sonnet emphasized deep mathematical stabilizer code formalisms;
              GPT-4o provided direct operational formulas; Gemini 1.5 Pro contextualized industrial scaling roadmaps.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
