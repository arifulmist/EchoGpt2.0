"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Columns3,
  Bot,
  Send,
  ArrowUpRight,
  Clock,
  Sparkles,
  Zap,
} from "lucide-react";
import { ModelIcon } from "@/components/shared/ModelIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AI_MODELS } from "@/data/mockData";
import { cn } from "@/lib/utils";

export function InteractiveProductPreview() {
  const [activeTab, setActiveTab] = useState<"chat" | "compare">("compare");
  const [selectedModelId, setSelectedModelId] = useState<string>("gpt-4o");
  const [activePromptIndex, setActivePromptIndex] = useState<number>(0);
  const [customQuery, setCustomQuery] = useState<string>("");
  const [inputVal, setInputVal] = useState<string>("");
  const [isSimulatingStream, setIsSimulatingStream] = useState<boolean>(false);

  const samplePrompts = [
    {
      label: "Quantum Error Correction",
      query: "How does distance-7 surface code suppress quantum decoherence below threshold?",
      gptResponse:
        "Distance-7 surface codes distribute 1 logical qubit across 97 physical qubits. Because physical gate errors (0.12%) remain below the ~1% fault-tolerance threshold, each increase in code distance quadratically suppresses logical bit & phase flip errors.",
      claudeResponse:
        "Surface codes construct an active stabilizer manifold using mutually commuting Pauli operators. Syndrome measurements measure stabilizer eigenvalues without collapsing superpositions, allowing real-time FPGA decoders to correct errors in sub-microsecond cycles.",
      geminiResponse:
        "By interleaving data qubits with syndrome measurement qubits, planar surface code lattices detect environmental noise without violating the No-Cloning Theorem. Scaled experiments validate continuous error-free logical gate operations.",
    },
    {
      label: "React 19 vs SPA",
      query: "Compare React Server Components (RSC) vs traditional Client-Side SPAs for data-heavy apps.",
      gptResponse:
        "RSC executes on the server, producing zero client JavaScript bundle overhead for static markup and heavy dependencies. In contrast, traditional SPAs download all UI logic upfront, leading to slower initial interaction times.",
      claudeResponse:
        "Architecturally, RSC shifts data fetching to co-located internal network backbones, eliminating client-side request waterfalls. Server Actions provide secure typed mutation endpoints that revalidate caches without full-page reloads.",
      geminiResponse:
        "RSC streams serialized Flight protocol trees directly to the client runtime, enabling progressive hydration. SPAs require complex client-side caching libraries (React Query, SWR) to replicate identical freshness guarantees.",
    },
  ];

  const current = samplePrompts[activePromptIndex];
  const displayQuery = customQuery || current.query;

  const handleSendPrompt = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputVal.trim()) return;
    const text = inputVal.trim();
    setCustomQuery(text);
    setInputVal("");
    setIsSimulatingStream(true);
    setTimeout(() => {
      setIsSimulatingStream(false);
    }, 700);
  };

  return (
    <div className="relative mx-auto w-full max-w-5xl rounded-2xl border border-border bg-card shadow-2xl overflow-hidden glass-panel">
      {/* Top Application Bar Mockup */}
      <div className="flex flex-wrap items-center justify-between border-b border-border bg-muted/40 px-4 py-2.5 gap-2">
        {/* Active context and sandbox indicator */}
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-foreground">Interactive Sandbox</span>
          <span className="text-border">|</span>
          <span className="text-xs text-muted-foreground font-mono hidden sm:inline">
            echogpt.app/workspace
          </span>
          <Badge variant="outline" size="sm" className="hidden md:inline-flex text-[10px]">
            DOM Sync Active
          </Badge>
        </div>

        {/* View Mode Switcher (Chat vs Compare AI) */}
        <div className="flex items-center rounded-lg bg-background p-1 border border-border text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("compare")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-md transition-all font-medium",
              activeTab === "compare"
                ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Columns3 className="h-3.5 w-3.5" />
            <span>Compare AI</span>
            <span className="rounded bg-black/20 px-1 py-0.2 text-[9px] uppercase font-bold">
              3 Models
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("chat")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-md transition-all font-medium",
              activeTab === "chat"
                ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Bot className="h-3.5 w-3.5" />
            <span>Single Chat</span>
          </button>
        </div>

        {/* Action Link to Full App */}
        <Link
          href="/workspace"
          className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
        >
          <span>Launch Full Workspace</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Interactive Prompt Selector Chips */}
      <div className="border-b border-border bg-card/60 px-4 py-2 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-muted-foreground shrink-0 font-medium">Try Scenario:</span>
        {samplePrompts.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setActivePromptIndex(idx);
              setCustomQuery("");
            }}
            className={cn(
              "rounded-lg px-2.5 py-1 transition-all shrink-0 font-medium",
              activePromptIndex === idx && !customQuery
                ? "bg-primary/10 text-primary border border-primary/30 shadow-xs"
                : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent"
            )}
          >
            {p.label}
          </button>
        ))}
        <div className="ml-auto hidden sm:flex items-center gap-1 text-[11px] text-muted-foreground">
          <Clock className="h-3 w-3 text-emerald-500" />
          <span>Real-time Concurrent Inference</span>
        </div>
      </div>

      {/* Main Preview Content Body */}
      <div className="p-4 md:p-6 bg-background/50 min-h-[360px]">
        {/* User Prompt Message Card */}
        <div className="mb-4 rounded-xl border border-border bg-card p-3.5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">User Query</span>
              <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
                Page Context: nature.com
              </span>
            </div>
            <span className="text-[11px] font-mono text-emerald-500">Parallel Broadcast</span>
          </div>
          <p className="text-sm font-medium text-foreground">{displayQuery}</p>
        </div>

        {/* Tab 1: Compare AI Mode View (3 Parallel Columns) */}
        {activeTab === "compare" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Column 1: GPT-4o */}
            <div className="flex flex-col rounded-xl border border-emerald-500/25 bg-card p-3.5 shadow-xs">
              <div className="flex items-center justify-between border-b border-border pb-2 mb-2">
                <div className="flex items-center gap-2">
                  <ModelIcon provider="openai" size="sm" />
                  <div>
                    <h4 className="text-xs font-bold text-foreground">OpenAI GPT-4o</h4>
                    <span className="text-[10px] text-muted-foreground">Fastest Synthesis</span>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-emerald-500 font-semibold">
                  740ms · 410 tok
                </span>
              </div>
              <p className="text-xs text-foreground/90 leading-relaxed flex-1">
                {isSimulatingStream ? (
                  <span className="flex items-center gap-1.5 text-muted-foreground py-4">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>Streaming response...</span>
                  </span>
                ) : (
                  current.gptResponse
                )}
              </p>
              <div className="mt-3 pt-2 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="text-emerald-500 font-medium">99.4% Benchmark</span>
                <span className="text-[10px] font-mono">128K ctx</span>
              </div>
            </div>

            {/* Column 2: Claude 3.5 Sonnet */}
            <div className="flex flex-col rounded-xl border border-amber-500/25 bg-card p-3.5 shadow-xs">
              <div className="flex items-center justify-between border-b border-border pb-2 mb-2">
                <div className="flex items-center gap-2">
                  <ModelIcon provider="anthropic" size="sm" />
                  <div>
                    <h4 className="text-xs font-bold text-foreground">Claude 3.5 Sonnet</h4>
                    <span className="text-[10px] text-muted-foreground">Architectural Depth</span>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-amber-500 font-semibold">
                  890ms · 440 tok
                </span>
              </div>
              <p className="text-xs text-foreground/90 leading-relaxed flex-1">
                {isSimulatingStream ? (
                  <span className="flex items-center gap-1.5 text-muted-foreground py-4">
                    <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                    <span>Streaming response...</span>
                  </span>
                ) : (
                  current.claudeResponse
                )}
              </p>
              <div className="mt-3 pt-2 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="text-amber-500 font-medium">Top Reasoning</span>
                <span className="text-[10px] font-mono">200K ctx</span>
              </div>
            </div>

            {/* Column 3: Gemini 1.5 Pro */}
            <div className="flex flex-col rounded-xl border border-blue-500/25 bg-card p-3.5 shadow-xs">
              <div className="flex items-center justify-between border-b border-border pb-2 mb-2">
                <div className="flex items-center gap-2">
                  <ModelIcon provider="google" size="sm" />
                  <div>
                    <h4 className="text-xs font-bold text-foreground">Gemini 1.5 Pro</h4>
                    <span className="text-[10px] text-muted-foreground">Massive Context</span>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-blue-500 font-semibold">
                  1,020ms · 480 tok
                </span>
              </div>
              <p className="text-xs text-foreground/90 leading-relaxed flex-1">
                {isSimulatingStream ? (
                  <span className="flex items-center gap-1.5 text-muted-foreground py-4">
                    <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping" />
                    <span>Streaming response...</span>
                  </span>
                ) : (
                  current.geminiResponse
                )}
              </p>
              <div className="mt-3 pt-2 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="text-blue-500 font-medium">Document Synthesis</span>
                <span className="text-[10px] font-mono">2M ctx</span>
              </div>
            </div>
          </div>
        ) : (
          /* Tab 2: Standard Single-Model Chat View */
          <div className="rounded-xl border border-border bg-card p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-border pb-2.5">
              <div className="flex items-center gap-2">
                <ModelIcon modelId={selectedModelId} size="sm" />
                <span className="text-xs font-bold text-foreground">
                  {AI_MODELS.find((m) => m.id === selectedModelId)?.name || "GPT-4o"}
                </span>
                <Badge variant="outline" size="sm">
                  Active
                </Badge>
              </div>
              <div className="flex items-center gap-1.5">
                {AI_MODELS.slice(0, 3).map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedModelId(m.id)}
                    className={cn(
                      "px-2 py-0.5 text-[11px] rounded transition-colors",
                      selectedModelId === m.id
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    {m.shortName}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-sm text-foreground/90 leading-relaxed">
              {isSimulatingStream ? (
                <span className="flex items-center gap-1.5 text-muted-foreground py-4">
                  <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
                  <span>Streaming model response...</span>
                </span>
              ) : selectedModelId === "claude-3-5-sonnet" ? (
                current.claudeResponse
              ) : selectedModelId === "gemini-1-5-pro" ? (
                current.geminiResponse
              ) : (
                current.gptResponse
              )}
            </p>

            <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-emerald-500">Latency: 780ms</span>
                <span>·</span>
                <span className="font-mono text-[10px]">Tokens: 412</span>
              </div>
              <Link href="/workspace">
                <Button size="sm" variant="ghost" className="h-7 text-xs">
                  Continue in Workspace →
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Fully Functional Interactive Composer Bar */}
      <form
        onSubmit={handleSendPrompt}
        className="border-t border-border bg-card p-3 flex items-center justify-between gap-3"
      >
        <div className="flex items-center gap-2 flex-1">
          <Sparkles className="h-4 w-4 text-primary shrink-0" />
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type your own question or test prompt here..."
            className="w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button
            type="submit"
            size="sm"
            disabled={!inputVal.trim() || isSimulatingStream}
            className="gap-1.5 text-xs font-semibold px-3"
          >
            <span>Ask</span>
            <Send className="h-3 w-3" />
          </Button>
          <Link href="/workspace">
            <Button size="sm" variant="outline" className="text-xs font-medium hidden sm:inline-flex">
              Full Studio
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
