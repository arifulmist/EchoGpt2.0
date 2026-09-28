"use client";

import React, { useState } from "react";
import { X, Moon, Sun, Laptop, Key, Keyboard, Check } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AUTHENTIC_EXTENSION_INFO } from "@/data/mockData";

interface ExtensionSettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExtensionSettingsDrawer({ isOpen, onClose }: ExtensionSettingsDrawerProps) {
  const {
    settings,
    updateSettings,
    models,
    theme,
    setTheme,
  } = useApp();

  const [savedFeedback, setSavedFeedback] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setSavedFeedback(true);
    setTimeout(() => {
      setSavedFeedback(false);
      onClose();
    }, 800);
  };

  return (
    <div className="absolute inset-0 z-30 bg-card flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
      {/* Drawer Header */}
      <div className="flex items-center justify-between border-b border-border/80 px-4 py-3 bg-muted/40">
        <div>
          <h3 className="text-xs font-bold text-foreground">Side Panel Settings</h3>
          <p className="text-[10px] text-muted-foreground">Version {AUTHENTIC_EXTENSION_INFO.version}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Close settings"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Drawer Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {/* Default Model */}
        <div className="space-y-1.5">
          <label className="font-semibold text-foreground text-[11px] block">
            Default AI Model
          </label>
          <select
            value={settings.defaultModel}
            onChange={(e) => updateSettings({ defaultModel: e.target.value })}
            className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {models.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.speed})
              </option>
            ))}
          </select>
        </div>

        {/* Theme Preference */}
        <div className="space-y-1.5">
          <label className="font-semibold text-foreground text-[11px] block">
            Appearance
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={`flex items-center justify-center gap-1.5 rounded-lg border py-1.5 text-xs font-medium transition-all ${
                theme === "dark"
                  ? "border-primary bg-primary/10 text-primary font-semibold"
                  : "border-border bg-background text-muted-foreground hover:bg-muted"
              }`}
            >
              <Moon className="h-3 w-3" />
              <span>Dark</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme("light")}
              className={`flex items-center justify-center gap-1.5 rounded-lg border py-1.5 text-xs font-medium transition-all ${
                theme === "light"
                  ? "border-primary bg-primary/10 text-primary font-semibold"
                  : "border-border bg-background text-muted-foreground hover:bg-muted"
              }`}
            >
              <Sun className="h-3 w-3" />
              <span>Light</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme("system")}
              className={`flex items-center justify-center gap-1.5 rounded-lg border py-1.5 text-xs font-medium transition-all ${
                theme === "system"
                  ? "border-primary bg-primary/10 text-primary font-semibold"
                  : "border-border bg-background text-muted-foreground hover:bg-muted"
              }`}
            >
              <Laptop className="h-3 w-3" />
              <span>System</span>
            </button>
          </div>
        </div>

        {/* Page Context Auto-Extraction Toggle */}
        <div className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/20 p-3">
          <div className="space-y-0.5 pr-2">
            <div className="font-semibold text-foreground text-[11px]">
              Active Page Context
            </div>
            <div className="text-[10px] text-muted-foreground leading-relaxed">
              Automatically extract article text when opening sidebar
            </div>
          </div>
          <input
            type="checkbox"
            checked={settings.autoExtractContext}
            onChange={(e) => updateSettings({ autoExtractContext: e.target.checked })}
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary accent-primary"
          />
        </div>

        {/* Global Keyboard Shortcut */}
        <div className="rounded-xl border border-border/70 bg-muted/20 p-3 space-y-1">
          <div className="flex items-center justify-between text-[11px] font-semibold text-foreground">
            <span className="flex items-center gap-1.5">
              <Keyboard className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Toggle Side Panel</span>
            </span>
            <kbd className="rounded bg-card px-2 py-0.5 border border-border font-mono text-[10px] font-bold text-primary">
              Ctrl+Shift+E
            </kbd>
          </div>
          <p className="text-[10px] text-muted-foreground">
            Configurable in chrome://extensions/shortcuts
          </p>
        </div>

        {/* BYOK API Keys status */}
        <div className="rounded-xl border border-border/70 bg-muted/20 p-3 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-semibold text-foreground">
            <span className="flex items-center gap-1.5">
              <Key className="h-3.5 w-3.5 text-emerald-500" />
              <span>Encrypted Local Keys (BYOK)</span>
            </span>
            <Badge variant="success" size="sm">
              4 Active
            </Badge>
          </div>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            API keys are stored directly in Chrome Local Storage. Open full Web App Settings for key rotation.
          </p>
        </div>
      </div>

      {/* Drawer Footer */}
      <div className="border-t border-border/80 p-3 bg-card flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onClose} className="text-xs">
          Cancel
        </Button>
        <Button size="sm" onClick={handleSave} className="text-xs font-semibold gap-1">
          {savedFeedback ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span>Saved</span>
            </>
          ) : (
            <span>Apply Changes</span>
          )}
        </Button>
      </div>
    </div>
  );
}
