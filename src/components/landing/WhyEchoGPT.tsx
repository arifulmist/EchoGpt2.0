import React from "react";
import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function WhyEchoGPT() {
  const comparisons = [
    {
      capability: "Multi-Model Parallel Inference",
      echogpt: "Compare GPT-4o, Claude 3.5, and Gemini 1.5 in synchronized side-by-side columns",
      traditional: "Opening 4 browser tabs, re-logging into each, manually re-pasting prompts",
    },
    {
      capability: "Browser Webpage Context",
      echogpt: "Automatic client-side DOM distillation with 1-click summarization & highlighted text breakdown",
      traditional: "Copy-pasting wall of text, running into prompt size limits, leaking page scripts",
    },
    {
      capability: "Keyboard-Driven Access",
      echogpt: "Global shortcut (Ctrl+Shift+E) toggles Side Panel instantly; Cmd+K command palette",
      traditional: "Switching desktop windows, clicking browser tab icons, slow mouse hunting",
    },
    {
      capability: "Privacy & Key Ownership",
      echogpt: "Zero training telemetry. Bring Your Own Keys (BYOK) with encrypted local storage",
      traditional: "Mandatory cloud tracking and uncertain data retention policies",
    },
    {
      capability: "Consensus Verification",
      echogpt: "Instantly detect hallucinations by checking where models disagree",
      traditional: "Blindly trusting a single model's potentially fabricated response",
    },
  ];

  return (
    <section className="py-20 md:py-28 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center space-y-3 mb-16">
          <Badge variant="default" size="md">
            Product Differentiation
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground font-sans">
            Why engineers and researchers switch to EchoGPT.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            AI productivity shouldn&apos;t mean losing your focus in a swamp of disconnected tabs.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border/80 bg-card shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-border/80 bg-muted/60 text-xs font-semibold text-foreground p-4">
            <div className="md:col-span-4 uppercase tracking-wider text-muted-foreground">
              Core Workflow
            </div>
            <div className="md:col-span-4 text-emerald-500 font-bold flex items-center gap-1.5 mt-2 md:mt-0">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>EchoGPT 2.0 Ecosystem</span>
            </div>
            <div className="md:col-span-4 text-muted-foreground mt-2 md:mt-0">
              Traditional Multi-Tab Workflow
            </div>
          </div>

          <div className="divide-y divide-border/60">
            {comparisons.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 p-4 text-xs hover:bg-muted/20 transition-colors gap-2 md:gap-0"
              >
                <div className="md:col-span-4 font-semibold text-foreground flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                  <span>{row.capability}</span>
                </div>
                <div className="md:col-span-4 text-foreground/90 font-medium flex items-start gap-2 pr-4">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{row.echogpt}</span>
                </div>
                <div className="md:col-span-4 text-muted-foreground flex items-start gap-2">
                  <X className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{row.traditional}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
