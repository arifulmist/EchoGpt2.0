import React from "react";
import {
  Layers,
  Columns3,
  FileText,
  Highlighter,
  History,
  Compass,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function FeaturesGrid() {
  const features = [
    {
      icon: <Layers className="h-5 w-5 text-emerald-500" />,
      title: "Multi-Model Orchestration",
      description:
        "Switch seamlessly between GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, Llama 3.1, and DeepSeek within the same ongoing thread.",
      badge: "Unified",
    },
    {
      icon: <Columns3 className="h-5 w-5 text-teal-500" />,
      title: "Compare AI Responses",
      description:
        "Run queries concurrently across 2-3 models to cross-examine reasoning, verify code implementations, and expose hallucinations.",
      badge: "Differentiator",
    },
    {
      icon: <FileText className="h-5 w-5 text-blue-500" />,
      title: "Webpage Summaries",
      description:
        "One-click client-side distillation of complex research papers, news articles, and documentation directly in your active browser tab.",
      badge: "Browser Native",
    },
    {
      icon: <Highlighter className="h-5 w-5 text-amber-500" />,
      title: "Explain Selected Text",
      description:
        "Highlight any paragraph on any website and press Ctrl+Shift+E to get instant jargon-free explanations and mathematical breakdowns.",
      badge: "Instant Context",
    },
    {
      icon: <History className="h-5 w-5 text-purple-500" />,
      title: "Persistent Conversation History",
      description:
        "Organize sessions into custom collections, search past solutions, star favorites, and resume discussions across web app and side panel.",
      badge: "Synced",
    },
    {
      icon: <Compass className="h-5 w-5 text-cyan-500" />,
      title: "Context-Aware Assistance",
      description:
        "EchoGPT knows what URL you are browsing and parses the DOM safely without uploading trackers, scripts, or login credentials.",
      badge: "Private",
    },
    {
      icon: <Zap className="h-5 w-5 text-orange-500" />,
      title: "One-Click Quick Actions",
      description:
        "Accelerate your workflow with pre-built prompt macros: Rewrite Professionally, Review Code & Edge Cases, and Extract Action Items.",
      badge: "Productivity",
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-rose-500" />,
      title: "Zero-Telemetry Privacy",
      description:
        "Bring Your Own API Keys (BYOK) or use managed routing. Local storage encryption guarantees your prompts never train third-party models.",
      badge: "Security",
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center space-y-3 mb-16">
          <Badge variant="default" size="md">
            Product Capabilities
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground font-sans">
            Engineered for deep work, not casual chit-chat.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Every feature in EchoGPT is designed to compress your research and development loops
            while keeping you inside your active browser context.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <Card
              key={i}
              className="group border border-border/80 bg-card hover:border-primary/40 hover:shadow-lg transition-all duration-200"
            >
              <CardHeader className="space-y-3 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/80 border border-border/60 group-hover:scale-105 transition-transform">
                    {feature.icon}
                  </div>
                  <Badge variant="outline" size="sm">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
