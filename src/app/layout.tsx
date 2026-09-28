import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppProvider } from "@/context/AppContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EchoGPT — Every AI Model. One Intelligent Workspace & Chrome Side Panel",
  description:
    "Chat, compare, summarize, and work with GPT-4o, Claude 3.5, Gemini 1.5, Llama 3.1, and DeepSeek in one unified interface and native Chrome Side Panel.",
  keywords: [
    "EchoGPT",
    "Multi-AI Chat",
    "Chrome Extension Sidebar",
    "Compare AI Models",
    "Claude 3.5 Sonnet",
    "GPT-4o",
    "Gemini 1.5 Pro",
    "Webpage Summarization",
  ],
  authors: [{ name: "AppifyDevs / EchoGPT Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        {/* Accessible skip link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg focus:font-semibold focus:text-xs"
        >
          Skip to main content
        </a>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
