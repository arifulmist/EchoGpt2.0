import { AIModel, Conversation, PageContext, Collection, QuickAction, CompareSession, UserSettings } from "@/types";

export const AUTHENTIC_EXTENSION_INFO = {
  version: "1.0.5",
  lastUpdated: "September 22, 2026",
  users: 123,
  ratingsCount: 7,
  ratingValue: 5.0,
  manifestVersion: "Manifest V3",
  apiArchitecture: "Chrome Side Panel API & Secure Local Storage",
  officialUrl: "https://chromewebstore.google.com/detail/echogpt-multi-ai-chat-sid/negimdcamohmoheiifgecbjgjepkcfhj",
  websiteUrl: "https://echogpt.live",
  developerEmail: "mdsami@echogpt.live",
  developerTeam: "AppifyDevs",
  defaultShortcutWin: "Ctrl+Shift+E",
  defaultShortcutMac: "⌘+Shift+E",
};

export const AI_MODELS: AIModel[] = [
  {
    id: "gpt-4o",
    name: "OpenAI GPT-4o",
    shortName: "GPT-4o",
    provider: "openai",
    providerLabel: "OpenAI",
    description: "Omni-model engineered for versatile speed, complex instruction following, and code synthesis.",
    contextWindow: "128K tokens",
    speed: "Fast",
    speedScore: 4,
    reasoningScore: 5,
    strengths: ["Code generation", "Concise summaries", "Tool execution", "Multimodal"],
    badge: "Versatile Standard",
    accentColor: "#10b981",
    icon: "Bot",
  },
  {
    id: "claude-3-5-sonnet",
    name: "Anthropic Claude 3.5 Sonnet",
    shortName: "Claude 3.5",
    provider: "anthropic",
    providerLabel: "Anthropic",
    description: "Industry-leading reasoning, architectural writing depth, and nuance in complex analytical tasks.",
    contextWindow: "200K tokens",
    speed: "Fast",
    speedScore: 4,
    reasoningScore: 5,
    strengths: ["Technical writing", "Deep reasoning", "Code architecture", "Nuance"],
    badge: "Top Reasoning",
    accentColor: "#d97706",
    icon: "Sparkles",
  },
  {
    id: "gemini-1-5-pro",
    name: "Google Gemini 1.5 Pro",
    shortName: "Gemini 1.5 Pro",
    provider: "google",
    providerLabel: "Google",
    description: "Breakthrough 2M-token context window designed for massive documents, codebase analysis, and research.",
    contextWindow: "2M tokens",
    speed: "Balanced",
    speedScore: 3,
    reasoningScore: 5,
    strengths: ["Ultra-long context", "Document analysis", "Cross-lingual search", "Fact synthesis"],
    badge: "2M Context",
    accentColor: "#3b82f6",
    icon: "Globe",
  },
  {
    id: "llama-3-1-70b",
    name: "Meta Llama 3.1 70B",
    shortName: "Llama 3.1",
    provider: "meta",
    providerLabel: "Meta AI",
    description: "State-of-the-art open weights model with strong math, general knowledge, and transparent inference.",
    contextWindow: "128K tokens",
    speed: "Fast",
    speedScore: 4,
    reasoningScore: 4,
    strengths: ["Open ecosystem", "Privacy-first self host", "Instruction adherence"],
    badge: "Open Weights",
    accentColor: "#8b5cf6",
    icon: "Cpu",
  },
  {
    id: "deepseek-v2-5",
    name: "DeepSeek V2.5 / R1",
    shortName: "DeepSeek",
    provider: "deepseek",
    providerLabel: "DeepSeek",
    description: "Exceptional cost-efficiency and algorithmic reasoning with specialized mathematical rigor.",
    contextWindow: "64K tokens",
    speed: "Ultra Fast",
    speedScore: 5,
    reasoningScore: 4,
    strengths: ["Algorithms", "Math Olympiad", "Code optimization"],
    badge: "Math & Code",
    accentColor: "#06b6d4",
    icon: "Binary",
  },
  {
    id: "groq-llama-3-8b",
    name: "Groq Llama 3 (LPU)",
    shortName: "Groq LPU",
    provider: "groq",
    providerLabel: "Groq",
    description: "Ultra-low latency inference delivering 500+ tokens/second for instantaneous browser sidebar interactions.",
    contextWindow: "8K tokens",
    speed: "Ultra Fast",
    speedScore: 5,
    reasoningScore: 3,
    strengths: ["Instant speed (500 tok/s)", "Selected-text instant explain", "Zero wait"],
    badge: "500 tok/s",
    accentColor: "#f97316",
    icon: "Zap",
  },
];

