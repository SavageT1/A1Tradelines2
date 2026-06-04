import { Link } from "wouter";
import { AlertTriangle, Banknote, Calendar, CreditCard, Gauge, Landmark, Timer } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";
import SEOHead from "@/components/SEOHead";
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663300423717/YgBCM3Vvv9dzqmN7qfKYzh/about-hero-SHHrLgGBeyCspmG2izuVnT.webp";

const factors = [
  {
    icon: Timer,
    title: "Account age",
    copy: "Older accounts may support age-related profile factors, but age alone does not guarantee a score change or approval.",
  },
  {
    icon: CreditCard,
    title: "Credit limit",
    copy: "Higher limits may affect available revolving credit if the account reports, but the result depends on your current utilization and scoring model.",
  },
  {
    icon: Gauge,
    title: "Reported balance",
    copy: "Lower reported balances are generally cleaner for utilization-related analysis. Avoid assuming every account reports the same way every cycle.",
  },
  {
    icon: Calendar,
    title: "Statement and posting dates",
    copy: "Timing matters. If your goal has a deadline, compare statement dates and expected posting windows before choosing.",
  },
  {
    icon: Landmark,
    title: "Bank diversity",
    copy: "Different issuers and banks may report differently. Bank selection can matter for fit, timing, and risk review.",
  },
  {
    icon: Banknote,
    title: "Price versus fit",
    copy: "The cheapest tradeline is not always the best match. Compare price to age, limit, timing, spots, and cycles.",
  },
];

const faqs = [
  {
    question: "What should I look for when buying tradelines?",
    answer: "Compare account age, credit limit, reported balance, bank, statement date, posting date, cycles, available spots, price, and your current credit profile. Avoid choosing only by price or limit.",
  },
  {
    question: "Are cheap tradelines bad?",
    answer: "Not always, but cheap tradelines may have lower limits, less age, fewer cycles, less favorable timing, or limited profile value. The better question is whether the account fits your profile and goal.",
  },
  {
    question: "Can A1 tell me the exact score increase before I buy?",
    answer: "No. A1 Tradelines does not guarantee score increases or exact results. Credit outcomes depend on your full profile, reporting, bureau processing, and scoring model.",
  },
];

export default function TradelineBuyersGuide() {
  const schema = [
    generateArticleSchema({
      title: "Tradeline Buyer's Guide: How to Compare Authorized User Tradelines",
      excerpt: "Learn how to compare authorized user tradelines by account age, credit limit, utilization, bank, statement date, posting date, price, and profile fit.",
      date: "2026-06-04",
      category: "Authorized User Tradelines",
      readTime: "6 min read",
    }),
    generateFAQSchema(faqs),
    generateBreadcrumbSchema([
      { name: "Home", url: "https://a1tradelines.com/" },
      { name: "Tradeline Buyer's Guide", url: "https://a1tradelines.com/tradeline-buyers-guide" },
    ]),
  ];

  return (
    <div>
      <SEOHead
        title="Tradeline Buyer's Guide | How to Choose Authorized User Tradelines"
        description="Learn how to choose authorized user tradelines by comparing account age, credit limit, bank, utilization, posting date, cycles, price, and profile fit."
        canonical="https://a1tradelines.com/tradeline-buyers-guide"
        keywords="tradeline buyer guide, how to choose tradelines, best tradelines to buy, authorized user tradelines, cheap tradelines"
        schema={schema}
      />
      <PageHero
        title="Tradeline Buyer's Guide"
        subtitle="How to compare authorized user tradelines without relying on hype, guarantees, or one-size-fits-all advice"
        backgroundImage={HERO_IMAGE}
      />

      <section className="site-section">
        <div className="site-container">
          <SectionReveal>
            <div className="site-container-narrow text-center mb-12">
              <span className="section-kicker">Buyer Education</span>
              <h2 className="section-title">What Makes a Tradeline a Better Fit?</h2>
              <p className="section-subtitle">
                The best authorized user tradeline is the one that makes sense for your profile, timeline, and budget. No tradeline guarantees a score increase, approval, funding, or underwriting result.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {factors.map((factor, index) => {
              const Icon = factor.icon;
              return (
                <SectionReveal key={factor.title} delay={index * 0.04}>
                  <div className="content-card h-full">
                    <div className="w-12 h-12 rounded-xl bg-neon/10 border border-neon/20 flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-neon" />
                    </div>
                    <h3 className="text-left text-white mb-3">{factor.title}</h3>
                    <p className="text-white/70 text-sm">{factor.copy}</p>
                  </div>
                </SectionReveal>
              );
            })}
          </div>

          <SectionReveal>
            <div className="site-container-narrow mt-12 content-card">
              <div className="flex gap-4 items-start">
                <AlertTriangle className="w-7 h-7 text-neon shrink-0 mt-1" />
                <div>
                  <h2 className="text-left text-white mb-3">Avoid Red Flags</h2>
                  <p className="text-white/70 mb-4">
                    Be cautious of any provider promising exact score increases, guaranteed funding, guaranteed mortgage approval, CPN use, fake profiles, or primary tradelines. Those claims can create serious risk.
                  </p>
                  <p className="text-white/70">
                    A1 Tradelines focuses on authorized user tradeline matching, education, and transparent limitations.
                  </p>
                </div>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal>
            <div className="site-container-narrow mt-12 text-center">
              <h2 className="section-title">Compare Current Inventory</h2>
              <p className="section-subtitle mb-6">
                View available options and compare bank, age, credit limit, posting timeline, cycles, price, and available spots.
              </p>
              <div className="cta-row">
                <Link href="/buy-tradelines" className="cta-primary">Browse Inventory</Link>
                <Link href="/contact" className="cta-secondary">Ask for Help</Link>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
