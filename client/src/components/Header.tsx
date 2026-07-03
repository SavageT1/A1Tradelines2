import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/buy-tradelines", label: "Buy Tradelines" },
  { href: "/tradeline-assessment", label: "Assessment" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-void/85 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20" : "bg-background/30 backdrop-blur-sm"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          <Link href="/" className="flex items-center gap-3 group" aria-label="A1 Tradelines home">
            <img
              src="/logo.png"
              alt="A1 Tradelines"
              className="h-14 sm:h-16 w-auto max-w-[140px] object-contain drop-shadow-[0_0_14px_rgba(77,163,255,0.28)] transition-transform duration-200 group-hover:scale-[1.02]"
            />
            <div className="hidden lg:block leading-none">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/55">A1 Tradelines</p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.26em] text-neon/70">Authorized User Matching</p>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = location === link.href;
              return (
                <Link key={link.href} href={link.href} className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${isActive ? "text-neon" : "text-white/70 hover:text-white"}`}>
                  {link.label}
                  {isActive && <motion.div layoutId="nav-indicator" className="absolute bottom-0 left-2 right-2 h-0.5 bg-neon rounded-full" transition={{ type: "spring", stiffness: 500, damping: 30 }} />}
                </Link>
              );
            })}
          </nav>

          <div className="hidden xl:flex items-center gap-3">
            <a href="tel:+19087675309" className="flex items-center gap-2 text-sm text-white/70 hover:text-neon transition-colors">
              <Phone className="w-4 h-4" />
              <span className="font-mono">(908) 767-5309</span>
            </a>
            <Link href="/tradeline-assessment" className="btn-neon bg-neon text-black px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-neon/20">
              Get Matched
            </Link>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="xl:hidden p-2 text-white/80 hover:text-neon transition-colors" aria-label="Toggle menu">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="xl:hidden bg-void/95 backdrop-blur-xl border-t border-white/5 overflow-hidden">
            <nav className="px-4 py-6 space-y-1">
              {NAV_LINKS.map((link, i) => {
                const isActive = location === link.href;
                return (
                  <motion.div key={link.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                    <Link href={link.href} className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${isActive ? "bg-neon/10 text-neon border border-neon/20" : "text-white/80 hover:bg-white/5 hover:text-white"}`}>
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: NAV_LINKS.length * 0.05 }} className="pt-4">
                <Link href="/tradeline-assessment" className="btn-neon block w-full text-center bg-neon text-black px-5 py-3 rounded-xl text-base font-bold shadow-lg shadow-neon/20">
                  Get My Tradeline Match
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
