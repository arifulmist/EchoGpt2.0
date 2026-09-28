"use client";

import React, { useState } from "react";
import { X, Search, Plus, Trash2, Clock } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { ModelIcon } from "@/components/shared/ModelIcon";
import { Button } from "@/components/ui/button";
import { formatDate, cn } from "@/lib/utils";

interface ExtensionHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExtensionHistoryDrawer({ isOpen, onClose }: ExtensionHistoryDrawerProps) {
  const {
    conversations,
    activeConversationId,
    setActiveConversationId,
    createNewConversation,
    deleteConversation,
  } = useApp();

  const [query, setQuery] = useState("");

  if (!isOpen) return null;

  const filtered = conversations.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.preview.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="absolute inset-0 z-30 bg-card flex flex-col overflow-hidden animate-in slide-in-from-left duration-200">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/80 px-4 py-3 bg-muted/40">
        <h3 className="text-xs font-bold text-foreground">Recent Sessions</h3>
        <button
          type="button"
          onClick={onClose}
          className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Close history"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Search & New Chat */}
      <div className="p-3 border-b border-border/60 space-y-2">
        <Button
          size="sm"
          onClick={() => {
            createNewConversation();
            onClose();
          }}
          className="w-full justify-center gap-1.5 text-xs h-8 font-semibold"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New Thread</span>
        </Button>

        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search past chats..."
            className="w-full rounded-lg border border-border bg-background pl-8 pr-3 py-1 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filtered.length === 0 ? (
          <div className="py-8 text-center text-xs text-muted-foreground">
            No matching conversations
          </div>
        ) : (
          filtered.map((conv) => {
            const isActive = conv.id === activeConversationId;
            return (
              <div
                key={conv.id}
                onClick={() => {
                  setActiveConversationId(conv.id);
                  onClose();
                }}
                className={cn(
                  "group flex items-center justify-between rounded-lg p-2 text-xs cursor-pointer transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary font-semibold border border-primary/20"
                    : "text-foreground hover:bg-muted"
                )}
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <ModelIcon modelId={conv.modelId} size="sm" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">{conv.title}</div>
                    <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5" />
                      <span>{formatDate(conv.updatedAt)}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteConversation(conv.id);
                  }}
                  className="rounded p-1 text-muted-foreground hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Delete conversation"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
