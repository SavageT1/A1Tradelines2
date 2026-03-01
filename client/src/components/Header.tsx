/*
 * Header.tsx — Neon Pulse Design System
 * Sticky header with glassmorphism, logo, nav links, mobile hamburger.
 * Brand: neon green on dark void. Space Grotesk for logo text.
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const LOGO_URL =
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663300423717/zSXPyWmPjshtTLyO.png?Expires=1803896566&Signature=CmRmMqyC9Tj7YdEv3AWFtyWqB6C9~63I5q3BkNi3yhQSYy7alj5WAdzUPw6TSeS5BOC19w7szCaSvsrT24v7wfq1dPmC9J4YziRrm2eKIkM8bBmTYnj5MVAkzWwopX9qmi1Rw91JV9-aFWk3QTYJBCxtr2~~KN5CHsf556IFYg6aT4JpewmmXMd9gdzceq1xpCAAgY8z5oysdR0jdlkwwvEowKB5AlufRlqfURPdT7HEE-Jn~oP3aFbXQFYkQ5Ho4jtO6Nnmz07hUiff3HvjIscwhg~aT45LB7IqfWdCGl59w2qo4DHRUMybG-IcUE0Fdjcupg70IV7-EyqDOhUY0Q__&Key-Pair-Id=K2HSFNDJXOU9YS";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/buy-tradelines", label: "Buy Tradelines" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Learning Center" },
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-void/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src={LOGO_URL}
              alt="A1 Tradelines"
              className="h-10 sm:h-12 w-auto object-contain drop-shadow-lg group-hover:drop-shadow-[0_0_12px_rgba(0,255,127,0.4)] transition-all duration-300"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                    isActive
                      ? "text-neon"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-neon rounded-full"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+19087675309"
              className="flex items-center gap-2 text-sm text-white/50 hover:text-neon transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-mono">(908) 767-5309</span>
            </a>
            <Link
              href="/buy-tradelines"
              className="bg-neon text-black px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-neon/90 transition-all shadow-lg shadow-neon/20 hover:shadow-neon/40"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white/70 hover:text-neon transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-void/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
          >
            <nav className="px-4 py-6 space-y-1">
              {NAV_LINKS.map((link, i) => {
                const isActive = location === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                        isActive
                          ? "bg-neon/10 text-neon border border-neon/20"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.05 }}
                className="pt-4"
              >
                <Link
                  href="/buy-tradelines"
                  className="block w-full text-center bg-neon text-black px-5 py-3 rounded-xl text-base font-bold shadow-lg shadow-neon/20"
                >
                  Get Started
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
