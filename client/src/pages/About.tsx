/*
 * About.tsx - About A1 Tradelines
 * Safer positioning around authorized user tradeline education and matching.
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Shield, Target, Users, ArrowRight, CheckCircle2, Award, Heart, BookOpen } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";
import SEOHead from "@/components/SEOHead";
import { generateOrganizationSchema } from "@/lib/seo";

const ABOUT_HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663300423717/YgBCM3Vvv9dzqmN7qfKYzh/about-hero-SHHrLgGBeyCspmG2izuVnT.webp";

const VALUES = [
  {
    icon: Shield,
    title: "Transparency First",
    description: "We explain what authorized user tradelines can and cannot do before a client makes a purchase decision.",
  },
  {
    icon: Target,
    title: "Strategy Over Hype",
    description: "We evaluate tradelines by profile fit, account age, credit limit, reported balance, bank diversity, and reporting timing.",
  },
  {
    icon: Heart,
    title: "Client Education",
    description: "Our goal is to help clients understand the process, risks, limitations, and third-party reporting factors involved.",
  },
  {
    icon: BookOpen,
    title: "Compliance-Minded Guidance",
    description: "We do not offer CPNs, synthetic identities, fake credit profiles, or guaranteed credit outcomes.",
  },
];

const DIFFERENTIATORS = [
  "Authorized user tradeline matching only",
  "No guaranteed score, approval, or funding claims",
  "Inventory reviewed for age, limit, balance, and reporting factors",
  "Profile-based consultation before purchase",
  "Clear explanations of posting timelines and limitations",
  "No CPNs, synthetic identities, or fake credit profiles",
];

export default function About() {
  const schema = generateOrganizationSchema();

  return (
    <div>
      <SEOHead
        title="About A1 Tradelines | Authorized User Tradeline Matching"
        description="Learn about A1 Tradelines, an authorized user tradeline matching and education company focused on profile fit, reporting support, and clear no-guarantee disclosures."
        canonical="https://a1tradelines.com/about"
        keywords="about A1 Tradelines, authorized user tradelines, tradeline matching, credit profile education"
        schema={schema}
      />
      <PageHero
        title="About A1 Tradelines"
        subtitle="Strategy-first authorized user tradeline matching with clear expectations"
        backgroundImage={ABOUT_HERO}
      />

      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <SectionReveal direction="left">
              <div className="space-y-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon/10 border border-neon/20 text-neon text-xs font-bold uppercase tracking-widest">
                  <Award className="w-3 h-3" /> Our Approach
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
                  Built for <span className="text-neon">Informed Tradeline Decisions</span>
                </h2>
                <div className="space-y-4 text-white/50 leading-relaxed">
                  <p>
                    A1 Tradelines helps clients evaluate authorized user tradeline options with a focus on education, profile fit, and realistic expectations.
                  </p>
                  <p>
                    Instead of treating tradelines as one-size-fits-all products, we look at the details that matter: account age, credit limit, reported balance, bank diversity, available spots, reporting timelines, and the client's current credit profile.
                  </p>
                  <p>
                    Authorized user tradelines may affect credit profiles differently. A1 Tradelines does not guarantee credit score increases, approvals, funding, loan terms, mortgage approval, or any specific credit outcome.
                  </p>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal direction="right">
              <div className="relative">
                <div className="absolute -inset-4 bg-neon/5 rounded-3xl blur-2xl" />
                <div className="relative glass-panel rounded-2xl p-8 space-y-6 neon-border-glow white-glow">
                  <h3 className="text-xl font-bold font-display">Our Mission</h3>
                  <p className="text-white/60 leading-relaxed text-lg italic border-l-2 border-neon/30 pl-5">
                    "To provide clear authorized user tradeline education, profile-based matching, and transparent reporting support without promising credit outcomes we cannot control."
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center p-4 bg-white/[0.02] rounded-xl">
                      <span className="text-2xl font-display font-extrabold text-neon font-mono">AU</span>
                      <p className="text-xs text-white/30 mt-1">Tradeline Focus</p>
                    </div>
                    <div className="text-center p-4 bg-white/[0.02] rounded-xl">
                      <span className="text-2xl font-display font-extrabold text-neon font-mono">$0</span>
                      <p className="text-xs text-white/30 mt-1">Reported Balance Target</p>
                    </div>
                    <div className="text-center p-4 bg-white/[0.02] rounded-xl">
                      <span className="text-2xl font-display font-extrabold text-neon font-mono">No</span>
                      <p className="text-xs text-white/30 mt-1">Outcome Guarantees</p>
                    </div>
                    <div className="text-center p-4 bg-white/[0.02] rounded-xl">
                      <span className="text-2xl font-display font-extrabold text-neon font-mono">Fit</span>
                      <p className="text-xs text-white/30 mt-1">Profile Matching</p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
                Our <span className="text-neon">Values</span>
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VALUES.map((value, i) => (
              <SectionReveal key={value.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -5, borderColor: "rgba(0,255,127,0.3)" }}
                  className="glass-panel rounded-2xl p-7 space-y-4 h-full transition-all duration-300 card-shine white-glow"
                >
                  <div className="w-12 h-12 bg-neon/10 rounded-xl flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-neon" />
                  </div>
                  <h3 className="text-lg font-bold">{value.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{value.description}</p>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-emerald-500/5 border-y border-emerald-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="glass-panel rounded-3xl p-8 sm:p-12 border-l-4 border-emerald-500 bg-emerald-500/5">
              <div className="flex items-start gap-6">
                <Shield className="w-12 h-12 text-emerald-400 flex-shrink-0" />
                <div>
                  <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight mb-4">
                    Clear <span className="text-emerald-400">No-Guarantee Policy</span>
                  </h2>
                  <p className="text-white/70 leading-relaxed text-lg mb-6">
                    We can review tradeline quality factors such as payment history, reported balance, limit, age, and reporting timeline. We cannot guarantee score movement, bureau treatment, lender decisions, approvals, funding, or specific financial outcomes.
                  </p>
                  <Link href="/disclaimer">
                    <motion.a
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center gap-2 text-emerald-400 font-bold hover:text-emerald-300 transition-colors"
                    >
                      Read our disclaimer <ArrowRight className="w-4 h-4" />
                    </motion.a>
                  </Link>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="glass-panel rounded-3xl p-8 sm:p-12 neon-border-glow white-glow">
              <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
                  Why A1 Tradelines <span className="text-neon">Is Different</span>
                </h2>
                <p className="mt-3 text-white/40">A clearer, safer process for evaluating authorized user tradelines.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DIFFERENTIATORS.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3 p-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-neon shrink-0 mt-0.5" />
                    <span className="text-sm text-white/70">{item}</span>
                  </motion.div>
                ))}
              </div>
              <div className="text-center mt-10">
                <Link
                  href="/contact"
                  className="btn-neon inline-flex items-center gap-2 bg-neon text-black px-8 py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-neon/20 transition-all"
                >
                  Request a Consultation <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
