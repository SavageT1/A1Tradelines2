import { ArrowLeft, ArrowRight, CalendarDays, Clock } from "lucide-react";
import { Link, useRoute } from "wouter";
import SEOHead from "@/components/SEOHead";
import { findBlogArticle, formatArticleDate } from "@/data/blog";
import { generateArticleSchema, generateBreadcrumbSchema } from "@/lib/seo";
import NotFound from "./NotFound";

export default function BlogArticlePage() {
  const [, params] = useRoute("/blog/:slug");
  const article = findBlogArticle(params?.slug || "");

  if (!article) return <NotFound />;

  const canonical = `https://a1tradelines.com/blog/${article.slug}`;
  const schema = [
    generateArticleSchema({
      title: article.title,
      excerpt: article.description,
      content: [
        article.answer,
        ...article.sections.flatMap(section => section.paragraphs),
      ].join(" "),
      date: article.published,
      modified: article.updated,
      category: article.category,
      readTime: article.readTime,
      url: canonical,
    }),
    generateBreadcrumbSchema([
      { name: "Home", url: "https://a1tradelines.com/" },
      { name: "Learning Center", url: "https://a1tradelines.com/blog" },
      { name: article.title, url: canonical },
    ]),
  ];

  return (
    <article className="bg-[#f4f5f7] pb-20 pt-32">
      <SEOHead
        title={`${article.title} | A1 Tradelines`}
        description={article.description}
        canonical={canonical}
        ogType="article"
        keywords={`${article.category}, authorized user tradelines, tradeline education`}
        schema={schema}
      />

      <header className="border-b border-slate-200 px-5 pb-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.12em] text-blue-700"
          >
            <ArrowLeft size={15} /> Learning Center
          </Link>
          <p className="mt-10 text-xs font-black uppercase tracking-[.18em] text-blue-700">
            {article.category}
          </p>
          <h1 className="mt-5 text-left text-4xl font-black tracking-[-.05em] text-[#12213f] sm:text-6xl">
            {article.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-700">
            {article.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2">
              <CalendarDays size={16} /> Reviewed{" "}
              {formatArticleDate(article.updated)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock size={16} /> {article.readTime}
            </span>
            <span>By A1 Tradelines Editorial Team</span>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:px-12">
        <div className="min-w-0">
          <section
            aria-labelledby="short-answer"
            className="border-l-4 border-lime-500 bg-white p-7 shadow-sm sm:p-9"
          >
            <p className="text-xs font-black uppercase tracking-[.16em] text-blue-700">
              Short answer
            </p>
            <h2 id="short-answer" className="sr-only">
              Short answer
            </h2>
            <p className="mt-4 text-lg font-medium leading-8 text-[#12213f]">
              {article.answer}
            </p>
          </section>

          <div className="mt-12 space-y-12">
            {article.sections.map(section => (
              <section key={section.heading}>
                <h2 className="text-3xl font-black tracking-[-.04em] text-[#12213f]">
                  {section.heading}
                </h2>
                <div className="mt-5 space-y-5">
                  {section.paragraphs.map(paragraph => (
                    <p
                      key={paragraph}
                      className="text-base leading-8 text-slate-700"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-14 border-t border-slate-300 pt-10">
            <h2 className="text-3xl font-black tracking-[-.04em] text-[#12213f]">
              Frequently asked questions
            </h2>
            <div className="mt-7 divide-y divide-slate-200 border-y border-slate-200">
              {article.faqs.map(faq => (
                <div key={faq.question} className="py-6">
                  <h3 className="text-xl font-bold text-[#12213f]">
                    {faq.question}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-slate-700">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12 border-t border-slate-300 pt-8">
            <h2 className="text-2xl font-black tracking-[-.03em] text-[#12213f]">
              Authoritative resources
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
              {article.sources.map(source => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-blue-700 underline decoration-blue-300 underline-offset-4"
                  >
                    {source.name}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <aside className="dark-feature mt-14 bg-[#12213f] p-8 text-white sm:p-10">
            <h2 className="text-3xl font-black tracking-[-.04em] text-white">
              Compare current tradeline options carefully.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-200">
              Review live account details, reporting estimates, pricing, and
              policies. Results and reporting are not guaranteed.
            </p>
            <Link
              href="/buy-tradelines"
              className="mt-7 inline-flex items-center gap-2 bg-lime-300 px-6 py-4 text-xs font-black uppercase tracking-[.12em] text-[#12213f]"
            >
              Browse current options <ArrowRight size={16} />
            </Link>
          </aside>
        </div>

        <aside className="h-fit border border-slate-200 bg-white p-6 lg:sticky lg:top-28">
          <p className="text-xs font-black uppercase tracking-[.16em] text-blue-700">
            Continue learning
          </p>
          <nav
            aria-label="Related articles"
            className="mt-4 divide-y divide-slate-200"
          >
            {article.related.map(slug => {
              const related = findBlogArticle(slug);
              return related ? (
                <Link
                  key={slug}
                  href={`/blog/${slug}`}
                  className="group block py-4 text-sm font-bold leading-6 text-[#12213f] hover:text-blue-700"
                >
                  {related.title}{" "}
                  <ArrowRight
                    className="mt-2 transition group-hover:translate-x-1"
                    size={14}
                  />
                </Link>
              ) : null;
            })}
          </nav>
          <Link
            href="/tradeline-glossary"
            className="mt-5 block border border-[#12213f] px-4 py-3 text-center text-xs font-black uppercase tracking-[.1em] text-[#12213f]"
          >
            Open credit glossary
          </Link>
        </aside>
      </div>

      <footer className="mx-auto max-w-4xl px-5 text-xs leading-6 text-slate-600 sm:px-8">
        <p>
          Educational information only; not legal, financial, lending, or
          credit-repair advice. A1 Tradelines does not guarantee reporting, a
          credit-score change, approval, funding, or any other outcome.
        </p>
      </footer>
    </article>
  );
}
