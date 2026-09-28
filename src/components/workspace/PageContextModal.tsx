"use client";

import React from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/context/AppContext";
import { DEMO_PAGES } from "@/data/mockData";
import { Globe, ShieldCheck } from "lucide-react";

interface PageContextModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PageContextModal({ isOpen, onClose }: PageContextModalProps) {
  const {
    activePageContext,
    switchDemoPage,
    togglePageContextEnabled,
  } = useApp();

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Webpage Context Inspector"
      description="Inspect how EchoGPT distills client-side DOM structure before prompt injection"
      maxWidth="lg"
    >
      <div className="space-y-4 text-xs">
        {/* Active Page Card */}
        <div className="rounded-xl border border-border bg-muted/30 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-emerald-500" />
              <span className="font-semibold text-foreground">{activePageContext.domain}</span>
            </div>
            <Badge variant={activePageContext.enabled ? "success" : "outline"} size="sm">
              {activePageContext.enabled ? "Context Attached" : "Disabled"}
            </Badge>
          </div>

          <h4 className="font-bold text-foreground text-sm">{activePageContext.title}</h4>
          <p className="text-muted-foreground text-[11px] leading-relaxed">
            {activePageContext.excerpt}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-border/40 text-[11px] text-muted-foreground">
            <span>Reading time: ~{activePageContext.readingTimeMinutes} mins</span>
            <Button
              size="sm"
              variant={activePageContext.enabled ? "secondary" : "primary"}
              onClick={togglePageContextEnabled}
              className="h-7 text-xs"
            >
              {activePageContext.enabled ? "Detach Context" : "Attach Context"}
            </Button>
          </div>
        </div>

        {/* Switch Simulated Webpage */}
        <div className="space-y-2">
          <label className="font-semibold text-foreground text-xs block">
            Switch Simulated Active Webpage:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {DEMO_PAGES.map((page, idx) => {
              const isCurrent = activePageContext.url === page.url;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => switchDemoPage(idx)}
                  className={`flex flex-col text-left p-2.5 rounded-lg border transition-all ${
                    isCurrent
                      ? "border-primary bg-primary/10 text-primary font-medium"
                      : "border-border bg-card text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <span className="font-bold text-foreground text-xs truncate">
                    {page.domain}
                  </span>
                  <span className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5">
                    {page.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Raw Extracted DOM Content Preview */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-muted-foreground text-[11px]">
            <span>Sanitized Content Payload (scripts, styles & trackers removed):</span>
            <span className="font-mono text-[10px]">Client-side AST</span>
          </div>
          <pre className="max-h-40 overflow-y-auto rounded-lg bg-zinc-950 p-3 text-[11px] font-mono text-zinc-300 leading-relaxed border border-border/60">
            {activePageContext.fullContent || activePageContext.excerpt}
          </pre>
        </div>

        {/* Privacy badge */}
        <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-2.5 text-[11px] text-emerald-600 dark:text-emerald-400">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          <span>
            EchoGPT parses this DOM tree strictly inside your browser sandbox. Passwords, auth tokens, and cookies are never accessed.
          </span>
        </div>
      </div>
    </Dialog>
  );
}
