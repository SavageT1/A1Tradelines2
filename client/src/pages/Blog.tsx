/*
 * Blog.tsx - Learning Center
 * Educational hub with safe, no-guarantee authorized user tradeline content.
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Clock, ArrowRight, BookOpen, Tag, Landmark, BarChart3, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";
import SEOHead from "@/components/SEOHead";
import { generateArticleSchema } from "@/lib/seo";

const BLOG_HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663300423717/YgBCM3Vvv9dzqmN7qfKYzh/blog-hero-g8VJsEqV6jJAms6TkpDRt9.webp";

const CATEGORY_STYLES: Record<string, { bg: string; text: string; border: string; icon: React.ElementType }> = {
  "Tradelines 101": { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", icon: BookOpen },
  "Credit Profile Mechanics": { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", icon: BarChart3 },
  "Funding Readiness": { bg: "bg-sky-500/10", text: "text-sky-400", border: "border-sky-500/20", icon: Landmark },
};

const ARTICLES = [
  {
    id: 1,
    title: "What Is an Authorized User Tradeline? A Practical Guide",
    excerpt: "Learn what tradelines are, how authorized user accounts may appear on a credit report, and what limitations to understand before purchasing.",
    category: "Tradelines 101",
    readTime: "8 min read",
    date: "Feb 28, 2026",
    featured: true,
  },
  {
    id: 2,
    title: "How Credit Utilization Affects a Credit Profile",
    excerpt: "Credit utilization is one of the most watched credit profile factors. Learn how balances, limits, and reporting dates can affect how a file is evaluated.",
    category: "Credit Profile Mechanics",
    readTime: "6 min read",
    date: "Feb 18, 2026",
  },
  {
    id: 3,
    title: "Preparing a Credit Profile Before Applying for Funding",
    excerpt: "Before applying for lending, it helps to understand utilization, account age, payment history, inquiries, and lender-specific requirements.",
    category: "Funding Readiness",
    readTime: "10 min read",
    date: "Feb 10, 2026",
  },
  {
    id: 4,
    title: "5 Common Myths About Authorized User Tradelines",
    excerpt: "There is a lot of misinformation about tradelines. This guide separates education from hype and explains what tradelines can and cannot do.",
    category: "Tradelines 101",
    readTime: "5 min read",
    date: "Feb 3, 2026",
  },
  {
    id: 5,
    title: "Understanding Credit Scoring Factors",
    excerpt: "Learn the major categories that scoring models may consider, including payment history, utilization, account age, credit mix, and inquiries.",
    category: "Credit Profile Mechanics",
    readTime: "12 min read",
    date: "Jan 27, 2026",
  },
  {
    id: 6,
    title: "Tradeline Strategy: How to Evaluate Fit Before Buying",
    excerpt: "Not every tradeline fits every profile. Learn how credit limit, age, balance, reporting date, and current credit file condition matter.",
    category: "Tradelines 101",
    readTime: "7 min read",
    date: "Jan 20, 2026",
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
  const schema = featured ? generateArticleSchema(featured) : null;

  return (
    <div>
      <SEOHead
        title="Learning Center | Authorized User Tradelines & Credit Profile Education"
        description="Learn about authorized user tradelines, credit profile factors, reporting timelines, and important no-guarantee limitations from A1 Tradelines."
        canonical="https://a1tradelines.com/blog"
        keywords="authorized user tradelines, tradeline education, credit profile, credit utilization, tradeline strategy"
        schema={schema}
      />
      <PageHero
        title="Learning Center"
        subtitle="Education-first guides on authorized user tradelines, credit profile factors, and reporting considerations"
        backgroundImage={BLOG_HERO}
      />

      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {featured && (
            <SectionReveal>
              <motion.article
                whileHover={{ y: -5 }}
                className="glass-panel rounded-2xl p-8 sm:p-10 mb-12 group neon-border-glow card-shine transition-all duration-300"
              >
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="px-3 py-1 rounded-full bg-neon/10 border border-neon/20 text-neon text-xs font-bold uppercase tracking-widest">
                        Featured
                      </span>
                      <CategoryBadge category={featured.category} />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
                      {featured.title}
                    </h2>
                    <p className="text-white/60 leading-relaxed text-lg">{featured.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-white/40">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {featured.readTime}
                      </span>
                      <span>{featured.date}</span>
                    </div>
                  </div>

                  <div className="space-y-8 pt-8 border-t border-white/10">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-display font-bold text-neon">What exactly is a tradeline?</h3>
                      <p className="text-white/60 leading-relaxed">
                        A tradeline is a credit account that appears on a credit report. It may include the creditor name, account type, credit limit, balance, payment history, and account age.
                      </p>
                      <p className="text-white/60 leading-relaxed">
                        When someone is added as an authorized user to an eligible credit card account, that account may report to their credit file. Whether it reports, how it reports, and how scoring models treat it can vary by bureau, lender, bank, model, and profile.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-2xl font-display font-bold text-neon">What a quality tradeline usually includes</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="glass-panel rounded-lg p-4 bg-emerald-500/5 border border-emerald-500/20">
                          <p className="text-sm font-bold text-emerald-400 mb-2">Payment history</p>
                          <p className="text-xs text-white/60">A strong tradeline should have a clean payment record with no late payments showing on the account.</p>
                        </div>
                        <div className="glass-panel rounded-lg p-4 bg-blue-500/5 border border-blue-500/20">
                          <p className="text-sm font-bold text-blue-400 mb-2">Reported balance</p>
                          <p className="text-xs text-white/60">A low reported balance can be important because utilization is a major credit profile factor.</p>
                        </div>
                        <div className="glass-panel rounded-lg p-4 bg-amber-500/5 border border-amber-500/20">
                          <p className="text-sm font-bold text-amber-400 mb-2">Account age</p>
                          <p className="text-xs text-white/60">Older accounts may affect the age profile differently depending on the consumer's full credit file.</p>
                        </div>
                        <div className="glass-panel rounded-lg p-4 bg-purple-500/5 border border-purple-500/20">
                          <p className="text-sm font-bold text-purple-400 mb-2">Reporting timeline</p>
                          <p className="text-xs text-white/60">Posting depends on issuer reporting cycles and credit bureau processing, so timelines are not fully controllable.</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-2xl font-display font-bold text-neon">Important limitation</h3>
                      <p className="text-white/60 leading-relaxed">
                        Authorized user tradelines are not a guaranteed credit score solution. A1 Tradelines does not guarantee score increases, credit approvals, funding approvals, mortgage approvals, loan terms, or any specific credit outcome.
                      </p>
                    </div>

                    <div className="pt-8 border-t border-white/10 text-center">
                      <p className="text-white/60 mb-4">Want help evaluating which tradeline factors may fit your profile?</p>
                      <Link
                        href="/buy-tradelines"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-neon/20 border border-neon/50 text-neon font-bold rounded-xl hover:bg-neon/30 transition-all"
                      >
                        Browse Available Tradelines <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            </SectionReveal>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((article, i) => {
              const catStyle = CATEGORY_STYLES[article.category] || { bg: "bg-white/5", text: "text-white/60", border: "border-white/10", icon: Tag };
              return (
                <SectionReveal key={article.id} delay={i * 0.05}>
                  <motion.article
                    whileHover={{ y: -5, borderColor: "rgba(0,255,127,0.3)" }}
                    className="glass-panel rounded-2xl p-6 space-y-4 h-full group transition-all duration-300 card-shine"
                  >
                    <div className={`w-full h-36 rounded-xl flex items-center justify-center ${catStyle.bg} border ${catStyle.border}`}>
                      <catStyle.icon className={`w-8 h-8 ${catStyle.text} opacity-40`} />
                    </div>
                    <div className="space-y-3">
                      <CategoryBadge category={article.category} />
                      <h3 className="font-bold text-sm leading-snug group-hover:text-neon transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-xs text-white/40 leading-relaxed line-clamp-3">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-[11px] text-white/25 pt-2">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {article.readTime}
                        </span>
                        <span>{article.date}</span>
                      </div>
                      <p className="text-[11px] text-white/30 pt-2">Full article page coming soon.</p>
                    </div>
                  </motion.article>
                </SectionReveal>
              );
            })}
          </div>

          <SectionReveal>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 glass-panel rounded-3xl p-8 sm:p-12 neon-border-glow text-center space-y-6"
            >
              <div className="w-14 h-14 bg-neon/10 rounded-2xl flex items-center justify-center mx-auto">
                <Phone className="w-7 h-7 text-neon" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold">
                  Need help choosing a <span className="text-neon">tradeline strategy?</span>
                </h2>
                <p className="text-white/50 max-w-xl mx-auto">
                  Talk with A1 Tradelines about authorized user tradeline options, reporting timelines, and profile-based matching. No credit outcome is guaranteed.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-neon bg-neon text-black font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-neon/30 text-sm"
                  >
                    Request a Consultation <ArrowRight className="w-4 h-4 inline ml-1" />
                  </motion.button>
                </Link>
                <Link href="/buy-tradelines">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-white/5 border border-white/10 text-white font-bold px-8 py-3.5 rounded-xl text-sm hover:border-neon/30 transition-all"
                  >
                    Browse Tradelines
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
