/*
 * AuthorizedUserTradelines.tsx — SEO landing page targeting "authorized user tradelines"
 */
import { motion } from "framer-motion";
import { Users, CreditCard, TrendingUp, ShieldCheck, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";
import SEOHead from "@/components/SEOHead";
import InlineContactForm from "@/components/InlineContactForm";
import { generateFAQSchema, generateOrganizationSchema } from "@/lib/seo";

const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663300423717/YgBCM3Vvv9dzqmN7qfKYzh/blog-hero-g8VJsEqV6jJAms6TkpDRt9.webp";

const CREDIT_FACTORS = [
  { label: "Payment History", pct: "35%", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", impact: "A tradeline with a perfect payment record adds positive weight to your largest FICO factor." },
  { label: "Credit Utilization", pct: "30%", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20", impact: "A $0-balance, high-limit tradeline instantly lowers your overall utilization ratio." },
  { label: "Account Age", pct: "15%", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", impact: "Aged tradelines (10–20+ years) raise your average account age significantly." },
  { label: "Credit Mix", pct: "10%", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20", impact: "Adding a revolving credit card tradeline improves the diversity of your credit profile." },
];

const FAQS = [
  {
    question: "What is an authorized user tradeline?",
    answer: "An authorized user tradeline is a credit card account you are added to without becoming financially responsible for it. The account's full history — payment record, limit, and age — reports on your credit file, boosting your score.",
  },
  {
    question: "Does the primary cardholder's credit get affected?",
    answer: "No. Your activity as an authorized user has zero impact on the primary cardholder's credit score or account standing. You also receive no physical card and cannot make charges.",
  },
  {
    question: "Which credit bureaus does it report to?",
    answer: "All tradelines in our inventory report to all three major bureaus — Equifax, Experian, and TransUnion — maximizing your coverage.",
  },
  {
    question: "How long does it take to see results?",
    answer: "Tradelines typically post within 15–45 days (1–2 billing cycles). Score changes are reflected shortly after the account appears on your report.",
  },
  {
    question: "Is this practice legal?",
    answer: "Yes. Authorized user accounts are a standard, federally recognized banking practice protected under the Equal Credit Opportunity Act. It's the same technique financial advisors recommend to parents building their children's credit.",
  },
  {
    question: "How many tradelines do I need?",
    answer: "It depends on your current profile. Most clients see meaningful results with 1–3 well-selected tradelines. Our strategists will analyze your report and recommend the minimum number needed to hit your goal.",
  },
];

export default function AuthorizedUserTradelines() {
  const schemas = [generateOrganizationSchema(), generateFAQSchema(FAQS)];

  return (
    <div>
      <SEOHead
        title="Authorized User Tradelines Explained | How They Work & Why They Boost Credit | A1 Tradelines"
        description="Learn exactly how authorized user tradelines work, why they boost your credit score, and how to buy verified tradelines from A1 Tradelines. Full guide inside."
        ogTitle="Authorized User Tradelines Explained | A1 Tradelines"
        ogDescription="Learn how authorized user tradelines work and why they're the fastest legal way to improve your credit score."
        canonical="https://a1tradelines.com/authorized-user-tradelines"
        keywords="authorized user tradelines, what is an authorized user tradeline, how tradelines work, tradeline credit boost, buy authorized user account"
        schema={schemas}
      />

      <PageHero
        title="Authorized User Tradelines Explained"
        subtitle="The complete guide to how they work, why they boost your score, and what to look for"
        backgroundImage={HERO}
      />

      {/* What is it */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="glass-panel rounded-2xl p-8 sm:p-12 space-y-6 neon-border-glow">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon/10 border border-neon/20 text-neon text-xs font-bold uppercase tracking-widest">
                The Basics
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold">What Is an Authorized User Tradeline?</h2>
              <div className="space-y-4 text-white/60 leading-relaxed">
                <p>
                  A <strong className="text-white">tradeline</strong> is any credit account that appears on your credit report — credit cards, loans, mortgages. When you are added as an <strong className="text-white">authorized user</strong> on someone else's credit card, that account's entire history is added to your credit report as a tradeline.
                </p>
                <p>
                  You don't use the card. You don't make payments. You simply benefit from the account's positive history — its age, perfect payment record, high credit limit, and $0 balance — being reported under your Social Security number.
                </p>
                <p>
                  This is a fully legal, widely used strategy. Parents have done it for their children for decades. At A1 Tradelines, we've built a marketplace of pre-screened accounts specifically for this purpose.
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* FICO Impact */}
      <section className="py-10 sm:py-16 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-center mb-10">
              How a Tradeline Moves Your FICO Score
            </h2>
          </SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CREDIT_FACTORS.map((f, i) => (
              <SectionReveal key={f.label} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -3 }}
                  className={`glass-panel rounded-xl p-6 border ${f.bg} space-y-3`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className={`font-bold text-sm uppercase tracking-widest ${f.color}`}>{f.label}</h3>
                    <span className={`text-2xl font-display font-extrabold font-mono ${f.color}`}>{f.pct}</span>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed">{f.impact}</p>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
          <SectionReveal>
            <p className="text-center text-xs text-white/30 mt-6">
              A single well-chosen tradeline can positively impact 3 of the 4 biggest FICO factors simultaneously.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* What to look for */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold mb-10">
              What Makes a <span className="text-neon">High-Quality</span> Tradeline?
            </h2>
          </SectionReveal>
          <div className="space-y-4">
            {[
              { icon: ShieldCheck, title: "Perfect Payment History", desc: "Zero late payments, ever. One missed payment can negate the benefit entirely." },
              { icon: CreditCard, title: "$0 Reported Balance", desc: "A low balance-to-limit ratio directly lowers your utilization — the second biggest FICO factor." },
              { icon: TrendingUp, title: "High Credit Limit ($10K+)", desc: "The higher the limit, the more it suppresses your overall utilization ratio." },
              { icon: Users, title: "Account Age 5+ Years", desc: "Older accounts push your average account age up, adding significant points." },
            ].map((item, i) => (
              <SectionReveal key={item.title} delay={i * 0.08}>
                <div className="glass-panel rounded-xl p-5 flex gap-4 items-start">
                  <div className="w-10 h-10 bg-neon/10 rounded-lg flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-neon" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{item.title}</h3>
                    <p className="text-sm text-white/50">{item.desc}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <h2 className="text-3xl font-display font-extrabold text-center mb-10">Frequently Asked Questions</h2>
          </SectionReveal>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <SectionReveal key={i} delay={i * 0.05}>
                <div className="glass-panel rounded-xl p-6">
                  <h3 className="font-bold mb-2">{faq.question}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{faq.answer}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Buttons */}
      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/buy-tradelines"
                className="inline-flex items-center justify-center gap-2 bg-neon text-black px-8 py-4 rounded-xl font-bold shadow-lg shadow-neon/25 hover:bg-neon/90 transition-all"
              >
                Browse Tradelines <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Contact Form */}
      <InlineContactForm
        heading="Ready to Add a Tradeline to Your Report?"
        subheading="Talk to a strategist — we'll match you with the right account for your credit goals."
        defaultSubject="Authorized User Tradeline Inquiry"
      />
    </div>
  );
}
