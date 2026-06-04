import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Mail, Phone } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";

const THANK_YOU_HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663300423717/YgBCM3Vvv9dzqmN7qfKYzh/contact-hero-GATXTizuF7kKCUe38nynTh.webp";

declare global {
  interface Window {
    oaiq?: (...args: unknown[]) => void;
  }
}

function getOrCreateLeadEventId() {
  const storageKey = "a1_lead_event_id";
  const existing = window.sessionStorage.getItem(storageKey);

  if (existing) return existing;

  const eventId = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  window.sessionStorage.setItem(storageKey, eventId);
  return eventId;
}

export default function ThankYou() {
  useEffect(() => {
    window.oaiq?.(
      "measure",
      "lead_created",
      {
        type: "customer_action",
      },
      {
        event_id: getOrCreateLeadEventId(),
      }
    );
  }, []);

  return (
    <div>
      <SEOHead
        title="Thank You | A1 Tradelines"
        description="Thank you for contacting A1 Tradelines. Our team will review your inquiry and follow up about authorized user tradeline options."
        canonical="https://a1tradelines.com/thank-you"
        keywords="A1 Tradelines thank you, tradeline consultation submitted, authorized user tradeline inquiry"
      />

      <PageHero
        title="Thank You"
        subtitle="Your inquiry has been received"
        backgroundImage={THANK_YOU_HERO}
      />

      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-panel rounded-2xl p-8 sm:p-12 text-center neon-border-glow space-y-7"
            >
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold">
                  Message Sent Successfully
                </h2>
                <p className="text-white/55 leading-relaxed max-w-2xl mx-auto">
                  Thank you for reaching out to A1 Tradelines. A member of our team will review your inquiry and follow up about authorized user tradeline options, reporting timelines, and profile-based matching.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 flex gap-4">
                  <Phone className="w-5 h-5 text-neon shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-bold text-white">Need faster help?</p>
                    <a href="tel:+19087675309" className="text-sm text-white/50 hover:text-neon transition-colors">
                      Call (908) 767-5309
                    </a>
                  </div>
                </div>
                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 flex gap-4">
                  <Mail className="w-5 h-5 text-neon shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-bold text-white">Email us directly</p>
                    <a href="mailto:info@a1tradelines.com" className="text-sm text-white/50 hover:text-neon transition-colors">
                      info@a1tradelines.com
                    </a>
                  </div>
                </div>
              </div>

              <p className="text-xs text-white/35 leading-relaxed max-w-2xl mx-auto border border-white/10 bg-white/[0.03] rounded-xl px-4 py-3">
                Authorized user tradelines do not guarantee credit score increases, approvals, funding, loan terms, or specific credit outcomes. Reporting depends on issuer and bureau processing timelines.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/buy-tradelines" className="btn-neon bg-neon text-black font-bold py-3 px-6 rounded-xl inline-flex items-center justify-center gap-2">
                  View Tradeline Inventory <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/" className="border border-white/15 text-white/70 hover:text-white hover:border-white/30 py-3 px-6 rounded-xl inline-flex items-center justify-center transition-colors">
                  Back to Home
                </Link>
              </div>
            </motion.div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
