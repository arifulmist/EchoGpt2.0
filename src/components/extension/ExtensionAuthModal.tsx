"use client";

import React, { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Check } from "lucide-react";

interface ExtensionAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  onLoginSuccess: (email: string) => void;
  onLogout: () => void;
}

export function ExtensionAuthModal({
  isOpen,
  onClose,
  isLoggedIn,
  onLoginSuccess,
  onLogout,
}: ExtensionAuthModalProps) {
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState<string>("engineer@echogpt.live");
  const [password, setPassword] = useState<string>("••••••••••••");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(email);
      setSuccessMessage("Successfully authenticated! Synced with EchoGPT cloud.");
      setTimeout(() => {
        setSuccessMessage("");
        onClose();
      }, 1000);
    }, 600);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess("google.user@echogpt.live");
      setSuccessMessage("Signed in with Google Account!");
      setTimeout(() => {
        setSuccessMessage("");
        onClose();
      }, 1000);
    }, 600);
  };

  if (isLoggedIn) {
    return (
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        title="EchoGPT Account"
        description="Active Chrome Side Panel session"
        maxWidth="sm"
      >
        <div className="space-y-4 text-xs">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500 font-bold text-sm border border-emerald-500/30">
              EG
            </div>
            <div>
              <div className="font-bold text-foreground text-sm">engineer@echogpt.live</div>
              <div className="text-[11px] text-muted-foreground flex items-center gap-1.5 mt-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>Pro Plan · BYOK Active</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-2.5 text-[11px] text-emerald-600 dark:text-emerald-400">
            Secure token stored in chrome.storage.local. Side panel session active across all tabs.
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border/60">
            <Button variant="outline" size="sm" onClick={onClose} className="text-xs">
              Close
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="text-xs"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </Dialog>
    );
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={tab === "signin" ? "Sign in to EchoGPT" : "Create EchoGPT Account"}
      description="Sync conversations, custom keys, and side panel preferences"
      maxWidth="sm"
    >
      <div className="space-y-4 text-xs">
        {/* Google 1-Click Sign In */}
        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full justify-center gap-2 text-xs h-9 font-medium border-border/80 hover:bg-muted"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </Button>

        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/80" />
          </div>
          <span className="relative bg-card px-2 text-[10px] uppercase text-muted-foreground font-mono">
            Or with email
          </span>
        </div>

        {/* Email / Password Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-foreground">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              required
              icon={<Mail className="h-3.5 w-3.5 text-muted-foreground" />}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-foreground">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              icon={<Lock className="h-3.5 w-3.5 text-muted-foreground" />}
            />
          </div>

          {successMessage && (
            <div className="rounded-lg bg-emerald-500/10 p-2 text-[11px] text-emerald-500 flex items-center gap-1.5 font-medium">
              <Check className="h-3.5 w-3.5" />
              <span>{successMessage}</span>
            </div>
          )}

          <Button type="submit" isLoading={isLoading} className="w-full text-xs h-9 font-semibold">
            {tab === "signin" ? "Sign In to Side Panel" : "Create Account"}
          </Button>
        </form>

        {/* Tab Switcher */}
        <div className="text-center pt-2 border-t border-border/50 text-[11px] text-muted-foreground">
          {tab === "signin" ? (
            <span>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => setTab("signup")}
                className="text-primary font-semibold hover:underline"
              >
                Sign up free
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setTab("signin")}
                className="text-primary font-semibold hover:underline"
              >
                Sign in
              </button>
            </span>
          )}
        </div>
      </div>
    </Dialog>
  );
}
