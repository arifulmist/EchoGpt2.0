import { ChromeIcon as Chrome } from "@/components/shared/ChromeIcon";
import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="py-20 md:py-24 border-t border-border/60 bg-gradient-to-b from-background to-muted/30">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Unified AI Productivity</span>
        </div>

        <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-foreground font-sans">
          Bring every AI conversation into one workflow.
        </h2>

        <p className="mx-auto max-w-2xl text-base text-muted-foreground leading-relaxed">
          Stop context switching between disjointed browser tabs.
          Experience the speed of parallel model execution and native Chrome side panel intelligence.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          <Link href="/workspace">
            <Button size="lg" className="gap-2 text-sm font-semibold shadow-lg shadow-primary/20">
              <span>Start Using EchoGPT Free</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>

          <Link href="/extension">
            <Button variant="outline" size="lg" className="gap-2 text-sm font-medium">
              <Chrome className="h-4 w-4 text-amber-500" />
              <span>Install Chrome Extension</span>
            </Button>
          </Link>
        </div>

        <div className="text-[11px] text-muted-foreground pt-3 font-mono">
          Global Shortcut: <kbd className="rounded bg-muted px-1.5 py-0.5 border border-border">Ctrl+Shift+E</kbd> (Windows) or <kbd className="rounded bg-muted px-1.5 py-0.5 border border-border">⌘+Shift+E</kbd> (Mac)
        </div>
      </div>
    </section>
  );
}
