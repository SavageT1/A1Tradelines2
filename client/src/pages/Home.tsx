/*
 * Home.tsx - A1 Tradelines Homepage
 * Safer conversion copy for authorized user tradeline matching.
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  Shield,
  Users,
  CreditCard,
  Target,
  Sparkles,
  Phone,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import TradelineWizard from "@/components/TradelineWizard";
import SEOHead from "@/components/SEOHead";
import { generateOrganizationSchema, generateServiceSchema, generateWebSiteSchema } from "@/lib/seo";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663300423717/YgBCM3Vvv9dzqmN7qfKYzh/hero-bg-9Z7yUMMjZU6HqTHEHsnbNW.webp";

const STATS = [
  { value: "AU", label: "Tradeline Focus" },
  { value: "$0", label: "Reported Balance Target" },
  { value: "1-2", label: "Typical Billing Cycles" },
  { value: "US", label: "Nationwide Support" },
];

const HOW_IT_WORKS = [
  {
    icon: Phone,
    title: "Profile Review",
    description: "Tell us your current credit profile, goals, timeline, and budget so we can understand whether authorized user tradelines may be a fit.",
    step: "01",
  },
  {
    icon: Target,
    title: "Strategy & Matching",
    description: "We compare available tradelines by age, limit, balance, reporting cycle, bank diversity, and profile fit before suggesting options.",
    step: "02",
  },
  {
    icon: CreditCard,
    title: "Authorized User Placement",
    description: "When selected, the authorized user tradeline process follows the applicable cardholder, bank, vendor, and reporting requirements.",
    step: "03",
  },
  {
    icon: Clock,
    title: "Reporting Support",
    description: "Posting depends on issuer reporting cycles and credit bureau processing. We help you understand the expected timeline and next steps.",
    step: "04",
  },
];

const TRUST_POINTS = [
  "Authorized user tradeline matching only — no CPNs, synthetic identities, or fake credit profiles.",
  "Education-first guidance so clients understand profile fit, timing, and limitations before purchasing.",
  "Quality-focused inventory review based on payment history, reported balance, account age, and credit limit.",
  "Satisfied clients across the U.S. use A1 Tradelines to compare options with clearer expectations.",
];

export default function Home() {
  const schemas = [generateWebSiteSchema(), generateOrganizationSchema(), generateServiceSchema()];

  return (
    <div className="overflow-hidden">
      <SEOHead
        title="Authorized User Tradeline Matching | A1 Tradelines"
        description="A1 Tradelines provides authorized user tradeline matching, education, and reporting support based on profile fit, account age, credit limit, balance, and timeline."
        ogTitle="A1 Tradelines | Authorized User Tradeline Matching"
        ogDescription="Profile-based authorized user tradeline matching, education, and reporting support."
        canonical="https://a1tradelines.com/"
        keywords="authorized user tradelines, tradeline matching, tradeline education, credit profile strategy, A1 Tradelines"
        schema={schemas}
      />

      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="fixed inset-0 -z-10">
          <img src={HERO_BG} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
          <div className="flex flex-col items-center justify-center gap-12 lg:gap-16">
            <div className="space-y-8 text-center max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6 flex flex-col items-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon/10 border border-neon/20 text-neon text-xs font-bold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  Strategy-First Authorized User Tradeline Matching
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-extrabold leading-[1.05]">
                  Build a Stronger
                  <br />
                  <span className="text-neon neon-text-glow">Credit Profile</span>
                </h1>
                <p className="text-lg sm:text-xl text-white/55 max-w-2xl leading-relaxed mx-auto">
                  A1 Tradelines helps clients evaluate authorized user tradeline options based on account age, credit limit, reported balance, bank diversity, and reporting timeline.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 items-center justify-center"
              >
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/buy-tradelines"
                    className="btn-neon inline-flex items-center justify-center gap-2 bg-neon text-black px-8 py-4 rounded-xl text-base font-bold shadow-lg shadow-neon/25 transition-all"
                  >
                    Browse Tradeline Options <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
                <motion.a
                  href="#simulator"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="group btn-ghost inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl text-base font-medium transition-all hover:bg-neon hover:text-black hover:border-neon"
                >
                  Compare Profile Factors
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest"
              >
                <Shield className="w-4 h-4" />
                Quality Reviewed Accounts • Education-First Guidance
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4"
              >
                {STATS.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="space-y-1"
                  >
                    <span className="text-2xl sm:text-3xl font-display font-extrabold text-white font-mono">{stat.value}</span>
                    <span className="text-xs text-white/30 uppercase tracking-wider block">{stat.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section id="simulator" className="py-20 sm:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon/10 border border-neon/20 text-neon text-xs font-bold uppercase tracking-widest mb-4">
                <Target className="w-3 h-3" /> Profile Factors
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight">
                Compare <span className="text-neon">Tradeline Factors</span>
              </h2>
              <p className="mt-4 text-white/40 max-w-2xl mx-auto">
                Review how limit, balance, age, and reporting timing may matter before choosing an authorized user tradeline.
              </p>
            </div>
          </SectionReveal>
          <TradelineWizard />
        </div>
      </section>

      <section className="py-20 sm:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon/10 border border-neon/20 text-neon text-xs font-bold uppercase tracking-widest mb-4">
                <Shield className="w-3 h-3" /> Simple Process
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight">
                How It <span className="text-neon">Works</span>
              </h2>
              <p className="mt-4 text-white/40 max-w-2xl mx-auto">
                A straightforward matching process designed around profile fit, transparency, and realistic expectations.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((item, i) => (
              <SectionReveal key={item.step} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8, borderColor: "rgba(0,255,127,0.3)" }}
                  className="relative glass-panel rounded-2xl p-6 space-y-4 h-full transition-all duration-300 card-shine group white-glow"
                >
                  <span className="text-5xl font-display font-extrabold text-white/[0.03] absolute top-4 right-4">
                    {item.step}
                  </span>
                  <div className="w-12 h-12 bg-neon/10 rounded-xl flex items-center justify-center group-hover:bg-neon/20 transition-colors">
                    <item.icon className="w-6 h-6 text-neon" />
                  </div>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{item.description}</p>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="glass-panel rounded-3xl p-8 sm:p-12 neon-border-glow white-glow">
              <div className="text-center mb-10">
                <Users className="w-12 h-12 text-neon mx-auto mb-4" />
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
                  What We <span className="text-neon">Do and Do Not</span> Offer
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TRUST_POINTS.map((point) => (
                  <div key={point} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/10">
                    <CheckCircle2 className="w-5 h-5 text-neon shrink-0 mt-0.5" />
                    <p className="text-sm text-white/60 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex items-start gap-3 p-4 rounded-xl bg-white/[0.025] border border-white/10">
                <AlertTriangle className="w-5 h-5 text-white/30 shrink-0 mt-0.5" />
                <p className="text-xs text-white/40 leading-relaxed">
                  For privacy, general website forms should not include Social Security numbers, banking logins, credit monitoring passwords, or sensitive identity information.
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="py-20 sm:py-28 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="relative glass-panel rounded-3xl p-10 sm:p-16 text-center overflow-hidden neon-glow">
              <div className="absolute inset-0 bg-gradient-to-br from-neon/5 via-transparent to-neon-dark/5" />
              <div className="relative z-10 space-y-6">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight">
                  Ready to Review <span className="text-neon neon-text-glow">Available Tradelines?</span>
                </h2>
                <p className="text-white/40 max-w-xl mx-auto text-lg">
                  Browse authorized user tradeline options and speak with A1 Tradelines about profile-based matching before making a purchase.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      href="/buy-tradelines"
                      className="btn-neon inline-flex items-center justify-center gap-2 bg-neon text-black px-8 py-4 rounded-xl text-base font-bold shadow-lg shadow-neon/25 transition-all"
                    >
                      Browse Tradelines <ArrowRight className="w-5 h-5" />
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.04, borderColor: "rgba(0,255,127,0.4)" }} whileTap={{ scale: 0.97 }}>
                    <Link
                      href="/contact"
                      className="btn-ghost inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl text-base font-medium transition-all"
                    >
                      Request Consultation
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
