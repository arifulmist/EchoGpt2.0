import React from "react";
import { Bot, Sparkles, Globe, Cpu, Binary, Zap } from "lucide-react";
import { ModelProvider } from "@/types";
import { cn } from "@/lib/utils";

interface ModelIconProps {
  provider?: ModelProvider;
  modelId?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ModelIcon({ provider, modelId, size = "md", className }: ModelIconProps) {
  const sizeClasses = {
    sm: "h-6 w-6 text-xs",
    md: "h-8 w-8 text-sm",
    lg: "h-10 w-10 text-base",
  };

  const iconSizes = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  // Determine provider from modelId if not explicitly given
  const resolvedProvider: ModelProvider =
    provider ||
    (modelId?.includes("gpt")
      ? "openai"
      : modelId?.includes("claude")
      ? "anthropic"
      : modelId?.includes("gemini")
      ? "google"
      : modelId?.includes("llama")
      ? "meta"
      : modelId?.includes("deepseek")
      ? "deepseek"
      : modelId?.includes("groq")
      ? "groq"
      : "openai");

  const providerStyles = {
    openai: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    anthropic: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    google: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    meta: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    deepseek: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
    mistral: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    perplexity: "bg-teal-500/10 text-teal-500 border-teal-500/20",
    groq: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  };

  const renderIcon = () => {
    switch (resolvedProvider) {
      case "openai":
        return <Bot className={iconSizes[size]} />;
      case "anthropic":
        return <Sparkles className={iconSizes[size]} />;
      case "google":
        return <Globe className={iconSizes[size]} />;
      case "meta":
        return <Cpu className={iconSizes[size]} />;
      case "deepseek":
        return <Binary className={iconSizes[size]} />;
      case "groq":
        return <Zap className={iconSizes[size]} />;
      default:
        return <Bot className={iconSizes[size]} />;
    }
  };

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-lg border font-semibold transition-all",
        sizeClasses[size],
        providerStyles[resolvedProvider],
        className
      )}
    >
      {renderIcon()}
    </div>
  );
}
