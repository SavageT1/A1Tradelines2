import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { Link } from "wouter";
import PageHero from "@/components/PageHero";
import SEOHead from "@/components/SEOHead";
import { blogArticles, formatArticleDate } from "@/data/blog";
import { generateBreadcrumbSchema } from "@/lib/seo";

const BLOG_HERO =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663300423717/YgBCM3Vvv9dzqmN7qfKYzh/blog-hero-g8VJsEqV6jJAms6TkpDRt9.webp";

export default function Blog() {
  const [featured, ...articles] = blogArticles;
  const schema = generateBreadcrumbSchema([
    { name: "Home", url: "https://a1tradelines.com/" },
    { name: "Learning Center", url: "https://a1tradelines.com/blog" },
  ]);

  return (
    <div>
      <SEOHead
        title="Tradeline Learning Center | A1 Tradelines"
        description="Clear, practical answers about authorized user tradelines, credit utilization, reporting timelines, buyer considerations, and common myths."
        canonical="https://a1tradelines.com/blog"
        keywords="authorized user tradelines, tradeline education, credit utilization, tradeline reporting timeline, compare tradelines"
        schema={schema}
      />
      <PageHero
        title="Tradeline Learning Center"
        subtitle="Direct, plain-language answers to the questions buyers and brokers ask before making a decision."
        backgroundImage={BLOG_HERO}
      />

      <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between gap-6 border-b border-slate-200 pb-6">
            <div>
              <p className="text-xs font-black uppercase tracking-[.18em] text-blue-700">
                Featured guide
              </p>
              <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-[-.04em] text-[#12213f] sm:text-4xl">
                Start with the fundamentals.
              </h2>
            </div>
            <BookOpen className="hidden text-blue-700 sm:block" size={30} />
          </div>

          <article className="grid gap-0 overflow-hidden border border-slate-200 bg-white shadow-[0_18px_44px_rgba(18,33,63,.08)] lg:grid-cols-[.82fr_1.18fr]">
            <div className="dark-feature flex min-h-64 items-center justify-center bg-[#12213f] p-10 text-white">
              <div>
                <p className="text-xs font-black uppercase tracking-[.16em] text-lime-300">
                  {featured.category}
                </p>
                <p className="mt-8 text-sm leading-6 text-slate-200">
                  Reviewed {formatArticleDate(featured.updated)}
                </p>
              </div>
            </div>
            <div className="p-7 sm:p-10 lg:p-12">
              <h2 className="text-3xl font-black tracking-[-.04em] text-[#12213f] sm:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-700">
                {featured.answer}
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
                <Clock size={16} /> {featured.readTime}
              </div>
              <Link
                href={`/blog/${featured.slug}`}
                className="mt-8 inline-flex items-center gap-2 bg-[#12213f] px-6 py-4 text-xs font-black uppercase tracking-[.12em] text-white hover:bg-blue-700"
              >
                Read the complete guide <ArrowRight size={16} />
              </Link>
            </div>
          </article>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {articles.map(article => (
              <article
                key={article.slug}
                className="flex h-full flex-col border border-slate-200 bg-white p-7 shadow-sm sm:p-8"
              >
                <p className="text-[11px] font-black uppercase tracking-[.16em] text-blue-700">
                  {article.category}
                </p>
                <h2 className="mt-5 text-2xl font-black tracking-[-.035em] text-[#12213f]">
                  {article.title}
                </h2>
                <p className="mt-4 flex-1 text-sm leading-7 text-slate-700">
                  {article.description}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5 text-xs text-slate-500">
                  <span>{article.readTime}</span>
                  <span>Reviewed {formatArticleDate(article.updated)}</span>
                </div>
                <Link
                  href={`/blog/${article.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.12em] text-blue-700"
                >
                  Read guide <ArrowRight size={15} />
                </Link>
              </article>
            ))}
          </div>

          <aside className="dark-feature mt-16 bg-[#12213f] px-7 py-10 text-white sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div>
              <p className="text-xs font-black uppercase tracking-[.16em] text-lime-300">
                Make an informed comparison
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-[-.04em] text-white">
                Use the guides, then review current options.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200">
                Account availability and reporting windows change. Compare the
                current listing details and review all policies before purchase.
              </p>
            </div>
            <Link
              href="/buy-tradelines"
              className="mt-7 inline-flex shrink-0 items-center gap-2 bg-lime-300 px-6 py-4 text-xs font-black uppercase tracking-[.12em] text-[#12213f] lg:mt-0"
            >
              Browse tradelines <ArrowRight size={16} />
            </Link>
          </aside>
        </div>
      </section>
    </div>
  );
}
