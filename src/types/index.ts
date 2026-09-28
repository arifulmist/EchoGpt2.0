export type ModelProvider =
  | "openai"
  | "anthropic"
  | "google"
  | "meta"
  | "deepseek"
  | "mistral"
  | "perplexity"
  | "groq";

export interface AIModel {
  id: string;
  name: string;
  shortName: string;
  provider: ModelProvider;
  providerLabel: string;
  description: string;
  contextWindow: string;
  speed: "Ultra Fast" | "Fast" | "Balanced" | "Deep Reasoning";
  speedScore: number; // 1-5
  reasoningScore: number; // 1-5
  strengths: string[];
  badge?: string;
  accentColor: string;
  icon: string;
}

export interface MessageMetrics {
  latencyMs: number;
  tokenCount: number;
  tokensPerSec: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  modelId?: string;
  timestamp: string;
  metrics?: MessageMetrics;
  isStreaming?: boolean;
  pageContextSnippet?: string;
  reaction?: "up" | "down" | null;
}

export interface PageContext {
  url: string;
  domain: string;
  title: string;
  favicon?: string;
  excerpt: string;
  selectedText?: string;
  fullContent?: string;
  readingTimeMinutes: number;
  enabled: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  updatedAt: string;
  createdAt: string;
  modelId: string;
  isFavorite: boolean;
  collectionId?: string;
  preview: string;
  messages: ChatMessage[];
  context?: PageContext;
}

export interface CompareModelResponse {
  modelId: string;
  content: string;
  latencyMs: number;
  tokenCount: number;
  status: "idle" | "streaming" | "completed";
  strengthsHighlight: string;
}

export interface CompareSession {
  prompt: string;
  timestamp: string;
  selectedModelIds: string[];
  responses: Record<string, CompareModelResponse>;
}

export interface Collection {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
}

export interface UserSettings {
  theme: "dark" | "light" | "system";
  defaultModel: string;
  sidePanelShortcut: string;
  autoExtractContext: boolean;
  streamResponses: boolean;
  temperature: number;
  sendOnEnter: boolean;
  soundFeedback: boolean;
  apiKeys: {
    openai?: string;
    anthropic?: string;
    google?: string;
    deepseek?: string;
  };
}

export interface QuickAction {
  id: string;
  label: string;
  description: string;
  icon: string;
  category: "browser" | "writing" | "analysis" | "coding";
  template: (context?: PageContext) => string;
}
