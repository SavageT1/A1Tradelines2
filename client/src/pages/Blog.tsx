/*
 * Blog.tsx — Learning Center / Blog page
 * Neon Pulse Design: article cards with colored category badges and visual variety.
 */
import { motion } from "framer-motion";
import { Clock, ArrowRight, BookOpen, Tag, TrendingUp, Landmark, ShieldCheck, Lightbulb, BarChart3 } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";
import { toast } from "sonner";

const BLOG_HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663300423717/YgBCM3Vvv9dzqmN7qfKYzh/blog-hero-g8VJsEqV6jJAms6TkpDRt9.webp";

const CATEGORY_STYLES: Record<string, { bg: string; text: string; border: string; icon: React.ElementType }> = {
  "Tradelines 101": { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", icon: BookOpen },
  "Credit Score Mechanics": { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", icon: BarChart3 },
  "Funding Strategies": { bg: "bg-sky-500/10", text: "text-sky-400", border: "border-sky-500/20", icon: Landmark },
};

const ARTICLES = [
  {
    id: 1,
    title: "Tradelines 101: Everything You Need to Know About Authorized User Tradelines",
    excerpt: "A comprehensive guide to understanding how authorized user tradelines work, their impact on your credit score, and how to choose the right ones for your goals.",
    category: "Tradelines 101",
    readTime: "8 min read",
    date: "Feb 25, 2026",
    featured: true,
  },
  {
    id: 2,
    title: "How Credit Utilization Affects Your Score (And How to Optimize It)",
    excerpt: "Credit utilization is the second most important factor in your credit score. Learn the strategies that can help you optimize this crucial metric.",
    category: "Credit Score Mechanics",
    readTime: "6 min read",
    date: "Feb 18, 2026",
    featured: false,
  },
  {
    id: 3,
    title: "The Complete Guide to Business Funding: From Credit Building to Approval",
    excerpt: "Whether you're starting a new business or expanding an existing one, your personal credit plays a crucial role. Here's how to prepare.",
    category: "Funding Strategies",
    readTime: "10 min read",
    date: "Feb 10, 2026",
    featured: false,
  },
  {
    id: 4,
    title: "5 Common Myths About Tradelines — Debunked",
    excerpt: "There's a lot of misinformation about tradelines. We separate fact from fiction and address the most common misconceptions.",
    category: "Tradelines 101",
    readTime: "5 min read",
    date: "Feb 3, 2026",
    featured: false,
  },
  {
    id: 5,
    title: "Understanding the FICO Scoring Model: A Deep Dive",
    excerpt: "The FICO score is used in 90% of lending decisions. Learn exactly how it's calculated and what you can do to improve each factor.",
    category: "Credit Score Mechanics",
    readTime: "12 min read",
    date: "Jan 27, 2026",
    featured: false,
  },
  {
    id: 6,
    title: "Tradeline Strategy: How to Choose the Right Tradeline for Your Goals",
    excerpt: "Not all tradelines are created equal. Learn how to select tradelines based on your specific credit profile and funding objectives.",
    category: "Tradelines 101",
    readTime: "7 min read",
    date: "Jan 20, 2026",
    featured: false,
  },
];

function CategoryBadge({ category }: { category: string }) {
  const style = CATEGORY_STYLES[category] || { bg: "bg-white/5", text: "text-white/60", border: "border-white/10", icon: Tag };
  const Icon = style.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${style.bg} ${style.text} border ${style.border}`}>
      <Icon className="w-3 h-3" /> {category}
    </span>
  );
}

export default function Blog() {
  const featured = ARTICLES.find((a) => a.featured);
  const rest = ARTICLES.filter((a) => !a.featured);

  return (
    <div>
      <PageHero
        title="Learning Center"
        subtitle="Expert insights on credit building, tradelines, and funding strategies"
        backgroundImage={BLOG_HERO}
      />

      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Article */}
          {featured && (
            <SectionReveal>
              <motion.div
                whileHover={{ y: -5 }}
                onClick={() => toast("Article coming soon — full content will be available at launch.")}
                className="glass-panel rounded-2xl p-8 sm:p-10 mb-12 cursor-pointer group neon-border-glow card-shine transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="px-3 py-1 rounded-full bg-neon/10 border border-neon/20 text-neon text-xs font-bold uppercase tracking-widest">
                        Featured
                      </span>
                      <CategoryBadge category={featured.category} />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight group-hover:text-neon transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-white/50 leading-relaxed">{featured.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-white/30">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {featured.readTime}
                      </span>
                      <span>{featured.date}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-neon text-sm font-bold group-hover:gap-2 transition-all">
                      Read Article <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="w-full lg:w-64 h-48 lg:h-auto bg-gradient-to-br from-neon/10 to-emerald-600/5 rounded-xl flex items-center justify-center shrink-0 border border-neon/10">
                    <BookOpen className="w-12 h-12 text-neon/40" />
                  </div>
                </div>
              </motion.div>
            </SectionReveal>
          )}

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((article, i) => {
              const catStyle = CATEGORY_STYLES[article.category] || { bg: "bg-white/5", text: "text-white/60", border: "border-white/10", icon: Tag };
              return (
                <SectionReveal key={article.id} delay={i * 0.05}>
                  <motion.div
                    whileHover={{ y: -5, borderColor: "rgba(0,255,127,0.3)" }}
                    onClick={() => toast("Article coming soon — full content will be available at launch.")}
                    className="glass-panel rounded-2xl p-6 space-y-4 h-full cursor-pointer group transition-all duration-300 card-shine"
                  >
                    <div className={`w-full h-36 rounded-xl flex items-center justify-center ${catStyle.bg} border ${catStyle.border}`}>
                      <catStyle.icon className={`w-8 h-8 ${catStyle.text} opacity-40`} />
                    </div>
                    <div className="space-y-3">
                      <CategoryBadge category={article.category} />
                      <h3 className="font-bold text-sm leading-snug group-hover:text-neon transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-xs text-white/40 leading-relaxed line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-[11px] text-white/25 pt-2">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {article.readTime}
                        </span>
                        <span>{article.date}</span>
                      </div>
                    </div>
                  </motion.div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