export const DEMO_PAGES: PageContext[] = [
  {
    url: "https://nature.com/articles/s41586-026-08123-x",
    domain: "nature.com",
    title: "Scalable Fault-Tolerant Quantum Error Correction with 1,000 Qubits",
    excerpt:
      "We demonstrate surface-code logical qubits sustaining continuous real-time error syndrome extraction below the physical fault-tolerance threshold.",
    selectedText:
      "Surface-code threshold experiments reveal a quadratic reduction in logical error probability as code distance d escalates from d=3 to d=7.",
    fullContent: `Title: Scalable Fault-Tolerant Quantum Error Correction with 1,000 Qubits
Journal: Nature Physics (2026)
Abstract: Quantum computers promise exponential speedups for specialized problems, but environmental decoherence and gate infidelity degrade computational fidelity. We present experimental results from an array of 1,080 superconducting transmon qubits wired in a planar grid.
Key Results:
1. Real-time syndrome decoding running at sub-microsecond latency using FPGA co-processors.
2. Suppression of logical error rates: moving from physical baseline 1.2e-3 to logical rate 4.1e-6 with distance-7 surface code.
3. Demonstration of transversal Clifford gates with error propagation boundaries strictly contained within localized fault paths.
Conclusions: The results confirm that physical fault-tolerance thresholds are attainable without requiring impractical sub-millikelvin dilution scalability overheads.`,
    readingTimeMinutes: 4,
    enabled: true,
  },
  {
    url: "https://arxiv.org/abs/2403.11892",
    domain: "arxiv.org",
    title: "Context-Aware Browser Agent Architecture for Localized Semantic Synthesis",
    excerpt:
      "A framework for zero-leakage webpage context distillation using client-side vector chunking prior to upstream LLM querying.",
    selectedText:
      "Client-side AST and semantic tree parsing filters tracking tokens, scripts, and non-content DOM nodes before tokenization.",
    fullContent: `Title: Context-Aware Browser Agent Architecture
Authors: M. Chen, L. Vance, K. Rossi
Abstract: Traditional browser assistants pass entire raw HTML payloads to server-side language models, incurring latency, high token costs, and privacy exposure. We introduce EchoContext, an intelligent DOM pruning heuristic that extracts semantic main content, structured metadata, and user selections directly inside the extension sandbox.
Key contributions:
- 78% reduction in context token overhead.
- Zero upload of passwords, form inputs, or cross-domain tracking pixels.
- Dynamic selection bridging that anchors user prompts to highlighted text.`,
    readingTimeMinutes: 3,
    enabled: true,
  },
  {
    url: "https://react.dev/blog/2026/future-of-react-ai",
    domain: "react.dev",
    title: "Building Resilient AI Interfaces with React Server Components and Streaming",
    excerpt:
      "Patterns for rendering partial JSON streams, multi-model response diffing, and optimistic conversational rollbacks.",
    selectedText:
      "Streaming UI components allow incremental DOM hydration while LLM tokens materialize over readable byte streams.",
    fullContent: `React Team Post:
Creating fluid AI interfaces requires moving past full-re-render chat bubbles. By pairing React 19 Server Actions with fine-grained readable streams, frontend clients can render code blocks, charts, and interactive widgets without blocking the main event thread.`,
    readingTimeMinutes: 5,
    enabled: false,
  },
];

