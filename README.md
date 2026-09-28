# EchoGPT 2.0 — Unified Multi-Model AI Productivity Ecosystem

> **Senior Frontend Engineer + Product Designer Redesign Challenge**  
> *"Every AI model. One intelligent workspace."*

[![Chrome Web Store](https://img.shields.io/badge/Chrome_Web_Store-v1.0.5-amber.svg)](https://chromewebstore.google.com/detail/echogpt-multi-ai-chat-sid/negimdcamohmoheiifgecbjgjepkcfhj)
[![Next.js](https://img.shields.io/badge/Next.js-15.1.0-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

---

## 1. Overview

**EchoGPT** is a browser-first AI productivity ecosystem that bridges multiple frontier large language models (OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet, Google Gemini 1.5 Pro, Meta Llama 3.1, DeepSeek, and Groq) into a unified workspace and a native **Chrome Side Panel**.

Rather than juggling 5 different browser tabs, separate logins, and fragmented copy-pasting, EchoGPT enables knowledge workers, software engineers, and researchers to:
1. **Chat & Orchestrate**: Access the world's best models in a single continuous conversation thread.
2. **Compare AI Responses**: Submit one query and evaluate answers from 2 to 3 models side-by-side with latency, token volume, and consensus diffs.
3. **In-Tab Webpage Assistance**: Summarize 30-page research documents or explain highlighted technical paragraphs with zero credential leakage.
4. **Docked Browser Workflow**: Trigger the native Chrome Side Panel anywhere using the global shortcut (`Ctrl+Shift+E` / `⌘+Shift+E`).

This redesign refactors EchoGPT from a rudimentary landing page into a **production-grade SaaS workspace and Chrome extension simulator** built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

---

## 2. Product Architecture & Journey

The project is structured around four interlocking pillars:

```
Landing Page  ───►  Web Workspace App  ───►  Chrome Side Panel  ───►  Shared Design System
(Marketing &        (Full-Screen AI          (Docked In-Browser       (Semantic Tokens,
 Discovery)          Productivity Studio)     380px Experience)        Dark/Light Mode)
```

### Key Routes
* **`/`** — **EchoGPT Landing Page**: Premium single-page product showcase with live interactive product sandbox, multi-model comparison matrix, feature grid, model catalog, authentic Chrome Web Store metrics, and accessible FAQ accordion.
* **`/workspace`** — **EchoGPT Web Application**: Desktop studio featuring collapsible conversation history, real-time search, favorite starring, inline renaming, prompt composer with context pills, quick action macros, and **Multi-Model Compare Mode**.
* **`/extension`** — **Chrome Extension Side Panel Simulator**: Accurate simulation of Google Chrome's browser viewport (tabs, address bar, active webpage text) docked with the **380px EchoGPT Side Panel**, with quick actions (*Summarize Page*, *Explain Selection*, *Rewrite*, *Settings Drawer*, *Auth Flow*), plus a standalone toggle.
* **`/settings`** — **Comprehensive Workspace Settings**: Dedicated controls for General preferences, Appearance (Dark/Light/System), AI Models with encrypted Bring-Your-Own-Key (BYOK), Context & Privacy DOM sanitization, Keyboard Shortcuts, and Account session management.

---

## 3. Key Differentiating Features

### 🔥 A. Multi-Model Parallel Comparison ("Compare AI")
The primary competitive differentiator of EchoGPT is breaking free from single-model blind spots.
```
                      ┌──────────────────────────────────────┐
                      │   Dispatched Prompt (Single Query)   │
                      └──────────────────┬───────────────────┘
                 ┌───────────────────────┼───────────────────────┐
                 ▼                       ▼                       ▼
      ┌────────────────────┐   ┌────────────────────┐   ┌────────────────────┐
      │    OpenAI GPT-4o   │   │  Claude 3.5 Sonnet │   │   Gemini 1.5 Pro   │
      │ 780ms · 410 tokens │   │ 890ms · 440 tokens │   │ 1020ms · 480 tokens│
      │ Implementation/Code│   │ Deep Architectural │   │ 2M Massive Context │
      │ & Fast Direct Synt.│   │ Nuance & Reasoning │   │ & Long-Doc Extract │
      └────────────────────┘   └────────────────────┘   └────────────────────┘
                 └───────────────────────┼───────────────────────┘
                                         ▼
                      ┌──────────────────────────────────────┐
                      │    Cross-Model Consensus Matrix      │
                      │ Identifies Agreement vs Disagreements│
                      └──────────────────────────────────────┘
```
* Parallel concurrent streams allow immediate verification of code and factual accuracy.
* Synchronized column scroll with latency counters and tokens/second benchmarks.
* Model selector per column allows mixing proprietary and open-weights models.

### 🌐 B. Privacy-Preserving Webpage Context
* In-tab DOM distillation strips `<script>`, `<style>`, `<iframe>`, cookie banners, and ads.
* Zero storage of sensitive inputs, auth cookies, or passwords.
* One-click action pills:
  * **"⚡ Summarize Page"**: Synthesizes the active webpage without leaving the tab.
  * **"🔍 Explain Selection"**: Highlights any confusing passage on any site to receive step-by-step intuition.

### ⌨️ C. Power-User Command Palette & Shortcuts
* Global **`Ctrl+K` / `⌘+K`** command palette allows searching past conversations, jumping between models, toggling compare mode, and switching themes without touching the mouse.
* Global Chrome shortcut **`Ctrl+Shift+E` / `⌘+Shift+E`** toggles the sidebar panel.

---

## 4. Authentic Product Data (No Fabricated Stats)

In strict adherence to product honesty, this project reflects the authentic current facts from the official Chrome Web Store listing:

| Metric | Official Listing Value |
| :--- | :--- |
| **Extension Version** | `1.0.5` |
| **Last Store Update** | September 22, 2026 |
| **Organic Users** | 123 active users |
| **Customer Rating** | 5.0 ★ across 7 verified ratings |
| **Manifest Architecture** | Chrome Manifest V3 & Side Panel API |
| **Official Store Link** | [Chrome Web Store Listing](https://chromewebstore.google.com/detail/echogpt-multi-ai-chat-sid/negimdcamohmoheiifgecbjgjepkcfhj) |
| **Official Web Address** | [https://echogpt.live](https://echogpt.live) |
| **Developer Contact** | `mdsami@echogpt.live` (AppifyDevs) |

---

## 5. Tech Stack & Engineering Decisions

* **Framework**: Next.js 15.1 (App Router, Turbopack-ready, React Server Components + Client Boundaries).
* **Library**: React 19 (`useTransition`, concurrent UI streaming state).
* **Language**: TypeScript 5 (Strict mode, ES2020 target, zero `any` shortcuts in domain types).
* **Styling**: Tailwind CSS 3.4 with custom HSL CSS variable design tokens (`--background`, `--card`, `--primary`, `--border`).
* **Icons**: Lucide React + custom pixel-perfect SVG `ChromeIcon`.
* **State Architecture**: Centralized `AppContext` with simulated token streaming, persistent `localStorage` synchronization, conversation management (rename, delete, favorite, collections), and model orchestration.

---

## 6. Directory Structure

```
EchoGPT-Redesign/
├── src/
│   ├── app/
│   │   ├── page.tsx                     # Landing Page (Hero, Compare, Features, FAQ, CTA)
│   │   ├── workspace/page.tsx           # Full AI Workspace Application
│   │   ├── extension/page.tsx           # Chrome Side Panel & Browser Simulator
│   │   ├── settings/page.tsx            # Dedicated Preferences & BYOK Keys Page
│   │   ├── layout.tsx                   # Root HTML Shell with AppProvider & Fonts
│   │   └── globals.css                  # Semantic Design Tokens (Dark & Light Mode)
│   │
│   ├── components/
│   │   ├── ui/                          # Design System Primitives
│   │   │   ├── button.tsx               # Primary, Secondary, Outline, Ghost, Sizes
│   │   │   ├── badge.tsx                # Status, Variant, Outline Badges
│   │   │   ├── card.tsx                 # CardHeader, Title, Description, Content
│   │   │   ├── input.tsx                # Accessible Input with Icon Slots
│   │   │   ├── dialog.tsx               # Accessible Modal Dialog with Escape & Backdrop
│   │   │   ├── accordion.tsx            # Accessible Expandable FAQ Accordion
│   │   │   └── tabs.tsx                 # TabList, TabTrigger, TabContent
│   │   │
│   │   ├── shared/                      # Ecosystem Shared Components
│   │   │   ├── Logo.tsx                 # SVG Dynamic Soundwave & Echo Neural Mark
│   │   │   ├── ThemeToggle.tsx          # Dark / Light / System Mode Switcher
│   │   │   ├── ModelIcon.tsx            # Visual Brand Avatars for AI Providers
│   │   │   ├── MarkdownRenderer.tsx     # Code Highlighting with One-Click Copy
│   │   │   ├── CommandPalette.tsx       # Cmd+K Quick Navigator & Switcher
│   │   │   └── ChromeIcon.tsx           # Custom Feather Chrome SVG
│   │   │
│   │   ├── landing/                     # Marketing & Conversion Components
│   │   │   ├── Navbar.tsx               # Responsive Glassmorphism Header with Mobile Menu
│   │   │   ├── Hero.tsx                 # Value Proposition & Authentic Metrics Badge
│   │   │   ├── InteractiveProductPreview.tsx # Live Sandbox Mockup in Hero
│   │   │   ├── CompareShowcase.tsx      # Prominent 3-Model Side-by-Side Playground
│   │   │   ├── FeaturesGrid.tsx         # 8 Technical Capability Cards
│   │   │   ├── ModelsCatalog.tsx        # Frontier AI Model Cards & Benchmarks
│   │   │   ├── WorkflowTimeline.tsx     # 01-05 Step Productivity Journey
│   │   │   ├── ChromeExtensionShowcase.tsx # Side Panel Docking Spotlight
│   │   │   ├── WhyEchoGPT.tsx           # Tab Clutter vs Unified Workspace Matrix
│   │   │   ├── AuthenticMetrics.tsx     # Verified Chrome Web Store 1.0.5 Info
│   │   │   ├── FaqAccordion.tsx         # 7 Detailed Technical Q&As
│   │   │   ├── FinalCta.tsx             # Bottom Conversion Section
│   │   │   └── Footer.tsx               # Ecosystem Sitemap & Copyright
│   │   │
│   │   ├── workspace/                   # Web Application Components
│   │   │   ├── WorkspaceLayout.tsx      # App Shell with Responsive Collapsible Sidebar
│   │   │   ├── WorkspaceSidebar.tsx     # Search, Favorites, Collections, Chat Threads
│   │   │   ├── WorkspaceTopBar.tsx      # Inline Title Renaming, Context Modal Trigger
│   │   │   ├── ChatMessageItem.tsx      # Assistant & User Bubbles, Metrics, Feedback
│   │   │   ├── CompareResponsesView.tsx # Multi-Model 3-Column Parallel Inference View
│   │   │   ├── PromptComposer.tsx       # Auto-growing Textarea, Context Pill, Quick Chips
│   │   │   └── PageContextModal.tsx     # DOM Extraction Inspector & Page Switcher
│   │   │
│   │   ├── extension/                   # Chrome Side Panel Concept Components
│   │   │   ├── BrowserSimulator.tsx     # Dual-Pane Docked View & Standalone View
│   │   │   ├── ExtensionSidePanel.tsx   # 380px Chrome Side Panel Interface
│   │   │   ├── ExtensionSettingsDrawer.tsx # Side Panel Compact Preferences
│   │   │   ├── ExtensionHistoryDrawer.tsx  # Fast Session Switcher
│   │   │   └── ExtensionAuthModal.tsx   # Google 1-Click & Email Auth Modal
│   │   │
│   │   └── settings/
│   │       └── SettingsView.tsx         # Tabbed Configuration & BYOK Keys Interface
│   │
│   ├── context/
│   │   └── AppContext.tsx               # Central React State, Token Streaming, Store Sync
│   ├── data/
│   │   └── mockData.ts                  # Authentic Data, 8 Models, Sample Conversations
│   ├── lib/
│   │   └── utils.ts                     # cn, Date Formatting, Clipboard Copy
│   └── types/
│       └── index.ts                     # Strict TypeScript Data Models
│
├── public/                              # Static Assets
├── package.json                         # Dependencies & Scripts
├── tailwind.config.ts                   # Token Definitions
├── tsconfig.json                        # Modern TypeScript Configuration
└── README.md                            # Complete Project Documentation
```

---

## 7. Getting Started

### Prerequisites
* Node.js `v18.18+` or `v20+` or `v22+`
* npm `9+` / `10+` / `11+`

### Installation
```bash
# Clone the repository
git clone https://github.com/arifulmist/EchoGpt2.0.git
cd EchoGpt2.0

# Install dependencies
npm install
```

### Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
* Landing Page: `http://localhost:3000/`
* Web Workspace: `http://localhost:3000/workspace`
* Chrome Extension Simulator: `http://localhost:3000/extension`
* Workspace Settings: `http://localhost:3000/settings`

### Production Build & Verification
```bash
# Build the production bundle
npm run build

# Start the production server
npm run start
```
`npm run build` generates all static routes with zero warnings and zero TypeScript errors.

---

## 8. Design System & Design Tokens

The UI identity embraces a **dark neutral foundation** (`#09090b` / `hsl(240, 10%, 4%)`) paired with a controlled **mint/emerald accent** (`#10b981` / `hsl(160, 84%, 42%)`) to convey precision, intelligence, and calm focus.

Semantic CSS Variables configured in `globals.css`:
```css
:root {
  --background: 220 20% 98%;
  --foreground: 224 71% 4%;
  --card: 0 0% 100%;
  --primary: 160 84% 39%;
  --border: 220 13% 89%;
  --muted: 220 14% 94%;
}

.dark {
  --background: 240 10% 4%;
  --foreground: 0 0% 98%;
  --card: 240 10% 6%;
  --primary: 160 84% 42%;
  --border: 240 4% 16%;
  --muted: 240 5% 13%;
}
```

* **Micro-interactions**: Subtle hover elevations, active press scales (`scale-[0.98]`), animated streaming token cursors, and toast copy confirmations.
* **Reduced Motion**: Full support for `prefers-reduced-motion` honoring user accessibility preferences.

---

## 9. Accessibility (a11y) Work

* **Semantic Landmarks**: Native `<header>`, `<main>`, `<aside>`, `<nav>`, and `<footer>` elements across all views.
* **Accessible Modals & Drawers**: ARIA attributes (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby`), keyboard `Escape` dismissal, and background blur traps.
* **Keyboard Focus Rings**: Visible `focus-visible:ring-2 focus-visible:ring-primary` on all interactive buttons, inputs, and links.
* **Screen Reader Labels**: Every icon-only button includes descriptive `aria-label` tags (e.g. `aria-label="Copy message text"`, `aria-label="Star conversation"`).
* **Color Contrast**: All text tokens achieve WCAG AA contrast against their respective backgrounds in both light and dark modes.

---

## 10. Responsive Design Specifications

Tested and verified across all viewport breakpoints:
* **Mobile (320px – 430px)**: Sidebar folds into an accessible slide-over drawer; prompt composer wraps controls; table layouts become scrollable cards.
* **Tablet (768px – 1024px)**: Top bar accommodates model selectors and context pills with adaptive labels; parallel comparison gracefully scrolls horizontally.
* **Desktop (1280px – 1920px+)**: Dual-pane workspace with fixed-width sidebar, multi-column comparison grids, and 380px Chrome Side Panel simulation.

---

## 11. Screenshots & Previews

| View | Description | Preview |
| :--- | :--- | :--- |
| **Landing Page Hero** | Clean value proposition, store status badge, and interactive live sandbox | *(Interactive preview live on `/`)* |
| **Multi-Model Compare** | 3 synchronized parallel columns comparing GPT-4o, Claude 3.5, and Gemini 1.5 | *(Available on `/` and `/workspace`)* |
| **Web App Studio** | Full conversational workspace with search, starred threads, and context pills | *(Explore at `/workspace`)* |
| **Chrome Side Panel** | 380px docked sidebar with webpage summarization and selected-text explanation | *(Explore at `/extension`)* |
| **BYOK Settings** | Local encrypted key storage, temperature tuning, and shortcut configuration | *(Explore at `/settings`)* |

---

## 12. Verification & Quality Checklist

- [x] Production build passes cleanly (`npm run build` exits with code 0)
- [x] Zero TypeScript compilation errors
- [x] Zero ESLint warnings
- [x] Responsive layout verified from 320px to 4K
- [x] Multi-Model Compare workflow fully interactive
- [x] Chrome Side Panel simulator with context injection working
- [x] Dark mode and Light mode seamless toggle with `localStorage` persistence
- [x] `Cmd+K` / `Ctrl+K` command palette functional
- [x] Conversation search, rename, delete, and starring functional
- [x] Token streaming simulation and latency metrics functional
- [x] Authentic Chrome Store listing info documented truthfully

---

## 13. License

Designed and developed with pride as a production-grade frontend engineering and UX architecture submission for the **EchoGPT Ecosystem Challenge**. MIT License.
