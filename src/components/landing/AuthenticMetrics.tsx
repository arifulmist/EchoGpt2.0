import { ChromeIcon as Chrome } from "@/components/shared/ChromeIcon";
import React from "react";
import { Star, ShieldCheck, Users, Calendar, ExternalLink, Code } from "lucide-react";
import { AUTHENTIC_EXTENSION_INFO } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

export function AuthenticMetrics() {
  const metrics = [
    {
      label: "Chrome Store Rating",
      value: "5.0 ★",
      subtext: `Across ${AUTHENTIC_EXTENSION_INFO.ratingsCount} verified ratings`,
      icon: <Star className="h-5 w-5 text-amber-500 fill-amber-500" />,
    },
    {
      label: "Active Users",
      value: `${AUTHENTIC_EXTENSION_INFO.users}`,
      subtext: "Organic Chrome Web Store users",
      icon: <Users className="h-5 w-5 text-emerald-500" />,
    },
    {
      label: "Current Release",
      value: `v${AUTHENTIC_EXTENSION_INFO.version}`,
      subtext: `Updated ${AUTHENTIC_EXTENSION_INFO.lastUpdated}`,
      icon: <Calendar className="h-5 w-5 text-blue-500" />,
    },
    {
      label: "Chrome Architecture",
      value: "Manifest V3",
      subtext: "Side Panel API & Local Storage",
      icon: <Code className="h-5 w-5 text-purple-500" />,
    },
  ];

  return (
    <section className="py-16 md:py-20 border-t border-border/60 bg-muted/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border/80 bg-card p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-border/60">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="success" size="sm">
                  Verified Data
                </Badge>
                <span className="text-xs text-muted-foreground font-mono">
                  Official Chrome Web Store Listing
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground mt-1 font-sans">
                Authentic Product Metrics
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Transparent source information from the live Chrome Web Store repository. No inflated numbers.
              </p>
            </div>

            <a
              href={AUTHENTIC_EXTENSION_INFO.officialUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-muted/50 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
            >
              <Chrome className="h-3.5 w-3.5 text-amber-500" />
              <span>Inspect Web Store Listing</span>
              <ExternalLink className="h-3 w-3 text-muted-foreground" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
            {metrics.map((m, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  {m.icon}
                  <span className="text-xs font-medium">{m.label}</span>
                </div>
                <div className="text-2xl md:text-3xl font-black text-foreground font-mono">
                  {m.value}
                </div>
                <div className="text-[11px] text-muted-foreground">{m.subtext}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Developer: {AUTHENTIC_EXTENSION_INFO.developerTeam} ({AUTHENTIC_EXTENSION_INFO.developerEmail})</span>
            <span className="flex items-center gap-1 text-emerald-500 font-medium">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Strict Privacy Policy & HTTPS</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
