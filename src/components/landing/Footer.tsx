import { ChromeIcon as Chrome } from "@/components/shared/ChromeIcon";
import React from "react";
import Link from "next/link";
import { ExternalLink, Shield } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { AUTHENTIC_EXTENSION_INFO } from "@/data/mockData";

export function Footer() {
  return (
    <footer className="border-t border-border/80 bg-card py-12 text-xs text-muted-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-border/60">
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-1">
            <Logo size="md" />
            <p className="leading-relaxed text-muted-foreground">
              One unified workspace and Chrome Side Panel for multiple AI models.
              Chat, compare, and summarize without leaving your workflow.
            </p>
            <div className="pt-2 text-[11px] font-mono text-foreground">
              v{AUTHENTIC_EXTENSION_INFO.version} · Manifest V3
            </div>
          </div>

          {/* Col 2: Product */}
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider text-[11px]">
              Ecosystem
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/workspace" className="hover:text-foreground transition-colors">
                  Web Workspace App
                </Link>
              </li>
              <li>
                <Link href="/workspace" className="hover:text-foreground transition-colors">
                  Compare AI Responses
                </Link>
              </li>
              <li>
                <Link href="/extension" className="hover:text-foreground transition-colors flex items-center gap-1">
                  <span>Chrome Extension Simulator</span>
                  <Chrome className="h-3 w-3 text-amber-500" />
                </Link>
              </li>
              <li>
                <Link href="/settings" className="hover:text-foreground transition-colors">
                  Workspace Settings & BYOK
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Supported Models */}
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider text-[11px]">
              Frontier Models
            </h4>
            <ul className="space-y-1.5">
              <li>OpenAI GPT-4o</li>
              <li>Anthropic Claude 3.5 Sonnet</li>
              <li>Google Gemini 1.5 Pro (2M Context)</li>
              <li>Meta Llama 3.1 70B</li>
              <li>DeepSeek V2.5 / R1</li>
              <li>Groq Llama 3 (500 tok/s)</li>
            </ul>
          </div>

          {/* Col 4: Community & Resources */}
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider text-[11px]">
              Verified Resources
            </h4>
            <ul className="space-y-1.5">
              <li>
                <a
                  href={AUTHENTIC_EXTENSION_INFO.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground transition-colors flex items-center gap-1"
                >
                  <span>Chrome Web Store Listing</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href={AUTHENTIC_EXTENSION_INFO.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground transition-colors flex items-center gap-1"
                >
                  <span>Official echogpt.live</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <span className="text-muted-foreground">
                  Developer: {AUTHENTIC_EXTENSION_INFO.developerTeam}
                </span>
              </li>
              <li>
                <span className="text-muted-foreground font-mono">
                  {AUTHENTIC_EXTENSION_INFO.developerEmail}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px]">
            &copy; {new Date().getFullYear()} EchoGPT Ecosystem. Re-engineered as a production-grade AI productivity workspace.
          </p>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-500 font-medium">
              <Shield className="h-3.5 w-3.5" />
              <span>Zero-tracking client-side privacy</span>
            </span>
            <span>·</span>
            <span>Version {AUTHENTIC_EXTENSION_INFO.version} (Updated Sep 22, 2026)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
