import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/buy-tradelines", label: "Browse Tradelines" },
  { href: "/tradeline-assessment", label: "Get Matched" },
  { href: "/tradeline-glossary", label: "Credit Terms" },
  { href: "/broker-program", label: "Broker Program" },
  { href: "/blog", label: "Learning Center" },
];

export default function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const listener = () => setScrolled(window.scrollY > 12); window.addEventListener("scroll", listener, { passive: true }); return () => window.removeEventListener("scroll", listener); }, []);
  useEffect(() => setOpen(false), [location]);
  return <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-slate-200/80 bg-[#f8f8f6]/90 shadow-sm backdrop-blur-xl" : "bg-[#f8f8f6]/70 backdrop-blur-md"}`}>
    <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <Link href="/" className="flex items-center gap-2" aria-label="A1 Tradelines home"><img src="/logo.png" alt="A1 Tradelines" className="h-12 w-auto object-contain" /><span className="hidden text-sm font-black tracking-[0.16em] text-[#101b33] sm:inline">TRADELINES</span></Link>
      <nav className="hidden items-center gap-1 xl:flex">{links.map(link => <Link key={link.href} href={link.href} className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${location === link.href ? "bg-blue-50 text-blue-700" : "text-slate-700 hover:bg-white hover:text-[#101b33]"}`}>{link.label}</Link>)}</nav>
      <Link href="/contact" className="hidden rounded-lg bg-[#111d37] px-4 py-2.5 text-sm font-bold text-white transition-transform duration-150 hover:-translate-y-0.5 hover:bg-blue-700 xl:inline-flex">Private Consultation</Link>
      <button type="button" className="rounded-lg p-3 text-[#101b33] xl:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
    </div>
    <AnimatePresence>{open && <motion.nav initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .2 }} className="border-t border-slate-200 bg-[#f8f8f6] px-4 py-4 xl:hidden">{links.map(link => <Link key={link.href} href={link.href} className="block rounded-lg px-4 py-3 font-semibold text-slate-700 hover:bg-white">{link.label}</Link>)}<Link href="/contact" className="mt-2 block rounded-lg bg-[#111d37] px-4 py-3 text-center font-bold text-white">Private Consultation</Link></motion.nav>}</AnimatePresence>
  </header>;
}
