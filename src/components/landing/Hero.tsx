"use client";

import { ChromeIcon as Chrome } from "@/components/shared/ChromeIcon";
import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Layers, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InteractiveProductPreview } from "./InteractiveProductPreview";
import { AUTHENTIC_EXTENSION_INFO } from "@/data/mockData";

export function Hero() {
  return (
    <section id="hero" aria-label="Hero Overview" className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24">
      {/* Subtle architectural ambient glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 h-[320px] w-[580px] rounded-full bg-primary/10 blur-[100px] pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Authentic Store Badge */}
        <div className="flex justify-center mb-6">
          <Link
            href="/extension"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs text-muted-foreground hover:border-primary/50 hover:bg-muted/40 transition-all shadow-xs"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-foreground">EchoGPT 2.0</span>
            <span className="text-border">|</span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="h-3 w-3 fill-amber-500" />
              <span className="font-medium text-foreground">{AUTHENTIC_EXTENSION_INFO.ratingValue}.0</span>
              <span className="text-[11px] text-muted-foreground">({AUTHENTIC_EXTENSION_INFO.ratingsCount} reviews)</span>
            </div>
            <span className="text-border">|</span>
            <span className="text-[11px] text-muted-foreground">Chrome Side Panel (v{AUTHENTIC_EXTENSION_INFO.version})</span>
            <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>

        {/* Hero Title & Value Proposition */}
        <div className="mx-auto max-w-4xl text-center space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground font-sans">
            Every AI model.{" "}
            <span className="text-emerald-500 dark:text-emerald-400 block sm:inline">
              One unified workspace.
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Chat, compare, summarize, and work with multiple AI assistants without leaving your browser tab.
            Ditch the tab-switching chaos and orchestrate GPT-4o, Claude 3.5, and Gemini 1.5 side-by-side.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/workspace">
              <Button size="lg" className="gap-2 text-sm font-semibold shadow-md shadow-primary/20">
                <span>Start Using EchoGPT</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <Link href="/extension">
              <Button variant="outline" size="lg" className="gap-2 text-sm font-medium">
                <Chrome className="h-4 w-4 text-amber-500" />
                <span>Open Chrome Side Panel Simulator</span>
              </Button>
            </Link>
          </div>

          {/* Trust & Architecture Points */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>Zero session tracking</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-amber-500" />
              <span>Multi-model parallel execution</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-blue-500" />
              <span>Chrome Side Panel API native</span>
            </div>
          </div>
        </div>

        {/* Interactive Product Preview Card */}
        <div className="mt-10 md:mt-14">
          <InteractiveProductPreview />
        </div>
      </div>
    </section>
  );
}
