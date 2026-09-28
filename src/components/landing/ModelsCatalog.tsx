"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Zap, Brain } from "lucide-react";
import { ModelIcon } from "@/components/shared/ModelIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AI_MODELS } from "@/data/mockData";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

export function ModelsCatalog() {
  const { activeModelId, setActiveModelId } = useApp();
  const [selectedId, setSelectedId] = useState<string>(activeModelId);

  return (
    <section id="models" className="py-20 md:py-28 border-t border-border/60 bg-muted/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center space-y-3 mb-16">
          <Badge variant="accent" size="md">
            Model Roster
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground font-sans">
            Choose the right intelligence for every task.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            EchoGPT integrates frontier models across OpenAI, Anthropic, Google, Meta, and open weights.
            Switch models on the fly without losing conversation context.
          </p>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {AI_MODELS.map((model) => {
            const isSelected = selectedId === model.id;
            return (
              <div
                key={model.id}
                onClick={() => {
                  setSelectedId(model.id);
                  setActiveModelId(model.id);
                }}
                className={cn(
                  "cursor-pointer rounded-2xl border p-5 transition-all duration-200 flex flex-col justify-between group",
                  isSelected
                    ? "border-primary bg-card shadow-md ring-1 ring-primary/40"
                    : "border-border/80 bg-card hover:border-border hover:bg-muted/40"
                )}
              >
                <div>
                  {/* Top Bar with Icon and Badge */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <ModelIcon provider={model.provider} size="lg" />
                      <div>
                        <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                          {model.name}
                        </h3>
                        <span className="text-xs text-muted-foreground">{model.providerLabel}</span>
                      </div>
                    </div>
                    {model.badge && (
                      <Badge variant="secondary" size="sm" className="font-mono text-[10px]">
                        {model.badge}
                      </Badge>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    {model.description}
                  </p>

                  {/* Capabilities Scores */}
                  <div className="space-y-2 mb-4 rounded-xl bg-muted/50 p-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <Zap className="h-3 w-3 text-amber-500" />
                        <span>Inference Speed</span>
                      </span>
                      <span className="font-semibold text-foreground">{model.speed}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <Brain className="h-3 w-3 text-blue-500" />
                        <span>Context Window</span>
                      </span>
                      <span className="font-mono text-[11px] font-semibold text-foreground">
                        {model.contextWindow}
                      </span>
                    </div>
                  </div>

                  {/* Strengths Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {model.strengths.map((str, idx) => (
                      <span
                        key={idx}
                        className="rounded-md bg-muted px-2 py-0.5 text-[10px] text-muted-foreground"
                      >
                        {str}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Action */}
                <div className="pt-3 border-t border-border/50 flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">
                    {isSelected ? "Currently Active Model" : "Click to select"}
                  </span>
                  <Link href="/workspace">
                    <Button
                      size="sm"
                      variant={isSelected ? "primary" : "outline"}
                      className="h-7 text-xs gap-1"
                    >
                      <span>Use Model</span>
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
