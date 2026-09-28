"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { copyToClipboard, cn } from "@/lib/utils";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  // Parse code blocks, tables, headers, lists, quotes, and inline styles
  const renderFormatted = (text: string) => {
    const blocks = text.split("\n\n");

    return blocks.map((block, blockIndex) => {
      // 1. Fenced Code Block ```lang ... ```
      if (block.startsWith("```")) {
        const lines = block.split("\n");
        const firstLine = lines[0].replace("```", "").trim();
        const language = firstLine || "typescript";
        const code = lines.slice(1, lines[lines.length - 1].startsWith("```") ? -1 : undefined).join("\n");

        return <CodeBlock key={blockIndex} code={code} language={language} />;
      }

      // 2. Markdown Table
      if (block.includes("|") && block.split("\n").some((l) => l.trim().startsWith("|"))) {
        const rows = block
          .split("\n")
          .map((r) => r.trim())
          .filter((r) => r.startsWith("|") && r.endsWith("|"));

        if (rows.length >= 2) {
          const headerRow = rows[0]
            .split("|")
            .slice(1, -1)
            .map((c) => c.trim());
          const bodyRows = rows
            .slice(2)
            .map((r) =>
              r
                .split("|")
                .slice(1, -1)
                .map((c) => c.trim())
            );

          return (
            <div key={blockIndex} className="my-3 overflow-x-auto rounded-lg border border-border/70">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-muted/60 text-foreground font-semibold border-b border-border">
                  <tr>
                    {headerRow.map((h, i) => (
                      <th key={i} className="px-3 py-2">
                        {renderInline(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {bodyRows.map((r, ri) => (
                    <tr key={ri} className="hover:bg-muted/30 transition-colors">
                      {r.map((c, ci) => (
                        <td key={ci} className="px-3 py-2 text-muted-foreground">
                          {renderInline(c)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
      }

      // 3. Blockquote
      if (block.startsWith(">")) {
        const quoteText = block
          .split("\n")
          .map((l) => l.replace(/^>\s?/, ""))
          .join(" ");
        return (
          <blockquote
            key={blockIndex}
            className="my-3 border-l-2 border-primary pl-3 italic text-muted-foreground bg-primary/5 py-1.5 rounded-r-md"
          >
            {renderInline(quoteText)}
          </blockquote>
        );
      }

      // 4. Headings
      if (block.startsWith("### ")) {
        return (
          <h4 key={blockIndex} className="mt-4 mb-2 text-sm font-bold text-foreground tracking-tight">
            {renderInline(block.replace("### ", ""))}
          </h4>
        );
      }
      if (block.startsWith("## ")) {
        return (
          <h3 key={blockIndex} className="mt-5 mb-2 text-base font-bold text-foreground tracking-tight">
            {renderInline(block.replace("## ", ""))}
          </h3>
        );
      }
      if (block.startsWith("# ")) {
        return (
          <h2 key={blockIndex} className="mt-6 mb-3 text-lg font-bold text-foreground tracking-tight">
            {renderInline(block.replace("# ", ""))}
          </h2>
        );
      }

      // 5. Unordered / Ordered Lists
      const lines = block.split("\n");
      const isBulletList = lines.every((l) => /^\s*([*•-]|\d+\.)\s/.test(l));

      if (isBulletList && lines.length > 0) {
        return (
          <ul key={blockIndex} className="my-2.5 space-y-1 pl-4 text-xs md:text-sm list-disc marker:text-primary">
            {lines.map((line, li) => {
              const cleaned = line.replace(/^\s*([*•-]|\d+\.)\s/, "");
              return (
                <li key={li} className="text-foreground/90 leading-relaxed">
                  {renderInline(cleaned)}
                </li>
              );
            })}
          </ul>
        );
      }

      // 6. Regular Paragraph
      return (
        <p key={blockIndex} className="my-2 text-xs md:text-sm text-foreground/90 leading-relaxed">
          {lines.map((l, li) => (
            <React.Fragment key={li}>
              {renderInline(l)}
              {li < lines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      );
    });
  };

  // Inline formatting: bold, italic, inline code, links
  const renderInline = (text: string) => {
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let keyIdx = 0;

    while (remaining.length > 0) {
      // Inline Code: `code`
      const codeMatch = remaining.match(/^([\s\S]*?)`([^`]+)`([\s\S]*)$/);
      // Bold: **text**
      const boldMatch = remaining.match(/^([\s\S]*?)\*\*([^*]+)\*\*([\s\S]*)$/);
      // Italic: *text*
      const italicMatch = remaining.match(/^([\s\S]*?)\*([^*]+)\*([\s\S]*)$/);

      // Find earliest match
      let earliest: "code" | "bold" | "italic" | null = null;
      let minPos = Infinity;

      if (codeMatch && codeMatch[1].length < minPos) {
        minPos = codeMatch[1].length;
        earliest = "code";
      }
      if (boldMatch && boldMatch[1].length < minPos) {
        minPos = boldMatch[1].length;
        earliest = "bold";
      }
      if (italicMatch && italicMatch[1].length < minPos) {
        minPos = italicMatch[1].length;
        earliest = "italic";
      }

      if (earliest === "code" && codeMatch) {
        if (codeMatch[1]) parts.push(<span key={keyIdx++}>{codeMatch[1]}</span>);
        parts.push(
          <code
            key={keyIdx++}
            className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] md:text-xs text-primary font-medium"
          >
            {codeMatch[2]}
          </code>
        );
        remaining = codeMatch[3];
      } else if (earliest === "bold" && boldMatch) {
        if (boldMatch[1]) parts.push(<span key={keyIdx++}>{boldMatch[1]}</span>);
        parts.push(
          <strong key={keyIdx++} className="font-semibold text-foreground">
            {boldMatch[2]}
          </strong>
        );
        remaining = boldMatch[3];
      } else if (earliest === "italic" && italicMatch) {
        if (italicMatch[1]) parts.push(<span key={keyIdx++}>{italicMatch[1]}</span>);
        parts.push(
          <em key={keyIdx++} className="italic text-foreground/90">
            {italicMatch[2]}
          </em>
        );
        remaining = italicMatch[3];
      } else {
        parts.push(<span key={keyIdx++}>{remaining}</span>);
        break;
      }
    }

    return <>{parts}</>;
  };

  return <div className={cn("markdown-body prose-sm max-w-none space-y-1", className)}>{renderFormatted(content)}</div>;
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="group relative my-3 overflow-hidden rounded-xl border border-border/80 bg-zinc-950 text-zinc-100 shadow-md">
      {/* Code Header bar */}
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/90 px-3.5 py-1.5 text-xs text-zinc-400 font-mono">
        <span className="uppercase tracking-wider text-[11px] text-zinc-400">{language}</span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          className="flex items-center gap-1 rounded px-2 py-0.5 text-[11px] hover:bg-zinc-800 hover:text-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code body */}
      <pre className="overflow-x-auto p-3.5 text-xs leading-relaxed font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}
