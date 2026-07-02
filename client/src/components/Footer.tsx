/*
 * Footer.tsx - Core footer navigation, legal links, and contact details.
 */
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-void/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 text-white hover:text-neon transition-colors" aria-label="A1 Tradelines home">
              <img
                src="/logo.svg"
                alt="A1 Tradelines"
                className="h-14 w-auto max-w-[170px] object-contain"
              />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Authorized user tradeline matching, education, and reporting support. No credit score, approval, or funding outcomes are guaranteed.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="https://www.facebook.com/A1Tradelines/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-neon hover:border-neon/30 transition-all" aria-label="A1 Tradelines on Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white/90 uppercase tracking-widest">Quick Links</h3>
            <ul className="space-y-2">
              [{"href":"/","label":"Home"},{"href":"/about","label":"About Us"},{"href":"/buy-tradelines","label":"Buy Tradelines"},{"href":"/tradeline-assessment","label":"Tradeline Assessment"},{"href":"/buy-authorized-user-tradelines","label":"Buy Authorized User Tradelines"},{"href":"/tradelines-for-sale","label":"Tradelines for Sale"},{"href":"/contact","label":"Contact Us"}].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 hover:text-neon text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white/90 uppercase tracking-widest">Education</h3>
            <ul className="space-y-2">
              [{"href":"/how-it-works","label":"How It Works"},{"href":"/tradeline-buyers-guide","label":"Buyer Guide"},{"href":"/tradeline-glossary","label":"Tradeline Glossary"},{"href":"/authorized-user-tradelines","label":"Authorized User Tradelines"},{"href":"/seasoned-tradelines","label":"Seasoned Tradelines"},{"href":"/best-tradelines-for-credit-utilization","label":"Credit Utilization Tradelines"},{"href":"/how-long-do-tradelines-take-to-post","label":"Posting Timeline"},{"href":"/are-tradelines-legal","label":"Are Tradelines Legal?"},{"href":"/can-tradelines-help-business-funding","label":"Business Funding"},{"href":"/non-posting-policy","label":"Non-Posting Policy"},{"href":"/faq","label":"FAQ"}].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/70 hover:text-neon text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white/90 uppercase tracking-widest">Contact</h3>
            <ul className="space-y-3">
              <li><a href="tel:+19087675309" className="text-white/70 hover:text-neon text-sm transition-colors flex items-center gap-2"><span className="font-mono">(908) 767-5309</span></a></li>
              <li><a href="mailto:info@a1tradelines.com" className="text-white/70 hover:text-neon text-sm transition-colors">info@a1tradelines.com</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs">&copy; {new Date().getFullYear()} A1 Tradelines. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6 text-white/50 text-xs">
            <Link href="/privacy-policy" className="hover:text-white/80 transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white/80 transition-colors">Terms of Service</Link>
            <Link href="/disclaimer" className="hover:text-white/80 transition-colors">Disclaimer</Link>
            <Link href="/non-posting-policy" className="hover:text-white/80 transition-colors">Non-Posting Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
