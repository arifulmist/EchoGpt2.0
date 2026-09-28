import React from "react";
import { Metadata } from "next";
import { WorkspaceLayout } from "@/components/workspace/WorkspaceLayout";

export const metadata: Metadata = {
  title: "EchoGPT Workspace — Multi-Model AI Productivity Studio",
  description:
    "Unified multi-model AI chat interface supporting OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet, Google Gemini 1.5 Pro, and side-by-side comparison.",
};

export default function WorkspacePage() {
  return <WorkspaceLayout />;
}
