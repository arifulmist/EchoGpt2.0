"use client";

import { ChromeIcon as Chrome } from "@/components/shared/ChromeIcon";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Command } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setIsCommandPaletteOpen } = useApp();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border glass-nav" role="banner">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Logo size="md" />

        {/* Desktop Navigation Links */}
        <nav aria-label="Global navigation" className="hidden md:flex items-center gap-7 text-sm font-medium text-muted-foreground">
          <Link
            href="/workspace"
            className="hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <span>Workspace</span>
            <span className="rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-1.5 py-0.2 text-[10px] font-semibold">
              Live
            </span>
          </Link>
          <a href="#compare" className="hover:text-foreground transition-colors">
            Compare AI
          </a>
          <Link
            href="/extension"
            className="hover:text-foreground transition-colors flex items-center gap-1"
          >
            <Chrome className="h-3.5 w-3.5 text-amber-500" />
            <span>Side Panel</span>
          </Link>
          <a href="#features" className="hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#models" className="hover:text-foreground transition-colors">
            Models
          </a>
          <a href="#faq" className="hover:text-foreground transition-colors">
            FAQ
          </a>
        </nav>

        {/* Right CTA and Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          {/* Quick Command Palette trigger */}
          <button
            type="button"
            onClick={() => setIsCommandPaletteOpen(true)}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus-visible:ring-1 focus-visible:ring-primary"
            aria-label="Open command palette (Cmd+K)"
            title="Open command palette (Cmd+K)"
          >
            <Command className="h-3 w-3" />
            <span>K</span>
          </button>

          <ThemeToggle />

          <Link href="/extension">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <Chrome className="h-3.5 w-3.5 text-amber-500" />
              <span>Chrome Store</span>
            </Button>
          </Link>

          <Link href="/workspace">
            <Button size="sm" className="gap-1.5 text-xs font-semibold shadow-xs">
              <span>Launch App</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-card/95 backdrop-blur-md px-4 pt-3 pb-6 animate-in slide-in-from-top-2">
          <nav aria-label="Mobile navigation" className="flex flex-col space-y-3 text-sm font-medium">
            <Link
              href="/workspace"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-foreground hover:bg-muted"
            >
              <span>Workspace App</span>
              <span className="text-xs text-primary font-bold">Open</span>
            </Link>
            <a
              href="#compare"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              Compare AI Responses
            </a>
            <Link
              href="/extension"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Chrome className="h-4 w-4 text-amber-500" />
              <span>Chrome Side Panel Simulator</span>
            </Link>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              Features
            </a>
            <a
              href="#models"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              Supported Models
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              FAQ
            </a>

            <div className="pt-3 border-t border-border flex flex-col gap-2">
              <Link href="/workspace" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full justify-center text-xs">
                  Launch EchoGPT Workspace
                </Button>
              </Link>
              <Link href="/extension" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-center text-xs gap-2">
                  <Chrome className="h-4 w-4 text-amber-500" />
                  Chrome Extension Simulator
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
