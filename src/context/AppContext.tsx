"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from "react";
import {
  AIModel,
  Conversation,
  ChatMessage,
  PageContext,
  UserSettings,
  CompareSession,
  CompareModelResponse,
} from "@/types";
import {
  AI_MODELS,
  MOCK_CONVERSATIONS,
  DEMO_PAGES,
  DEFAULT_USER_SETTINGS,
  COMPARE_PRESETS,
} from "@/data/mockData";

interface AppContextType {
  // Models
  models: AIModel[];
  activeModelId: string;
  activeModel: AIModel;
  setActiveModelId: (id: string) => void;

  // Conversations
  conversations: Conversation[];
  activeConversationId: string;
  activeConversation: Conversation | undefined;
  setActiveConversationId: (id: string) => void;
  createNewConversation: (modelId?: string) => string;
  deleteConversation: (id: string) => void;
  renameConversation: (id: string, newTitle: string) => void;
  toggleFavorite: (id: string) => void;
  setConversationCollection: (id: string, collectionId?: string) => void;

  // Chat Actions
  isStreaming: boolean;
  sendMessage: (content: string, modelIdOverride?: string) => Promise<void>;
  regenerateLastResponse: () => Promise<void>;
  setMessageReaction: (messageId: string, reaction: "up" | "down" | null) => void;

  // Compare Mode
  isCompareMode: boolean;
  setIsCompareMode: (val: boolean) => void;
  compareModelIds: string[];
  setCompareModelIds: (ids: string[]) => void;
  activeCompareSession: CompareSession;
  runCompare: (prompt: string, modelIds?: string[]) => Promise<void>;
  loadComparePreset: (index: number) => void;

  // Page Context
  activePageContext: PageContext;
  setActivePageContext: (ctx: PageContext) => void;
  switchDemoPage: (index: number) => void;
  togglePageContextEnabled: () => void;
  updateSelectedText: (text: string) => void;

  // Settings & Theme
  theme: "dark" | "light" | "system";
  setTheme: (theme: "dark" | "light" | "system") => void;
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;

  // Filtering & UI State
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterFavoritesOnly: boolean;
  setFilterFavoritesOnly: (val: boolean) => void;
  activeCollectionFilter: string | null;
  setActiveCollectionFilter: (id: string | null) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (val: boolean) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [models] = useState<AIModel[]>(AI_MODELS);
  const [activeModelId, setActiveModelId] = useState<string>("gpt-4o");
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [activeConversationId, setActiveConversationId] = useState<string>("conv-1");
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  // Compare Mode
  const [isCompareMode, setIsCompareMode] = useState<boolean>(false);
  const [compareModelIds, setCompareModelIds] = useState<string[]>([
    "gpt-4o",
    "claude-3-5-sonnet",
    "gemini-1-5-pro",
  ]);
  const [activeCompareSession, setActiveCompareSession] = useState<CompareSession>(COMPARE_PRESETS[0]);

  // Page Context
  const [activePageContext, setActivePageContext] = useState<PageContext>(DEMO_PAGES[0]);

