import React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { CompareShowcase } from "@/components/landing/CompareShowcase";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { ModelsCatalog } from "@/components/landing/ModelsCatalog";
import { WorkflowTimeline } from "@/components/landing/WorkflowTimeline";
import { ChromeExtensionShowcase } from "@/components/landing/ChromeExtensionShowcase";
import { WhyEchoGPT } from "@/components/landing/WhyEchoGPT";
import { AuthenticMetrics } from "@/components/landing/AuthenticMetrics";
import { FaqAccordion } from "@/components/landing/FaqAccordion";
import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/landing/Footer";
import { CommandPalette } from "@/components/shared/CommandPalette";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main id="main-content" className="flex-1">
        <Hero />
        <CompareShowcase />
        <FeaturesGrid />
        <ModelsCatalog />
        <WorkflowTimeline />
        <ChromeExtensionShowcase />
        <WhyEchoGPT />
        <AuthenticMetrics />
        <FaqAccordion />
        <FinalCta />
      </main>
      <Footer />
      <CommandPalette />
    </div>
  );
}
