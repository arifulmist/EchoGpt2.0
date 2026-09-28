"use client";

import { ChromeIcon as Chrome } from "@/components/shared/ChromeIcon";
import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Highlighter,
  FileText,
  Bot,
  Send,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModelIcon } from "@/components/shared/ModelIcon";
import { AUTHENTIC_EXTENSION_INFO } from "@/data/mockData";
import { cn } from "@/lib/utils";

export function ChromeExtensionShowcase() {
  const [activeTab, setActiveTab] = useState<"summarize" | "selection" | "ask">("summarize");

  return (
    <section id="extension-showcase" aria-label="Chrome Side Panel Details" className="py-16 md:py-24 border-t border-border bg-muted/15">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Copy & Value Proposition */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-500">
              <Chrome className="h-3.5 w-3.5" />
              <span>Native Chrome Side Panel API</span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground font-sans">
              Your browser sidebar, supercharged with every top AI.
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              No more copying and pasting paragraphs into external tabs. EchoGPT docks right alongside
              whatever you&apos;re reading, giving you instant explanations, summarization, and multi-model insights.
            </p>

            {/* Quick Extension Feature Points */}
            <div className="space-y-2.5 pt-1" role="tablist" aria-label="Extension feature showcases">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "summarize"}
                onClick={() => setActiveTab("summarize")}
                className={cn(
                  "w-full text-left rounded-xl border p-3 transition-all",
                  activeTab === "summarize"
                    ? "border-primary bg-card shadow-xs"
                    : "border-border bg-card/60 hover:bg-card"
                )}
              >
                <div className="flex items-center justify-between text-xs font-semibold text-foreground">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-emerald-500" />
                    <span>One-Click Webpage Summarization</span>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Synthesize long papers and documentation down to core bullet points in 1 second.
                </p>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "selection"}
                onClick={() => setActiveTab("selection")}
                className={cn(
                  "w-full text-left rounded-xl border p-3 transition-all",
                  activeTab === "selection"
                    ? "border-primary bg-card shadow-xs"
                    : "border-border bg-card/60 hover:bg-card"
                )}
              >
                <div className="flex items-center justify-between text-xs font-semibold text-foreground">
                  <div className="flex items-center gap-2">
                    <Highlighter className="h-4 w-4 text-amber-500" />
                    <span>Selected-Text Deep Explanations</span>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Highlight confusing jargon or complex equations to see instant intuitive breakdowns.
                </p>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "ask"}
                onClick={() => setActiveTab("ask")}
                className={cn(
                  "w-full text-left rounded-xl border p-3 transition-all",
                  activeTab === "ask"
                    ? "border-primary bg-card shadow-xs"
                    : "border-border bg-card/60 hover:bg-card"
                )}
              >
                <div className="flex items-center justify-between text-xs font-semibold text-foreground">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-blue-500" />
                    <span>Context-Grounded Follow-Up Questions</span>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Ask nuanced questions where the AI automatically references the page content.
                </p>
              </button>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Link href="/extension">
                <Button size="lg" className="gap-2 text-xs font-semibold">
                  <Chrome className="h-4 w-4" />
                  <span>Interactive Side Panel Simulator</span>
                </Button>
              </Link>

              <a
                href={AUTHENTIC_EXTENSION_INFO.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground underline underline-offset-4"
              >
                <span>Chrome Web Store Listing</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Right Column: Realistic Chrome Side Panel Mockup */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl border border-border bg-card shadow-xl overflow-hidden glass-panel">
              {/* Chrome Browser Header with Tabs & Address Bar */}
              <div className="border-b border-border bg-muted/60 px-4 py-2 space-y-2">
                {/* Browser Tab */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-card rounded-t-lg px-3 py-1 text-xs border-t border-x border-border text-foreground font-medium max-w-xs truncate">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="truncate">Nature: Scalable Quantum Error Correction</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-mono">
                    <span>Shortcut:</span>
                    <kbd className="rounded bg-muted px-1.5 py-0.5 border border-border">Ctrl+Shift+E</kbd>
                  </div>
                </div>

                {/* Address Bar */}
                <div className="flex items-center gap-2 bg-background rounded-lg px-3 py-1 text-xs border border-border text-muted-foreground">
                  <span className="text-emerald-500 font-mono text-[11px]">https://</span>
                  <span className="text-foreground">nature.com/articles/s41586-026-08123-x</span>
                </div>
              </div>

              {/* Two Column Simulated Layout: Left is Webpage, Right is Docked EchoGPT Side Panel */}
              <div className="grid grid-cols-12 min-h-[380px]">
                {/* Simulated Webpage Article (7 cols) */}
                <div className="col-span-7 p-4 sm:p-5 border-r border-border bg-background/50 space-y-3 hidden sm:block">
                  <div className="text-[10px] text-muted-foreground uppercase font-mono">
                    Article Preview
                  </div>
                  <h3 className="text-sm font-bold text-foreground">
                    Scalable Fault-Tolerant Quantum Error Correction with 1,000 Transmon Qubits
                  </h3>
                  <div className="rounded-lg bg-primary/10 border border-primary/20 p-2.5 text-xs text-foreground font-medium">
                    <span className="text-primary font-bold text-[10px] block mb-1">
                      [HIGHLIGHTED SELECTION]
                    </span>
                    &ldquo;Surface-code threshold experiments reveal a quadratic reduction in logical error probability as code distance d escalates from d=3 to d=7.&rdquo;
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    By interleaving measurement qubits across a planar transmons array, we suppress decoherence
                    exponentially while maintaining sub-microsecond syndrome cycle speeds...
                  </p>
                </div>

                {/* Docked EchoGPT Side Panel (5 cols on desktop, full width on small screens) */}
                <div className="col-span-12 sm:col-span-5 bg-card flex flex-col justify-between p-3.5 space-y-3">
                  {/* Side Panel Header */}
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <div className="flex items-center gap-1.5">
                      <ModelIcon provider="openai" size="sm" />
                      <span className="text-xs font-bold text-foreground">GPT-4o</span>
                      <span className="text-[9px] bg-primary/10 text-primary px-1 rounded">Active</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground font-mono">Sidebar v1.0.5</span>
                  </div>

                  {/* Context Indicator */}
                  <div className="flex items-center gap-1.5 rounded-md bg-muted/70 px-2 py-1 text-[10px] text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="truncate">Context: nature.com</span>
                  </div>

                  {/* Assistant Response Box */}
                  <div className="rounded-xl border border-border bg-background/80 p-3 text-xs space-y-2 flex-1 overflow-y-auto max-h-[220px]">
                    <div className="font-semibold text-foreground text-[11px] flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-primary" />
                      <span>
                        {activeTab === "summarize"
                          ? "Webpage Summary"
                          : activeTab === "selection"
                          ? "Selection Explained"
                          : "Grounded Answer"}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-[11px] leading-relaxed">
                      {activeTab === "summarize"
                        ? "1. Distance-7 surface code achieves fault-tolerant error suppression.\n2. FPGA syndrome decoder decodes in 740ns, beating the 48µs qubit coherence window.\n3. Proves scalable physical architectures are viable."
                        : activeTab === "selection"
                        ? "Quadratic reduction means doubling code distance squares your protection against random noise. When physical error rate is below 1%, larger qubit arrays yield drastically cleaner computation."
                        : "Yes, the transmon qubits operate in planar geometry, meaning each physical qubit only interacts with nearest neighbors on a 2D grid, minimizing cross-talk."}
                    </p>
                  </div>

                  {/* Side Panel Input Bar */}
                  <div className="pt-2 border-t border-border flex items-center gap-1.5">
                    <input
                      type="text"
                      readOnly
                      value="Ask about this page..."
                      className="w-full bg-muted/60 rounded-lg px-2.5 py-1 text-[11px] text-muted-foreground cursor-pointer"
                    />
                    <Link href="/extension">
                      <Button size="icon-sm" className="h-6 w-6" aria-label="Open extension simulator">
                        <Send className="h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
