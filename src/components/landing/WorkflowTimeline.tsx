import React from "react";
import { Terminal, Bot, Highlighter, Columns3, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function WorkflowTimeline() {
  const steps = [
    {
      num: "01",
      icon: <Terminal className="h-5 w-5 text-emerald-500" />,
      title: "Open EchoGPT anywhere",
      description:
        "Trigger the Chrome Side Panel via Ctrl+Shift+E or open the dedicated full-screen desktop workspace.",
      tag: "Instant Access",
    },
    {
      num: "02",
      icon: <Bot className="h-5 w-5 text-teal-500" />,
      title: "Choose or compare models",
      description:
        "Select your preferred assistant or enable Compare Mode to dispatch queries across multiple models simultaneously.",
      tag: "Multi-Model",
    },
    {
      num: "03",
      icon: <Highlighter className="h-5 w-5 text-blue-500" />,
      title: "Inject active webpage context",
      description:
        "Highlight confusing paragraphs or click 'Summarize Page'. EchoGPT extracts clean text while ignoring ads, scripts, and trackers.",
      tag: "Context Aware",
    },
    {
      num: "04",
      icon: <Columns3 className="h-5 w-5 text-purple-500" />,
      title: "Cross-examine answers side-by-side",
      description:
        "Evaluate code snippets, factual claims, and creative styles in synchronized columns with latency and token metrics.",
      tag: "Consensus Verification",
    },
    {
      num: "05",
      icon: <CheckCircle className="h-5 w-5 text-primary" />,
      title: "Export, copy, and continue flow",
      description:
        "Copy formatted markdown, save sessions to collections, or branch out into follow-up research with zero tab overload.",
      tag: "Productive Flow",
    },
  ];

  return (
    <section className="py-20 md:py-28 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center space-y-3 mb-16">
          <Badge variant="default" size="md">
            Product Workflow
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground font-sans">
            How EchoGPT accelerates your workday.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            From the moment you read an article or write a function, EchoGPT is always one keyboard shortcut away.
          </p>
        </div>

        {/* Timeline Horizontal Steps */}
        <div className="relative">
          {/* Connector line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-6 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col rounded-2xl border border-border/80 bg-card p-5 shadow-sm transition-all hover:border-primary/40 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-black text-muted-foreground/40 group-hover:text-primary transition-colors">
                    {step.num}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted border border-border/60 group-hover:scale-105 transition-transform">
                    {step.icon}
                  </div>
                </div>

                <Badge variant="outline" size="sm" className="w-fit mb-2 font-mono text-[10px]">
                  {step.tag}
                </Badge>

                <h3 className="text-sm font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
