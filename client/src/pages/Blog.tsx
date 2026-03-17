/*
 * Blog.tsx — Learning Center / Blog page
 * Neon Pulse Design: article cards with colored category badges and visual variety.
 */
import { motion } from "framer-motion";
import { Clock, ArrowRight, BookOpen, Tag, TrendingUp, Landmark, ShieldCheck, Lightbulb, BarChart3 } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";
import SEOHead from "@/components/SEOHead";
import { generateArticleSchema } from "@/lib/seo";
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
    title: "What is a Tradeline? Complete Guide with Credit Report Examples & Legal Regulations",
    excerpt: "Learn exactly what a tradeline is, how it appears on your credit report, why it helps your score, and the legal regulations that make it possible. Includes before/after credit report examples.",
    category: "Tradelines 101",
    readTime: "12 min read",
    date: "Feb 28, 2026",
    featured: true,
    fullContent: true,
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
  const schema = featured ? generateArticleSchema(featured) : null;

  return (
    <div>
      <SEOHead
        title="Blog — Tradelines, Credit Building, and Financial Strategy"
        description="Learn about tradelines, credit profile improvement, authorized user accounts, and financial strategies from A1 Tradelines' expert guides."
        canonical="https://a1tradelines.com/blog"
        keywords="tradelines blog, credit building, credit profile improvement, authorized user, financial strategy"
        schema={schema}
      />
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
                className="glass-panel rounded-2xl p-8 sm:p-10 mb-12 group neon-border-glow card-shine transition-all duration-300"
              >
                {featured.fullContent && (
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

                    {/* What is a Tradeline Content */}
                    <div className="space-y-8 pt-8 border-t border-white/10">
                      {/* Section 1: Simple Explanation */}
                      <div className="space-y-4">
                        <h3 className="text-2xl font-display font-bold text-neon">What Exactly is a Tradeline?</h3>
                        <p className="text-white/60 leading-relaxed">
                          A tradeline is a credit account that appears on your credit report. It shows the credit bureaus (Equifax, Experian, TransUnion) information about that account, including the creditor's name, account type, credit limit, balance, payment history, and age of the account.
                        </p>
                        <p className="text-white/60 leading-relaxed">
                          When you become an <span className="font-bold text-white">authorized user</span> on someone else's credit card account, that account's history is added to your credit report as a tradeline. You don't need to make payments or have access to the card — you simply benefit from the account's positive history.
                        </p>
                      </div>

                      {/* Section 2: How It Appears on Credit Report */}
                      <div className="space-y-4">
                        <h3 className="text-2xl font-display font-bold text-neon">How a Tradeline Appears on Your Credit Report</h3>
                        <p className="text-white/60 leading-relaxed">
                          When a tradeline is added to your credit report, it shows up in your account history section. Here's what you'll see:
                        </p>
                        <div className="glass-panel rounded-xl p-6 space-y-3 bg-white/[0.02] border border-white/10">
                          <div className="space-y-1">
                            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Account Details</span>
                            <p className="text-sm text-white/70 font-mono">Creditor: Chase Bank | Account Type: Credit Card</p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Credit Limit</span>
                            <p className="text-sm text-white/70 font-mono">$50,000</p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Current Balance</span>
                            <p className="text-sm text-neon font-mono">$0 (Perfect Payment History)</p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Account Age</span>
                            <p className="text-sm text-white/70 font-mono">15 Years</p>
                          </div>
                        </div>
                      </div>

                      {/* Section 3: Why It Helps Your Credit Score */}
                      <div className="space-y-4">
                        <h3 className="text-2xl font-display font-bold text-neon">Why Does a Tradeline Help Your Credit Score?</h3>
                        <p className="text-white/60 leading-relaxed">
                          Tradelines improve your credit score by positively impacting the key factors that make up your FICO score:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="glass-panel rounded-lg p-4 bg-emerald-500/5 border border-emerald-500/20">
                            <p className="text-sm font-bold text-emerald-400 mb-2">📊 Utilization Ratio (30%)</p>
                            <p className="text-xs text-white/60">A tradeline with a $0 balance and high credit limit dramatically lowers your utilization ratio, boosting your score.</p>
                          </div>
                          <div className="glass-panel rounded-lg p-4 bg-blue-500/5 border border-blue-500/20">
                            <p className="text-sm font-bold text-blue-400 mb-2">📅 Account Age (15%)</p>
                            <p className="text-xs text-white/60">Older tradelines increase your average account age, which credit bureaus reward with higher scores.</p>
                          </div>
                          <div className="glass-panel rounded-lg p-4 bg-amber-500/5 border border-amber-500/20">
                            <p className="text-sm font-bold text-amber-400 mb-2">✅ Payment History (35%)</p>
                            <p className="text-xs text-white/60">A tradeline with perfect payment history adds positive weight to your payment record.</p>
                          </div>
                          <div className="glass-panel rounded-lg p-4 bg-purple-500/5 border border-purple-500/20">
                            <p className="text-sm font-bold text-purple-400 mb-2">🏦 Credit Mix (10%)</p>
                            <p className="text-xs text-white/60">Adding diverse account types (credit cards, installment loans) strengthens your credit profile.</p>
                          </div>
                        </div>
                      </div>

                      {/* Section 4: Legal Regulations */}
                      <div className="space-y-4">
                        <h3 className="text-2xl font-display font-bold text-neon">Legal Regulations: Why Tradelines Are 100% Legal</h3>
                        <p className="text-white/60 leading-relaxed">
                          Authorized user tradelines are completely legal and regulated by federal law. Here's why:
                        </p>
                        <div className="space-y-3">
                          <div className="glass-panel rounded-lg p-4 bg-white/[0.02] border border-white/10">
                            <p className="text-sm font-bold text-white mb-2">📋 Fair Credit Reporting Act (FCRA)</p>
                            <p className="text-xs text-white/60">The FCRA explicitly allows credit bureaus to report authorized user accounts on credit reports. This is standard banking practice.</p>
                          </div>
                          <div className="glass-panel rounded-lg p-4 bg-white/[0.02] border border-white/10">
                            <p className="text-sm font-bold text-white mb-2">🏦 Banking Standards</p>
                            <p className="text-xs text-white/60">Adding authorized users is a standard feature offered by all major banks and credit card issuers. Parents use this to help their children build credit.</p>
                          </div>
                          <div className="glass-panel rounded-lg p-4 bg-white/[0.02] border border-white/10">
                            <p className="text-sm font-bold text-white mb-2">✅ Credit Bureau Compliance</p>
                            <p className="text-xs text-white/60">All three major credit bureaus (Equifax, Experian, TransUnion) are required to report authorized user accounts accurately and fairly.</p>
                          </div>
                        </div>
                      </div>

                      {/* Section 5: Before & After Example */}
                      <div className="space-y-4">
                        <h3 className="text-2xl font-display font-bold text-neon">Before & After: Real Credit Report Impact</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Before */}
                          <div className="space-y-3">
                            <p className="text-sm font-bold text-white/70">BEFORE (Without Tradeline)</p>
                            <div className="glass-panel rounded-lg p-4 bg-red-500/5 border border-red-500/20 space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-white/60">Credit Score</span>
                                <span className="text-lg font-bold text-red-400">620</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-white/60">Utilization Ratio</span>
                                <span className="text-xs text-red-400">45%</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-white/60">Avg Account Age</span>
                                <span className="text-xs text-red-400">3 years</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-white/60">Accounts</span>
                                <span className="text-xs text-red-400">2 cards</span>
                              </div>
                            </div>
                          </div>
                          {/* After */}
                          <div className="space-y-3">
                            <p className="text-sm font-bold text-white/70">AFTER (With Tradeline)</p>
                            <div className="glass-panel rounded-lg p-4 bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-white/60">Credit Score</span>
                                <span className="text-lg font-bold text-emerald-400">755</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-white/60">Utilization Ratio</span>
                                <span className="text-xs text-emerald-400">12%</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-white/60">Avg Account Age</span>
                                <span className="text-xs text-emerald-400">8 years</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-white/60">Accounts</span>
                                <span className="text-xs text-emerald-400">3 cards</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-white/60 italic text-center pt-4">
                          +135 points in 30 days by adding one strategically chosen tradeline
                        </p>
                      </div>

                      {/* CTA */}
                      <div className="pt-8 border-t border-white/10 text-center">
                        <p className="text-white/60 mb-4">Ready to see how tradelines can help your credit score?</p>
                        <motion.a
                          href="/#simulator"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-neon/20 border border-neon/50 text-neon font-bold rounded-xl hover:bg-neon/30 transition-all"
                        >
                          Try the Credit Score Simulator <ArrowRight className="w-4 h-4" />
                        </motion.a>
                      </div>
                    </div>
                    </div>
                  </div>
                )}
                {!featured.fullContent && (
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
                )}
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