export const MOCK_COLLECTIONS: Collection[] = [
  { id: "research", name: "Quantum & Physics", icon: "Atom", color: "#3b82f6", count: 8 },
  { id: "engineering", name: "Frontend & Architecture", icon: "Code", color: "#10b981", count: 14 },
  { id: "papers", name: "Paper Summaries", icon: "BookOpen", color: "#d97706", count: 6 },
  { id: "daily", name: "Daily Workflows", icon: "Briefcase", color: "#8b5cf6", count: 12 },
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-1",
    title: "Quantum Error Correction vs Decoherence",
    updatedAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    modelId: "gpt-4o",
    isFavorite: true,
    collectionId: "research",
    preview: "Surface-code logical qubits achieve exponential error suppression once physical gate errors dip below...",
    context: DEMO_PAGES[0],
    messages: [
      {
        id: "msg-1-1",
        role: "user",
        content: "Explain the key breakthrough in this Nature paper and why distance-7 surface codes are a big deal.",
        timestamp: new Date(Date.now() - 1000 * 60 * 11).toISOString(),
        pageContextSnippet: "nature.com/articles/s41586-026-08123-x",
      },
      {
        id: "msg-1-2",
        role: "assistant",
        modelId: "gpt-4o",
        content: `### Executive Breakdown: Distance-7 Surface Code Milestone

The fundamental breakthrough reported in this paper is **fault-tolerant error suppression below threshold**:

1. **The Threshold Condition**: Previously, adding more physical qubits increased total system noise faster than error correction could diagnose it. In this work, physical gate error is at **$0.12\\%$**, comfortably below the surface code threshold ($\sim 1\\%$).
2. **Exponential Scaling**:
   $$\\epsilon_{\\text{logical}} \\propto \\left(\\frac{\\epsilon_{\\text{physical}}}{\\epsilon_{\\text{threshold}}}\\right)^{\\frac{d+1}{2}}$$
   Moving from distance $d=3$ (17 physical qubits per patch) to $d=7$ (97 physical qubits per patch) dropped the logical failure rate from $10^{-3}$ to $4.1 \\times 10^{-6}$.
3. **Sub-Microsecond Syndrome Extraction**:
   Using dedicated FPGA decoding pipelines, parity check syndromes are calculated in **$740\\text{ ns}$**, outpacing the superconducting qubit $T_2$ coherence decay window ($48\\,\\mu\\text{s}$).

\`\`\`python
# Simulation heuristic for distance-d logical error rate
def logical_error_rate(p_phys: float, p_th: float = 0.01, d: int = 7) -> float:
    if p_phys >= p_th:
        raise ValueError("Physical error rate exceeds fault-tolerant threshold!")
    exponent = (d + 1) // 2
    c_factor = 0.03
    return c_factor * ((p_phys / p_th) ** exponent)

print(f"Distance 7 Logical Error: {logical_error_rate(0.0012, 0.01, 7):.2e}")
\`\`\`

**Why this matters**: It proves that scaling physical qubit counts directly buys usable algorithmic depth rather than accumulating fatal noise.`,
        timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
        metrics: {
          latencyMs: 820,
          tokenCount: 428,
          tokensPerSec: 52.4,
        },
        reaction: "up",
      },
    ],
  },
  {
    id: "conv-2",
    title: "Compare React 19 Actions vs Server Components",
    updatedAt: new Date(Date.now() - 1000 * 60 * 85).toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    modelId: "claude-3-5-sonnet",
    isFavorite: true,
    collectionId: "engineering",
    preview: "Server Actions provide asynchronous mutation endpoints, whereas Server Components handle data fetching...",
    messages: [
      {
        id: "msg-2-1",
        role: "user",
        content: "What is the concrete architectural separation between React Server Components (RSC) and Server Actions in React 19?",
        timestamp: new Date(Date.now() - 1000 * 60 * 84).toISOString(),
      },
      {
        id: "msg-2-2",
        role: "assistant",
        modelId: "claude-3-5-sonnet",
        content: `### Architectural Boundary: RSC vs Server Actions

While both execute on the Node.js or Edge runtime, their architectural directions are inverted:

| Dimension | React Server Components (RSC) | Server Actions ('use server') |
| :--- | :--- | :--- |
| **Direction** | **Server $\\rightarrow$ Client** (Downstream read) | **Client $\\rightarrow$ Server** (Upstream write / RPC) |
| **Primary Role** | Component rendering, zero-bundle DB access | Data mutations, form submissions, cache invalidation |
| **Serialization** | Returns serialized Flight payload (AST) | Returns standard serialized return values or redirects |
| **Client Hooking** | Seamlessly woven into JSX trees | Hooked via \`useActionState\`, \`useFormStatus\`, or direct \`startTransition\` |

#### Key Insight:
> **RSC is your presentation layer on the server; Server Actions are your RPC endpoints securely exposed to the client.**

\`\`\`tsx
// 1. Server Component: Renders on the server, zero client JS cost
export default async function ProjectList() {
  const projects = await db.projects.findMany();
  return (
    <div className="space-y-4">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
      <CreateProjectForm />
    </div>
  );
}

// 2. Server Action: Client triggers this RPC mutation
async function createProjectAction(prevState: any, formData: FormData) {
  'use server';
  const name = formData.get('name') as string;
  await db.projects.create({ data: { name } });
  revalidatePath('/projects');
}
\`\`\``,
        timestamp: new Date(Date.now() - 1000 * 60 * 83).toISOString(),
        metrics: {
          latencyMs: 1140,
          tokenCount: 462,
          tokensPerSec: 40.5,
        },
      },
    ],
  },
  {
    id: "conv-3",
    title: "Context-Aware Browser Agent Architecture",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    modelId: "gemini-1-5-pro",
    isFavorite: false,
    collectionId: "papers",
    preview: "The client-side DOM distillation heuristic reduces upstream context payload by 78% while stripping PII...",
    context: DEMO_PAGES[1],
    messages: [
      {
        id: "msg-3-1",
        role: "user",
        content: "Summarize how EchoContext filters tracking tokens and scripts before sending prompts.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      },
      {
        id: "msg-3-2",
        role: "assistant",
        modelId: "gemini-1-5-pro",
        content: `### Client-Side DOM Pruning Workflow

The paper proposes a 3-tier filtration pipeline running entirely inside the extension service worker:

1. **Tree Sanitization**: Strips \`<script>\`, \`<style>\`, \`<svg>\`, \`<iframe>\`, and \`hidden\` DOM nodes before tokenization.
2. **Heuristic Density Scoring**: Computes text-to-tag ratios across article containers, discarding navigations, sidebars, cookie banners, and comment sections.
3. **PII Masking**: Regular expressions scrub credit card patterns, social security numbers, and detected OAuth tokens before the contextual chunk is injected into the model prompt.

**Result**: A 78% reduction in latency and token consumption, completely preserving user confidentiality.`,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        metrics: {
          latencyMs: 960,
          tokenCount: 285,
          tokensPerSec: 48.0,
        },
      },
    ],
  },
  {
    id: "conv-4",
    title: "TypeScript Discriminated Unions for State Machines",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
    modelId: "gpt-4o",
    isFavorite: false,
    collectionId: "engineering",
    preview: "By defining an explicit status discriminator, TypeScript guarantees exhaustive matching...",
    messages: [
      {
        id: "msg-4-1",
        role: "user",
        content: "Show me a production-grade TypeScript state machine for an AI model streaming session.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      },
      {
        id: "msg-4-2",
        role: "assistant",
        modelId: "gpt-4o",
        content: `Here is a bulletproof discriminated union pattern with compile-time exhaustive checking:

\`\`\`typescript
type ChatSessionState =
  | { status: 'idle' }
  | { status: 'connecting'; modelId: string; attempt: number }
  | { status: 'streaming'; modelId: string; chunks: string[]; tokenCount: number }
  | { status: 'completed'; modelId: string; fullText: string; latencyMs: number }
  | { status: 'error'; modelId: string; error: Error; canRetry: boolean };

function reduceChatState(state: ChatSessionState, action: any): ChatSessionState {
  switch (state.status) {
    case 'idle':
      return { status: 'connecting', modelId: action.modelId, attempt: 1 };
    case 'connecting':
      return { status: 'streaming', modelId: state.modelId, chunks: [], tokenCount: 0 };
    case 'streaming':
      return { status: 'completed', modelId: state.modelId, fullText: state.chunks.join(''), latencyMs: 850 };
    case 'completed':
    case 'error':
      return state;
    default: {
      const _exhaustive: never = state;
      return _exhaustive;
    }
  }
}
\`\`\``,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        metrics: {
          latencyMs: 710,
          tokenCount: 290,
          tokensPerSec: 64.2,
        },
      },
    ],
  },
];

export const COMPARE_PRESETS: CompareSession[] = [
  {
    prompt: "What is quantum computing, and how does quantum error correction work?",
    timestamp: "2026-09-28T10:00:00Z",
    selectedModelIds: ["gpt-4o", "claude-3-5-sonnet", "gemini-1-5-pro"],
    responses: {
      "gpt-4o": {
        modelId: "gpt-4o",
        strengthsHighlight: "High clarity, crisp summary points, practical framing",
        latencyMs: 780,
        tokenCount: 340,
        status: "completed",
        content: `**Quantum computing** leverages quantum mechanical phenomena—specifically **superposition** and **entanglement**—to process complex multidimensional data representations faster than classical binary architectures.

### Quantum Error Correction (QEC)
In classical computing, bits are resilient against thermal noise. In quantum computing, qubits suffer from:
* **Bit flips** ($X$ gate error: $|0\\rangle \\leftrightarrow |1\\rangle$)
* **Phase flips** ($Z$ gate error: $|+\\rangle \\leftrightarrow |-\\rangle$)

Because qubits cannot be directly cloned (No-Cloning Theorem), QEC distributes the quantum information of a single **logical qubit** across an entangled array of multiple **physical qubits** (e.g., surface codes). Parity syndromes are measured non-destructively to identify and correct errors before the superposition collapses.`,
      },
      "claude-3-5-sonnet": {
        modelId: "claude-3-5-sonnet",
        strengthsHighlight: "Deep architectural rigour, mathematical nuance, elegant analogies",
        latencyMs: 910,
        tokenCount: 395,
        status: "completed",
        content: `Quantum computing replaces deterministic binary state registers ($x \\in \\{0,1\\}^n$) with continuous Hilbert space statevectors ($|\\psi\\rangle = \\sum c_i |i\\rangle$). Rather than checking combinations sequentially, quantum algorithms choreograph computational paths so that incorrect answers undergo **destructive interference** while the target answer exhibits **constructive interference**.

### The Error Correction Dilemma & Solution
Direct observation of a quantum state triggers wavefunction collapse. QEC bypasses this constraint through **stabilizer codes**:

1. **Information Entanglement**: A single logical degree of freedom is embedded within an $n$-qubit entangled subspace defined by mutually commuting Pauli operators $\\{S_i\\}$.
2. **Syndrome Measurement**: Observers measure eigenvalues of the stabilizer operators rather than individual qubit states. This reveals *where* an error occurred without revealing *what* data the qubit held.
3. **Surface Code Dominance**: The 2D square lattice of data and auxiliary qubits allows nearest-neighbor coupling, keeping physical error thresholds within experimental reach ($\sim 1\\%$).`,
      },
      "gemini-1-5-pro": {
        modelId: "gemini-1-5-pro",
        strengthsHighlight: "Comprehensive synthesis, industrial roadmap context, timeline",
        latencyMs: 1050,
        tokenCount: 420,
        status: "completed",
        content: `Quantum computing utilizes quantum processors (QPUs) to tackle mathematically intractable problems in chemistry simulation, cryptanalysis, and optimization by manipulating probability amplitudes.

### Why Error Correction Is the Holy Grail
Current machines operate in the **NISQ** (Noisy Intermediate-Scale Quantum) era where physical noise limits gate depth to a few hundred operations.

* **Physical Qubits vs. Logical Qubits**: Achieving commercially relevant fault tolerance requires roughly 1,000 to 10,000 physical qubits to yield 1 high-fidelity logical qubit.
* **Surface Codes**: Data qubits alternate with measure qubits. Measure qubits detect $X$ (bit-flip) and $Z$ (phase-flip) stabilizers at high frequencies.
* **Current State in 2026**: Industry leaders have crossed the threshold where increasing code distance strictly reduces logical error rates, paving the way for fault-tolerant multi-qubit algorithms.`,
      },
    },
  },
  {
    prompt: "Compare React Server Components (RSC) and Server Actions in terms of security and performance.",
    timestamp: "2026-09-28T09:30:00Z",
    selectedModelIds: ["gpt-4o", "claude-3-5-sonnet", "deepseek-v2-5"],
    responses: {
      "gpt-4o": {
        modelId: "gpt-4o",
        strengthsHighlight: "Actionable developer tips and quick comparison table",
        latencyMs: 740,
        tokenCount: 310,
        status: "completed",
        content: `**RSC** and **Server Actions** handle opposite flows of your web application:

* **Security**:
  * RSC never ships sensitive backend logic or secrets to the client; all code remains on server.
  * Server Actions create public HTTP POST endpoints under the hood. You must authenticate and validate inputs inside every action!
* **Performance**:
  * RSC reduces client bundle sizes by zeroing out dependencies (e.g. date-fns, marked).
  * Server Actions stream updates directly and revalidate server tags without full-page reloads.`,
      },
      "claude-3-5-sonnet": {
        modelId: "claude-3-5-sonnet",
        strengthsHighlight: "In-depth threat modeling and architectural guardrails",
        latencyMs: 880,
        tokenCount: 380,
        status: "completed",
        content: `### Threat Modeling & Performance Characteristics

#### 1. Security Analysis
* **RSC Attack Surface**: Inherently low. The client only receives the resulting React Flight AST. Secret keys, database connection strings, and internal microservice URLs are physically omitted from client JS bundles.
* **Server Action Attack Surface**: Treated as **Public RPC Endpoints**. A critical vulnerability occurs when developers assume closure variables are unforgeable. You must implement Zod schema validation and explicit authorization checks at the top of every Server Action.

#### 2. Network & Latency Performance
* **RSC**: Solves the classic client-side waterfall by collocating queries with components on low-latency internal network backbones.
* **Server Actions**: Enables progressive enhancement where forms work even before client JS hydration completes.`,
      },
      "deepseek-v2-5": {
        modelId: "deepseek-v2-5",
        strengthsHighlight: "Detailed protocol-level explanation and payload mechanics",
        latencyMs: 620,
        tokenCount: 320,
        status: "completed",
        content: `**Protocol Differences:**
1. **RSC**: Returns a streaming text/x-component MIME response containing slot identifiers, suspense boundaries, and serialized props. Memory consumption shifts from browser client to server Node.js worker pools.
2. **Server Actions**: Sends multipart/form-data or application/json POST requests. The response headers automatically trigger client-side router cache reconciliations via \`revalidatePath\` or \`revalidateTag\`. Always wrap with rate-limiting middleware to avoid DoS on backend mutation endpoints.`,
      },
    },
  },
];

export const QUICK_ACTIONS: QuickAction[] = [
  {
    id: "summarize-page",
    label: "Summarize Page",
    description: "Extract core thesis, key findings, and action items from the current webpage context.",
    icon: "FileText",
    category: "browser",
    template: (ctx) =>
      ctx
        ? `Please summarize the key takeaways of the current page "${ctx.title}" (${ctx.domain}) in 3 concise bullet points followed by an executive takeaway.`
        : "Summarize the key takeaways and main arguments of this text in 3 bullet points.",
  },
  {
    id: "explain-selection",
    label: "Explain Selection",
    description: "Deep dive into the highlighted text with definitions, context, and intuition.",
    icon: "Highlighter",
    category: "browser",
    template: (ctx) =>
      ctx?.selectedText
        ? `Explain the following selected passage from "${ctx.title}":\n\n"${ctx.selectedText}"\n\nProvide the core intuition, technical meaning, and practical relevance.`
        : "Explain this concept step-by-step with clear analogies and practical examples.",
  },
  {
    id: "compare-models",
    label: "Compare AI Responses",
    description: "Submit your prompt across multiple top models side-by-side to cross-examine outputs.",
    icon: "Columns3",
    category: "analysis",
    template: () =>
      "Compare the architectural advantages and trade-offs of Next.js 15 Server Components vs traditional Client-Side Single Page Apps.",
  },
  {
    id: "rewrite-professional",
    label: "Rewrite Professionally",
    description: "Improve clarity, tone, and conciseness for high-stakes executive communication.",
    icon: "Sparkles",
    category: "writing",
    template: (ctx) =>
      ctx?.selectedText
        ? `Rewrite this selected text into polished, professional prose:\n\n"${ctx.selectedText}"`
        : "Rewrite the following draft to be punchy, professional, and clear for a senior executive audience.",
  },
  {
    id: "code-review",
    label: "Review Code & Edge Cases",
    description: "Audit code for edge cases, performance bottlenecks, and security vulnerabilities.",
    icon: "Code2",
    category: "coding",
    template: () =>
      "Audit this code for concurrency bugs, performance bottlenecks, memory leaks, and TypeScript type safety issues. Suggest improvements.",
  },
  {
    id: "extract-actions",
    label: "Extract Action Items",
    description: "Turn meetings, long articles, or discussions into structured to-do lists.",
    icon: "CheckSquare",
    category: "analysis",
    template: () =>
      "Extract all concrete action items, responsibilities, and deadlines from this context into a prioritized Markdown table.",
  },
];

export const DEFAULT_USER_SETTINGS: UserSettings = {
  theme: "dark",
  defaultModel: "gpt-4o",
  sidePanelShortcut: "Ctrl+Shift+E",
  autoExtractContext: true,
  streamResponses: true,
  temperature: 0.7,
  sendOnEnter: true,
  soundFeedback: false,
  apiKeys: {
    openai: "sk-live-••••••••••••••••38f2",
    anthropic: "sk-ant-••••••••••••••••91c4",
    google: "AIzaSy••••••••••••••••10a7",
    deepseek: "dsk-••••••••••••••••55b8",
  },
};

export const FAQ_ITEMS = [
  {
    question: "What is EchoGPT and how is it different from normal AI chat apps?",
    answer:
      "EchoGPT is a unified AI workspace and Chrome Side Panel that lets you interact with multiple leading AI models (OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet, Google Gemini 1.5 Pro, Meta Llama, DeepSeek) within a single coherent workflow. Instead of toggling between 5 different browser tabs and logins, you can chat, compare answers side-by-side, and ask questions directly about any webpage you're currently browsing.",
  },
  {
    question: "How does the Chrome Side Panel extension work?",
    answer:
      "Built on Chrome's modern Side Panel API and Manifest V3, EchoGPT docks on the right edge of your browser window. You can open it anytime using the global shortcut (Ctrl+Shift+E or ⌘+Shift+E). It automatically detects the active webpage context, allowing you to click 'Summarize Page' or highlight any sentence on any website to immediately get an in-depth AI explanation.",
  },
  {
    question: "How does the 'Compare AI Responses' feature work?",
    answer:
      "In Compare Mode, you enter a single prompt and choose 2 or 3 models (e.g. GPT-4o vs Claude 3.5 Sonnet vs Gemini 1.5 Pro). EchoGPT executes queries concurrently and renders the responses in synchronized side-by-side columns with latency timings, token counts, and diff highlights so you can instantly verify facts and choose the most nuanced answer.",
  },
  {
    question: "Is my browsing data or page content stored or shared?",
    answer:
      "No. EchoGPT adheres to strict client-side privacy guidelines. Page context is extracted only when you explicitly enable 'Page Context' or trigger an action like 'Summarize Page'. The content is parsed locally in the browser sandbox, stripped of sensitive fields (password inputs, cookies), and never stored on third-party analytical servers.",
  },
  {
    question: "Can I bring my own API keys (BYOK)?",
    answer:
      "Yes! EchoGPT provides both an out-of-the-box managed workspace and a secure BYOK (Bring Your Own Key) setting where you can input your private API keys for OpenAI, Anthropic, Google Gemini, and DeepSeek. Your keys are encrypted locally in Chrome storage.",
  },
  {
    question: "Does EchoGPT support keyboard shortcuts and power-user workflows?",
    answer:
      "Yes. In addition to the Chrome global sidebar shortcut (Ctrl+Shift+E), the workspace supports a full Command Palette (Ctrl+K or ⌘+K) to quickly switch models, jump between conversation collections, toggle compare mode, and trigger quick actions without touching your mouse.",
  },
  {
    question: "What are the authentic current metrics for EchoGPT?",
    answer:
      "As of the September 22, 2026 update (version 1.0.5) on the Chrome Web Store, EchoGPT has 123 active users and a 5.0-star rating across 7 verified reviews, developed by AppifyDevs. We take pride in building genuine, focused utility rather than claiming fabricated marketing statistics.",
  },
];
