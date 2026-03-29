/*
 * Layout.tsx — Neon Pulse Design System
 * Wraps all pages with sticky header, footer, and ambient background effects.
 */
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FloatingCTA from "./FloatingCTA";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative overflow-x-hidden">
      {/* Ambient background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-15%] w-[50%] h-[50%] bg-neon/5 rounded-full blur-[150px] animate-pulse-glow" />
        <div
          className="absolute bottom-[-20%] right-[-15%] w-[50%] h-[50%] bg-neon-dark/5 rounded-full blur-[150px] animate-pulse-glow"
          style={{ animationDelay: "-2s" }}
        />
      </div>

      <Header />
      <main className="relative z-10">{children}</main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
