/*
 * BestTradelinesForSale.tsx — SEO landing page targeting "best tradelines for sale"
 */
import { motion } from "framer-motion";
import { Shield, Star, TrendingUp, CheckCircle, ArrowRight, Clock } from "lucide-react";
import { Link } from "wouter";
import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";
import SEOHead from "@/components/SEOHead";
import InlineContactForm from "@/components/InlineContactForm";
import { generateOrganizationSchema, generateServiceSchema } from "@/lib/seo";

const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663300423717/YgBCM3Vvv9dzqmN7qfKYzh/tradelines-hero-MgAogTaYj2uNyddmtjtsbi.webp";

const FEATURES = [
  {
    icon: Shield,
    title: "100% Perfect Payment History",
    body: "Every tradeline in our inventory carries a flawless payment record — zero late payments, zero collections, guaranteed.",
  },
  {
    icon: Star,
    title: "$0 Balance Guarantee",
    body: "All accounts report with a $0 balance, giving you the maximum utilization benefit possible.",
  },
  {
    icon: TrendingUp,
    title: "High-Limit Accounts",
    body: "We stock tradelines from $5,000 up to $100,000+ credit limits from top-tier banks.",
  },
  {
    icon: Clock,
    title: "Aged 2–20+ Years",
    body: "The older the account the bigger the boost to your average account age — a major FICO factor.",
  },
];

const BANKS = [
  "Chase", "American Express", "Citi", "Bank of America",
  "Capital One", "Discover", "Barclays", "Wells Fargo",
];

const FAQS = [
  {
    q: "What makes a tradeline 'the best'?",
    a: "The best tradelines combine high credit limits, long account age, perfect payment history, and $0 reported balance. A1 Tradelines pre-screens every account against all four criteria before listing it.",
  },
  {
    q: "How fast will I see results?",
    a: "Most clients see tradelines post within 15–45 days (1–2 billing cycles). Score changes are typically visible within days of the account reporting.",
  },
  {
    q: "Are these tradelines legal?",
    a: "Yes. Authorized user tradelines are a standard banking practice used by millions of families. They are fully legal under the Equal Credit Opportunity Act.",
  },
  {
    q: "How do I pick the right tradeline?",
    a: "Our credit strategists analyze your profile and match you with the account that maximizes your score increase. You can also use our free Credit Score Simulator before buying.",
  },
];

export default function BestTradelinesForSale() {
  const schemas = [generateOrganizationSchema(), generateServiceSchema()];

  return (
    <div>
      <SEOHead
        title="Best Tradelines for Sale | Verified Authorized User Accounts | A1 Tradelines"
        description="Shop the best tradelines for sale — high-limit, aged accounts with perfect payment history. See your score increase before you buy. Trusted by 2,500+ clients."
        ogTitle="Best Tradelines for Sale | A1 Tradelines"
        ogDescription="High-limit, aged tradelines with perfect payment history. Boost your credit in as little as 30 days."
        canonical="https://a1tradelines.com/best-tradelines-for-sale"
        keywords="best tradelines for sale, buy tradelines, authorized user tradelines, tradelines for credit, boost credit score"
        schema={schemas}
      />

      <PageHero
        title="Best Tradelines for Sale"
        subtitle="High-limit, aged accounts with perfect payment history — pre-screened and ready to post"
        backgroundImage={HERO}
      />

      {/* Why A1 */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon/10 border border-neon/20 text-neon text-xs font-bold uppercase tracking-widest mb-4">
                Why A1 Tradelines
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
                Not All Tradelines Are Created Equal
              </h2>
              <p className="mt-4 text-white/50 max-w-2xl mx-auto">
                We only list accounts that pass our four-point quality check — so every tradeline you buy is the best available, not just available.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => (
              <SectionReveal key={f.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="glass-panel rounded-2xl p-6 space-y-4 h-full"
                >
                  <div className="w-11 h-11 bg-neon/10 rounded-xl flex items-center justify-center">
                    <f.icon className="w-5 h-5 text-neon" />
                  </div>
                  <h3 className="font-display font-bold text-lg">{f.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{f.body}</p>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Banks */}
      <section className="py-10 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <p className="text-center text-xs text-white/30 uppercase tracking-widest font-bold mb-6">
              Tradelines from top US banks
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {BANKS.map((bank) => (
                <span
                  key={bank}
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white/60 font-medium"
                >
                  {bank}
                </span>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-center mb-14">
              How It Works
            </h2>
          </SectionReveal>
          <div className="space-y-6">
            {[
              { step: "01", title: "Browse the Inventory", body: "Filter by credit limit, account age, bank, and price. Over 240+ tradelines available at any time." },
              { step: "02", title: "Simulate Your Score Increase", body: "Use our free Credit Score Simulator to see your projected increase before you spend a dollar." },
              { step: "03", title: "We Add You as Authorized User", body: "Once you purchase, our team adds you to the account. No card is issued — just the credit history." },
              { step: "04", title: "Watch Your Score Rise", body: "The account posts to Equifax, Experian, and TransUnion within 15–45 days. Results follow shortly after." },
            ].map((item, i) => (
              <SectionReveal key={item.step} delay={i * 0.1}>
                <div className="glass-panel rounded-2xl p-6 flex gap-5 items-start">
                  <span className="text-3xl font-display font-extrabold text-neon/30 font-mono shrink-0">{item.step}</span>
                  <div>
                    <h3 className="font-display font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{item.body}</p>
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
            <h2 className="text-3xl font-display font-extrabold text-center mb-10">Common Questions</h2>
          </SectionReveal>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <SectionReveal key={i} delay={i * 0.05}>
                <div className="glass-panel rounded-xl p-6">
                  <h3 className="font-bold mb-2">{faq.q}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{faq.a}</p>
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
        heading="Ready to Boost Your Credit?"
        subheading="Tell us your goals and we'll match you with the right tradeline — free consultation, no obligation."
        defaultSubject="Best Tradelines Inquiry"
      />
    </div>
  );
}