  // Settings & Theme
  const [theme, setThemeState] = useState<"dark" | "light" | "system">("dark");
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_USER_SETTINGS);

  // Filtering & UI
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterFavoritesOnly, setFilterFavoritesOnly] = useState<boolean>(false);
  const [activeCollectionFilter, setActiveCollectionFilter] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);

  // Load from localStorage if available
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("echogpt_theme") as "dark" | "light" | "system" | null;
      if (savedTheme) {
        setThemeState(savedTheme);
      }
      const savedSettings = localStorage.getItem("echogpt_settings");
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, []);

  // Sync theme to document body
  useEffect(() => {
    const root = document.documentElement;
    const isDark =
      theme === "dark" ||
      (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    try {
      localStorage.setItem("echogpt_theme", theme);
    } catch {}
  }, [theme]);

  // Global keyboard shortcuts (Cmd+K, Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const activeModel = useMemo(() => {
    return models.find((m) => m.id === activeModelId) || models[0];
  }, [models, activeModelId]);

  const activeConversation = useMemo(() => {
    return conversations.find((c) => c.id === activeConversationId);
  }, [conversations, activeConversationId]);

  const setTheme = (newTheme: "dark" | "light" | "system") => {
    setThemeState(newTheme);
  };

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem("echogpt_settings", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const createNewConversation = (modelId?: string): string => {
    const newId = `conv-${Date.now()}`;
    const newConv: Conversation = {
      id: newId,
      title: "New Conversation",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      modelId: modelId || activeModelId,
      isFavorite: false,
      preview: "Start a conversation or choose a quick action...",
      messages: [],
      context: activePageContext.enabled ? activePageContext : undefined,
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConversationId(newId);
    return newId;
  };

  const deleteConversation = (id: string) => {
    setConversations((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
      if (activeConversationId === id) {
        if (filtered.length > 0) {
          setActiveConversationId(filtered[0].id);
        } else {
          // Create a fresh conversation if all deleted
          const newId = `conv-${Date.now()}`;
          return [
            {
              id: newId,
              title: "New Conversation",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              modelId: activeModelId,
              isFavorite: false,
              preview: "Start a conversation...",
              messages: [],
            },
          ];
        }
      }
      return filtered;
    });
  };

  const renameConversation = (id: string, newTitle: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title: newTitle.trim() || c.title } : c))
    );
  };

  const toggleFavorite = (id: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFavorite: !c.isFavorite } : c))
    );
  };

  const setConversationCollection = (id: string, collectionId?: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, collectionId } : c))
    );
  };

  const switchDemoPage = (index: number) => {
    if (DEMO_PAGES[index]) {
      setActivePageContext(DEMO_PAGES[index]);
    }
  };

  const togglePageContextEnabled = () => {
    setActivePageContext((prev) => ({ ...prev, enabled: !prev.enabled }));
  };

  const updateSelectedText = (text: string) => {
    setActivePageContext((prev) => ({ ...prev, selectedText: text }));
  };

  const setMessageReaction = (messageId: string, reaction: "up" | "down" | null) => {
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id !== activeConversationId) return conv;
        return {
          ...conv,
          messages: conv.messages.map((msg) =>
            msg.id === messageId ? { ...msg, reaction } : msg
          ),
        };
      })
    );
  };

  // Realistic response generator with model personality and streaming
  const generateSimulatedResponse = (prompt: string, model: AIModel, context?: PageContext): string => {
    const isSummarize = prompt.toLowerCase().includes("summarize") || prompt.toLowerCase().includes("overview");
    const isExplain = prompt.toLowerCase().includes("explain") || prompt.toLowerCase().includes("breakdown");
    const isCode = prompt.toLowerCase().includes("code") || prompt.toLowerCase().includes("function") || prompt.toLowerCase().includes("typescript");

    if (context?.enabled && (isSummarize || isExplain)) {
      return `### Context Synthesis: ${context.title} (${context.domain})

Extracted via EchoGPT client-side DOM parser without leaking session credentials.

#### 1. Core Thesis & Breakthrough
* **Direct Solution**: Addresses traditional limitations through client-side distillation and real-time processing.
* **Empirical Validation**: Tests demonstrate a **78% reduction in latency** and zero leakage of form inputs or credentials.

#### 2. Key Technical Findings
\`\`\`markdown
- Source Domain: ${context.domain}
- Extraction Latency: 18ms
- Filtered Nodes: <script>, <style>, <iframe>, tracking pixels
- Context Window Allocated: 1,420 tokens
\`\`\`

> *"Real-time context awareness turns the browser into an active cognitive partner rather than a passive document viewer."*

#### 3. Recommended Next Actions
1. Apply the surfaced heuristics directly to the current workflow.
2. Cross-verify with alternative models using the **Compare AI** panel.`;
    }

    if (isCode) {
      return `### Solution Architecture & Code Synthesis (${model.name})

Here is the clean, production-grade implementation addressing your request:

\`\`\`typescript
import { useState, useCallback, useTransition } from "react";

export interface StreamState<T> {
  data: T | null;
  isPending: boolean;
  error: Error | null;
}

export function useModelStream<T>(fetcher: (prompt: string) => Promise<T>) {
  const [state, setState] = useState<StreamState<T>>({
    data: null,
    isPending: false,
    error: null,
  });
  const [isPending, startTransition] = useTransition();

  const execute = useCallback((prompt: string) => {
    startTransition(async () => {
      setState((prev) => ({ ...prev, isPending: true, error: null }));
      try {
        const result = await fetcher(prompt);
        setState({ data: result, isPending: false, error: null });
      } catch (err) {
        setState({ data: null, isPending: false, error: err as Error });
      }
    });
  }, [fetcher]);

  return { ...state, isPending, execute };
}
\`\`\`

#### Key Highlights:
- **Zero Layout Shifts**: React 19 concurrent transitions guarantee UI responsiveness during intense token streaming.
- **Type-Safe**: Explicit generic constraints prevent unhandled null references.`;
    }

    // Default intelligent response customized by model strength
    return `### Analysis & Synthesis (${model.name})

Regarding **"${prompt.slice(0, 60)}${prompt.length > 60 ? "..." : ""}"**:

1. **Primary Perspective**:
   ${model.shortName} prioritizes **${model.strengths.slice(0, 2).join(" & ")}**. The core question hinges on trade-offs between initial computational overhead and long-term architectural scalability.

2. **Nuanced Considerations**:
   * **State Consistency**: Decoupled state management prevents race conditions when concurrent streams arrive.
   * **Token Economics**: Leveraging localized context compression reduces prompt expansion by up to 60%.
   * **Latency Profile**: Active inference on this tier responds in approximately **${model.speed === "Ultra Fast" ? "200-400ms" : "700-1100ms"}**.

3. **Synthesis**:
   To maximize productivity, consider comparing this response with other models using the **Compare** mode to evaluate subtle differences in reasoning and tone.`;
  };

  const sendMessage = async (content: string, modelIdOverride?: string) => {
    if (!content.trim() || isStreaming) return;

    const targetModelId = modelIdOverride || activeModelId;
    const model = models.find((m) => m.id === targetModelId) || activeModel;
    const userMsgId = `msg-${Date.now()}`;
    const assistantMsgId = `msg-${Date.now() + 1}`;

    const userMessage: ChatMessage = {
      id: userMsgId,
      role: "user",
      content: content.trim(),
      timestamp: new Date().toISOString(),
      pageContextSnippet: activePageContext.enabled ? activePageContext.domain : undefined,
    };

    // Update conversation with user message immediately
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== activeConversationId) return c;
        const isFirst = c.messages.length === 0;
        return {
          ...c,
          title: isFirst ? content.slice(0, 36) + (content.length > 36 ? "..." : "") : c.title,
          updatedAt: new Date().toISOString(),
          preview: content.slice(0, 60),
          messages: [...c.messages, userMessage],
        };
      })
    );

    setIsStreaming(true);

    const fullResponseText = generateSimulatedResponse(
      content,
      model,
      activePageContext.enabled ? activePageContext : undefined
    );

    // Create streaming placeholder assistant message
    const assistantPlaceholder: ChatMessage = {
      id: assistantMsgId,
      role: "assistant",
      modelId: targetModelId,
      content: "",
      timestamp: new Date().toISOString(),
      isStreaming: true,
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversationId
          ? { ...c, messages: [...c.messages, assistantPlaceholder] }
          : c
      )
    );

    // Stream tokens in chunks to simulate realistic LLM streaming
    const totalChars = fullResponseText.length;
    const chunkSize = Math.max(12, Math.floor(totalChars / 18));
    let currentIdx = 0;

    const streamInterval = setInterval(() => {
      currentIdx += chunkSize;
      const currentChunk = fullResponseText.slice(0, currentIdx);

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id !== activeConversationId) return c;
          return {
            ...c,
            messages: c.messages.map((m) =>
              m.id === assistantMsgId ? { ...m, content: currentChunk } : m
            ),
          };
        })
      );

      if (currentIdx >= totalChars) {
        clearInterval(streamInterval);
        setIsStreaming(false);

        // Finalize message with metrics
        const tokenEstimate = Math.round(totalChars / 3.8);
        const latency = Math.round(500 + Math.random() * 450);

        setConversations((prev) =>
          prev.map((c) => {
            if (c.id !== activeConversationId) return c;
            return {
              ...c,
              messages: c.messages.map((m) =>
                m.id === assistantMsgId
                  ? {
                      ...m,
                      content: fullResponseText,
                      isStreaming: false,
                      metrics: {
                        latencyMs: latency,
                        tokenCount: tokenEstimate,
                        tokensPerSec: Math.round((tokenEstimate / (latency / 1000)) * 10) / 10,
                      },
                    }
                  : m
              ),
            };
          })
        );
      }
    }, 45);
  };

  const regenerateLastResponse = async () => {
    if (!activeConversation || activeConversation.messages.length === 0 || isStreaming) return;

    const lastUserMsg = [...activeConversation.messages].reverse().find((m) => m.role === "user");
    if (!lastUserMsg) return;

    // Remove last assistant message
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== activeConversationId) return c;
        const lastMsg = c.messages[c.messages.length - 1];
        if (lastMsg.role === "assistant") {
          return { ...c, messages: c.messages.slice(0, -1) };
        }
        return c;
      })
    );

    // Re-send user prompt
    await sendMessage(lastUserMsg.content);
  };

  // Compare mode runner
  const runCompare = async (prompt: string, modelIds?: string[]) => {
    const targetModelIds = modelIds || compareModelIds;
    setIsStreaming(true);

    const initialResponses: Record<string, CompareModelResponse> = {};
    targetModelIds.forEach((mId) => {
      const model = models.find((m) => m.id === mId);
      initialResponses[mId] = {
        modelId: mId,
        content: "Synthesizing response...",
        latencyMs: 0,
        tokenCount: 0,
        status: "streaming",
        strengthsHighlight: model?.strengths.join(", ") || "",
      };
    });

    setActiveCompareSession({
      prompt,
      timestamp: new Date().toISOString(),
      selectedModelIds: targetModelIds,
      responses: initialResponses,
    });

    // Simulate concurrent response resolution with slight jitter
    await new Promise((r) => setTimeout(r, 600));

    targetModelIds.forEach((mId, idx) => {
      const model = models.find((m) => m.id === mId) || models[0];
      const simulatedText = generateSimulatedResponse(prompt, model, activePageContext);
      const tokenCount = Math.round(simulatedText.length / 3.8);
      const latencyMs = 600 + idx * 210 + Math.round(Math.random() * 150);

      setTimeout(() => {
        setActiveCompareSession((prev) => ({
          ...prev,
          responses: {
            ...prev.responses,
            [mId]: {
              modelId: mId,
              content: simulatedText,
              latencyMs,
              tokenCount,
              status: "completed",
              strengthsHighlight: model.strengths.slice(0, 2).join(" & "),
            },
          },
        }));
      }, (idx + 1) * 350);
    });

    setTimeout(() => {
      setIsStreaming(false);
    }, targetModelIds.length * 400 + 100);
  };

  const loadComparePreset = (index: number) => {
    if (COMPARE_PRESETS[index]) {
      setActiveCompareSession(COMPARE_PRESETS[index]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        models,
        activeModelId,
        activeModel,
        setActiveModelId,
        conversations,
        activeConversationId,
        activeConversation,
        setActiveConversationId,
        createNewConversation,
        deleteConversation,
        renameConversation,
        toggleFavorite,
        setConversationCollection,
        isStreaming,
        sendMessage,
        regenerateLastResponse,
        setMessageReaction,
        isCompareMode,
        setIsCompareMode,
        compareModelIds,
        setCompareModelIds,
        activeCompareSession,
        runCompare,
        loadComparePreset,
        activePageContext,
        setActivePageContext,
        switchDemoPage,
        togglePageContextEnabled,
        updateSelectedText,
        theme,
        setTheme,
        settings,
        updateSettings,
        searchQuery,
        setSearchQuery,
        filterFavoritesOnly,
        setFilterFavoritesOnly,
        activeCollectionFilter,
        setActiveCollectionFilter,
        isSidebarOpen,
        setIsSidebarOpen,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
