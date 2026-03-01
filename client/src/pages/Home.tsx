/*
 * Home.tsx — A1 Tradelines Homepage
 * Neon Pulse Design: dark void, neon green accents, glassmorphism, animated reveals.
 * Sections: Hero, Credit Score Simulator, How It Works, Testimonials, Final CTA
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  Shield,
  TrendingUp,
  Users,
  Zap,
  Star,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Target,
  Sparkles,
  Phone,
} from "lucide-react";
import { useState, useEffect } from "react";
import SectionReveal from "@/components/SectionReveal";
import TradelineWizard from "@/components/TradelineWizard";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663300423717/YgBCM3Vvv9dzqmN7qfKYzh/hero-bg-9Z7yUMMjZU6HqTHEHsnbNW.webp";

const STATS = [
  { value: "2,500+", label: "Clients Served" },
  { value: "150+", label: "Point Avg. Increase" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "16+", label: "Years Experience" },
];

const HOW_IT_WORKS = [
  {
    icon: Phone,
    title: "Free Consultation",
    description: "Schedule a call with our credit strategists. We analyze your credit profile and funding goals to create a custom plan.",
    step: "01",
  },
  {
    icon: Target,
    title: "Strategy & Matching",
    description: "We match you with the optimal tradelines based on your specific needs — credit limit, age, and bank diversity.",
    step: "02",
  },
  {
    icon: CreditCard,
    title: "Tradeline Placement",
    description: "Once selected, your tradeline is placed on your credit report. You'll see it appear within 1-2 billing cycles.",
    step: "03",
  },
  {
    icon: TrendingUp,
    title: "Score Improvement",
    description: "Watch your credit score climb. Our team monitors the process and provides ongoing support for your funding journey.",
    step: "04",
  },
];

const TESTIMONIALS = [
  {
    name: "Marcus J.",
    role: "Real Estate Investor",
    text: "A1 Tradelines helped me go from a 620 to a 748 in just two months. I was able to secure the funding I needed for my first investment property. Their strategy-first approach made all the difference.",
    rating: 5,
  },
  {
    name: "Sarah K.",
    role: "Small Business Owner",
    text: "I was skeptical at first, but the team at A1 walked me through every step. My credit score jumped 130 points and I qualified for a business line of credit I'd been denied for years.",
    rating: 5,
  },
  {
    name: "David R.",
    role: "Entrepreneur",
    text: "The Credit Score Simulator alone was worth it — it showed me exactly what I needed. The actual results exceeded the simulation. Highly recommend A1 Tradelines to anyone serious about their credit.",
    rating: 5,
  },
  {
    name: "Jennifer L.",
    role: "Homebuyer",
    text: "After working with A1 Tradelines, I went from being denied a mortgage to getting approved with a competitive rate. They truly understand credit strategy at a deep level.",
    rating: 5,
  },
  {
    name: "Anthony M.",
    role: "Auto Dealership Owner",
    text: "I needed my score above 720 to qualify for dealer financing. A1 Tradelines got me there in 30 days flat. The team was responsive, professional, and delivered exactly what they promised. Game changer for my business.",
    rating: 5,
  },
  {
    name: "Lisa T.",
    role: "Freelance Consultant",
    text: "As a self-employed person, getting approved for anything was a nightmare. A1 Tradelines boosted my score by 160 points and I finally got approved for a premium rewards card and a personal loan at a great rate.",
    rating: 5,
  },
  {
    name: "Carlos G.",
    role: "First-Time Homebuyer",
    text: "My wife and I were told we needed at least a 680 to qualify for an FHA loan. We were sitting at 590. A1 Tradelines built us a custom plan and within 6 weeks we were at 710. We just closed on our first home!",
    rating: 5,
  },
  {
    name: "Tanya W.",
    role: "Medical Professional",
    text: "I had student loan debt dragging my score down. A1 Tradelines showed me how adding the right tradelines could offset that. My score went from 640 to 755 and I refinanced at a much lower rate. Saved me thousands.",
    rating: 5,
  },
  {
    name: "Robert H.",
    role: "E-Commerce Business Owner",
    text: "I've worked with three different tradeline companies before. A1 is the only one that actually took the time to understand my goals before recommending anything. The results speak for themselves — 180 point increase.",
    rating: 5,
  },
  {
    name: "Michelle P.",
    role: "Real Estate Agent",
    text: "I refer all my clients who need credit help to A1 Tradelines. They're professional, transparent, and they deliver results consistently. Several of my buyers have gone from pre-approval denials to closing in under 60 days.",
    rating: 5,
  },
];

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/50" />
        </div>

        {/* Scan line effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon/30 to-transparent"
            animate={{ y: ["-100vh", "100vh"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text */}
            <div className="space-y-8 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6 flex flex-col items-center lg:items-start"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon/10 border border-neon/20 text-neon text-xs font-bold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  Strategy-First Tradeline Matching
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-extrabold tracking-tight leading-[1.05]">
Take Back Control of
                   <br />
                   <span className="text-neon neon-text-glow">Your Credit Score</span>
                </h1>
                <p className="text-lg sm:text-xl text-white/50 max-w-lg leading-relaxed mx-auto lg:mx-0">
                  Premium authorized user tradelines matched to your specific goals. See your potential score increase before you buy.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start"
              >
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/buy-tradelines"
                    className="btn-neon inline-flex items-center justify-center gap-2 bg-neon text-black px-8 py-4 rounded-xl text-base font-bold shadow-lg shadow-neon/25 transition-all"
                  >
                    Browse Tradelines <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
                <motion.a
                  href="#simulator"
                  whileHover={{ scale: 1.04, borderColor: "rgba(0,255,127,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-ghost inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl text-base font-medium transition-all"
                >
                  Credit Score Simulator
                </motion.a>
              </motion.div>

              {/* Stats */}
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

            {/* Right: Floating card preview */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-neon/5 rounded-3xl blur-2xl" />
                <div className="relative glass-panel rounded-2xl p-8 space-y-6 neon-border-glow">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-neon/10 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-neon" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Credit Score Simulation</p>
                      <p className="text-xs text-white/40">Real-time estimate</p>
                    </div>
                  </div>
                  <div className="flex items-end gap-4">
                    <div>
                      <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Before</p>
                      <span className="text-3xl font-display font-extrabold text-white/50 font-mono">620</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-neon mb-2" />
                    <div>
                      <p className="text-xs text-neon/60 uppercase tracking-widest mb-1">After</p>
                      <span className="text-3xl font-display font-extrabold text-neon font-mono">748</span>
                    </div>
                    <span className="text-emerald-400 font-bold text-sm mb-1">+128 pts</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "35%" }}
                      animate={{ width: "78%" }}
                      transition={{ duration: 2, delay: 1 }}
                      className="h-full bg-gradient-to-r from-neon-dark to-neon rounded-full"
                    />
                  </div>
                  <p className="text-[11px] text-white/25">* Simulation based on adding a $50K, 15-year tradeline</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CREDIT SCORE SIMULATOR SECTION ===== */}
      <section id="simulator" className="py-20 sm:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon/10 border border-neon/20 text-neon text-xs font-bold uppercase tracking-widest mb-4">
                <Zap className="w-3 h-3" /> Interactive Tool
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight">
                Simulate Your <span className="text-neon">Score Increase</span>
              </h2>
              <p className="mt-4 text-white/40 max-w-2xl mx-auto">
                Enter your current credit profile and see how adding a tradeline could impact your score — before you spend a dime.
              </p>
            </div>
          </SectionReveal>
          <TradelineWizard />
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
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
                From consultation to credit improvement — our proven process delivers results in weeks, not months.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((item, i) => (
              <SectionReveal key={item.step} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8, borderColor: "rgba(0,255,127,0.3)" }}
                  className="relative glass-panel rounded-2xl p-6 space-y-4 h-full transition-all duration-300 card-shine group"
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

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 sm:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon/10 border border-neon/20 text-neon text-xs font-bold uppercase tracking-widest mb-4">
                <Users className="w-3 h-3" /> Client Success
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight">
                Real <span className="text-neon">Results</span>
              </h2>
            </div>
          </SectionReveal>

          <div className="relative max-w-3xl mx-auto">
            <div className="overflow-hidden">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="glass-panel rounded-2xl p-8 sm:p-10 neon-border-glow"
              >
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: TESTIMONIALS[currentTestimonial].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-neon fill-neon" />
                  ))}
                </div>
                <blockquote className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 font-light italic">
                  "{TESTIMONIALS[currentTestimonial].text}"
                </blockquote>
                <div>
                  <p className="font-bold text-white">{TESTIMONIALS[currentTestimonial].name}</p>
                  <p className="text-sm text-white/40">{TESTIMONIALS[currentTestimonial].role}</p>
                </div>
              </motion.div>
            </div>

            {/* Navigation dots */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-neon hover:border-neon/30 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentTestimonial ? "bg-neon w-6" : "bg-white/20"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length)}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-neon hover:border-neon/30 transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-20 sm:py-28 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="relative glass-panel rounded-3xl p-10 sm:p-16 text-center overflow-hidden neon-glow">
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon/5 via-transparent to-neon-dark/5" />

              <div className="relative z-10 space-y-6">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight">
                  Ready to <span className="text-neon neon-text-glow">Transform</span> Your Credit?
                </h2>
                <p className="text-white/40 max-w-xl mx-auto text-lg">
                  Join thousands of clients who have used A1 Tradelines to unlock better rates, higher limits, and new financial opportunities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      href="/buy-tradelines"
                      className="btn-neon inline-flex items-center justify-center gap-2 bg-neon text-black px-8 py-4 rounded-xl text-base font-bold shadow-lg shadow-neon/25 transition-all"
                    >
                      Get Started Now <ArrowRight className="w-5 h-5" />
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.04, borderColor: "rgba(0,255,127,0.4)" }} whileTap={{ scale: 0.97 }}>
                    <Link
                      href="/contact"
                      className="btn-ghost inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl text-base font-medium transition-all"
                    >
                      Schedule Consultation
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
