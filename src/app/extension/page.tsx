import React from "react";
import { Metadata } from "next";
import { BrowserSimulator } from "@/components/extension/BrowserSimulator";

export const metadata: Metadata = {
  title: "EchoGPT Chrome Side Panel — Interactive Extension Simulator",
  description:
    "Simulate the EchoGPT Chrome Side Panel experience (v1.0.5). Webpage summarization, selected-text explanation, and multi-model switching.",
};

export default function ExtensionPage() {
  return <BrowserSimulator />;
}
