import React from "react";
import { Metadata } from "next";
import { SettingsView } from "@/components/settings/SettingsView";

export const metadata: Metadata = {
  title: "EchoGPT Settings — Models, Appearance, BYOK & Privacy",
  description:
    "Configure API keys, model defaults, Chrome Side Panel shortcuts, and client-side privacy settings.",
};

export default function SettingsPage() {
  return <SettingsView />;
}
