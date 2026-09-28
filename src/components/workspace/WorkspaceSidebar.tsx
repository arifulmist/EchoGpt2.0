"use client";

import { ChromeIcon as Chrome } from "@/components/shared/ChromeIcon";
import React, { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Star,
  Settings,
  Trash2,
  Edit2,
  Check,
  X,
  MessageSquare,
  Columns3,
} from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ModelIcon } from "@/components/shared/ModelIcon";
import { useApp } from "@/context/AppContext";
import { MOCK_COLLECTIONS } from "@/data/mockData";
import { formatDate, cn } from "@/lib/utils";

export function WorkspaceSidebar() {
  const {
    conversations,
    activeConversationId,
    setActiveConversationId,
    createNewConversation,
    deleteConversation,
    renameConversation,
    toggleFavorite,
    searchQuery,
    setSearchQuery,
    filterFavoritesOnly,
    setFilterFavoritesOnly,
    activeCollectionFilter,
    setActiveCollectionFilter,
    isSidebarOpen,
    setIsSidebarOpen,
    isCompareMode,
    setIsCompareMode,
    clearAllConversations,
  } = useApp();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");
  const [isConfirmingClear, setIsConfirmingClear] = useState<boolean>(false);

  // Filter conversations
  const filteredConversations = conversations.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.preview.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFav = !filterFavoritesOnly || c.isFavorite;
    const matchesCollection =
      !activeCollectionFilter || c.collectionId === activeCollectionFilter;
    return matchesSearch && matchesFav && matchesCollection;
  });

  const handleStartRename = (id: string, currentTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(id);
    setEditTitle(currentTitle);
  };

  const handleSaveRename = (id: string, e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    if (editTitle.trim()) {
      renameConversation(id, editTitle.trim());
    }
    setEditingId(null);
  };

  const handleCancelRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(null);
  };

  return (
    <>
      {/* Mobile Backdrop overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
        />
      )}

      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-40 flex flex-col w-72 md:w-80 border-r border-border bg-sidebar text-sidebar-foreground transition-transform duration-200 ease-in-out md:static md:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Sidebar Header & Brand */}
        <div className="flex items-center justify-between border-b border-sidebar-border px-4 py-3.5">
          <Logo size="sm" asLink={true} />
          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden rounded-lg p-1 text-muted-foreground hover:bg-muted"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Primary Action Buttons */}
        <div className="p-3 space-y-2 border-b border-sidebar-border/80">
          <Button
            onClick={() => {
              createNewConversation();
              if (window.innerWidth < 768) setIsSidebarOpen(false);
            }}
            className="w-full justify-start gap-2 shadow-xs text-xs font-semibold"
          >
            <Plus className="h-4 w-4" />
            <span>New Chat</span>
          </Button>

          <button
            type="button"
            onClick={() => setIsCompareMode(!isCompareMode)}
            className={cn(
              "w-full flex items-center justify-between rounded-lg border px-3 py-1.5 text-xs transition-colors",
              isCompareMode
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-500 font-semibold"
                : "border-sidebar-border bg-card/60 text-muted-foreground hover:bg-card hover:text-foreground"
            )}
          >
            <div className="flex items-center gap-2">
              <Columns3 className="h-3.5 w-3.5" />
              <span>Multi-Model Compare</span>
            </div>
            <Badge variant={isCompareMode ? "success" : "outline"} size="sm">
              {isCompareMode ? "Active" : "Toggle"}
            </Badge>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-3 pb-2 space-y-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="w-full rounded-lg border border-sidebar-border bg-card/80 pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Quick Filter Chips */}
          <div className="flex items-center gap-1.5 text-xs overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => {
                setFilterFavoritesOnly(!filterFavoritesOnly);
              }}
              className={cn(
                "flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] transition-colors shrink-0",
                filterFavoritesOnly
                  ? "bg-amber-500/20 text-amber-500 font-medium border border-amber-500/30"
                  : "bg-sidebar-accent/50 text-muted-foreground hover:text-foreground"
              )}
            >
              <Star className={cn("h-3 w-3", filterFavoritesOnly && "fill-amber-500")} />
              <span>Starred</span>
            </button>

            {MOCK_COLLECTIONS.slice(0, 2).map((col) => {
              const isSelected = activeCollectionFilter === col.id;
              return (
                <button
                  key={col.id}
                  type="button"
                  onClick={() =>
                    setActiveCollectionFilter(isSelected ? null : col.id)
                  }
                  className={cn(
                    "rounded-md px-2 py-0.5 text-[11px] transition-colors shrink-0 truncate max-w-[120px]",
                    isSelected
                      ? "bg-primary/20 text-primary font-medium border border-primary/30"
                      : "bg-sidebar-accent/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  {col.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Conversations List Header & Counter */}
        <div className="px-3 pt-2 pb-1 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>{filteredConversations.length} Threads</span>
          {isConfirmingClear ? (
            <div className="flex items-center gap-1.5 text-[10px]">
              <span className="text-rose-500 font-semibold">Clear all?</span>
              <button
                type="button"
                onClick={() => {
                  clearAllConversations();
                  setIsConfirmingClear(false);
                }}
                className="text-rose-500 font-bold hover:underline"
              >
                Yes
              </button>
              <span>/</span>
              <button
                type="button"
                onClick={() => setIsConfirmingClear(false)}
                className="hover:underline"
              >
                No
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsConfirmingClear(true)}
              className="hover:text-rose-500 text-[10px] transition-colors"
              title="Clear all conversations"
            >
              Clear
            </button>
          )}
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto px-2 py-1 space-y-1">
          {filteredConversations.length === 0 ? (
            <div className="py-8 text-center text-xs text-muted-foreground space-y-1">
              <MessageSquare className="h-6 w-6 mx-auto opacity-30 mb-2" />
              <p>No conversations found</p>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-primary text-[11px] underline"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            filteredConversations.map((conv) => {
              const isActive = activeConversationId === conv.id;
              const isEditing = editingId === conv.id;

              return (
                <div
                  key={conv.id}
                  onClick={() => {
                    setActiveConversationId(conv.id);
                    if (window.innerWidth < 768) setIsSidebarOpen(false);
                  }}
                  className={cn(
                    "group relative flex items-center justify-between rounded-xl px-2.5 py-2 text-xs cursor-pointer transition-all duration-150",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-xs"
                      : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <ModelIcon modelId={conv.modelId} size="sm" />

                    {isEditing ? (
                      <div className="flex items-center gap-1 flex-1" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSaveRename(conv.id, e);
                            if (e.key === "Escape") setEditingId(null);
                          }}
                          className="w-full bg-background border border-primary rounded px-1.5 py-0.5 text-xs text-foreground focus:outline-none"
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={(e) => handleSaveRename(conv.id, e)}
                          className="p-1 text-emerald-500 hover:bg-muted rounded"
                        >
                          <Check className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelRename}
                          className="p-1 text-muted-foreground hover:bg-muted rounded"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="truncate text-foreground font-medium">
                            {conv.title}
                          </span>
                          {conv.isFavorite && (
                            <Star className="h-3 w-3 fill-amber-500 text-amber-500 shrink-0" />
                          )}
                        </div>
                        <span className="text-[10px] text-muted-foreground block truncate">
                          {formatDate(conv.updatedAt)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Hover Actions */}
                  {!isEditing && (
                    <div className="hidden group-hover:flex items-center gap-0.5 text-muted-foreground pl-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(conv.id);
                        }}
                        className="rounded p-1 hover:text-amber-500 hover:bg-muted"
                        aria-label="Star conversation"
                      >
                        <Star className={cn("h-3 w-3", conv.isFavorite && "fill-amber-500 text-amber-500")} />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleStartRename(conv.id, conv.title, e)}
                        className="rounded p-1 hover:text-foreground hover:bg-muted"
                        aria-label="Rename conversation"
                      >
                        <Edit2 className="h-3 w-3" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteConversation(conv.id);
                        }}
                        className="rounded p-1 hover:text-rose-500 hover:bg-muted"
                        aria-label="Delete conversation"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Sidebar Footer Navigation */}
        <div className="border-t border-sidebar-border p-3 space-y-1 text-xs">
          <Link
            href="/extension"
            className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors"
          >
            <div className="flex items-center gap-2">
              <Chrome className="h-4 w-4 text-amber-500" />
              <span>Chrome Side Panel</span>
            </div>
            <Badge variant="outline" size="sm" className="text-[10px]">
              Ctrl+Shift+E
            </Badge>
          </Link>

          <Link
            href="/settings"
            className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span>Settings & API Keys</span>
          </Link>

          {/* User Profile Snippet */}
          <div className="pt-2 border-t border-sidebar-border/60 flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-xs border border-emerald-500/30">
                EG
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-foreground truncate">Engineer Workspace</div>
                <div className="text-[10px] text-muted-foreground truncate">BYOK Active · v1.0.5</div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
