"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Settings,
  Palette,
  Shield,
  Keyboard,
  User,
  Key,
  Check,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Logo } from "@/components/shared/Logo";
import { AUTHENTIC_EXTENSION_INFO } from "@/data/mockData";
import { cn } from "@/lib/utils";

export function SettingsView() {
  const { settings, updateSettings, models, simulateNetworkError } = useApp();

  const [activeTab, setActiveTab] = useState<
    "general" | "appearance" | "models" | "context" | "shortcuts" | "account"
  >("general");

  const [formState, setFormState] = useState(settings);
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    updateSettings(formState);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const toggleShowKey = (provider: string) => {
    setShowKeys((prev) => ({ ...prev, [provider]: !prev[provider] }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Settings Top Header */}
      <header className="border-b border-border/70 bg-card px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/workspace">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Workspace</span>
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Logo size="sm" asLink={false} />
            <span className="text-muted-foreground text-xs">/</span>
            <span className="text-xs font-semibold text-foreground">Settings & Preferences</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {saveSuccess && (
            <span className="text-xs text-emerald-500 font-medium flex items-center gap-1">
              <Check className="h-3.5 w-3.5" />
              <span>Saved</span>
            </span>
          )}
          <Button size="sm" onClick={handleSave} className="gap-1.5 text-xs font-semibold">
            <Save className="h-3.5 w-3.5" />
            <span>Save Preferences</span>
          </Button>
        </div>
      </header>

      {/* Main Settings Body */}
      <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Navigation Sidebar Tabs */}
        <aside className="md:col-span-3 space-y-1">
          <button
            type="button"
            onClick={() => setActiveTab("general")}
            className={cn(
              "w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors text-left",
              activeTab === "general"
                ? "bg-primary/10 text-primary font-bold border border-primary/20"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Settings className="h-4 w-4" />
            <span>General</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("appearance")}
            className={cn(
              "w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors text-left",
              activeTab === "appearance"
                ? "bg-primary/10 text-primary font-bold border border-primary/20"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Palette className="h-4 w-4" />
            <span>Appearance & Themes</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("models")}
            className={cn(
              "w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors text-left",
              activeTab === "models"
                ? "bg-primary/10 text-primary font-bold border border-primary/20"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Key className="h-4 w-4" />
            <span>AI Models & API Keys (BYOK)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("context")}
            className={cn(
              "w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors text-left",
              activeTab === "context"
                ? "bg-primary/10 text-primary font-bold border border-primary/20"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Shield className="h-4 w-4" />
            <span>Context & Privacy</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("shortcuts")}
            className={cn(
              "w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors text-left",
              activeTab === "shortcuts"
                ? "bg-primary/10 text-primary font-bold border border-primary/20"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Keyboard className="h-4 w-4" />
            <span>Keyboard Shortcuts</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("account")}
            className={cn(
              "w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors text-left",
              activeTab === "account"
                ? "bg-primary/10 text-primary font-bold border border-primary/20"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <User className="h-4 w-4" />
            <span>Account & Sync</span>
          </button>
        </aside>

        {/* Tab Content Panes */}
        <main className="md:col-span-9 bg-card rounded-2xl border border-border p-6 shadow-sm">
          {/* 1. GENERAL TAB */}
          {activeTab === "general" && (
            <div className="space-y-6 text-xs">
              <div>
                <h2 className="text-base font-bold text-foreground">General Preferences</h2>
                <p className="text-muted-foreground text-xs mt-0.5">
                  Configure default model behavior, token generation, and response dispatching.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-border/60">
                <div className="space-y-1.5 max-w-md">
                  <label className="font-semibold text-foreground text-xs block">
                    Default Model on Launch
                  </label>
                  <select
                    value={formState.defaultModel}
                    onChange={(e) =>
                      setFormState({ ...formState, defaultModel: e.target.value })
                    }
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {models.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} — {m.description.slice(0, 48)}...
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5 max-w-md">
                  <div className="flex items-center justify-between">
                    <label className="font-semibold text-foreground text-xs">
                      Temperature ({formState.temperature})
                    </label>
                    <span className="text-[11px] text-muted-foreground">
                      {formState.temperature < 0.4 ? "Precise & Analytical" : "Balanced Creative"}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={formState.temperature}
                    onChange={(e) =>
                      setFormState({ ...formState, temperature: parseFloat(e.target.value) })
                    }
                    className="w-full accent-primary cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between rounded-xl border border-border bg-muted/20 p-4">
                  <div className="space-y-0.5">
                    <div className="font-semibold text-foreground">Stream Token Generation</div>
                    <div className="text-muted-foreground text-[11px]">
                      Render tokens progressively in real time instead of waiting for completion.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={formState.streamResponses}
                    onChange={(e) =>
                      setFormState({ ...formState, streamResponses: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-border text-primary accent-primary"
                  />
                </div>

                <div className="flex items-center justify-between rounded-xl border border-border bg-muted/20 p-4">
                  <div className="space-y-0.5">
                    <div className="font-semibold text-foreground">Send Message on Enter</div>
                    <div className="text-muted-foreground text-[11px]">
                      Pressing Enter submits the query; Shift+Enter creates a newline.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={formState.sendOnEnter}
                    onChange={(e) =>
                      setFormState({ ...formState, sendOnEnter: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-border text-primary accent-primary"
                  />
                </div>

                {/* Reviewer Diagnostics & Error Handling Test */}
                <div className="rounded-xl border border-border bg-muted/15 p-4 space-y-2">
                  <div className="font-semibold text-foreground text-xs">
                    Reviewer & Diagnostics Suite
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Test client-side edge-state resilience, simulated network timeouts, and 429 rate limit recovery banners.
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      simulateNetworkError();
                      alert("Simulated Rate Limit Error triggered. Return to Workspace to see the error banner and recovery flow.");
                    }}
                    className="text-xs h-7 text-rose-500 border-rose-500/30 hover:bg-rose-500/10"
                  >
                    Simulate API Rate Limit (429)
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* 2. APPEARANCE TAB */}
          {activeTab === "appearance" && (
            <div className="space-y-6 text-xs">
              <div>
                <h2 className="text-base font-bold text-foreground">Appearance & Themes</h2>
                <p className="text-muted-foreground text-xs mt-0.5">
                  Select your interface theme and typography display.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-border/60">
                <div className="space-y-2">
                  <label className="font-semibold text-foreground text-xs block">Theme</label>
                  <ThemeToggle variant="segmented" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="rounded-xl border border-border bg-background p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground">Dark Neutral Foundation</span>
                      <Badge variant="success" size="sm">
                        Default
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-[11px] leading-relaxed">
                      Optimized for low-glare technical sessions with emerald, cyan, and amber status accents.
                    </p>
                  </div>

                  <div className="rounded-xl border border-border bg-background p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground">High Contrast Light Mode</span>
                      <Badge variant="outline" size="sm">
                        Supported
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-[11px] leading-relaxed">
                      Crisp typography with high legibility ratios for daytime work.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. AI MODELS & BYOK TAB */}
          {activeTab === "models" && (
            <div className="space-y-6 text-xs">
              <div>
                <h2 className="text-base font-bold text-foreground">AI Models & API Keys (BYOK)</h2>
                <p className="text-muted-foreground text-xs mt-0.5">
                  Bring Your Own Keys to query models directly with no middleman markup or token rate limits.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-border/60">
                {/* OpenAI Key */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-semibold text-foreground text-xs">
                      OpenAI API Key (GPT-4o)
                    </label>
                    <span className="text-[10px] text-muted-foreground font-mono">sk-...</span>
                  </div>
                  <div className="relative">
                    <Input
                      type={showKeys["openai"] ? "text" : "password"}
                      value={formState.apiKeys.openai || ""}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          apiKeys: { ...formState.apiKeys, openai: e.target.value },
                        })
                      }
                      placeholder="sk-proj-..."
                    />
                    <button
                      type="button"
                      onClick={() => toggleShowKey("openai")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showKeys["openai"] ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Anthropic Key */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-semibold text-foreground text-xs">
                      Anthropic API Key (Claude 3.5 Sonnet)
                    </label>
                    <span className="text-[10px] text-muted-foreground font-mono">sk-ant-...</span>
                  </div>
                  <div className="relative">
                    <Input
                      type={showKeys["anthropic"] ? "text" : "password"}
                      value={formState.apiKeys.anthropic || ""}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          apiKeys: { ...formState.apiKeys, anthropic: e.target.value },
                        })
                      }
                      placeholder="sk-ant-api03-..."
                    />
                    <button
                      type="button"
                      onClick={() => toggleShowKey("anthropic")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showKeys["anthropic"] ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Google Gemini Key */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-semibold text-foreground text-xs">
                      Google Gemini API Key (Gemini 1.5 Pro)
                    </label>
                    <span className="text-[10px] text-muted-foreground font-mono">AIzaSy...</span>
                  </div>
                  <div className="relative">
                    <Input
                      type={showKeys["google"] ? "text" : "password"}
                      value={formState.apiKeys.google || ""}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          apiKeys: { ...formState.apiKeys, google: e.target.value },
                        })
                      }
                      placeholder="AIzaSy..."
                    />
                    <button
                      type="button"
                      onClick={() => toggleShowKey("google")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showKeys["google"] ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3.5 text-xs text-emerald-600 dark:text-emerald-400 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Shield className="h-4 w-4" />
                    <span>Client-Side Encryption Guarantee</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    API keys are stored strictly in your browser&apos;s encrypted Local Storage and Chrome Extension storage.
                    EchoGPT servers never see or log your secret credentials.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 4. CONTEXT & PRIVACY TAB */}
          {activeTab === "context" && (
            <div className="space-y-6 text-xs">
              <div>
                <h2 className="text-base font-bold text-foreground">Context & Privacy</h2>
                <p className="text-muted-foreground text-xs mt-0.5">
                  Control what webpage data EchoGPT can see and how it is sanitized.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-border/60">
                <div className="flex items-center justify-between rounded-xl border border-border bg-muted/20 p-4">
                  <div className="space-y-0.5">
                    <div className="font-semibold text-foreground">Auto-Extract Webpage Context</div>
                    <div className="text-muted-foreground text-[11px]">
                      Parse active tab text whenever the Chrome Side Panel is opened.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={formState.autoExtractContext}
                    onChange={(e) =>
                      setFormState({ ...formState, autoExtractContext: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-border text-primary accent-primary"
                  />
                </div>

                <div className="rounded-xl border border-border bg-background p-4 space-y-2">
                  <div className="font-bold text-foreground">DOM Sanitation Rules</div>
                  <ul className="space-y-1 text-muted-foreground text-[11px] list-disc pl-4">
                    <li>Strict exclusion of password inputs, credit card fields, and OAuth tokens</li>
                    <li>Automatic stripping of ads, cookie banners, tracking pixels, and navigation scripts</li>
                    <li>DOM truncation at 16,000 characters to prevent prompt bloat</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* 5. KEYBOARD SHORTCUTS TAB */}
          {activeTab === "shortcuts" && (
            <div className="space-y-6 text-xs">
              <div>
                <h2 className="text-base font-bold text-foreground">Keyboard Shortcuts</h2>
                <p className="text-muted-foreground text-xs mt-0.5">
                  Speed up your workflow with global and workspace keyboard hotkeys.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-border/60">
                {[
                  {
                    desc: "Toggle Chrome Side Panel globally",
                    keys: ["Ctrl", "Shift", "E"],
                    note: "Works across all Chrome tabs",
                  },
                  {
                    desc: "Open Command Palette",
                    keys: ["Ctrl / ⌘", "K"],
                    note: "Search chats, switch models, run actions",
                  },
                  {
                    desc: "Send message",
                    keys: ["Enter"],
                    note: "Submit prompt",
                  },
                  {
                    desc: "New line in composer",
                    keys: ["Shift", "Enter"],
                    note: "Multiline editing",
                  },
                  {
                    desc: "Close dialog or modal",
                    keys: ["Escape"],
                    note: "Dismiss active overlay",
                  },
                ].map((sc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-xl border border-border/70 bg-background p-3.5"
                  >
                    <div>
                      <div className="font-semibold text-foreground">{sc.desc}</div>
                      <div className="text-[10px] text-muted-foreground">{sc.note}</div>
                    </div>
                    <div className="flex items-center gap-1 font-mono">
                      {sc.keys.map((k, ki) => (
                        <kbd
                          key={ki}
                          className="rounded bg-muted px-2 py-0.5 border border-border text-[11px] font-bold text-foreground"
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. ACCOUNT TAB */}
          {activeTab === "account" && (
            <div className="space-y-6 text-xs">
              <div>
                <h2 className="text-base font-bold text-foreground">Account & Session</h2>
                <p className="text-muted-foreground text-xs mt-0.5">
                  Manage your user profile and active Chrome extension license.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-border/60">
                <div className="flex items-center gap-4 rounded-xl border border-border bg-muted/30 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-500 font-bold text-base border border-emerald-500/30">
                    EG
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm">engineer@echogpt.live</h3>
                    <p className="text-muted-foreground text-[11px]">
                      EchoGPT Pro Member · Connected to Chrome Side Panel (v{AUTHENTIC_EXTENSION_INFO.version})
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-border bg-background p-4">
                  <div>
                    <div className="font-bold text-foreground">Active Extension Version</div>
                    <div className="text-muted-foreground text-[11px]">
                      Updated {AUTHENTIC_EXTENSION_INFO.lastUpdated} on Chrome Web Store
                    </div>
                  </div>
                  <Badge variant="success" size="sm">
                    Latest Build
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
