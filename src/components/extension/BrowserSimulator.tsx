"use client";

import { ChromeIcon as Chrome } from "@/components/shared/ChromeIcon";
import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Lock,
  Globe,
  ExternalLink,
  Highlighter,
  ShieldCheck,
} from "lucide-react";
import { ExtensionSidePanel } from "./ExtensionSidePanel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/context/AppContext";
import { DEMO_PAGES, AUTHENTIC_EXTENSION_INFO } from "@/data/mockData";
import { cn } from "@/lib/utils";

export function BrowserSimulator() {
  const { activePageContext, switchDemoPage, updateSelectedText } = useApp();
  const [viewMode, setViewMode] = useState<"docked" | "standalone">("docked");

  const handleSimulateHighlight = () => {
    updateSelectedText(
      "Surface-code threshold experiments reveal a quadratic reduction in logical error probability as code distance d escalates from d=3 to d=7."
    );
  };

  return (
    <div className="flex flex-col h-full w-full bg-background text-foreground overflow-y-auto">
      {/* Top Banner: Simulator Navigation & Official Info */}
      <div className="border-b border-border/70 bg-card px-4 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/workspace">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Workspace</span>
            </Button>
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-foreground">
                EchoGPT Chrome Side Panel Simulator
              </h1>
              <Badge variant="success" size="sm">
                v{AUTHENTIC_EXTENSION_INFO.version}
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground hidden sm:block">
              Simulating Chrome Side Panel API & Manifest V3 in a 380px responsive viewport.
            </p>
          </div>
        </div>

        {/* View Mode & Webpage Switcher Controls */}
        <div className="flex items-center gap-2">
          {/* Simulated Webpage Dropdown */}
          <select
            value={activePageContext.url}
            onChange={(e) => {
              const idx = DEMO_PAGES.findIndex((p) => p.url === e.target.value);
              if (idx !== -1) switchDemoPage(idx);
            }}
            className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-foreground focus:outline-none"
          >
            {DEMO_PAGES.map((p, idx) => (
              <option key={idx} value={p.url}>
                {p.domain} — {p.title.slice(0, 24)}...
              </option>
            ))}
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center rounded-lg bg-muted p-0.5 border border-border text-xs">
            <button
              type="button"
              onClick={() => setViewMode("docked")}
              className={cn(
                "rounded px-2.5 py-1 font-medium transition-colors",
                viewMode === "docked"
                  ? "bg-card text-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Docked View
            </button>
            <button
              type="button"
              onClick={() => setViewMode("standalone")}
              className={cn(
                "rounded px-2.5 py-1 font-medium transition-colors",
                viewMode === "standalone"
                  ? "bg-card text-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Standalone (380px)
            </button>
          </div>

          <a
            href={AUTHENTIC_EXTENSION_INFO.officialUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground underline underline-offset-4"
          >
            <Chrome className="h-3.5 w-3.5 text-amber-500" />
            <span>Store Listing</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Main Container Area */}
      <div className="flex-1 p-4 md:p-6 bg-muted/20 flex items-center justify-center min-h-[640px]">
        {viewMode === "standalone" ? (
          /* Standalone 380px Side Panel View */
          <div className="flex flex-col items-center space-y-3">
            <div className="text-xs text-muted-foreground flex items-center gap-2">
              <span className="font-mono">Viewport: 380px × 680px</span>
              <span>·</span>
              <span className="text-emerald-500 font-medium">Chrome Side Panel Dimensions</span>
            </div>
            <div className="w-[380px] h-[680px] rounded-2xl shadow-2xl border border-border overflow-hidden">
              <ExtensionSidePanel className="h-full max-w-none" />
            </div>
          </div>
        ) : (
          /* Full Docked Browser Simulator View */
          <div className="w-full max-w-7xl h-[720px] rounded-2xl border border-border/80 bg-card shadow-2xl overflow-hidden flex flex-col glass-panel">
            {/* Browser Window Chrome Top Header */}
            <div className="border-b border-border bg-muted/70 px-4 py-2 space-y-2 select-none shrink-0">
              {/* Window Dots & Tabs */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5 mr-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                    <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  </div>

                  {/* Active Browser Tab */}
                  <div className="flex items-center gap-2 bg-card rounded-t-lg px-3 py-1 text-xs border-t border-x border-border/80 text-foreground font-medium max-w-xs truncate shadow-xs">
                    <Globe className="h-3 w-3 text-emerald-500 shrink-0" />
                    <span className="truncate">{activePageContext.title}</span>
                  </div>

                  <span className="text-xs text-muted-foreground px-2 cursor-pointer hover:text-foreground">
                    +
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                  <span>Shortcut:</span>
                  <kbd className="rounded bg-muted px-1.5 py-0.5 border border-border">Ctrl+Shift+E</kbd>
                </div>
              </div>

              {/* Navigation Controls & Address Bar */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <button type="button" className="p-1 hover:text-foreground rounded">
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </button>
                  <button type="button" className="p-1 hover:text-foreground rounded">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  <button type="button" className="p-1 hover:text-foreground rounded">
                    <RotateCw className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Address Bar */}
                <div className="flex-1 flex items-center gap-2 bg-background rounded-lg px-3 py-1 text-xs border border-border text-foreground">
                  <Lock className="h-3 w-3 text-emerald-500 shrink-0" />
                  <span className="text-emerald-500 font-mono text-[11px]">https://</span>
                  <span className="truncate">{activePageContext.url.replace("https://", "")}</span>
                </div>

                {/* Extension Pin Icon in Browser */}
                <div className="flex items-center gap-1 rounded-md bg-primary/10 border border-primary/30 px-2 py-1 text-xs text-primary font-bold">
                  <Chrome className="h-3 w-3" />
                  <span>EchoGPT Active</span>
                </div>
              </div>
            </div>

            {/* Simulated Dual-Pane Split: Left Webpage + Right Docked EchoGPT Side Panel */}
            <div className="flex-1 flex min-h-0 overflow-hidden">
              {/* Left Pane: Webpage Reading Experience */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-background border-r border-border/80 space-y-6">
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase text-muted-foreground">
                      Journal Article
                    </span>
                    <span>·</span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {activePageContext.domain}
                    </span>
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleSimulateHighlight}
                    className="h-7 text-xs gap-1.5"
                  >
                    <Highlighter className="h-3.5 w-3.5 text-amber-500" />
                    <span>Highlight Passage</span>
                  </Button>
                </div>

                <div className="space-y-3 max-w-3xl">
                  <h2 className="text-2xl font-bold tracking-tight text-foreground leading-snug">
                    {activePageContext.title}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Published in 2026 · Estimated reading time: {activePageContext.readingTimeMinutes} min
                  </p>
                </div>

                {/* Highlighted text callout */}
                <div className="rounded-xl border border-primary/30 bg-primary/10 p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-primary">
                    <div className="flex items-center gap-1.5">
                      <Highlighter className="h-4 w-4" />
                      <span>Simulated User Selection:</span>
                    </div>
                    <span className="text-[10px] uppercase font-mono">Ready for Side Panel</span>
                  </div>
                  <p className="text-sm font-medium text-foreground leading-relaxed">
                    &ldquo;{activePageContext.selectedText}&rdquo;
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Click <strong>&ldquo;Explain Selected&rdquo;</strong> in the side panel on the right to unpack this paragraph with AI!
                  </p>
                </div>

                {/* Additional Webpage Body Content */}
                <div className="prose prose-sm dark:prose-invert space-y-4 text-xs md:text-sm text-foreground/80 leading-relaxed max-w-3xl">
                  <p>
                    Quantum processors operate within extremely sensitive cryogenic environments. Any thermal,
                    electromagnetic, or material impurity induces decoherence, corrupting the delicate phase
                    amplitudes required for computational speedups.
                  </p>
                  <p>
                    In this work, we demonstrate surface-code logical qubits sustaining continuous real-time error
                    syndrome extraction below the physical fault-tolerance threshold. Parity syndromes are decoded
                    in sub-microsecond intervals using FPGA co-processors, outperforming superconducting relaxation timescales.
                  </p>
                  <p>
                    The results demonstrate a direct pathway toward scalable, fault-tolerant commercial quantum architectures
                    without requiring infinite dilution refrigerator overhead.
                  </p>
                </div>
              </div>

              {/* Right Pane: Docked EchoGPT Side Panel (Fixed width 380px) */}
              <div className="w-[380px] shrink-0 h-full border-l border-border/80">
                <ExtensionSidePanel className="h-full max-w-none border-0 rounded-none shadow-none" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info on Authentic Chrome Listing */}
      <div className="border-t border-border/60 bg-card px-4 py-2 text-[11px] text-muted-foreground flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
          <span>
            Manifest V3 verified. Real extension version {AUTHENTIC_EXTENSION_INFO.version} (updated {AUTHENTIC_EXTENSION_INFO.lastUpdated}).
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span>{AUTHENTIC_EXTENSION_INFO.users} active Chrome users</span>
          <span>·</span>
          <span>5.0 ★ ({AUTHENTIC_EXTENSION_INFO.ratingsCount} reviews)</span>
        </div>
      </div>
    </div>
  );
}
