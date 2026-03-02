/*
 * About.tsx — About A1 Tradelines
 * Neon Pulse Design: company story, mission, values, differentiators.
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Shield, Target, Users, Zap, ArrowRight, CheckCircle2, Award, Heart } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";

const ABOUT_HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663300423717/YgBCM3Vvv9dzqmN7qfKYzh/about-hero-SHHrLgGBeyCspmG2izuVnT.webp";

const VALUES = [
  {
    icon: Shield,
    title: "Integrity First",
    description: "We operate with complete transparency. No hidden fees, no misleading promises — just honest guidance backed by real results.",
  },
  {
    icon: Target,
    title: "Strategy Over Sales",
    description: "We don't just sell tradelines. We build customized credit strategies aligned with your specific funding goals and timeline.",
  },
  {
    icon: Heart,
    title: "Client Success",
    description: "Your success is our success. We measure our performance by the outcomes we deliver, not the products we sell.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "From our Credit Score Simulator to our matching algorithms, we leverage technology to deliver better results faster.",
  },
];

const DIFFERENTIATORS = [
  "Custom strategy consultation before any purchase",
  "Proprietary credit score simulation technology",
  "Bank-diverse tradeline inventory for maximum impact",
  "Ongoing support throughout the reporting cycle",
  "Money-back guarantee if tradeline doesn't post",
  "16+ years of industry expertise and relationships",
];

export default function About() {
  return (
    <div>
      <PageHero
        title="About A1 Tradelines"
        subtitle="Strategy-first tradeline matching for serious funding goals"
        backgroundImage={ABOUT_HERO}
      />

      {/* Story Section */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <SectionReveal direction="left">
              <div className="space-y-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon/10 border border-neon/20 text-neon text-xs font-bold uppercase tracking-widest">
                  <Award className="w-3 h-3" /> Our Story
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
                  Built by Credit Strategists, <span className="text-neon">for Ambitious People</span>
                </h2>
                <div className="space-y-4 text-white/50 leading-relaxed">
                  <p>
                    A1 Tradelines was founded with a simple but powerful belief: everyone deserves access to the credit tools and strategies that were once reserved for the financially privileged. We saw an industry full of companies selling tradelines as a commodity — with no regard for whether they would actually help the client.
                  </p>
                  <p>
                    We took a different approach. Before recommending a single tradeline, we analyze your complete credit profile, understand your funding goals, and build a strategy designed to maximize your results. Whether you're trying to qualify for a mortgage, secure business funding, or simply build a stronger financial foundation, we match you with the right tradelines at the right time.
                  </p>
                  <p>
                    Today, A1 Tradelines has helped over 2,500 clients achieve their credit goals. Our proprietary Credit Score Simulator lets you simulate your score increase before you buy, and our team of credit strategists provides hands-on guidance every step of the way.
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
                    "To democratize access to premium credit-building strategies and empower every client to achieve their financial goals through intelligent tradeline matching."
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center p-4 bg-white/[0.02] rounded-xl">
                      <span className="text-2xl font-display font-extrabold text-neon font-mono">2,500+</span>
                      <p className="text-xs text-white/30 mt-1">Clients Served</p>
                    </div>
                    <div className="text-center p-4 bg-white/[0.02] rounded-xl">
                      <span className="text-2xl font-display font-extrabold text-neon font-mono">150+</span>
                      <p className="text-xs text-white/30 mt-1">Avg. Point Increase</p>
                    </div>
                    <div className="text-center p-4 bg-white/[0.02] rounded-xl">
                      <span className="text-2xl font-display font-extrabold text-neon font-mono">98%</span>
                      <p className="text-xs text-white/30 mt-1">Satisfaction Rate</p>
                    </div>
                    <div className="text-center p-4 bg-white/[0.02] rounded-xl">
                      <span className="text-2xl font-display font-extrabold text-neon font-mono">16+</span>
                      <p className="text-xs text-white/30 mt-1">Years Experience</p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Values */}
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

      {/* Why Different */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="glass-panel rounded-3xl p-8 sm:p-12 neon-border-glow white-glow">
              <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
                  Why A1 Tradelines <span className="text-neon">Is Different</span>
                </h2>
                <p className="mt-3 text-white/40">We're not just another tradeline company. Here's what sets us apart.</p>
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
                  Schedule a Free Consultation <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
